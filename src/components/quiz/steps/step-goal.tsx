"use client";

import React from "react";
import { StepCard } from "../step-card";
import { useQuiz, Goal } from "@/lib/quiz-context";
import { SelectionCard } from "../selection-card";

const options: { label: string; value: Goal; icon: string; imageSrc: string }[] = [
    { label: "Eliminar Gordura Localizada", value: "fat_loss", icon: "🔥", imageSrc: "/images/goal-fat-loss.png" },
    { label: "Tonificar e Firmar", value: "tone", icon: "💪", imageSrc: "/images/goal-tone.png" },
    { label: "Melhorar Postura e Flexibilidade", value: "posture", icon: "🧘‍♀️", imageSrc: "/images/goal-posture.png" },
    { label: "Mais Energia e Disposição", value: "energy", icon: "✨", imageSrc: "/images/goal-energy.png" },
];

export function StepGoal() {
    const { setAnswer, nextStep, answers } = useQuiz();

    const handleSelect = (value: Goal) => {
        setAnswer("goal", value);
        setTimeout(nextStep, 300);
    };

    return (
        <StepCard title={<span>Qual é o seu principal <span className="text-primary font-bold">DESEJO</span> de transformação corporal?</span>}>
            <div className="grid gap-4">
                {options.map((option) => (
                    <SelectionCard
                        key={option.value}
                        selected={answers.goal === option.value}
                        onClick={() => handleSelect(option.value)}
                        imageSrc={option.imageSrc}
                    >
                        <div className="flex items-center">
                            <span className="text-lg font-semibold text-zinc-700">{option.label}</span>
                        </div>
                    </SelectionCard>
                ))}
            </div>
        </StepCard>
    );
}
