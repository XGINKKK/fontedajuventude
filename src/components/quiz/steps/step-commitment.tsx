"use client";

import React from "react";
import { StepCard } from "../step-card";
import { useQuiz, Commitment } from "@/lib/quiz-context";
import { SelectionCard } from "../selection-card";

const options: { label: string; value: Commitment; icon?: string }[] = [
    { label: "✅ Sim, com certeza!", value: "yes" },
    { label: "🤔 Talvez, quero saber mais", value: "maybe" },
    { label: "❌ Não agora", value: "no" },
];

export function StepCommitment() {
    const { setAnswer, nextStep, answers } = useQuiz();

    const handleSelect = (value: Commitment) => {
        setAnswer("commitment", value);
        setTimeout(nextStep, 300);
    };

    return (
        <StepCard title={<span>Uma última pergunta...</span>}>
            <div className="space-y-6">
                <p className="text-lg text-zinc-600 text-center font-medium leading-relaxed">
                    Se existir um método <span className="text-primary font-bold">100% natural</span> de apenas <span className="font-bold">9 minutos por dia</span> para reverter esses sintomas, você estaria disposta a testar?
                </p>
                <div className="grid gap-3">
                    {options.map((option) => (
                        <SelectionCard
                            key={option.value}
                            selected={answers.commitment === option.value}
                            onClick={() => handleSelect(option.value)}
                        >
                            <span className="text-lg font-semibold text-zinc-700">{option.label}</span>
                        </SelectionCard>
                    ))}
                </div>
            </div>
        </StepCard>
    );
}
