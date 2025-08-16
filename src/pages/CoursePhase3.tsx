import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, Clock, Trophy, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const lessons = [
  {
    id: 29,
    title: "High fade con línea nítida",
    task: "Haz un high fade con línea marcada",
    completed: false,
    duration: "55 min"
  },
  {
    id: 30,
    title: "Skin fade: transición a piel",
    task: "Practica hasta llegar a 'skin' sin errores",
    completed: false,
    duration: "60 min"
  },
  {
    id: 31,
    title: "Diseño artístico en barba (líneas geométricas)",
    task: "Dibuja una cruz o línea diagonal",
    completed: false,
    duration: "45 min"
  },
  {
    id: 32,
    title: "Corte bajo con textura superior",
    task: "Combina máquina baja + tijera texturizada",
    completed: false,
    duration: "50 min"
  },
  {
    id: 33,
    title: "Peinados modernos: quiff, undercut",
    task: "Reproduce un undercut limpio",
    completed: false,
    duration: "45 min"
  },
  {
    id: 34,
    title: "Afeitado completo con navaja (cuello, bigote)",
    task: "Simula todo el proceso paso a paso",
    completed: false,
    duration: "50 min"
  },
  {
    id: 35,
    title: "Uso de productos: pomadas, ceras, aceites",
    task: "Aplica productos en peinado terminado",
    completed: false,
    duration: "30 min"
  },
  {
    id: 36,
    title: "Atención al cliente: escuchar necesidades",
    task: "Haz un role-play: '¿Qué estilo quieres?'",
    completed: false,
    duration: "25 min"
  },
  {
    id: 37,
    title: "Manejo de reclamaciones: 'me cortaste mal'",
    task: "Escribe tu respuesta profesional",
    completed: false,
    duration: "20 min"
  },
  {
    id: 38,
    title: "Técnicas de vender servicios adicionales",
    task: "Propón un afeitado + diseño de barba",
    completed: false,
    duration: "25 min"
  },
  {
    id: 39,
    title: "Corte para diferentes formas de rostro",
    task: "Ajusta estilo según forma de cara",
    completed: false,
    duration: "40 min"
  },
  {
    id: 40,
    title: "Desafío: Corte + afeitado + diseño en 45 min",
    task: "Cronometra tu práctica",
    completed: false,
    duration: "45 min"
  },
  {
    id: 41,
    title: "Repaso de errores comunes",
    task: "Identifica 3 errores en un video",
    completed: false,
    duration: "30 min"
  },
  {
    id: 42,
    title: "Evaluación técnica",
    task: "Cuestionario + envío de trabajo práctico",
    completed: false,
    duration: "40 min"
  }
];

const CoursePhase3 = () => {
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
              Fase 3 - Semanas 6-8
            </Badge>
            <Badge variant="secondary">
              "Barbián"
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Dominio{" "}
            <span className="bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
              Técnico
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Perfecciona técnicas, aprende estilos avanzados y desarrolla habilidades de atención al cliente. 
            Prepárate para trabajar con confianza en cualquier barbershop.
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
                  🧔 Logro: "Barbero de Confianza"
                </h3>
                <p className="text-muted-foreground">
                  Domina técnicas avanzadas y habilidades de atención al cliente. 
                  Ahora puedes manejar cualquier solicitud con profesionalismo.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link to="/curso/fase-2">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Fase Anterior
            </Button>
          </Link>
          <Link to="/curso/fase-4">
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

export default CoursePhase3;