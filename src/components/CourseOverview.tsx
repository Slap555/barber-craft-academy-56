import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Users, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const phases = [
  {
    id: 1,
    title: "Fundamentos",
    subtitle: "El Novato",
    duration: "Semanas 1-2",
    lessons: 14,
    description: "Herramientas básicas, tipos de cabello, primeros cortes",
    color: "bg-green-500/10 text-green-500",
    route: "/curso/fase-1"
  },
  {
    id: 2,
    title: "Técnicas Básicas", 
    subtitle: "El Aprendiz",
    duration: "Semanas 3-5",
    lessons: 14,
    description: "Fades básicos, afeitado con navaja, peinados clásicos",
    color: "bg-blue-500/10 text-blue-500",
    route: "/curso/fase-2"
  },
  {
    id: 3,
    title: "Dominio Técnico",
    subtitle: "Barbián", 
    duration: "Semanas 6-8",
    lessons: 14,
    description: "Skin fades, diseños artísticos, atención al cliente",
    color: "bg-purple-500/10 text-purple-500",
    route: "/curso/fase-3"
  },
  {
    id: 4,
    title: "Avanzado y Estilo",
    subtitle: "Experto",
    duration: "Semanas 9-10", 
    lessons: 14,
    description: "Diseños complejos, estilos únicos, velocidad profesional",
    color: "bg-orange-500/10 text-orange-500",
    route: "/curso/fase-4"
  },
  {
    id: 5,
    title: "Profesionalización",
    subtitle: "Maestro Barbero",
    duration: "Semanas 11-12",
    lessons: 14,
    description: "Negocio, marketing, certificación profesional",
    color: "bg-primary/10 text-primary",
    route: "/curso/fase-5"
  }
];

const CourseOverview = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
            Ruta de Aprendizaje
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Tu Camino de{" "}
            <span className="bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
              Novato a Maestro
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nuestro programa estructurado te lleva desde cero conocimiento hasta convertirte 
            en un barbero profesional certificado en solo 12 semanas.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">70 Lecciones</h3>
            <p className="text-muted-foreground">Contenido estructurado paso a paso</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">12 Semanas</h3>
            <p className="text-muted-foreground">Programa intensivo y efectivo</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">5+ Insignias</h3>
            <p className="text-muted-foreground">Logros que validan tu progreso</p>
          </div>
        </div>

        {/* Phases Grid */}
        <div className="grid gap-8 max-w-4xl mx-auto">
          {phases.map((phase, index) => (
            <Card key={phase.id} className="relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
              <div className={`absolute top-0 left-0 w-2 h-full ${phase.color.replace('/10 text-', '/100 bg-')}`}></div>
              
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={phase.color}>
                        Fase {phase.id}
                      </Badge>
                      <Badge variant="outline">
                        {phase.duration}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl mb-2">
                      {phase.title}
                    </CardTitle>
                    <p className="text-lg text-primary font-semibold mb-2">
                      "{phase.subtitle}"
                    </p>
                    <p className="text-muted-foreground">
                      {phase.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {phase.lessons}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      lecciones
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex justify-between items-center">
                  <div className="flex-1 mr-4">
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>Progreso</span>
                      <span>0/{phase.lessons}</span>
                    </div>
                    <Progress value={0} />
                  </div>
                  <Link to={phase.route}>
                    <Button variant="outline" size="sm">
                      Comenzar
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/curso/fase-1">
            <Button variant="hero" size="lg">
              Comenzar Mi Formación Ahora
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CourseOverview;