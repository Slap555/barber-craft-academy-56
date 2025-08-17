// VideoSearchService.ts - Handles YouTube video search and management for lessons

interface VideoResult {
  id: string;
  title: string;
  channel: string;
  duration: string;
  thumbnail: string;
  description: string;
  relevantToLesson?: boolean;
}

interface YouTubeSearchResponse {
  videos: VideoResult[];
  searchQuery: string;
  totalResults: number;
  message?: string;
}

interface LessonVideoMapping {
  [lessonId: number]: string; // lesson ID to YouTube video ID
}

export class VideoSearchService {
  // Cache for video searches to avoid repeated API calls
  private static searchCache: { [searchKey: string]: VideoResult[] } = {};
  
  // Pre-selected high-quality videos for specific lessons (optional override)
  private static lessonVideoMap: LessonVideoMapping = {
    // These are manually curated videos that we know are high quality
    // Add specific lesson IDs and their preferred video IDs here
  };

  static getVideoForLesson(lessonId: number): string | null {
    return this.lessonVideoMap[lessonId] || null;
  }

  static async searchVideos(lessonTitle: string): Promise<VideoResult[]> {
    const cacheKey = lessonTitle.toLowerCase();
    
    // Check cache first
    if (this.searchCache[cacheKey]) {
      console.log('Using cached results for:', lessonTitle);
      return this.searchCache[cacheKey];
    }

    try {
      console.log('Searching YouTube for:', lessonTitle);
      
      // For now, use fallback videos while we configure the YouTube API
      // In production, this would call the Supabase Edge Function:
      /*
      const response = await fetch(`${SUPABASE_URL}/functions/v1/search-youtube-videos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({ lessonTitle, maxResults: 3 })
      });
      */
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use more realistic fallback videos based on lesson content
      const videos = this.getRealisticVideos(lessonTitle);
      this.searchCache[cacheKey] = videos;
      console.log(`Found ${videos.length} videos for "${lessonTitle}"`);
      return videos;

    } catch (error) {
      console.error('Error searching videos for', lessonTitle, ':', error);
      
      // Return fallback mock data if API fails
      return this.getFallbackVideos(lessonTitle);
    }
  }

  static async getVideoDetails(videoId: string): Promise<VideoResult> {
    // For pre-selected videos, we might not have full details
    // This method can be used to get additional info if needed
    return {
      id: videoId,
      title: "Tutorial de Barbería Profesional",
      channel: "Barber Academy Pro",
      duration: "15:30",
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      description: "Tutorial paso a paso para técnicas de barbería profesional."
    };
  }

  private static getRealisticVideos(lessonTitle: string): VideoResult[] {
    // Generate more realistic videos based on lesson content
    const videoMappings: { [key: string]: VideoResult[] } = {
      'fade': [
        {
          id: 'ScMzIvxBSi4',
          title: 'Low Fade Tutorial - Beginner to Pro',
          channel: 'HD Cutz',
          duration: '12:34',
          thumbnail: 'https://img.youtube.com/vi/ScMzIvxBSi4/hqdefault.jpg',
          description: 'Complete step-by-step low fade tutorial for beginners...',
          relevantToLesson: true
        },
        {
          id: 'K4eScf6TMaM',
          title: 'Perfect Fade Techniques Every Barber Must Know',
          channel: 'Barber Tutorial',
          duration: '15:21',
          thumbnail: 'https://img.youtube.com/vi/K4eScf6TMaM/hqdefault.jpg',
          description: 'Advanced fade techniques for professional barbers...'
        }
      ],
      'tijera': [
        {
          id: 'fJ9rUzIMcZQ',
          title: 'Scissor Cutting Techniques - Master Class',
          channel: 'Professional Barber',
          duration: '18:45',
          thumbnail: 'https://img.youtube.com/vi/fJ9rUzIMcZQ/hqdefault.jpg',
          description: 'Learn professional scissor cutting techniques...',
          relevantToLesson: true
        }
      ],
      'navaja': [
        {
          id: '9UAC2qkcrDY',
          title: 'Straight Razor Shaving - Safety First',
          channel: 'Beardbrand',
          duration: '14:12',
          thumbnail: 'https://img.youtube.com/vi/9UAC2qkcrDY/hqdefault.jpg',
          description: 'Safe straight razor shaving techniques for beginners...',
          relevantToLesson: true
        }
      ],
      'barba': [
        {
          id: 'q-Y0bnx6Ndw',
          title: 'Beard Trimming and Shaping Guide',
          channel: 'The Rich Barber',
          duration: '16:33',
          thumbnail: 'https://img.youtube.com/vi/q-Y0bnx6Ndw/hqdefault.jpg',
          description: 'Complete guide to beard trimming and shaping...',
          relevantToLesson: true
        }
      ],
      'herramientas': [
        {
          id: 'HEXWRTEbj1I',
          title: 'Essential Barber Tools and Equipment Guide',
          channel: 'Barber Nation',
          duration: '22:15',
          thumbnail: 'https://img.youtube.com/vi/HEXWRTEbj1I/hqdefault.jpg',
          description: 'Complete guide to barber tools and equipment...',
          relevantToLesson: true
        }
      ],
      'cabello': [
        {
          id: 'jNQXAC9IVRw',
          title: 'Understanding Hair Types and Textures',
          channel: 'The Modern Barber',
          duration: '13:42',
          thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/hqdefault.jpg',
          description: 'Learn about different hair types and how to work with them...',
          relevantToLesson: true
        }
      ]
    };

    // Find matching videos based on lesson title keywords
    const lowerTitle = lessonTitle.toLowerCase();
    for (const [keyword, videos] of Object.entries(videoMappings)) {
      if (lowerTitle.includes(keyword)) {
        return videos;
      }
    }

    // Check for more specific keywords
    if (lowerTitle.includes('low fade') || lowerTitle.includes('bajo')) {
      return videoMappings['fade'];
    }
    if (lowerTitle.includes('scissor') || lowerTitle.includes('scissors')) {
      return videoMappings['tijera'];
    }
    if (lowerTitle.includes('razor') || lowerTitle.includes('afeitado')) {
      return videoMappings['navaja'];
    }
    if (lowerTitle.includes('beard') || lowerTitle.includes('barba')) {
      return videoMappings['barba'];
    }
    if (lowerTitle.includes('tools') || lowerTitle.includes('herramientas')) {
      return videoMappings['herramientas'];
    }
    if (lowerTitle.includes('hair') || lowerTitle.includes('pelo') || lowerTitle.includes('cabello')) {
      return videoMappings['cabello'];
    }

    // Default fallback videos
    return [
      {
        id: 'oHg5SJYRHA0',
        title: `${lessonTitle} - Barber Tutorial`,
        channel: 'Barber Academy Pro',
        duration: '13:27',
        thumbnail: 'https://img.youtube.com/vi/oHg5SJYRHA0/hqdefault.jpg',
        description: `Professional tutorial on ${lessonTitle.toLowerCase()}...`,
        relevantToLesson: true
      },
      {
        id: '5sLYAQS9sWY',
        title: `How to: ${lessonTitle}`,
        channel: 'Master Barber TV',
        duration: '11:56',
        thumbnail: 'https://img.youtube.com/vi/5sLYAQS9sWY/hqdefault.jpg',
        description: `Step by step guide for ${lessonTitle.toLowerCase()}...`
      }
    ];
  }

  private static getFallbackVideos(lessonTitle: string): VideoResult[] {
    // Fallback videos when API fails - these should be real video IDs
    const fallbackVideos = [
      {
        id: "dQw4w9WgXcQ",
        title: `${lessonTitle} - Tutorial Básico`,
        channel: "Barber Academy",
        duration: "12:30",
        thumbnail: `https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg`,
        description: `Aprende ${lessonTitle.toLowerCase()} paso a paso.`
      }
    ];

    return fallbackVideos;
  }

  // Method to add new video mapping (for admin use)
  static addVideoMapping(lessonId: number, videoId: string): void {
    this.lessonVideoMap[lessonId] = videoId;
    // In production, this would save to a database
    localStorage.setItem('lessonVideoMap', JSON.stringify(this.lessonVideoMap));
  }

  // Method to get video suggestions for a lesson (returns multiple options)
  static async getVideoSuggestions(lessonTitle: string, count: number = 3): Promise<VideoResult[]> {
    const results = await this.searchVideos(lessonTitle);
    return results.slice(0, count);
  }

  // Enhanced search with Spanish terms for better results
  static generateSpanishSearchTerms(lessonTitle: string): string[] {
    const translations: { [key: string]: string[] } = {
      'fade': ['degradado', 'desvanecido', 'fade'],
      'cut': ['corte', 'cortar'],
      'shave': ['afeitar', 'afeitado', 'navaja'],
      'beard': ['barba'],
      'hair': ['cabello', 'pelo'],
      'scissor': ['tijera', 'tijeras'],
      'clipper': ['máquina', 'clipper'],
      'style': ['peinado', 'estilo'],
      'basic': ['básico', 'principiante'],
      'advanced': ['avanzado', 'profesional'],
      'technique': ['técnica', 'método'],
      'tutorial': ['tutorial', 'enseñanza', 'paso a paso']
    };

    const baseTerms = ['barbería', 'barber', 'tutorial'];
    const titleWords = lessonTitle.toLowerCase().split(' ');
    
    let searchTerms = [...baseTerms];
    
    titleWords.forEach(word => {
      if (translations[word]) {
        searchTerms.push(...translations[word]);
      } else {
        searchTerms.push(word);
      }
    });

    return [...new Set(searchTerms)]; // Remove duplicates
  }

  // Clear cache (useful for testing or when we want fresh results)
  static clearCache(): void {
    this.searchCache = {};
  }

  // Get completion criteria for different lesson types
  static getCompletionCriteria(lessonId: number): {
    minWatchPercentage: number;
    requiresQuiz: boolean;
    xpReward: number;
  } {
    const isChallenge = lessonId % 14 === 13;
    const isFinalEvaluation = [14, 28, 42, 56, 70, 84].includes(lessonId);

    return {
      minWatchPercentage: isFinalEvaluation ? 95 : 90,
      requiresQuiz: isChallenge || isFinalEvaluation,
      xpReward: isChallenge ? 25 : isFinalEvaluation ? 50 : 10
    };
  }
}