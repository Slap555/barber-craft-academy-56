import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { LessonCard } from "@/components/video/LessonCard";
import { useLessonProgress } from "@/hooks/useLessonProgress";

const lessons = [
  {
    id: 1,
    title: "Bienvenida: ¿Por qué la barbería?",
    task: "Escribe tu meta como barbero",
    completed: false,
    duration: "15 min"
  },
  {
    id: 2,
    title: "Herramientas del barbero: tijeras, máquinas, peines, navajas",
    task: "Identifica cada herramienta en una imagen",
    completed: false,
    duration: "20 min"
  },
  {
    id: 3,
    title: "Tipos de cabello y texturas",
    task: "Clasifica muestras (graso, seco, rizado, liso)",
    completed: false,
    duration: "25 min"
  },
  {
    id: 4,
    title: "Higiene y seguridad en el salón",
    task: "Haz una lista de 5 normas de higiene",
    completed: false,
    duration: "18 min"
  },
  {
    id: 5,
    title: "Postura del barbero y del cliente",
    task: "Practica sentarte correctamente 10 min",
    completed: false,
    duration: "30 min"
  },
  {
    id: 6,
    title: "Manejo de la tijera: agarre y movimientos básicos",
    task: "Corta papel siguiendo líneas",
    completed: false,
    duration: "35 min"
  },
  {
    id: 7,
    title: "Manejo de la máquina: tipos de cuchillas y ajustes",
    task: "Ajusta una máquina en 3 longitudes distintas",
    completed: false,
    duration: "25 min"
  },
  {
    id: 8,
    title: "Partes del cabello: coronilla, nuca, sienes",
    task: "Dibuja un mapa del cabello masculino",
    completed: false,
    duration: "20 min"
  },
  {
    id: 9,
    title: "Corte básico con tijera: línea recta",
    task: "Corta una línea recta en peluca",
    completed: false,
    duration: "40 min"
  },
  {
    id: 10,
    title: "Corte con máquina: desde arriba hacia abajo",
    task: "Haz un corte uniforme en peluca",
    completed: false,
    duration: "35 min"
  },
  {
    id: 11,
    title: "Peinado básico y secado con secador",
    task: "Peina y seca una peluca con cepillo redondo",
    completed: false,
    duration: "30 min"
  },
  {
    id: 12,
    title: "Introducción al fade: qué es y tipos (low, mid, high)",
    task: "Mira 3 ejemplos y clasifícalos",
    completed: false,
    duration: "25 min"
  },
  {
    id: 13,
    title: "Desafío Semanal: Arma tu kit de barbero",
    task: "Sube foto de tus herramientas",
    completed: false,
    duration: "45 min"
  },
  {
    id: 14,
    title: "Repaso y evaluación",
    task: "Cuestionario de 10 preguntas",
    completed: false,
    duration: "30 min"
  }
];

const CoursePhase1 = () => {
  const { lessonProgresses, completeLessson, getTotalXP, getCompletedLessons } = useLessonProgress();
  
  // Update lesson completion status based on progress
  const lessonsWithProgress = lessons.map(lesson => ({
    ...lesson,
    completed: lessonProgresses[lesson.id]?.isCompleted || false
  }));

  const completedLessons = getCompletedLessons();
  const progressPercentage = (completedLessons / lessons.length) * 100;
  const totalXP = getTotalXP();

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
              Fase 1 - Semanas 1-2
            </Badge>
            <Badge variant="secondary">
              "El Novato"
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Fundamentos de{" "}
            <span className="bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
              Barbería
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Aprende las bases esenciales: herramientas, técnicas básicas y primeros cortes. 
            Construye una base sólida para tu carrera como barbero profesional.
          </p>
          
          {/* Progress */}
          <div className="bg-card rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Progreso del curso</h3>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {completedLessons}/{lessons.length} lecciones
                </span>
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  {totalXP} XP
                </Badge>
              </div>
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
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">
                  🏆 Logro: "Primer Corte"
                </h3>
                <p className="text-muted-foreground mb-2">
                  Completa todas las lecciones de esta fase para desbloquear tu primera insignia 
                  y acceder a técnicas más avanzadas.
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {completedLessons}/{lessons.length} lecciones
                  </Badge>
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    {totalXP} XP ganados
                  </Badge>
                  {completedLessons === lessons.length && (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      ¡Desbloqueado!
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button variant="outline" disabled>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Fase Anterior
          </Button>
          <Link to="/curso/fase-2">
            <Button variant="hero" disabled={completedLessons < lessons.length}>
              Siguiente Fase
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CoursePhase1;