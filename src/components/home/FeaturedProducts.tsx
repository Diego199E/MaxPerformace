import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useFeaturedProducts } from '@/hooks/useProducts';
import { ProductGrid } from '@/components/products/ProductGrid';

export function FeaturedProducts() {
  const { data: products, isLoading } = useFeaturedProducts();

  return (
    <section className="container-custom py-16">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="section-title mb-2">Productos Destacados</h2>
          <p className="text-muted-foreground">Los favoritos de nuestros clientes</p>
        </div>
        <Link 
          to="/productos" 
          className="hidden md:flex items-center gap-2 text-primary hover:underline font-medium"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Ver todos
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <ProductGrid products={products || []} loading={isLoading} />
    </section>
  );
}
