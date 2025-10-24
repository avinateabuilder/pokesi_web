import { BowlOrder } from "@/types/bowl";
import bowlEmpty from "@/assets/bowl-empty.png";
import { useEffect, useState } from "react";

interface BowlVisualizationProps {
  order: BowlOrder;
}

export const BowlVisualization = ({ order }: BowlVisualizationProps) => {
  const [visibleItems, setVisibleItems] = useState<string[]>([]);

  useEffect(() => {
    const allItems: string[] = [];
    
    if (order.bases.length > 0) {
      order.bases.forEach(base => allItems.push(`base-${base.id}`));
    }
    
    if (order.protein) {
      allItems.push(`protein-${order.protein.id}`);
    }
    
    if (order.toppings.length > 0) {
      order.toppings.forEach(topping => allItems.push(`topping-${topping.id}`));
    }

    setVisibleItems(allItems);
  }, [order]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative aspect-square">
        {/* Bowl base */}
        <img
          src={bowlEmpty}
          alt="Bowl"
          className="absolute inset-0 w-full h-full object-contain z-10"
        />

        {/* Base layers */}
        {order.bases.map((base, index) => (
          <img
            key={`base-${base.id}`}
            src={base.image}
            alt={base.name}
            className={`absolute inset-0 w-full h-full object-contain scale-75 ${
              visibleItems.includes(`base-${base.id}`) ? 'animate-fade-in' : 'opacity-0'
            }`}
            style={{ 
              zIndex: 5 + index,
              animationDelay: `${index * 0.2}s`
            }}
          />
        ))}

        {/* Protein layer */}
        {order.protein && (
          <img
            src={order.protein.image}
            alt={order.protein.name}
            className={`absolute inset-0 w-full h-full object-contain scale-75 ${
              visibleItems.includes(`protein-${order.protein.id}`) ? 'animate-scale-in' : 'opacity-0'
            }`}
            style={{ 
              zIndex: 8,
              animationDelay: `${order.bases.length * 0.2}s`
            }}
          />
        )}

        {/* Toppings */}
        {order.toppings.map((topping, index) => {
          const positions = [
            { top: '25%', left: '30%', transform: 'scale(0.3)' },
            { top: '30%', right: '30%', transform: 'scale(0.3)' },
            { bottom: '35%', left: '25%', transform: 'scale(0.3)' },
            { bottom: '35%', right: '25%', transform: 'scale(0.3)' },
            { top: '40%', left: '50%', transform: 'translateX(-50%) scale(0.3)' },
          ];

          const position = positions[index % positions.length];

          return (
            <img
              key={`topping-${topping.id}`}
              src={topping.image}
              alt={topping.name}
              className={`absolute ${
                visibleItems.includes(`topping-${topping.id}`) ? 'animate-scale-in' : 'opacity-0'
              }`}
              style={{ 
                ...position,
                zIndex: 15 + index,
                animationDelay: `${(order.bases.length + 1 + index) * 0.15}s`
              }}
            />
          );
        })}

        {/* Sauce overlay */}
        {order.sauce && (
          <div 
            className="absolute inset-0 rounded-full animate-fade-in"
            style={{ 
              zIndex: 30,
              background: order.sauce.id === 'acevichada' 
                ? 'radial-gradient(circle at 50% 40%, rgba(255, 200, 100, 0.2) 0%, transparent 60%)'
                : 'radial-gradient(circle at 50% 40%, rgba(255, 220, 100, 0.3) 0%, transparent 60%)',
              animationDelay: '0.5s'
            }}
          />
        )}
      </div>

      {/* Bowl status text */}
      <div className="text-center mt-4 space-y-1">
        {!order.protein && order.bases.length === 0 && order.toppings.length === 0 ? (
          <p className="text-muted-foreground text-sm">Comienza seleccionando tu proteína</p>
        ) : (
          <>
            <p className="text-neon-cyan text-sm font-medium">¡Tu bowl está tomando forma!</p>
            <p className="text-xs text-muted-foreground">
              {order.protein && `✓ ${order.protein.name}`}
              {order.bases.length > 0 && ` • ${order.bases.length} base${order.bases.length > 1 ? 's' : ''}`}
              {order.toppings.length > 0 && ` • ${order.toppings.length} topping${order.toppings.length > 1 ? 's' : ''}`}
            </p>
          </>
        )}
      </div>
    </div>
  );
};
