import { Truck, Shield, Headphones, RotateCcw } from 'lucide-react';

const benefits = [
  {
    icon: Truck,
    title: 'Envío Rápido',
    description: 'Entrega en 24-48h en pedidos realizados antes de las 14:00h'
  },
  {
    icon: Headphones,
    title: 'Soporte 24/7',
    description: 'Nuestro equipo está disponible para ayudarte en todo momento'
  }
];

export function BenefitsSection() {
  return (
    <section className="bg-card py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-xl mb-4">
                <benefit.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
