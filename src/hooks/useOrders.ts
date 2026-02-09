import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { CartItem, OrderItem } from '@/types/database';

interface CreateOrderData {
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  shipping_address: string;
  notes?: string;
}

export function useCreateOrder() {
  return useMutation({
    mutationFn: async ({ orderData, cartItems }: { orderData: CreateOrderData; cartItems: CartItem[] }) => {
      const items: OrderItem[] = cartItems.map(item => ({
        product_id: item.product.id,
        product_name: item.product.name,
        flavor: item.flavor?.name,
        quantity: item.quantity,
        unit_price: item.product.discounted_price ?? item.product.price,
        total: (item.product.discounted_price ?? item.product.price) * item.quantity,
      }));

      const subtotal = items.reduce((sum, item) => sum + item.total, 0);

      const { data, error } = await supabase
        .from('orders')
        .insert({
          customer_name: orderData.customer_name,
          customer_email: orderData.customer_email,
          customer_phone: orderData.customer_phone,
          shipping_address: orderData.shipping_address,
          notes: orderData.notes,
          items: JSON.stringify(items),
          subtotal,
          total: subtotal,
          status: 'pending',
        })
        .select()
        .single();
        

      if (error) throw error;
      return data;
    },
  });
}
