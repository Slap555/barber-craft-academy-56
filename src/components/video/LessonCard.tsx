import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, Clock, Play, Video } from 'lucide-react';
import { LessonVideo } from './LessonVideo';
import { LessonCompletion } from './LessonCompletion';

interface Lesson {
  id: number;
  title: string;
  task: string;
  completed: boolean;
  duration: string;
}

interface LessonCardProps {
  lesson: Lesson;
  onLessonComplete: (lessonId: number) => void;
}

export const LessonCard = ({ lesson, onLessonComplete }: LessonCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [hasWatchedVideo, setHasWatchedVideo] = useState(false);

  const handleVideoComplete = () => {
    setHasWatchedVideo(true);
  };

  const handleVideoProgress = (progress: number) => {
    setVideoProgress(progress);
  };

  const handleLessonComplete = () => {
    onLessonComplete(lesson.id);
  };

  const handleStartLesson = () => {
    setIsExpanded(!isExpanded);
  };

  if (lesson.completed) {
    return (
      <Card className="bg-primary/5 border-primary/30 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    Lección {lesson.id}
                  </Badge>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs">{lesson.duration}</span>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completada
                  </Badge>
                </div>
                <CardTitle className="text-lg mb-2">
                  {lesson.title}
                </CardTitle>
                <CardDescription className="text-primary font-medium">
                  📝 Tarea: {lesson.task}
                </CardDescription>
              </div>
            </div>
            <Button 
              variant="secondary"
              size="sm"
              onClick={handleStartLesson}
            >
              {isExpanded ? 'Ocultar' : 'Ver'}
            </Button>
          </div>
        </CardHeader>
        
        {isExpanded && (
          <CardContent className="pt-0">
            <LessonVideo
              lessonId={lesson.id}
              lessonTitle={lesson.title}
              lessonTask={lesson.task}
              onVideoComplete={handleVideoComplete}
              onProgressUpdate={handleVideoProgress}
            />
          </CardContent>
        )}
      </Card>
    );
  }

  return (
    <Card className="transition-all duration-300 hover:scale-[1.01] hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <Circle className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  Lección {lesson.id}
                </Badge>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span className="text-xs">{lesson.duration}</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  <Video className="w-3 h-3 mr-1" />
                  Con video
                </Badge>
              </div>
              <CardTitle className="text-lg mb-2">
                {lesson.title}
              </CardTitle>
              <CardDescription className="text-primary font-medium">
                📝 Tarea: {lesson.task}
              </CardDescription>
            </div>
          </div>
          <Button 
            variant="default"
            size="sm"
            onClick={handleStartLesson}
          >
            <Play className="w-4 h-4 mr-2" />
            {isExpanded ? 'Ocultar' : 'Comenzar'}
          </Button>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-0 space-y-4">
          <LessonVideo
            lessonId={lesson.id}
            lessonTitle={lesson.title}
            lessonTask={lesson.task}
            onVideoComplete={handleVideoComplete}
            onProgressUpdate={handleVideoProgress}
          />
          
          <LessonCompletion
            lessonId={lesson.id}
            lessonTitle={lesson.title}
            lessonTask={lesson.task}
            videoProgress={videoProgress}
            hasWatchedVideo={hasWatchedVideo}
            isCompleted={lesson.completed}
            onMarkComplete={handleLessonComplete}
            onStartLesson={() => setVideoProgress(0)}
          />
        </CardContent>
      )}
    </Card>
  );
};