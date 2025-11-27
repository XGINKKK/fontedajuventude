"use client";

import React from "react";
import { StepCard } from "../step-card";
import { useQuiz, AgeRange } from "@/lib/quiz-context";
import { SelectionCard } from "../selection-card";

const options: { label: string; value: AgeRange }[] = [
    { label: "39 a 45 anos", value: "39-45" },
    { label: "46 a 50 anos", value: "46-50" },
    { label: "51 a 60 anos", value: "51-60" },
    { label: "Mais de 60 anos", value: "60+" },
];

export function StepAge() {
    const { setAnswer, nextStep, answers } = useQuiz();

    const handleSelect = (value: AgeRange) => {
        setAnswer("ageRange", value);
        setTimeout(nextStep, 300); // Slight delay for visual feedback
    };

    return (
        <StepCard title={<span>Qual é a sua <span className="text-primary font-bold">Idade Atual</span>?</span>}>
            <div className="grid gap-4">
                {options.map((option) => (
                    <SelectionCard
                        key={option.value}
                        selected={answers.ageRange === option.value}
                        onClick={() => handleSelect(option.value)}
                    >
                        <span className="text-lg font-semibold text-zinc-700">{option.label}</span>
                    </SelectionCard>
                ))}
            </div>
        </StepCard>
    );
}
