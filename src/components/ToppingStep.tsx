import { Topping } from "@/types/bowl";
import { toppings } from "@/data/ingredients";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface ToppingStepProps {
  selectedToppings: Topping[];
  onToggleTopping: (topping: Topping) => void;
  onContinue: () => void;
  onBack: () => void;
}

export const ToppingStep = ({ selectedToppings, onToggleTopping, onContinue, onBack }: ToppingStepProps) => {
  const MAX_TOPPINGS = 5;
  const canAddMore = selectedToppings.length < MAX_TOPPINGS;

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-neon-purple">
          Paso 3: Selecciona tus toppings
        </h2>
        <p className="text-sm text-muted-foreground">
          Máximo 5 opciones • {selectedToppings.length}/5 seleccionados
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {toppings.map((topping) => {
          const isSelected = selectedToppings.some(t => t.id === topping.id);
          const isDisabled = !isSelected && !canAddMore;
          
          return (
            <Card
              key={topping.id}
              onClick={() => !isDisabled && onToggleTopping(topping)}
              className={`relative cursor-pointer transition-all duration-300 p-3 ${
                isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              } ${
                isSelected 
                  ? 'border-neon-pink border-2 shadow-neon-pink bg-card/80' 
                  : 'border-border hover:border-neon-cyan bg-card/50'
              }`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 bg-neon-pink rounded-full p-1 glow-pink">
                  <Check className="w-3 h-3 text-accent-foreground" />
                </div>
              )}
              
              <div className="aspect-square mb-2 overflow-hidden rounded-lg">
                <img
                  src={topping.image}
                  alt={topping.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="text-center">
                <h3 className="font-medium text-xs text-foreground">{topping.name}</h3>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1 py-6 text-lg border-neon-purple text-neon-purple hover:bg-neon-purple/10"
        >
          Atrás
        </Button>
        <Button
          onClick={onContinue}
          disabled={selectedToppings.length === 0}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg shadow-neon-purple transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};
