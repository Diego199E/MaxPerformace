import { Link } from 'react-router-dom';
import { ArrowRight, BatteryFull, Dumbbell, Pill, Zap, Apple, Cookie, Flame, BicepsFlexed } from 'lucide-react';
import { useCategories } from '@/hooks/useProducts';

const categoryIcons: Record<string, React.ReactNode> = {
  'proteinas': <Dumbbell className="h-8 w-8" />,
  'creatinas': <BatteryFull className="h-8 w-8" />,
  'aminoacidos': <Pill className="h-8 w-8" />,
  'pre-entreno': <Zap className="h-8 w-8" />,
  'vitaminas': <Apple className="h-8 w-8" />,
  'snacks': <Cookie className="h-8 w-8" />,
  'quemadores': <Flame className="h-8 w-8" />,
  'ganadores': <BicepsFlexed className="h-8 w-8" />,
};

export function CategorySection() {
  const { data: categories, isLoading } = useCategories();

  if (isLoading) {
    return (
      <section className="container-custom py-16">
        <h2 className="section-title text-center mb-12">Categorías</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="category-card aspect-square animate-pulse">
              <div className="p-6 flex flex-col items-center justify-center h-full">
                <div className="w-12 h-12 bg-muted rounded-full mb-3" />
                <div className="w-20 h-4 bg-muted rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="container-custom py-16">
      <div className="flex items-center justify-between mb-12">
        <h2 className="section-title">Categorías</h2>
        <Link 
          to="/productos" 
          className="hidden md:flex items-center gap-2 text-primary hover:underline font-medium"
        >
          Ver todas
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link 
            key={category.id}
            to={`/productos/${category.slug}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="category-card aspect-square group"
          >
            <div className="p-6 flex flex-col items-center justify-center h-full text-center">
              <div className="text-primary mb-3 transition-transform group-hover:scale-110">
                {categoryIcons[category.slug] || <Dumbbell className="h-8 w-8" />}
              </div>
              <h3 className="font-semibold text-sm md:text-base">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
