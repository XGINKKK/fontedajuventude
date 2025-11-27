"use client";

import React from "react";
import { StepCard } from "../step-card";
import { useQuiz, PreviousAttempts } from "@/lib/quiz-context";
import { SelectionCard } from "../selection-card";

const options: { label: string; value: PreviousAttempts; icon: string }[] = [
    { label: "Academia / Caminhada", value: "gym", icon: "🏋️‍♀️" },
    { label: "Dietas Restritivas", value: "diet", icon: "🥗" },
    { label: "Remédios / Chás", value: "pills", icon: "💊" },
    { label: "Ainda não tentei nada sério", value: "none", icon: "🤷‍♀️" },
];

export function StepPreviousAttempts() {
    const { setAnswer, nextStep, answers } = useQuiz();

    const handleSelect = (value: PreviousAttempts) => {
        setAnswer("previousAttempts", value);
        setTimeout(nextStep, 300);
    };

    return (
        <StepCard title={<span>Você já tentou algum desses métodos <span className="text-primary font-bold">SEM sucesso duradouro</span>?</span>}>
            <div className="grid gap-4">
                {options.map((option) => (
                    <SelectionCard
                        key={option.value}
                        selected={answers.previousAttempts === option.value}
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
