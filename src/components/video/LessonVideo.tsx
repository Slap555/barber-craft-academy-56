import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { YouTubeVideoPlayer } from './YouTubeVideoPlayer';
import { VideoSearchService } from '@/services/VideoSearchService';
import { Search, AlertCircle, Video, BookOpen } from 'lucide-react';

interface LessonVideoProps {
  lessonId: number;
  lessonTitle: string;
  lessonTask: string;
  onVideoComplete: () => void;
  onProgressUpdate?: (progress: number) => void;
}

interface VideoData {
  id: string;
  title: string;
  channel: string;
  duration: string;
  thumbnail: string;
  description: string;
}

export const LessonVideo = ({ 
  lessonId, 
  lessonTitle, 
  lessonTask, 
  onVideoComplete,
  onProgressUpdate = () => {}
}: LessonVideoProps) => {
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isVideoCompleted, setIsVideoCompleted] = useState(false);

  useEffect(() => {
    loadVideoForLesson();
  }, [lessonId, lessonTitle]);

  const loadVideoForLesson = async () => {
    setIsLoading(true);
    setHasVideoError(false);
    
    try {
      // First check if we have a pre-selected video for this lesson
      const videoId = VideoSearchService.getVideoForLesson(lessonId);
      
      if (videoId) {
        const video = await VideoSearchService.getVideoDetails(videoId);
        setVideoData(video);
      } else {
        // Search for a relevant video
        const searchResults = await VideoSearchService.searchVideos(lessonTitle);
        if (searchResults.length > 0) {
          setVideoData(searchResults[0]);
        } else {
          setHasVideoError(true);
        }
      }
    } catch (error) {
      console.error('Error loading video:', error);
      setHasVideoError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoComplete = () => {
    setIsVideoCompleted(true);
    onVideoComplete();
  };

  const handleProgressUpdate = (progress: number) => {
    setVideoProgress(progress);
    onProgressUpdate(progress);
  };

  if (isLoading) {
    return (
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
              <Video className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Cargando video tutorial...</h3>
              <p className="text-sm text-muted-foreground">Buscando el mejor contenido para esta lección</p>
            </div>
          </div>
          <div className="aspect-video bg-muted rounded-lg animate-pulse" />
        </CardContent>
      </Card>
    );
  }

  if (hasVideoError || !videoData) {
    return (
      <Card className="mb-6 border-orange-500/30 bg-orange-500/5">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-orange-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Video en producción</h3>
              <p className="text-sm text-muted-foreground">Sigue la guía escrita mientras preparamos el contenido audiovisual</p>
            </div>
          </div>
          
          <div className="bg-card rounded-lg p-4 border-2 border-dashed border-muted-foreground/30">
            <div className="flex items-center gap-3 mb-3">
              <BookOpen className="w-5 h-5 text-primary" />
              <h4 className="font-medium">Guía de la lección</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Mientras esperamos el video tutorial, puedes comenzar con la tarea práctica:
            </p>
            <p className="text-sm font-medium text-foreground bg-primary/10 p-3 rounded-md">
              📝 {lessonTask}
            </p>
          </div>

          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={loadVideoForLesson}
            >
              <Search className="w-4 h-4 mr-2" />
              Buscar video alternativo
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleVideoComplete}
            >
              Marcar como completado sin video
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mb-6">
      <YouTubeVideoPlayer
        videoId={videoData.id}
        title={videoData.title}
        onVideoComplete={handleVideoComplete}
        onProgressUpdate={handleProgressUpdate}
        isCompleted={isVideoCompleted}
      />
      
      {/* Video Info */}
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-medium text-sm mb-1">{videoData.title}</h4>
              <p className="text-xs text-muted-foreground mb-2">Canal: {videoData.channel}</p>
              <p className="text-xs text-muted-foreground">{videoData.description}</p>
            </div>
            <Badge variant="outline" className="text-xs">
              {videoData.duration}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};