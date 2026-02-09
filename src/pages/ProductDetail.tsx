import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Package, Check, AlertCircle, Minus, Plus } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useProduct, useProductFlavors } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';
import { ProductFlavor } from '@/types/database';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading } = useProduct(slug || '');
  const { data: flavors } = useProductFlavors(product?.id || '');
  const { addToCart, setIsOpen } = useCart();
  
  const [selectedFlavor, setSelectedFlavor] = useState<ProductFlavor | null>(null);
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return (
      <Layout>
        <div className="container-custom py-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-square bg-secondary rounded-xl animate-pulse" />
            <div className="space-y-4">
              <div className="h-4 bg-secondary rounded w-1/4 animate-pulse" />
              <div className="h-8 bg-secondary rounded w-3/4 animate-pulse" />
              <div className="h-6 bg-secondary rounded w-1/2 animate-pulse" />
              <div className="h-24 bg-secondary rounded animate-pulse" />
              <div className="h-12 bg-secondary rounded w-full animate-pulse" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Producto no encontrado</h1>
          <p className="text-muted-foreground mb-6">El producto que buscas no existe o ya no está disponible.</p>
          <Button asChild>
            <Link to="/productos">Ver todos los productos</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const hasDiscount = product.discounted_price !== null && product.discounted_price < product.price;
  const currentPrice = product.discounted_price ?? product.price;
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const needsFlavor = product.has_flavors && flavors && flavors.length > 0;
  const canAddToCart = !isOutOfStock && (!needsFlavor || selectedFlavor);

  const handleAddToCart = () => {
    if (!canAddToCart) return;
    addToCart(product, quantity, selectedFlavor || undefined);
    setIsOpen(true);
  };

  const getFlavorStock = () => {
    if (selectedFlavor) {
      return selectedFlavor.stock;
    }
    return product.stock;
  };

  const stockCount = getFlavorStock();

  return (
    <Layout>
      <div className="container-custom py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Inicio</Link>
          <span className="mx-2">/</span>
          <Link to="/productos" className="hover:text-primary">Productos</Link>
          {product.category && (
            <>
              <span className="mx-2">/</span>
              <Link to={`/productos/${product.category.slug}`} className="hover:text-primary">
                {product.category.name}
              </Link>
            </>
          )}
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="relative aspect-square bg-card rounded-xl overflow-hidden shadow-card">
            {product.image_url ? (
              <img 
                src={product.image_url} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="h-32 w-32 text-muted-foreground" />
              </div>
            )}
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {hasDiscount && (
                <Badge variant="sale" className="text-sm px-3 py-1">
                  -{Math.round((1 - product.discounted_price! / product.price) * 100)}% OFF
                </Badge>
              )}
              {product.is_featured && (
                <Badge variant="featured" className="text-sm px-3 py-1">
                  Destacado
                </Badge>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Brand */}
            <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
              {product.brand}
            </p>

            {/* Name */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-primary">
                {formatPrice(currentPrice)}
              </span>
              {hasDiscount && (
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {stockCount <= 0 ? (
                <div className="stock-unavailable">
                  <AlertCircle className="h-4 w-4" />
                  <span>Sin stock disponible</span>
                </div>
              ) : stockCount <= 5 ? (
                <div className="stock-low">
                  <AlertCircle className="h-4 w-4" />
                  <span>¡Solo quedan {stockCount} unidades!</span>
                </div>
              ) : (
                <div className="stock-available">
                  <Check className="h-4 w-4" />
                  <span>En stock - Envío en 24-48h</span>
                </div>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Descripción</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Flavor Selector */}
            {needsFlavor && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Selecciona un sabor</h3>
                <div className="flex flex-wrap gap-2">
                  {flavors.map((flavor) => (
                    <button
                      key={flavor.id}
                      onClick={() => setSelectedFlavor(flavor)}
                      disabled={flavor.stock <= 0}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedFlavor?.id === flavor.id
                          ? 'bg-primary text-primary-foreground'
                          : flavor.stock <= 0
                          ? 'bg-secondary text-muted-foreground opacity-50 cursor-not-allowed'
                          : 'bg-secondary text-secondary-foreground hover:bg-muted'
                      }`}
                    >
                      {flavor.name}
                      {flavor.stock <= 0 && ' (Agotado)'}
                    </button>
                  ))}
                </div>
                {!selectedFlavor && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Por favor selecciona un sabor para continuar
                  </p>
                )}
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Cantidad</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => setQuantity(q => Math.min(stockCount, q + 1))}
                    disabled={quantity >= stockCount}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-muted-foreground text-sm">
                  {stockCount} disponibles
                </span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button 
              variant="hero" 
              size="xl" 
              className="w-full gap-3"
              disabled={!canAddToCart}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5" />
              {isOutOfStock 
                ? 'Sin Stock' 
                : needsFlavor && !selectedFlavor 
                ? 'Selecciona un Sabor' 
                : `Añadir al Carrito - ${formatPrice(currentPrice * quantity)}`
              }
            </Button>

            {/* Category */}
            {product.category && (
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Categoría:{' '}
                  <Link 
                    to={`/productos/${product.category.slug}`}
                    className="text-primary hover:underline"
                  >
                    {product.category.name}
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
