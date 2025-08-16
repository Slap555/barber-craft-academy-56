import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Star, 
  CheckCircle2, 
  Play, 
  BookOpen, 
  Award,
  Zap
} from 'lucide-react';

interface LessonCompletionProps {
  lessonId: number;
  lessonTitle: string;
  lessonTask: string;
  videoProgress: number;
  hasWatchedVideo: boolean;
  isCompleted: boolean;
  onMarkComplete: () => void;
  onStartLesson: () => void;
}

interface CompletionReward {
  xp: number;
  badge?: string;
  message: string;
}

export const LessonCompletion = ({
  lessonId,
  lessonTitle,
  lessonTask,
  videoProgress,
  hasWatchedVideo,
  isCompleted,
  onMarkComplete,
  onStartLesson
}: LessonCompletionProps) => {
  const [showReward, setShowReward] = useState(false);
  const [reward, setReward] = useState<CompletionReward | null>(null);

  const canComplete = hasWatchedVideo && videoProgress >= 90;
  const isChallenge = lessonId % 14 === 13;
  const isFinalEvaluation = [14, 28, 42, 56, 70, 84].includes(lessonId);

  useEffect(() => {
    if (isCompleted && !showReward) {
      generateReward();
    }
  }, [isCompleted]);

  const generateReward = () => {
    let xpAmount = 10;
    let badgeName = "";
    let message = "¡Bien hecho! Has completado la lección.";

    if (isFinalEvaluation) {
      xpAmount = 50;
      badgeName = "🏆 Evaluador Maestro";
      message = "¡Excelente! Has superado una evaluación importante. +50 XP";
    } else if (isChallenge) {
      xpAmount = 25;
      badgeName = "⚡ Desafío Completado";
      message = "¡Increíble! Has superado el desafío semanal. +25 XP";
    } else if (lessonTitle.toLowerCase().includes('fade')) {
      xpAmount = 15;
      badgeName = "✂️ Maestro del Fade";
      message = "¡Perfecto! Has dominado una técnica de fade. +15 XP";
    } else if (lessonTitle.toLowerCase().includes('navaja') || lessonTitle.toLowerCase().includes('afeitado')) {
      xpAmount = 15;
      badgeName = "🪒 Experto en Navaja";
      message = "¡Impresionante! Has dominado el arte del afeitado. +15 XP";
    }

    setReward({ xp: xpAmount, badge: badgeName, message });
    setShowReward(true);

    // Hide reward after 3 seconds
    setTimeout(() => setShowReward(false), 5000);
  };

  const handleComplete = () => {
    onMarkComplete();
    generateReward();
  };

  if (isCompleted) {
    return (
      <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-green-400 mb-1">
                ¡Lección Completada!
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                Has dominado: {lessonTitle}
              </p>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <Trophy className="w-3 h-3 mr-1" />
                  Completado
                </Badge>
                {reward && (
                  <Badge variant="outline">
                    <Zap className="w-3 h-3 mr-1" />
                    +{reward.xp} XP
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Animated reward popup */}
          {showReward && reward && (
            <div className="mt-4 p-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg border border-primary/30 animate-in slide-in-from-bottom-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-primary">{reward.message}</p>
                  {reward.badge && (
                    <p className="text-sm text-muted-foreground">{reward.badge}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
            {hasWatchedVideo ? (
              <CheckCircle2 className="w-4 h-4 text-primary" />
            ) : (
              <Play className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
          Progreso de la Lección
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Video Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">📺 Video Tutorial</span>
            <Badge variant={hasWatchedVideo ? "default" : "secondary"}>
              {Math.round(videoProgress)}%
            </Badge>
          </div>
          <Progress value={videoProgress} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {hasWatchedVideo ? 
              "✓ Video completado" : 
              `Necesitas ver al menos el 90% (faltan ${Math.max(0, 90 - videoProgress).toFixed(0)}%)`
            }
          </p>
        </div>

        {/* Task Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Tarea Práctica</span>
          </div>
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-sm">{lessonTask}</p>
          </div>
        </div>

        {/* Completion Requirements */}
        <div className="bg-card border rounded-lg p-4">
          <h4 className="text-sm font-medium mb-2">Para completar esta lección:</h4>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              {hasWatchedVideo ? (
                <CheckCircle2 className="w-3 h-3 text-green-400" />
              ) : (
                <div className="w-3 h-3 rounded-full border border-muted-foreground" />
              )}
              Ver el video tutorial completo (90%+)
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full border border-muted-foreground" />
              Realizar la tarea práctica
            </div>
            {(isChallenge || isFinalEvaluation) && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full border border-muted-foreground" />
                Completar cuestionario adicional
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            onClick={onStartLesson}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <Play className="w-4 h-4 mr-2" />
            {hasWatchedVideo ? 'Ver de Nuevo' : 'Ver Video'}
          </Button>
          <Button
            onClick={handleComplete}
            disabled={!canComplete}
            size="sm"
            className="flex-1"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Marcar Completada
          </Button>
        </div>

        {!canComplete && (
          <p className="text-xs text-orange-400 text-center">
            ⚠️ Completa el video para poder marcarla como terminada
          </p>
        )}
      </CardContent>
    </Card>
  );
};