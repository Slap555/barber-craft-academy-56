import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, Award } from "lucide-react";
import instructor1 from "@/assets/instructor-1.jpg";
import instructor2 from "@/assets/instructor-2.jpg";
import instructor3 from "@/assets/instructor-3.jpg";

const instructors = [
  {
    id: 1,
    name: "Carlos Mendoza",
    specialty: "Especialista en Corte Clásico",
    experience: "15 años",
    image: instructor1,
    rating: 4.9,
    students: 3200,
    description: "Master barber con certificaciones internacionales. Especializado en técnicas tradicionales y modernas de corte.",
    achievements: ["Certificado por la International Barber Association", "Ganador del Torneo Nacional de Barbería 2023", "+15 años en salones premium"]
  },
  {
    id: 2,
    name: "Sofia Rodriguez",
    specialty: "Artista en Diseño de Barbas",
    experience: "12 años",
    image: instructor2,
    rating: 4.8,
    students: 2800,
    description: "Pionera en diseños artísticos de barbas. Creadora de técnicas innovadoras en estilismo masculino contemporáneo.",
    achievements: ["Fundadora de StyleBeard Academy", "Colaboradora en revistas especializadas", "Mentora de +500 barberos"]
  },
  {
    id: 3,
    name: "Antonio Vásquez",
    specialty: "Maestro en Afeitado con Navaja",
    experience: "20 años",
    image: instructor3,
    rating: 5.0,
    students: 1900,
    description: "Heredero de una tradición familiar de 3 generaciones en barbería. Experto en técnicas tradicionales de afeitado.",
    achievements: ["3ra Generación de barberos", "Restaurador de navajas antiguas", "Consultor en técnicas tradicionales"]
  }
];

const Instructors = () => {
  return (
    <section id="instructors" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
            Nuestros Instructores
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Aprende de los{" "}
            <span className="bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
              Mejores Profesionales
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nuestro equipo está formado por barberos con décadas de experiencia, 
            reconocimientos internacionales y miles de estudiantes formados exitosamente.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {instructors.map((instructor) => (
            <Card key={instructor.id} className="overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="relative">
                <img 
                  src={instructor.image} 
                  alt={instructor.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">{instructor.rating}</span>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl">{instructor.name}</CardTitle>
                <CardDescription className="text-primary font-semibold">
                  {instructor.specialty}
                </CardDescription>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    {instructor.experience} exp.
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {instructor.students}+ estudiantes
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {instructor.description}
                </p>

                <div className="space-y-2 mb-6">
                  <h4 className="font-semibold text-sm">Logros destacados:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {instructor.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-2 flex-shrink-0"></div>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button variant="outline" className="w-full">
                  Ver Perfil Completo
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            ¿Quieres conocer a todo nuestro equipo de expertos?
          </p>
          <Button variant="hero" size="lg">
            Conocer Todos los Instructores
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Instructors;