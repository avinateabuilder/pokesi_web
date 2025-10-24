import { BowlOrder } from "@/types/bowl";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface OrderSummaryProps {
  order: BowlOrder;
  onBack: () => void;
  onOrder: () => void;
}

export const OrderSummary = ({ order, onBack, onOrder }: OrderSummaryProps) => {
  const calculateTotal = () => {
    let total = order.protein?.price || 0;
    order.bases.forEach(base => {
      total += base.price;
    });
    return total;
  };

  const total = calculateTotal();

  const generateWhatsAppMessage = () => {
    let message = "🥗 *NUEVO PEDIDO - POKE SÍ* 🥗\n\n";
    
    message += `*Proteína:*\n• ${order.protein?.name} - S/${order.protein?.price}\n\n`;
    
    message += `*Bases:*\n`;
    order.bases.forEach(base => {
      message += `• ${base.name}`;
      if (base.price > 0) message += ` (+S/${base.price})`;
      message += `\n`;
    });
    
    message += `\n*Toppings:*\n`;
    order.toppings.forEach(topping => {
      message += `• ${topping.name}\n`;
    });
    
    message += `\n*Salsa:*\n• ${order.sauce?.name}\n\n`;
    
    message += `💰 *TOTAL: S/${total.toFixed(2)}*`;
    
    return encodeURIComponent(message);
  };

  const handleWhatsAppOrder = () => {
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, '_blank');
    onOrder();
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-neon-purple">
          ¡Tu Bowl Está Listo!
        </h2>
        <p className="text-sm text-neon-cyan">Revisa tu pedido y confírmalo</p>
      </div>

      <Card className="p-6 bg-card/80 border-neon-purple shadow-neon-purple">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-neon-cyan mb-2">Proteína</h3>
            <div className="flex justify-between items-center">
              <span className="text-foreground">{order.protein?.name}</span>
              <span className="text-neon-cyan font-bold">S/{order.protein?.price}</span>
            </div>
          </div>

          <Separator className="bg-border" />

          <div>
            <h3 className="text-lg font-semibold text-neon-cyan mb-2">Bases</h3>
            {order.bases.map(base => (
              <div key={base.id} className="flex justify-between items-center mb-1">
                <span className="text-foreground">{base.name}</span>
                <span className="text-neon-cyan font-bold">
                  {base.price > 0 ? `+S/${base.price}` : 'Incluido'}
                </span>
              </div>
            ))}
          </div>

          <Separator className="bg-border" />

          <div>
            <h3 className="text-lg font-semibold text-neon-cyan mb-2">Toppings</h3>
            <div className="flex flex-wrap gap-2">
              {order.toppings.map(topping => (
                <span 
                  key={topping.id}
                  className="px-3 py-1 bg-primary/20 text-primary-foreground rounded-full text-sm border border-neon-pink"
                >
                  {topping.name}
                </span>
              ))}
            </div>
          </div>

          <Separator className="bg-border" />

          <div>
            <h3 className="text-lg font-semibold text-neon-cyan mb-2">Salsa</h3>
            <span className="text-foreground">{order.sauce?.name}</span>
          </div>

          <Separator className="bg-border" />

          <div className="flex justify-between items-center text-xl font-bold pt-2">
            <span className="text-neon-purple">TOTAL:</span>
            <span className="text-neon-cyan">S/{total.toFixed(2)}</span>
          </div>
        </div>
      </Card>

      <div className="flex gap-3">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1 py-6 text-lg border-neon-purple text-neon-purple hover:bg-neon-purple/10"
        >
          Modificar
        </Button>
        <Button
          onClick={handleWhatsAppOrder}
          className="flex-1 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold py-6 text-lg shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-5 h-5" />
          Hacer Pedido
        </Button>
      </div>
    </div>
  );
};
