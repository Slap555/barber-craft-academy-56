import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star, Play } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Corte de Cabello Clásico",
    subtitle: "Tijera y Máquina",
    duration: "4 semanas",
    level: "Principiante",
    students: 1250,
    rating: 4.9,
    price: "$89",
    monthlyPrice: "$29",
    description: "Domina las técnicas fundamentales de corte con tijera y máquina. Aprende a crear los estilos clásicos más solicitados.",
    modules: ["Fundamentos del corte", "Técnicas con tijera", "Uso de máquinas", "Acabados profesionales"]
  },
  {
    id: 2,
    title: "Afeitado con Navaja",
    subtitle: "Cuidado del Rostro",
    duration: "3 semanas",
    level: "Intermedio",
    students: 890,
    rating: 4.8,
    price: "$119",
    monthlyPrice: "$39",
    description: "Aprende el arte tradicional del afeitado con navaja. Técnicas de preparación, afeitado y cuidado post-afeitado.",
    modules: ["Historia de la navaja", "Preparación de la piel", "Técnicas de afeitado", "Productos y cuidados"]
  },
  {
    id: 3,
    title: "Diseño de Barbas Artísticas",
    subtitle: "Detalles y Tendencias",
    duration: "5 semanas",
    level: "Avanzado",
    students: 675,
    rating: 4.9,
    price: "$149",
    monthlyPrice: "$49",
    description: "Crea diseños únicos y artísticos en barbas. Desde lo clásico hasta las últimas tendencias en estilismo masculino.",
    modules: ["Análisis facial", "Diseños clásicos", "Tendencias actuales", "Herramientas especializadas", "Técnicas artísticas"]
  },
  {
    id: 4,
    title: "Estilismo Masculino Moderno",
    subtitle: "Tendencias Actuales",
    duration: "2 semanas",
    level: "Intermedio",
    students: 1050,
    rating: 4.7,
    price: "$69",
    monthlyPrice: "$24",
    description: "Mantente actualizado con las últimas tendencias en peinados masculinos y técnicas de estilizado moderno.",
    modules: ["Tendencias 2024", "Productos de peinado", "Técnicas modernas", "Personalización por tipo de rostro"]
  },
  {
    id: 5,
    title: "Curso Completo de Barbería",
    subtitle: "Certificación Profesional",
    duration: "12 semanas",
    level: "Completo",
    students: 2300,
    rating: 5.0,
    price: "$399",
    monthlyPrice: "$49",
    description: "El curso más completo para convertirte en barbero profesional. Incluye todos los módulos anteriores y más.",
    modules: ["Todos los cursos incluidos", "Negocio y emprendimiento", "Atención al cliente", "Marketing personal", "Certificación oficial"],
    featured: true
  }
];

const levelColors = {
  "Principiante": "bg-green-500/10 text-green-500",
  "Intermedio": "bg-yellow-500/10 text-yellow-500",
  "Avanzado": "bg-red-500/10 text-red-500",
  "Completo": "bg-primary/10 text-primary"
};

const Courses = () => {
  return (
    <section id="courses" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
            Cursos Disponibles
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Elige tu Camino hacia el{" "}
            <span className="bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
              Éxito
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nuestros cursos están diseñados por barberos profesionales con más de 15 años de experiencia. 
            Cada programa incluye certificación oficial y soporte personalizado.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {courses.map((course) => (
            <Card 
              key={course.id} 
              className={`relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                course.featured ? 'ring-2 ring-primary shadow-2xl' : ''
              }`}
            >
              {course.featured && (
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground px-3 py-1 text-sm font-semibold rounded-bl-lg">
                  Más Popular
                </div>
              )}
              
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge className={levelColors[course.level as keyof typeof levelColors]}>
                    {course.level}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-xl mb-1">{course.title}</CardTitle>
                <CardDescription className="text-primary font-semibold">
                  {course.subtitle}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {course.description}
                </p>

                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {course.students}+ estudiantes
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <h4 className="font-semibold text-sm">Módulos incluidos:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {course.modules.slice(0, 3).map((module, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                        {module}
                      </li>
                    ))}
                    {course.modules.length > 3 && (
                      <li className="text-primary text-xs">
                        +{course.modules.length - 3} módulos más
                      </li>
                    )}
                  </ul>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl font-bold text-primary">{course.price}</span>
                    <span className="text-sm text-muted-foreground">pago único</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    o {course.monthlyPrice}/mes por 3 meses
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-3">
                <Button 
                  variant={course.featured ? "hero" : "default"} 
                  className="w-full"
                  size="lg"
                  onClick={() => window.location.href = course.id === 5 ? '/curso/fase-1' : '#'}
                >
                  Inscribirse Ahora
                </Button>
                <Button variant="ghost" size="sm" className="w-full">
                  <Play className="w-4 h-4 mr-2" />
                  Ver Introducción Gratis
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Ver Todos los Cursos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Courses;