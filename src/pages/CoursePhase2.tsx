import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, Clock, Trophy, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const lessons = [
  {
    id: 15,
    title: "Fade bajo (low fade): paso a paso",
    task: "Haz un low fade en peluca",
    completed: false,
    duration: "45 min"
  },
  {
    id: 16,
    title: "Transición suave: cómo graduar",
    task: "Usa 3 guardas diferentes en una línea",
    completed: false,
    duration: "40 min"
  },
  {
    id: 17,
    title: "Corte con tijera en seco vs. mojado",
    task: "Compara ambos métodos",
    completed: false,
    duration: "35 min"
  },
  {
    id: 18,
    title: "Peinados clásicos: pompadour básico",
    task: "Reproduce un pompadour en peluca",
    completed: false,
    duration: "50 min"
  },
  {
    id: 19,
    title: "Afeitado con navaja: seguridad y ángulo",
    task: "Practica movimientos en gel (sin piel)",
    completed: false,
    duration: "30 min"
  },
  {
    id: 20,
    title: "Preparación para afeitar: vapor, toalla caliente",
    task: "Simula el ritual de afeitado",
    completed: false,
    duration: "25 min"
  },
  {
    id: 21,
    title: "Primer afeitado básico (mejillas)",
    task: "Afeita zona segura en piel sintética",
    completed: false,
    duration: "40 min"
  },
  {
    id: 22,
    title: "Diseño de barba: líneas limpias",
    task: "Dibuja contornos con navaja en espuma",
    completed: false,
    duration: "35 min"
  },
  {
    id: 23,
    title: "Uso de la cuchilla de precisión",
    task: "Limpia líneas en cuello y sienes",
    completed: false,
    duration: "30 min"
  },
  {
    id: 24,
    title: "Corte en capas con tijera",
    task: "Haz capas ligeras en peluca",
    completed: false,
    duration: "45 min"
  },
  {
    id: 25,
    title: "Fade medio (mid fade)",
    task: "Completa un mid fade limpio",
    completed: false,
    duration: "50 min"
  },
  {
    id: 26,
    title: "Estilo texturizado con tijera de desfilado",
    task: "Texturiza la parte superior",
    completed: false,
    duration: "40 min"
  },
  {
    id: 27,
    title: "Desafío: Haz un corte completo (cabello + barba)",
    task: "Sube video o fotos del proceso",
    completed: false,
    duration: "60 min"
  },
  {
    id: 28,
    title: "Repaso y retroalimentación",
    task: "Recibe correcciones automáticas",
    completed: false,
    duration: "30 min"
  }
];

const CoursePhase2 = () => {
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
              Fase 2 - Semanas 3-5
            </Badge>
            <Badge variant="secondary">
              "El Aprendiz"
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Técnicas{" "}
            <span className="bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
              Básicas
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Domina cortes básicos, primeros fades y afeitado suave. Desarrolla la coordinación 
            y precisión necesarias para trabajos más complejos.
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
                  ✂️ Logro: "Primer Fade"
                </h3>
                <p className="text-muted-foreground">
                  Domina las técnicas de fade y afeitado básico para desbloquear técnicas avanzadas 
                  y herramientas de precisión profesional.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link to="/curso/fase-1">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Fase Anterior
            </Button>
          </Link>
          <Link to="/curso/fase-3">
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

export default CoursePhase2;