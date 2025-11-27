"use client";

import React, { useState } from "react";
import { StepCard } from "../step-card";
import { useQuiz } from "@/lib/quiz-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function StepWeight() {
    const { answers, setAnswer, nextStep } = useQuiz();
    const [value, setValue] = useState(answers.weight);

    const handleNext = () => {
        if (value) {
            setAnswer("weight", value);
            nextStep();
        }
    };

    return (
        <StepCard title={<span>E qual é o seu <span className="text-primary font-bold">peso</span> atual em quilogramas?</span>}>
            <div className="space-y-8">
                <div className="space-y-4">
                    <Label htmlFor="weight" className="text-lg font-medium text-zinc-600">Peso (kg)</Label>
                    <div className="relative">
                        <Input
                            id="weight"
                            type="number"
                            placeholder="70"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="h-20 text-4xl text-center font-bold tracking-tight rounded-2xl border-2 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                            autoFocus
                        />
                        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-xl">kg</span>
                    </div>
                </div>
                <Button
                    className="w-full h-16 text-xl font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all bg-primary hover:bg-primary/90"
                    onClick={handleNext}
                    disabled={!value}
                >
                    Finalizar Diagnóstico
                </Button>
            </div>
        </StepCard>
    );
}
