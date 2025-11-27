"use client";

import React from "react";
import { StepCard } from "../step-card";
import { useQuiz, StressLevel } from "@/lib/quiz-context";
import { SelectionCard } from "../selection-card";

const options: { label: string; value: StressLevel; description: string }[] = [
    { label: "Alto", value: "high", description: "Sinto-me sobrecarregada e ansiosa" },
    { label: "Moderado", value: "medium", description: "Consigo lidar, mas cansa" },
    { label: "Baixo", value: "low", description: "Estou tranquila na maior parte do tempo" },
];

export function StepStress() {
    const { setAnswer, nextStep, answers } = useQuiz();
    const [showFeedback, setShowFeedback] = React.useState(false);

    const handleSelect = (value: StressLevel) => {
        setAnswer("stressLevel", value);
        setShowFeedback(true);
        setTimeout(() => {
            nextStep();
        }, 1500);
    };

    if (showFeedback) {
        return (
            <StepCard title="Avaliando nível de estresse...">
                <div className="flex flex-col items-center justify-center py-12 space-y-6 animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
                        <span className="text-4xl">💡</span>
                    </div>
                    <h3 className="text-2xl font-bold text-center text-zinc-800">
                        Importante saber.
                    </h3>
                    <p className="text-lg text-center text-zinc-600 max-w-xs">
                        O estresse é um dos principais aceleradores do envelhecimento.
                    </p>
                </div>
            </StepCard>
        );
    }

    return (
        <StepCard title={<span>Como você classificaria seu nível de <span className="text-primary font-bold">ESTRESSE</span> nas últimas semanas?</span>}>
            <div className="grid gap-4">
                {options.map((option) => (
                    <SelectionCard
                        key={option.value}
                        selected={answers.stressLevel === option.value}
                        onClick={() => handleSelect(option.value)}
                    >
                        <div className="flex flex-col items-start text-left">
                            <span className="text-lg font-bold text-zinc-800">{option.label}</span>
                            <span className="text-sm text-zinc-500">{option.description}</span>
                        </div>
                    </SelectionCard>
                ))}
            </div>
            <p className="text-xs text-center text-zinc-400 mt-4">
                *O estresse libera Cortisol, um hormônio que bloqueia a queima de gordura.
            </p>
        </StepCard>
    );
}
