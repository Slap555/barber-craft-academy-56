import { useState, useEffect } from 'react';

interface LessonProgress {
  lessonId: number;
  videoProgress: number;
  hasWatchedVideo: boolean;
  isCompleted: boolean;
  xpEarned: number;
  completedAt?: Date;
}

interface LessonProgressHook {
  lessonProgresses: { [lessonId: number]: LessonProgress };
  updateLessonProgress: (lessonId: number, progress: Partial<LessonProgress>) => void;
  completeLessson: (lessonId: number) => void;
  getTotalXP: () => number;
  getCompletedLessons: () => number;
  resetLessonProgress: (lessonId: number) => void;
}

export const useLessonProgress = (): LessonProgressHook => {
  const [lessonProgresses, setLessonProgresses] = useState<{ [lessonId: number]: LessonProgress }>({});

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('lessonProgresses');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        setLessonProgresses(parsed);
      } catch (error) {
        console.error('Error loading lesson progress:', error);
      }
    }
  }, []);

  // Save progress to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('lessonProgresses', JSON.stringify(lessonProgresses));
  }, [lessonProgresses]);

  const updateLessonProgress = (lessonId: number, progress: Partial<LessonProgress>) => {
    setLessonProgresses(prev => ({
      ...prev,
      [lessonId]: {
        ...prev[lessonId],
        lessonId,
        videoProgress: 0,
        hasWatchedVideo: false,
        isCompleted: false,
        xpEarned: 0,
        ...progress,
      }
    }));
  };

  const completeLessson = (lessonId: number) => {
    const currentProgress = lessonProgresses[lessonId];
    const isChallenge = lessonId % 14 === 13;
    const isFinalEvaluation = [14, 28, 42, 56, 70, 84].includes(lessonId);
    
    let xpReward = 10; // Base XP for regular lessons
    if (isFinalEvaluation) {
      xpReward = 50;
    } else if (isChallenge) {
      xpReward = 25;
    }

    setLessonProgresses(prev => ({
      ...prev,
      [lessonId]: {
        ...prev[lessonId],
        lessonId,
        isCompleted: true,
        xpEarned: xpReward,
        completedAt: new Date(),
        videoProgress: Math.max(currentProgress?.videoProgress || 0, 90),
        hasWatchedVideo: true,
      }
    }));
  };

  const getTotalXP = (): number => {
    return Object.values(lessonProgresses).reduce((total, progress) => {
      return total + (progress.xpEarned || 0);
    }, 0);
  };

  const getCompletedLessons = (): number => {
    return Object.values(lessonProgresses).filter(progress => progress.isCompleted).length;
  };

  const resetLessonProgress = (lessonId: number) => {
    setLessonProgresses(prev => ({
      ...prev,
      [lessonId]: {
        lessonId,
        videoProgress: 0,
        hasWatchedVideo: false,
        isCompleted: false,
        xpEarned: 0,
      }
    }));
  };

  return {
    lessonProgresses,
    updateLessonProgress,
    completeLessson,
    getTotalXP,
    getCompletedLessons,
    resetLessonProgress,
  };
};