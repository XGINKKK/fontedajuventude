"use client";

import React from "react";
import { StepCard } from "../step-card";
import { useQuiz, ProblemArea } from "@/lib/quiz-context";
import { SelectionCard } from "../selection-card";

const options: { label: string; value: ProblemArea; imageSrc?: string }[] = [
    { label: "Barriga / Pochete", value: "belly", imageSrc: "/images/goal-fat-loss.png" },
    { label: "Braços (Tchauzinho)", value: "arms", imageSrc: "/images/goal-tone.png" },
    { label: "Coxas e Culote", value: "legs", imageSrc: "/images/goal-posture.png" },
    { label: "Rosto e Papada", value: "face", imageSrc: "/images/goal-energy.png" },
];

export function StepProblemArea() {
    const { setAnswer, nextStep, answers } = useQuiz();

    const handleSelect = (value: ProblemArea) => {
        setAnswer("problemArea", value);
        setTimeout(nextStep, 300);
    };

    return (
        <StepCard title={<span>Qual região do seu corpo mais te <span className="text-primary font-bold">INCOMODA</span> ao se olhar no espelho?</span>}>
            <div className="grid gap-4">
                {options.map((option) => (
                    <SelectionCard
                        key={option.value}
                        selected={answers.problemArea === option.value}
                        onClick={() => handleSelect(option.value)}
                        imageSrc={option.imageSrc}
                    >
                        <span className="text-lg font-semibold text-zinc-700">{option.label}</span>
                    </SelectionCard>
                ))}
            </div>
        </StepCard>
    );
}
