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
    const [showFeedback, setShowFeedback] = React.useState(false);

    const handleSelect = (value: Goal) => {
        setAnswer("goal", value);
        setShowFeedback(true);
        setTimeout(() => {
            nextStep();
        }, 1500);
    };

    if (showFeedback) {
        return (
            <StepCard title="Analisando sua resposta...">
                <div className="flex flex-col items-center justify-center py-12 space-y-6 animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-4xl">✨</span>
                    </div>
                    <h3 className="text-2xl font-bold text-center text-zinc-800">
                        Ótimo!
                    </h3>
                    <p className="text-lg text-center text-zinc-600 max-w-xs">
                        Esse é exatamente o foco do plano que vamos criar para você.
                    </p>
                </div>
            </StepCard>
        );
    }

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
