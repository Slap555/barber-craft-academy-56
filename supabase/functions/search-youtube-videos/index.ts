import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'

const YOUTUBE_API_KEY = Deno.env.get('YOUTUBE_API_KEY')

interface YouTubeSearchResult {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: { url: string; width: number; height: number };
      medium: { url: string; width: number; height: number };
      high: { url: string; width: number; height: number };
    };
    channelTitle: string;
    publishTime: string;
  };
}

interface YouTubeSearchResponse {
  kind: string;
  etag: string;
  nextPageToken?: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YouTubeSearchResult[];
}

interface VideoDetails {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: any;
    channelTitle: string;
    tags?: string[];
    categoryId: string;
    liveBroadcastContent: string;
    defaultLanguage?: string;
    defaultAudioLanguage?: string;
  };
  contentDetails: {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: boolean;
    contentRating: any;
    projection: string;
  };
}

// Trusted barber channels and keywords
const TRUSTED_CHANNELS = [
  'Barber Tutorials',
  'Professional Barber',
  '360Jeezy',
  'Beardbrand',
  'The Modern Barber',
  'Barber Nation',
  'HD Cutz',
  'Schorem Barbershop',
  'KENSURFS',
  'The Rich Barber',
  'Barber Tutorial',
  'Barber Tips',
  'Mounir Salon',
  'Ryan Pearson',
  '360WaveProcess'
];

const BARBER_KEYWORDS = [
  'barber tutorial',
  'barbería',
  'corte de cabello',
  'fade tutorial',
  'afeitado',
  'navaja',
  'tijera',
  'hair cutting',
  'barber technique',
  'professional barber'
];

function buildSearchQuery(lessonTitle: string): string {
  // Remove special characters and convert to search terms
  const cleanTitle = lessonTitle
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Add barber context to the search
  return `${cleanTitle} barber tutorial barbería`;
}

function parseDuration(duration: string): string {
  // Convert ISO 8601 duration (PT4M13S) to readable format (4:13)
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 'N/A';
  
  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}

function isRelevantVideo(video: YouTubeSearchResult, searchTerms: string[]): boolean {
  const title = video.snippet.title.toLowerCase();
  const description = video.snippet.description.toLowerCase();
  const channel = video.snippet.channelTitle.toLowerCase();
  
  // Check if it's from a trusted channel
  const isTrustedChannel = TRUSTED_CHANNELS.some(trustedChannel => 
    channel.includes(trustedChannel.toLowerCase())
  );
  
  // Check if it contains barber-related keywords
  const hasBarberKeywords = BARBER_KEYWORDS.some(keyword => 
    title.includes(keyword) || description.includes(keyword)
  );
  
  // Check if it matches search terms
  const matchesSearchTerms = searchTerms.some(term => 
    title.includes(term.toLowerCase()) || description.includes(term.toLowerCase())
  );
  
  // Prefer videos that are relevant and not too long (under 30 minutes typically)
  return (isTrustedChannel || hasBarberKeywords) && matchesSearchTerms;
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (!YOUTUBE_API_KEY) {
      throw new Error('YouTube API key not configured')
    }

    const { lessonTitle, maxResults = 3 } = await req.json()
    
    if (!lessonTitle) {
      throw new Error('Lesson title is required')
    }

    console.log('Searching for videos for lesson:', lessonTitle)

    // Build search query
    const searchQuery = buildSearchQuery(lessonTitle);
    const searchTerms = lessonTitle.toLowerCase().split(' ').filter(term => term.length > 2);
    
    console.log('Search query:', searchQuery)

    // Search for videos
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?` +
      `part=snippet&` +
      `q=${encodeURIComponent(searchQuery)}&` +
      `type=video&` +
      `maxResults=10&` + // Get more results to filter from
      `order=relevance&` +
      `videoDefinition=any&` +
      `videoEmbeddable=true&` +
      `safeSearch=strict&` +
      `regionCode=US&` +
      `relevanceLanguage=es&` +
      `key=${YOUTUBE_API_KEY}`;

    const searchResponse = await fetch(searchUrl);
    const searchData: YouTubeSearchResponse = await searchResponse.json();

    if (!searchResponse.ok) {
      console.error('YouTube search error:', searchData);
      throw new Error(`YouTube API error: ${searchResponse.status}`);
    }

    if (!searchData.items || searchData.items.length === 0) {
      return new Response(
        JSON.stringify({ videos: [], message: 'No videos found for this lesson' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }

    // Filter relevant videos
    const relevantVideos = searchData.items.filter(video => 
      isRelevantVideo(video, searchTerms)
    );

    // If no relevant videos found, use top results but mark them as such
    const videosToProcess = relevantVideos.length > 0 ? relevantVideos : searchData.items.slice(0, 3);
    
    // Get video details for duration and additional info
    const videoIds = videosToProcess.slice(0, maxResults).map(video => video.id.videoId).join(',');
    
    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?` +
      `part=snippet,contentDetails&` +
      `id=${videoIds}&` +
      `key=${YOUTUBE_API_KEY}`;

    const detailsResponse = await fetch(detailsUrl);
    const detailsData = await detailsResponse.json();

    if (!detailsResponse.ok) {
      console.error('YouTube details error:', detailsData);
      throw new Error(`YouTube API error: ${detailsResponse.status}`);
    }

    // Format results
    const formattedVideos = detailsData.items.map((video: VideoDetails) => ({
      id: video.id,
      title: video.snippet.title,
      channel: video.snippet.channelTitle,
      duration: parseDuration(video.contentDetails.duration),
      thumbnail: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.medium?.url,
      description: video.snippet.description.substring(0, 200) + '...',
      publishedAt: video.snippet.publishedAt,
      relevantToLesson: relevantVideos.some(rv => rv.id.videoId === video.id)
    }));

    console.log(`Found ${formattedVideos.length} videos for "${lessonTitle}"`);

    return new Response(
      JSON.stringify({ 
        videos: formattedVideos,
        searchQuery,
        totalResults: searchData.pageInfo.totalResults
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in search-youtube-videos function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        videos: []
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
})