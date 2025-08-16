import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, Clock, Trophy, ArrowLeft, Download } from "lucide-react";
import { Link } from "react-router-dom";

const lessons = [
  {
    id: 57,
    title: "Cómo abrir tu barbería: pasos legales",
    task: "Haz una lista de requisitos en tu país",
    completed: false,
    duration: "40 min"
  },
  {
    id: 58,
    title: "Costos, precios y rentabilidad",
    task: "Calcula precio de un corte con ganancia",
    completed: false,
    duration: "35 min"
  },
  {
    id: 59,
    title: "Marketing: redes sociales para barberos",
    task: "Crea un post para Instagram",
    completed: false,
    duration: "30 min"
  },
  {
    id: 60,
    title: "Cómo tomar buenas fotos de tus trabajos",
    task: "Edita una foto de corte con luz natural",
    completed: false,
    duration: "25 min"
  },
  {
    id: 61,
    title: "Atención al cliente VIP",
    task: "Simula servicio premium (café, revista)",
    completed: false,
    duration: "30 min"
  },
  {
    id: 62,
    title: "Corte express (20 minutos)",
    task: "Haz un corte rápido sin perder calidad",
    completed: false,
    duration: "20 min"
  },
  {
    id: 63,
    title: "Mantenimiento de herramientas",
    task: "Limpia y afila tijeras (simulado o real)",
    completed: false,
    duration: "25 min"
  },
  {
    id: 64,
    title: "Certificación: envío del portafolio",
    task: "Sube 5 trabajos terminados",
    completed: false,
    duration: "60 min"
  },
  {
    id: 65,
    title: "Entrevista de trabajo: preguntas clave",
    task: "Practica tu discurso: 'Soy barbero porque...'",
    completed: false,
    duration: "30 min"
  },
  {
    id: 66,
    title: "Networking con otros barberos",
    task: "Únete a un grupo o foro",
    completed: false,
    duration: "20 min"
  },
  {
    id: 67,
    title: "Desafío final: corte + afeitado + diseño + foto",
    task: "Entrega proyecto completo",
    completed: false,
    duration: "90 min"
  },
  {
    id: 68,
    title: "Retroalimentación personalizada",
    task: "Recibe evaluación de experto (real o simulada)",
    completed: false,
    duration: "45 min"
  },
  {
    id: 69,
    title: "Tu marca personal: nombre, logo, estilo",
    task: "Diseña tu nombre de barbero",
    completed: false,
    duration: "40 min"
  },
  {
    id: 70,
    title: "Graduación: ¡Eres Barbián Profesional!",
    task: "Recibe certificado digital",
    completed: false,
    duration: "30 min"
  }
];

const CoursePhase5 = () => {
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
              Fase 5 - Semanas 11-12
            </Badge>
            <Badge variant="secondary">
              "Maestro Barbero"
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Profesionalización{" "}
            <span className="bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
              Total
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Prepárate para trabajar, abrir tu negocio o conseguir empleo. Desarrolla tu marca personal, 
            aprende marketing y obtén tu certificación oficial como Barbero Profesional.
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
              } ${lesson.id === 70 ? 'ring-2 ring-primary/50' : ''}`}
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
                        {lesson.id === 70 && (
                          <Badge className="bg-primary text-primary-foreground text-xs">
                            Graduación
                          </Badge>
                        )}
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
                    variant={lesson.completed ? "secondary" : lesson.id === 70 ? "hero" : "default"}
                    size="sm"
                  >
                    {lesson.completed ? "Completada" : lesson.id === 70 ? "Graduarse" : "Comenzar"}
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Final Achievement Card */}
        <Card className="bg-gradient-to-r from-primary/20 to-primary/10 border-primary/50 mb-8">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-12 h-12 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                🎓 Certificado: "Barbero Profesional – Barber Academy"
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Al completar todas las fases, recibirás tu certificado oficial que valida tus habilidades 
                como Barbero Profesional. Este documento te abrirá las puertas a oportunidades laborales 
                en los mejores salones o te permitirá abrir tu propio negocio con confianza.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg">
                  <Download className="w-5 h-5 mr-2" />
                  Descargar Certificado
                </Button>
                <Button variant="outline" size="lg">
                  Compartir Logro
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Premium Extension */}
        <Card className="bg-gradient-to-r from-gold/10 to-gold/5 border-gold/30 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">💎</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Mes de Práctica Real (Premium)
                </h3>
                <p className="text-muted-foreground mb-4">
                  Lleva tu formación al siguiente nivel con mentoría personalizada, clientes reales 
                  y soporte continuo durante tu primer mes como barbero profesional.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                      1 cliente real por semana
                    </div>
                    <div className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                      Mentoría virtual personalizada
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                      Soporte técnico continuo
                    </div>
                    <div className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                      Actualizaciones mensuales
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Button variant="hero" className="w-full md:w-auto">
                Acceder a Premium
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link to="/curso/fase-4">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Fase Anterior
            </Button>
          </Link>
          <Link to="/">
            <Button variant="secondary">
              Volver al Inicio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CoursePhase5;