import { useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ProductGrid } from '@/components/products/ProductGrid';
import { useProducts, useCategories } from '@/hooks/useProducts';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function Products() {
  const { category } = useParams<{ category?: string }>();
  const { data: products, isLoading } = useProducts(category);
  const { data: categories } = useCategories();

  const currentCategory = categories?.find(c => c.slug === category);

  return (
    <Layout>
      <div className="container-custom py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Inicio</Link>
          <span className="mx-2">/</span>
          <Link to="/productos" className="hover:text-primary">Productos</Link>
          {currentCategory && (
            <>
              <span className="mx-2">/</span>
              <span className="text-foreground">{currentCategory.name}</span>
            </>
          )}
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="section-title mb-2">
            {currentCategory ? currentCategory.name : 'Todos los Productos'}
          </h1>
          {currentCategory?.description && (
            <p className="text-muted-foreground">{currentCategory.description}</p>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            to="/productos"
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              !category 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary text-secondary-foreground hover:bg-muted"
            )}
          >
            Todos
          </Link>
          {categories?.map((cat) => (
            <Link
              key={cat.id}
              to={`/productos/${cat.slug}`}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                category === cat.slug 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              )}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Products Grid */}
        <ProductGrid products={products || []} loading={isLoading} />
      </div>
    </Layout>
  );
}
