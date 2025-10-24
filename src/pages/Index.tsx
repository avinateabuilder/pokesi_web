import { useState } from "react";
import { BowlOrder, Protein, Base, Topping, Sauce } from "@/types/bowl";
import { BowlVisualization } from "@/components/BowlVisualization";
import { ProteinStep } from "@/components/ProteinStep";
import { BaseStep } from "@/components/BaseStep";
import { ToppingStep } from "@/components/ToppingStep";
import { SauceStep } from "@/components/SauceStep";
import { OrderSummary } from "@/components/OrderSummary";
import { toast } from "sonner";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [order, setOrder] = useState<BowlOrder>({
    protein: null,
    bases: [],
    toppings: [],
    sauce: null,
  });

  const handleSelectProtein = (protein: Protein) => {
    setOrder(prev => ({ ...prev, protein }));
  };

  const handleToggleBase = (base: Base) => {
    setOrder(prev => {
      const isSelected = prev.bases.some(b => b.id === base.id);
      if (isSelected) {
        return { ...prev, bases: prev.bases.filter(b => b.id !== base.id) };
      } else if (prev.bases.length < 2) {
        return { ...prev, bases: [...prev.bases, base] };
      }
      return prev;
    });
  };

  const handleToggleTopping = (topping: Topping) => {
    setOrder(prev => {
      const isSelected = prev.toppings.some(t => t.id === topping.id);
      if (isSelected) {
        return { ...prev, toppings: prev.toppings.filter(t => t.id !== topping.id) };
      } else if (prev.toppings.length < 5) {
        return { ...prev, toppings: [...prev.toppings, topping] };
      }
      return prev;
    });
  };

  const handleSelectSauce = (sauce: Sauce) => {
    setOrder(prev => ({ ...prev, sauce }));
  };

  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 5));
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleOrder = () => {
    toast.success("¡Pedido enviado! Gracias por elegir Poke Sí 🥗", {
      description: "Te contactaremos pronto para confirmar tu pedido",
    });
    
    // Reset order after 2 seconds
    setTimeout(() => {
      setOrder({
        protein: null,
        bases: [],
        toppings: [],
        sauce: null,
      });
      setCurrentStep(1);
    }, 2000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ProteinStep
            selectedProtein={order.protein}
            onSelectProtein={handleSelectProtein}
            onContinue={handleNextStep}
          />
        );
      case 2:
        return (
          <BaseStep
            selectedBases={order.bases}
            onToggleBase={handleToggleBase}
            onContinue={handleNextStep}
            onBack={handlePrevStep}
          />
        );
      case 3:
        return (
          <ToppingStep
            selectedToppings={order.toppings}
            onToggleTopping={handleToggleTopping}
            onContinue={handleNextStep}
            onBack={handlePrevStep}
          />
        );
      case 4:
        return (
          <SauceStep
            selectedSauce={order.sauce}
            onSelectSauce={handleSelectSauce}
            onContinue={handleNextStep}
            onBack={handlePrevStep}
          />
        );
      case 5:
        return (
          <OrderSummary
            order={order}
            onBack={handlePrevStep}
            onOrder={handleOrder}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-5xl font-extrabold text-neon-purple animate-glow-pulse">
              ARMA TU BOWL — POKE SÍ
            </h1>
            <p className="text-sm md:text-base text-neon-cyan">
              ¡Diseña tu poke perfecto y mira cómo cobra vida paso a paso!
            </p>
          </div>
          
          {/* Progress indicator */}
          <div className="mt-6 flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`h-2 rounded-full transition-all duration-300 ${
                  step === currentStep 
                    ? 'w-12 bg-neon-purple glow-purple' 
                    : step < currentStep 
                    ? 'w-8 bg-neon-cyan' 
                    : 'w-8 bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-start max-w-7xl mx-auto">
          {/* Bowl visualization - Left side */}
          <div className="lg:sticky lg:top-32">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-neon-purple">
              <BowlVisualization order={order} />
            </div>
          </div>

          {/* Steps - Right side */}
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
            {renderStep()}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Poke Sí • Tu bowl perfecto, tu estilo
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
