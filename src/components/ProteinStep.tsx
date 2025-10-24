import { Protein } from "@/types/bowl";
import { proteins } from "@/data/ingredients";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface ProteinStepProps {
  selectedProtein: Protein | null;
  onSelectProtein: (protein: Protein) => void;
  onContinue: () => void;
}

export const ProteinStep = ({ selectedProtein, onSelectProtein, onContinue }: ProteinStepProps) => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-neon-purple">
          Paso 1: Selecciona tu proteína
        </h2>
        <p className="text-sm text-muted-foreground">Elige solo una opción</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {proteins.map((protein) => {
          const isSelected = selectedProtein?.id === protein.id;
          
          return (
            <Card
              key={protein.id}
              onClick={() => onSelectProtein(protein)}
              className={`relative cursor-pointer transition-all duration-300 p-4 hover:scale-105 ${
                isSelected 
                  ? 'border-neon-purple border-2 shadow-neon-purple bg-card/80' 
                  : 'border-border hover:border-neon-cyan bg-card/50'
              }`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 bg-neon-purple rounded-full p-1 glow-purple">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
              
              <div className="aspect-square mb-3 overflow-hidden rounded-lg">
                <img
                  src={protein.image}
                  alt={protein.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="text-center space-y-1">
                <h3 className="font-semibold text-lg text-foreground">{protein.name}</h3>
                <p className="text-neon-cyan font-bold text-xl">S/{protein.price}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <Button
        onClick={onContinue}
        disabled={!selectedProtein}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg shadow-neon-purple transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        Continuar
      </Button>
    </div>
  );
};
