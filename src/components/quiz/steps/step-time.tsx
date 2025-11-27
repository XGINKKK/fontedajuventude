"use client";

import React from "react";
import { StepCard } from "../step-card";
import { useQuiz, TimeAvailability } from "@/lib/quiz-context";
import { SelectionCard } from "../selection-card";

const options: { label: string; value: TimeAvailability; icon: string }[] = [
    { label: "5 a 10 minutos (Corrido)", value: "5-10", icon: "⚡" },
    { label: "15 a 30 minutos", value: "15-30", icon: "⏰" },
    { label: "Mais de 30 minutos", value: "30+", icon: "📅" },
];

export function StepTime() {
    const { setAnswer, nextStep, answers } = useQuiz();

    const handleSelect = (value: TimeAvailability) => {
        setAnswer("timeAvailability", value);
        setTimeout(nextStep, 300);
    };

    return (
        <StepCard title={<span>Quanto tempo você tem <span className="text-primary font-bold">DISPONÍVEL</span> por dia para cuidar de você?</span>}>
            <div className="grid gap-4">
                {options.map((option) => (
                    <SelectionCard
                        key={option.value}
                        selected={answers.timeAvailability === option.value}
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
