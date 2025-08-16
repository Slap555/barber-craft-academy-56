import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { LessonCard } from "@/components/video/LessonCard";
import { useLessonProgress } from "@/hooks/useLessonProgress";

const lessons = [
  {
    id: 43,
    title: "Fade con diseño (líneas, puntos, nombres)",
    task: "Haz un diseño simple en el lateral",
    completed: false,
    duration: "60 min"
  },
  {
    id: 44,
    title: "Twin fade (doble fade simétrico)",
    task: "Logra simetría perfecta en ambos lados",
    completed: false,
    duration: "70 min"
  },
  {
    id: 45,
    title: "Corte con agua (estilo japonés)",
    task: "Practica control con agua y tijera",
    completed: false,
    duration: "50 min"
  },
  {
    id: 46,
    title: "Peinados con tupé alto y volumen",
    task: "Usa laca y secador para volumen",
    completed: false,
    duration: "45 min"
  },
  {
    id: 47,
    title: "Afeitado con navaja en curvas (orejas, mentón)",
    task: "Practica movimientos curvos",
    completed: false,
    duration: "55 min"
  },
  {
    id: 48,
    title: "Diseño de barba estilo 'line up'",
    task: "Define líneas nítidas en frente y cuello",
    completed: false,
    duration: "40 min"
  },
  {
    id: 49,
    title: "Técnicas de texturizado con navaja",
    task: "Haz degradado en barba con cuchilla",
    completed: false,
    duration: "45 min"
  },
  {
    id: 50,
    title: "Corte para cabello rizado o Afro",
    task: "Aprende técnicas sin frizz",
    completed: false,
    duration: "55 min"
  },
  {
    id: 51,
    title: "Estilo libre: crea tu propio look",
    task: "Diseña un corte original",
    completed: false,
    duration: "60 min"
  },
  {
    id: 52,
    title: "Desafío: 3 cortes en 2 horas (ritmo de salón)",
    task: "Cronometra cada uno",
    completed: false,
    duration: "120 min"
  },
  {
    id: 53,
    title: "Video: 'Mi proceso de corte'",
    task: "Graba tu rutina completa",
    completed: false,
    duration: "90 min"
  },
  {
    id: 54,
    title: "Retroalimentación de la comunidad",
    task: "Comparte y recibe comentarios",
    completed: false,
    duration: "30 min"
  },
  {
    id: 55,
    title: "Repaso avanzado",
    task: "Simulacro de examen práctico",
    completed: false,
    duration: "45 min"
  },
  {
    id: 56,
    title: "Evaluación final – Parte 1",
    task: "Teoría + identificación de errores",
    completed: false,
    duration: "50 min"
  }
];

const CoursePhase4 = () => {
  const { lessonProgresses, completeLessson, getTotalXP, getCompletedLessons } = useLessonProgress();
  
  const lessonsWithProgress = lessons.map(lesson => ({
    ...lesson,
    completed: lessonProgresses[lesson.id]?.isCompleted || false
  }));

  const completedLessons = getCompletedLessons();
  const progressPercentage = (completedLessons / lessons.length) * 100;

  const handleLessonComplete = (lessonId: number) => {
    completeLessson(lessonId);
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <Badge className="bg-primary/20 text-primary border-primary/30">
              Fase 4 - Semanas 9-10
            </Badge>
            <Badge variant="secondary">
              "Experto"
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Avanzado y{" "}
            <span className="bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
              Estilo
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Domina estilos complejos, desarrolla tu creatividad y mejora tu velocidad. 
            Conviértete en un artista de la barbería con técnicas de nivel profesional.
          </p>
          
          {/* Progress */}
          <div className="bg-card rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Progreso del curso</h3>
              <span className="text-sm text-muted-foreground">
                {completedLessons}/{lessons.length} lecciones
              </span>
            </div>
            <Progress value={progressPercentage} className="mb-2" />
            <p className="text-sm text-muted-foreground">
              {progressPercentage.toFixed(0)}% completado
            </p>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid gap-6 mb-8">
          {lessonsWithProgress.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              onLessonComplete={handleLessonComplete}
            />
          ))}
        </div>

        {/* Achievement Card */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  🔥 Logro: "Maestro del Estilo"
                </h3>
                <p className="text-muted-foreground">
                  Domina técnicas artísticas avanzadas y desarrolla tu estilo único. 
                  Tu creatividad y velocidad te distinguen como un verdadero maestro.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link to="/curso/fase-3">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Fase Anterior
            </Button>
          </Link>
          <Link to="/curso/fase-5">
            <Button variant="hero">
              Siguiente Fase
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CoursePhase4;