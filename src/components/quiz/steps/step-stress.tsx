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

    const handleSelect = (value: StressLevel) => {
        setAnswer("stressLevel", value);
        setTimeout(nextStep, 300);
    };

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
