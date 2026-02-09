import { Link } from 'react-router-dom';
import { ShoppingCart, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/database';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, setIsOpen } = useCart();
  const hasDiscount = product.discounted_price !== null && product.discounted_price < product.price;
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  const handleAddToCart = (e: React.MouseEvent) => {
    
    if (product.has_flavors) {
      // Redirect to product page to select flavor
      return;
    }
    
    addToCart(product, 1);
    setIsOpen(true);
  };

  return (
    <Link to={`/producto/${product.slug}`} className="product-card block group">
      {/* Image */}
      <div className="relative aspect-square bg-secondary overflow-hidden">
        {product.image_url ? (
          <img 
            src={product.image_url} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="h-16 w-16 text-muted-foreground" />
          </div>
        )}
        
        {/* Badges */}
        {hasDiscount && (
          <Badge variant="sale" className="absolute top-3 left-3">
            Oferta
          </Badge>
        )}
        {product.is_featured && (
          <Badge variant="featured" className="absolute top-3 right-3">
            Destacado
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
          {product.brand}
        </p>
        <h3 className="font-semibold text-sm md:text-base line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          {hasDiscount ? (
            <>
              <span className="price-current">{formatPrice(product.discounted_price!)}</span>
              <span className="price-original">{formatPrice(product.price)}</span>
            </>
          ) : (
            <span className="price-current">{formatPrice(product.price)}</span>
          )}
        </div>

        {/* Stock Status */}
        <div className="mb-3">
          {isOutOfStock ? (
            <Badge variant="outOfStock">Sin Stock</Badge>
          ) : isLowStock ? (
            <Badge variant="lowStock">Últimas {product.stock} unidades</Badge>
          ) : (
            <Badge variant="stock">En Stock</Badge>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button 
          variant="cart" 
          size="sm" 
          className="w-full gap-2"
          disabled={isOutOfStock}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4" />
          {product.has_flavors ? 'Ver Opciones' : 'Añadir al Carrito'}
        </Button>
      </div>
    </Link>
  );
}
