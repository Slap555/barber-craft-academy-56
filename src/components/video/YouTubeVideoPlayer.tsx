import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface YouTubeVideoPlayerProps {
  videoId: string;
  title: string;
  onVideoComplete: () => void;
  onProgressUpdate: (progress: number) => void;
  isCompleted: boolean;
}

// Declare YouTube API types
declare global {
  interface Window {
    YT: {
      Player: new (elementId: string, options: any) => any;
      ready: (callback: () => void) => void;
      PlayerState: {
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

export const YouTubeVideoPlayer = ({ 
  videoId, 
  title, 
  onVideoComplete, 
  onProgressUpdate,
  isCompleted 
}: YouTubeVideoPlayerProps) => {
  const playerRef = useRef<any>(null);
  const playerElementRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [watchProgress, setWatchProgress] = useState(0);
  const [hasWatched90Percent, setHasWatched90Percent] = useState(false);
  const [apiReady, setApiReady] = useState(false);

  // Load YouTube API
  useEffect(() => {
    if (!window.YT) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.body.appendChild(script);

      window.onYouTubeIframeAPIReady = () => {
        setApiReady(true);
      };
    } else {
      setApiReady(true);
    }
  }, []);

  // Initialize player when API is ready
  useEffect(() => {
    if (apiReady && !playerRef.current) {
      const playerId = `youtube-player-${videoId}`;
      playerRef.current = new window.YT.Player(playerId, {
        height: '315',
        width: '100%',
        videoId: videoId,
        playerVars: {
          'playsinline': 1,
          'rel': 0,
          'modestbranding': 1,
        },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange,
        },
      });
    }
  }, [apiReady, videoId]);

  const onPlayerReady = () => {
    // Start tracking progress
    const progressInterval = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime && playerRef.current.getDuration) {
        const currentTime = playerRef.current.getCurrentTime();
        const duration = playerRef.current.getDuration();
        
        if (duration > 0) {
          const progress = (currentTime / duration) * 100;
          setWatchProgress(progress);
          onProgressUpdate(progress);
          
          // Check if user has watched at least 90%
          if (progress >= 90 && !hasWatched90Percent) {
            setHasWatched90Percent(true);
            onVideoComplete();
          }
        }
      }
    }, 1000);

    // Clean up interval when component unmounts
    return () => clearInterval(progressInterval);
  };

  const onPlayerStateChange = (event: any) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
    } else if (event.data === window.YT.PlayerState.PAUSED) {
      setIsPlaying(false);
    } else if (event.data === window.YT.PlayerState.ENDED) {
      setIsPlaying(false);
      if (!hasWatched90Percent) {
        setHasWatched90Percent(true);
        onVideoComplete();
      }
    }
  };

  const togglePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    }
  };

  const restartVideo = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(0);
      setWatchProgress(0);
      setHasWatched90Percent(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">📺 Video Tutorial</h3>
          <div className="flex items-center gap-2">
            <Badge variant={hasWatched90Percent ? "default" : "secondary"}>
              {Math.round(watchProgress)}% visto
            </Badge>
            {hasWatched90Percent && (
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                ✓ Completado
              </Badge>
            )}
          </div>
        </div>
        
        <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-4">
          <div id={`youtube-player-${videoId}`} className="w-full h-full" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={togglePlayPause}
              disabled={!apiReady}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Pausar' : 'Reproducir'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={restartVideo}
              disabled={!apiReady}
            >
              <RotateCcw className="w-4 h-4" />
              Reiniciar
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            {hasWatched90Percent ? 
              "¡Video completado! Puedes continuar con la tarea." :
              "Ve al menos el 90% del video para continuar"
            }
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Progreso del video</span>
            <span>{Math.round(watchProgress)}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300" 
              style={{ width: `${watchProgress}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};