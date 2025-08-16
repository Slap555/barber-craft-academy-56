import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    cursos: [
      { name: "Corte Clásico", href: "#" },
      { name: "Afeitado con Navaja", href: "#" },
      { name: "Diseño de Barbas", href: "#" },
      { name: "Estilismo Moderno", href: "#" },
      { name: "Curso Completo", href: "#" }
    ],
    academia: [
      { name: "Sobre Nosotros", href: "#" },
      { name: "Nuestros Instructores", href: "#" },
      { name: "Metodología", href: "#" },
      { name: "Certificaciones", href: "#" },
      { name: "Testimonios", href: "#" }
    ],
    recursos: [
      { name: "Blog", href: "#blog" },
      { name: "Videos Gratuitos", href: "#" },
      { name: "Guías PDF", href: "#" },
      { name: "Webinars", href: "#" },
      { name: "Preguntas Frecuentes", href: "#" }
    ],
    soporte: [
      { name: "Centro de Ayuda", href: "#" },
      { name: "Contacto", href: "#contact" },
      { name: "Soporte Técnico", href: "#" },
      { name: "Términos y Condiciones", href: "#" },
      { name: "Política de Privacidad", href: "#" }
    ]
  };

  return (
    <footer id="contact" className="bg-secondary/50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 mb-16 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            ¿Listo para Comenzar tu{" "}
            <span className="bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
              Carrera en Barbería?
            </span>
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Únete a más de 5,000 estudiantes que ya han transformado su futuro profesional. 
            Comienza con una clase gratuita y descubre todo lo que puedes lograr.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Button variant="hero" size="lg" className="sm:flex-1">
              Comenzar Curso Gratuito
            </Button>
            <Button variant="outline" size="lg">
              Hablar con Asesor
            </Button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-bold text-foreground">Barber Academy</span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              La academia online líder en formación de barberos profesionales. 
              Aprende de los mejores, obtén tu certificación y transforma tu carrera.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span>contacto@barberacademy.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span>+34 900 123 456</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Madrid, España</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Cursos</h4>
            <ul className="space-y-2">
              {footerLinks.cursos.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Academia</h4>
            <ul className="space-y-2">
              {footerLinks.academia.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Recursos</h4>
            <ul className="space-y-2">
              {footerLinks.recursos.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Soporte</h4>
            <ul className="space-y-2">
              {footerLinks.soporte.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © 2024 Barber Academy. Todos los derechos reservados.
          </div>

          {/* Social Media */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Síguenos:</span>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Language/Region */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">🇪🇸 Español (España)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;