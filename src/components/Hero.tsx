import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Users, Award, Clock } from "lucide-react";
import heroImage from "@/assets/hero-barber.jpg";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 hover:bg-primary/30">
            🏆 #1 Academia de Barbería Online
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Aprende{" "}
            <span className="bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
              Barbería Profesional
            </span>{" "}
            desde Casa
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
            Conviértete en un barbero experto con nuestros cursos online certificados. 
            Aprende de profesionales reconocidos y accede a una industria con alta demanda laboral.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">+5,000 estudiantes</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">Certificados oficiales</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">A tu ritmo</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button variant="hero" size="lg" className="text-lg" onClick={() => window.location.href = '/curso/fase-1'}>
              Ver Cursos Disponibles
            </Button>
            <Button variant="outline" size="lg" className="text-lg">
              <Play className="w-5 h-5 mr-2" />
              Prueba una Clase Gratis
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <div>
              <span className="text-2xl font-bold text-primary">95%</span>
              <br />
              Tasa de empleabilidad
            </div>
            <div>
              <span className="text-2xl font-bold text-primary">4.8</span>
              <br />
              Calificación promedio
            </div>
            <div>
              <span className="text-2xl font-bold text-primary">24/7</span>
              <br />
              Soporte disponible
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;