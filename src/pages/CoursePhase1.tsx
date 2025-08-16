import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, Clock, Trophy, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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
  const completedLessons = lessons.filter(lesson => lesson.completed).length;
  const progressPercentage = (completedLessons / lessons.length) * 100;

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
          {lessons.map((lesson, index) => (
            <Card 
              key={lesson.id} 
              className={`transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
                lesson.completed ? 'bg-primary/5 border-primary/30' : ''
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {lesson.completed ? (
                        <CheckCircle className="w-5 h-5 text-primary" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground" />
                      )}
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
                    variant={lesson.completed ? "secondary" : "default"}
                    size="sm"
                  >
                    {lesson.completed ? "Completada" : "Comenzar"}
                  </Button>
                </div>
              </CardHeader>
            </Card>
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
                  🏆 Logro: "Primer Corte"
                </h3>
                <p className="text-muted-foreground">
                  Completa todas las lecciones de esta fase para desbloquear tu primera insignia 
                  y acceder a técnicas más avanzadas.
                </p>
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

export default CoursePhase1;