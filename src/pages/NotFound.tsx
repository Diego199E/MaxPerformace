import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <Layout>
      <div className="container-custom py-16 text-center">
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Página no encontrada</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <Button variant="hero" asChild>
          <Link to="/" className="gap-2">
            <Home className="h-4 w-4" />
            Volver al Inicio
          </Link>
        </Button>
      </div>
    </Layout>
  );
}
