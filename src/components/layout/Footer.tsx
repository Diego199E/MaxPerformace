import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import { FaTiktok, FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div>
                <img
                  src="/logo.png"
                  alt="Max Performance"
                  className="h-12 w-12 object-contain rounded-lg"
                />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Max<span className="text-primary">Performance</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Tu tienda de confianza para suplementos y productos fitness de la más alta calidad.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/productos" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Productos
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Mi Carrito
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="h-4 w-4 text-primary" />
                coachcarlosram@gmail.com
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Phone className="h-4 w-4 text-primary" />
                +57 302 8426828
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <a
                  href="https://api.whatsapp.com/send?phone=573028426828"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <FaWhatsapp className="h-4 w-4 text-primary" />
                  +57 302 8426828
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Síguenos</h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/maxperformance07/"
                target="_blank"
                className="p-2 bg-secondary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                className="p-2 bg-secondary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF className="h-6 w-6" />
              </a>
              <a
                href="https://www.tiktok.com/es-419/"
                target="_blank"
                className="p-2 bg-secondary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <FaTiktok className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} Max Performance. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
