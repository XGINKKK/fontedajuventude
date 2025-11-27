"use client";

import React from "react";
import { StepCard } from "../step-card";
import { useQuiz } from "@/lib/quiz-context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function StepHeightWeight() {
    const { setAnswer, nextStep, answers } = useQuiz();
    const [height, setHeight] = React.useState(answers.height || "");
    const [weight, setWeight] = React.useState(answers.weight || "");

    const handleNext = () => {
        if (height && weight) {
            setAnswer("height", height);
            setAnswer("weight", weight);
            nextStep();
        }
    };

    return (
        <StepCard title={<span>Últimos dados para calcular seu <span className="text-primary font-bold">IMC</span></span>}>
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="height" className="text-lg font-semibold text-zinc-700">Altura (cm)</Label>
                        <Input
                            id="height"
                            type="number"
                            placeholder="Ex: 165"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className="text-lg py-6 rounded-xl border-zinc-300 focus:ring-primary"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="weight" className="text-lg font-semibold text-zinc-700">Peso (kg)</Label>
                        <Input
                            id="weight"
                            type="number"
                            placeholder="Ex: 65"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="text-lg py-6 rounded-xl border-zinc-300 focus:ring-primary"
                        />
                    </div>
                </div>

                <Button
                    onClick={handleNext}
                    disabled={!height || !weight}
                    className="w-full bg-primary hover:bg-primary/90 text-white text-lg font-bold py-6 rounded-xl shadow-lg shadow-primary/20 transition-all mt-4"
                >
                    Calcular Meu Diagnóstico
                    <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
            </div>
        </StepCard>
    );
}
