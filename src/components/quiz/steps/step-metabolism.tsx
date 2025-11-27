"use client";

import React from "react";
import { StepCard } from "../step-card";
import { useQuiz, Metabolism } from "@/lib/quiz-context";
import { SelectionCard } from "../selection-card";

const options: { label: string; value: Metabolism; icon: string }[] = [
    { label: "Muito mais lento", value: "slow", icon: "🐢" },
    { label: "Um pouco mais lento", value: "normal", icon: "🐌" },
    { label: "Igual a antes", value: "fast", icon: "⚡" },
];

export function StepMetabolism() {
    const { setAnswer, nextStep, answers } = useQuiz();

    const handleSelect = (value: Metabolism) => {
        setAnswer("metabolism", value);
        setTimeout(nextStep, 300);
    };

    return (
        <StepCard title={<span>Você sente que seu <span className="text-primary font-bold">METABOLISMO</span> está mais lento hoje do que há 5 anos?</span>}>
            <div className="grid gap-4">
                {options.map((option) => (
                    <SelectionCard
                        key={option.value}
                        selected={answers.metabolism === option.value}
                        onClick={() => handleSelect(option.value)}
                    >
                        <div className="flex items-center">
                            <span className="mr-4 text-3xl">{option.icon}</span>
                            <span className="text-lg font-semibold text-zinc-700">{option.label}</span>
                        </div>
                    </SelectionCard>
                ))}
            </div>
        </StepCard>
    );
}
