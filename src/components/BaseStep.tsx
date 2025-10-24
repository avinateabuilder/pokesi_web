import { Base } from "@/types/bowl";
import { bases } from "@/data/ingredients";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface BaseStepProps {
  selectedBases: Base[];
  onToggleBase: (base: Base) => void;
  onContinue: () => void;
  onBack: () => void;
}

export const BaseStep = ({ selectedBases, onToggleBase, onContinue, onBack }: BaseStepProps) => {
  const MAX_BASES = 2;
  const canAddMore = selectedBases.length < MAX_BASES;

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-neon-purple">
          Paso 2: Selecciona tus bases
        </h2>
        <p className="text-sm text-muted-foreground">
          Máximo 2 opciones • {selectedBases.length}/2 seleccionadas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {bases.map((base) => {
          const isSelected = selectedBases.some(b => b.id === base.id);
          const isDisabled = !isSelected && !canAddMore;
          
          return (
            <Card
              key={base.id}
              onClick={() => !isDisabled && onToggleBase(base)}
              className={`relative cursor-pointer transition-all duration-300 p-4 ${
                isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              } ${
                isSelected 
                  ? 'border-neon-cyan border-2 shadow-neon-cyan bg-card/80' 
                  : 'border-border hover:border-neon-purple bg-card/50'
              }`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 bg-neon-cyan rounded-full p-1 glow-cyan">
                  <Check className="w-4 h-4 text-secondary-foreground" />
                </div>
              )}
              
              <div className="aspect-square mb-3 overflow-hidden rounded-lg">
                <img
                  src={base.image}
                  alt={base.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="text-center space-y-1">
                <h3 className="font-semibold text-base text-foreground">{base.name}</h3>
                <p className="text-neon-cyan font-bold">
                  {base.price > 0 ? `+S/${base.price}` : 'Incluido'}
                </p>
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
          disabled={selectedBases.length === 0}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg shadow-neon-purple transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};
