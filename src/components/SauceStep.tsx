import { Sauce } from "@/types/bowl";
import { sauces } from "@/data/ingredients";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Droplet } from "lucide-react";

interface SauceStepProps {
  selectedSauce: Sauce | null;
  onSelectSauce: (sauce: Sauce) => void;
  onContinue: () => void;
  onBack: () => void;
}

export const SauceStep = ({ selectedSauce, onSelectSauce, onContinue, onBack }: SauceStepProps) => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-neon-purple">
          Paso 4: Selecciona tu salsa
        </h2>
        <p className="text-sm text-muted-foreground">Elige solo una opción</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {sauces.map((sauce) => {
          const isSelected = selectedSauce?.id === sauce.id;
          
          return (
            <Card
              key={sauce.id}
              onClick={() => onSelectSauce(sauce)}
              className={`relative cursor-pointer transition-all duration-300 p-6 hover:scale-105 ${
                isSelected 
                  ? 'border-neon-cyan border-2 shadow-neon-cyan bg-card/80' 
                  : 'border-border hover:border-neon-purple bg-card/50'
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 bg-neon-cyan rounded-full p-1 glow-cyan">
                  <Check className="w-4 h-4 text-secondary-foreground" />
                </div>
              )}
              
              <div className="flex flex-col items-center space-y-4">
                <div className={`p-6 rounded-full ${
                  sauce.id === 'acevichada' ? 'bg-orange-500/20' : 'bg-yellow-500/20'
                }`}>
                  <Droplet className={`w-12 h-12 ${
                    sauce.id === 'acevichada' ? 'text-orange-400' : 'text-yellow-400'
                  }`} />
                </div>
                
                <div className="text-center">
                  <h3 className="font-semibold text-xl text-foreground">{sauce.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {sauce.id === 'acevichada' ? 'Fresca y cítrica' : 'Dulce y suave'}
                  </p>
                </div>
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
          disabled={!selectedSauce}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg shadow-neon-purple transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Ver Resumen
        </Button>
      </div>
    </div>
  );
};
