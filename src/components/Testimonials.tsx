import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Miguel Ramirez",
    role: "Barbero Independiente",
    location: "Madrid, España",
    image: "/placeholder.svg",
    rating: 5,
    text: "Después de completar el curso completo, pude abrir mi propio salón. Los instructores son increíbles y el contenido es súper práctico. En 6 meses ya estaba generando ingresos estables.",
    course: "Curso Completo de Barbería",
    outcome: "Abrió su propio salón"
  },
  {
    id: 2,
    name: "Ana Gutierrez",
    role: "Barbera Profesional",
    location: "Barcelona, España",
    image: "/placeholder.svg",
    rating: 5,
    text: "Venía del mundo de la peluquería y quería especializarme en barbería masculina. Este curso me dio todas las herramientas que necesitaba. Ahora trabajo en uno de los mejores salones de la ciudad.",
    course: "Diseño de Barbas Artísticas",
    outcome: "Cambió de carrera exitosamente"
  },
  {
    id: 3,
    name: "Roberto Silva",
    role: "Barbero Senior",
    location: "Valencia, España",
    image: "/placeholder.svg",
    rating: 5,
    text: "Llevaba años cortando pelo, pero quería perfeccionar mis técnicas. Los cursos me ayudaron a mejorar significativamente mi trabajo. Mis clientes notan la diferencia y mis ingresos han aumentado un 40%.",
    course: "Afeitado con Navaja",
    outcome: "Aumentó ingresos 40%"
  },
  {
    id: 4,
    name: "Diego Martinez",
    role: "Emprendedor",
    location: "Sevilla, España",
    image: "/placeholder.svg",
    rating: 5,
    text: "Empecé desde cero sin experiencia previa. Los instructores me guiaron paso a paso. Ahora tengo mi propia barbería y 3 empleados. La formación en negocio incluida en el curso completo fue clave.",
    course: "Curso Completo de Barbería",
    outcome: "Barbería con 3 empleados"
  },
  {
    id: 5,
    name: "Luis Herrera",
    role: "Barbero Freelance",
    location: "Bilbao, España",
    image: "/placeholder.svg",
    rating: 5,
    text: "La flexibilidad de estudiar online me permitió mantener mi trabajo mientras me formaba. En 4 meses ya estaba ofreciendo servicios de barbería los fines de semana. Ahora es mi trabajo principal.",
    course: "Corte de Cabello Clásico",
    outcome: "Transición profesional exitosa"
  },
  {
    id: 6,
    name: "Carmen López",
    role: "Estilista Profesional",
    location: "Zaragoza, España",
    image: "/placeholder.svg",
    rating: 5,
    text: "Como mujer en la industria de la barbería, encontré en Barber Academy el apoyo y la formación técnica que necesitaba. Ahora soy reconocida como una de las mejores barberas de mi ciudad.",
    course: "Estilismo Masculino Moderno",
    outcome: "Reconocimiento profesional"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
            Historias de Éxito
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Más de{" "}
            <span className="bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
              5,000 Barberos
            </span>{" "}
            Formados
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nuestros estudiantes han logrado abrir sus propios salones, conseguir empleos en barbershops premium 
            y aumentar significativamente sus ingresos. Lee sus historias reales de transformación.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="absolute top-4 right-4 text-primary/20">
                <Quote className="w-8 h-8" />
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                <div className="border-t border-border pt-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-semibold text-sm">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>

                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Curso:</span>
                      <span className="text-primary font-medium">{testimonial.course}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Resultado:</span>
                      <span className="font-medium">{testimonial.outcome}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            ¿Listo para escribir tu propia historia de éxito?
          </p>
          <Button variant="hero" size="lg">
            Comenzar Mi Formación
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;