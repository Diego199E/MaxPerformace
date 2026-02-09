import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Package, Check } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    shipping_address: '',
    notes: '',
  });

  const [orderComplete, setOrderComplete] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Genera mensaje para WhatsApp
  const generateWhatsAppMessage = (items, formData) => {
    let message = `¡Hola! Quiero realizar un pedido:\n\n`;
    items.forEach(item => {
      const price = item.product.discounted_price ?? item.product.price;
      message += `• ${item.product.name}${item.flavor ? ` (${item.flavor.name})` : ''} x${item.quantity} = ${formatPrice(price * item.quantity)}\n`;
    });
    message += `\nSubtotal: ${formatPrice(subtotal)}\n`;
    message += `Total: ${formatPrice(subtotal)}\n\n`;
    message += `Datos del cliente:\n`;
    message += `Nombre: ${formData.customer_name}\n`;
    message += `Correo: ${formData.customer_email}\n`;
    if (formData.customer_phone) message += `Teléfono: ${formData.customer_phone}\n`;
    message += `Dirección: ${formData.shipping_address}\n`;
    if (formData.notes) message += `Notas: ${formData.notes}\n`;
    return message;
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error('Tu carrito está vacío');
      return;
    }

    // Validar campos obligatorios
    const requiredFields = ['customer_name', 'customer_email', 'shipping_address'] as const;
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error('Por favor completa todos los campos obligatorios');
        return;
      }
    }

    const message = generateWhatsAppMessage(items, formData);
    const encodedMessage = encodeURIComponent(message);

    // Número de WhatsApp (ejemplo: Colombia +57)
    const phoneNumber = '573028426828';

    // Redirige a WhatsApp
    window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`, '_blank');

    // Marca el pedido como completo localmente
    setOrderComplete(true);
    clearCart();
    toast.success('Redirigiendo a WhatsApp...');
  };

  if (orderComplete) {
    return (
      <Layout>
        <div className="container-custom py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-4">¡Pedido Preparado!</h1>
            <p className="text-muted-foreground mb-2">
              Serás redirigido a WhatsApp para completar tu pedido.
            </p>
            <Button variant="hero" asChild>
              <Link to="/productos">Seguir Comprando</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container-custom py-16">
          <div className="max-w-md mx-auto text-center">
            <ShoppingBag className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
            <p className="text-muted-foreground mb-6">
              Añade productos a tu carrito para realizar un pedido.
            </p>
            <Button variant="hero" asChild>
              <Link to="/productos">Ver Productos</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-8 md:py-12">
        <Link
          to="/productos"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Seguir comprando
        </Link>

        <h1 className="section-title mb-8">Finalizar Compra</h1>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-card p-6 rounded-xl shadow-card">
                <h2 className="text-lg font-semibold mb-4">Datos de Contacto</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="customer_name">Nombre completo *</Label>
                    <Input
                      id="customer_name"
                      name="customer_name"
                      value={formData.customer_name}
                      onChange={handleInputChange}
                      required
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customer_email">Correo electrónico *</Label>
                    <Input
                      id="customer_email"
                      name="customer_email"
                      type="email"
                      value={formData.customer_email}
                      onChange={handleInputChange}
                      required
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customer_phone">Teléfono</Label>
                    <Input
                      id="customer_phone"
                      name="customer_phone"
                      type="tel"
                      value={formData.customer_phone}
                      onChange={handleInputChange}
                      placeholder="+57 300 123 4567"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-xl shadow-card">
                <h2 className="text-lg font-semibold mb-4">Dirección de Envío *</h2>
                <Textarea
                  id="shipping_address"
                  name="shipping_address"
                  value={formData.shipping_address}
                  onChange={handleInputChange}
                  required
                  placeholder="Calle, número, piso, código postal, ciudad"
                  rows={3}
                />
              </div>

              <div className="bg-card p-6 rounded-xl shadow-card">
                <h2 className="text-lg font-semibold mb-4">Notas del Pedido (opcional)</h2>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Añade cualquier instrucción especial"
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="w-full"
              >
                Confirmar Pedido - {formatPrice(subtotal)}
              </Button>
            </form>
          </div>

          <div>
            <div className="bg-card p-6 rounded-xl shadow-card sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Resumen del Pedido</h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => {
                  const price = item.product.discounted_price ?? item.product.price;
                  const key = `${item.product.id}-${item.flavor?.id || 'no-flavor'}`;

                  return (
                    <div key={key} className="flex gap-4">
                      <div className="w-16 h-16 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                        {item.product.image_url ? (
                          <img
                            src={item.product.image_url}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">{item.product.name}</h3>
                        {item.flavor && (
                          <p className="text-xs text-primary">Sabor: {item.flavor.name}</p>
                        )}
                        <p className="text-sm text-muted-foreground">
                          {item.quantity} x {formatPrice(price)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatPrice(price * item.quantity)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(subtotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
