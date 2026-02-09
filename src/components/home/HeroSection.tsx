import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="hero-gradient relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10 py-16 md:py-24 lg:py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6 animate-fade-in">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Envío gratis en pedidos +$300.000</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in">
            Potencia tu{' '}
            <span className="text-gradient">rendimiento</span>
            {' '}con los mejores suplementos
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl animate-fade-in">
            Descubre nuestra selección premium de proteínas, creatinas, pre-entrenos y más. 
            Productos de las mejores marcas para alcanzar tus objetivos fitness.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
            <Button variant="hero" size="xl" asChild>
              <Link to="/productos" className="gap-2">
                Ver Productos
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link to="/productos/proteinas">
                Explorar Proteínas
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-border/50 animate-fade-in">
            <div>
              <p className="text-2xl md:text-3xl font-bold text-primary">Variedad de</p>
              <p className="text-sm text-muted-foreground">Productos</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-primary">Variedad en</p>
              <p className="text-sm text-muted-foreground">Marcas Premium</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
