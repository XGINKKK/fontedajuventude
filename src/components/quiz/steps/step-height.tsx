"use client";

import React, { useState } from "react";
import { StepCard } from "../step-card";
import { useQuiz } from "@/lib/quiz-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function StepHeight() {
    const { answers, setAnswer, nextStep } = useQuiz();
    const [value, setValue] = useState(answers.height);

    const handleNext = () => {
        if (value) {
            setAnswer("height", value);
            nextStep();
        }
    };

    return (
        <StepCard title={<span>Para o cálculo do seu IMC, qual é a sua <span className="text-primary font-bold">altura</span> em centímetros?</span>}>
            <div className="space-y-8">
                <div className="space-y-4">
                    <Label htmlFor="height" className="text-lg font-medium text-zinc-600">Altura (cm)</Label>
                    <div className="relative">
                        <Input
                            id="height"
                            type="number"
                            placeholder="165"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="h-20 text-4xl text-center font-bold tracking-tight rounded-2xl border-2 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                            autoFocus
                        />
                        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-xl">cm</span>
                    </div>
                </div>
                <Button
                    className="w-full h-16 text-xl font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all bg-primary hover:bg-primary/90"
                    onClick={handleNext}
                    disabled={!value}
                >
                    Continuar
                </Button>
            </div>
        </StepCard>
    );
}
