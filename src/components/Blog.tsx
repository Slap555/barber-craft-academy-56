import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Eye, ArrowRight } from "lucide-react";
import barberTools from "@/assets/barber-tools.jpg";

const blogPosts = [
  {
    id: 1,
    title: "5 Errores Comunes al Cortar Barba (y Cómo Evitarlos)",
    excerpt: "Aprende a identificar y evitar los errores más frecuentes que cometen los barberos principiantes al trabajar con barbas.",
    image: barberTools,
    category: "Técnicas",
    readTime: "5 min",
    views: "2.3k",
    date: "15 Mar 2024",
    tags: ["Principiantes", "Barbas", "Errores Comunes"]
  },
  {
    id: 2,
    title: "Cómo Afeitar con Navaja sin Cortes: Guía Completa",
    excerpt: "Domina el arte tradicional del afeitado con navaja. Técnicas de seguridad, preparación y ejecución perfecta.",
    image: "/placeholder.svg",
    category: "Afeitado",
    readTime: "8 min",
    views: "4.1k",
    date: "12 Mar 2024",
    tags: ["Navaja", "Afeitado", "Técnicas Avanzadas"]
  },
  {
    id: 3,
    title: "Productos Esenciales para un Barbero Profesional",
    excerpt: "Lista completa de herramientas, productos y accesorios que todo barbero profesional debe tener en su arsenal.",
    image: "/placeholder.svg",
    category: "Herramientas",
    readTime: "6 min",
    views: "3.7k",
    date: "10 Mar 2024",
    tags: ["Herramientas", "Productos", "Profesional"]
  },
  {
    id: 4,
    title: "Tendencias en Cortes Masculinos para 2024",
    excerpt: "Descubre los estilos y tendencias más populares en barbería para este año y cómo dominar cada técnica.",
    image: "/placeholder.svg",
    category: "Tendencias",
    readTime: "7 min",
    views: "5.2k",
    date: "8 Mar 2024",
    tags: ["Tendencias", "Cortes", "2024"]
  },
  {
    id: 5,
    title: "Cómo Empezar tu Propio Negocio de Barbería",
    excerpt: "Guía paso a paso para abrir tu barbershop: desde la planificación hasta los primeros clientes.",
    image: "/placeholder.svg",
    category: "Negocio",
    readTime: "12 min",
    views: "6.8k",
    date: "5 Mar 2024",
    tags: ["Emprendimiento", "Negocio", "Barbershop"]
  },
  {
    id: 6,
    title: "Mantenimiento y Cuidado de Herramientas de Barbería",
    excerpt: "Aprende a mantener tus tijeras, máquinas y navajas en perfecto estado para garantizar resultados profesionales.",
    image: "/placeholder.svg",
    category: "Mantenimiento",
    readTime: "4 min",
    views: "1.9k",
    date: "3 Mar 2024",
    tags: ["Mantenimiento", "Herramientas", "Cuidado"]
  }
];

const categories = [
  { name: "Todos", count: 24 },
  { name: "Técnicas", count: 8 },
  { name: "Afeitado", count: 5 },
  { name: "Herramientas", count: 6 },
  { name: "Tendencias", count: 3 },
  { name: "Negocio", count: 2 }
];

const Blog = () => {
  return (
    <section id="blog" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
            Recursos Gratuitos
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Aprende{" "}
            <span className="bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
              Gratis
            </span>{" "}
            con Nuestro Blog
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Accede a consejos profesionales, tutoriales paso a paso y las últimas tendencias en barbería. 
            Contenido nuevo cada semana creado por nuestros expertos instructores.
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={category.name === "Todos" ? "default" : "outline"}
              size="sm"
              className="rounded-full"
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl group">
              <div className="relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary/90 text-primary-foreground">
                    {post.category}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {post.views} vistas
                  </div>
                  <span>{post.date}</span>
                </div>
                <CardTitle className="text-lg leading-tight hover:text-primary transition-colors cursor-pointer">
                  {post.title}
                </CardTitle>
                <CardDescription className="leading-relaxed">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button variant="ghost" className="group w-full justify-between">
                  Leer Artículo
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            ¿Te gusta nuestro contenido? Suscríbete para recibir nuevos artículos cada semana
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Tu email aquí..."
              className="flex-1 px-4 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button variant="hero">
              Suscribirse
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;