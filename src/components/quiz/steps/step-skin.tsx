"use client";

import React from "react";
import { StepCard } from "../step-card";
import { useQuiz, SkinFirmness } from "@/lib/quiz-context";
import { SelectionCard } from "../selection-card";

const options: { label: string; value: SkinFirmness; description: string; imageSrc: string }[] = [
    { label: "1 - Flacidez Visível", value: "sagging", description: "(Preocupante)", imageSrc: "/images/goal-fat-loss.png" },
    { label: "2 - Moderada", value: "moderate", description: "(Precisa de Atenção)", imageSrc: "/images/goal-tone.png" },
    { label: "3 - Firme", value: "firm", description: "(Satisfatória)", imageSrc: "/images/goal-posture.png" },
];

export function StepSkin() {
    const { setAnswer, nextStep, answers } = useQuiz();

    const handleSelect = (value: SkinFirmness) => {
        setAnswer("skinFirmness", value);
        setTimeout(nextStep, 300);
    };

    return (
        <StepCard title={<span>Em uma escala de 1 a 3, como você avalia a <span className="text-primary font-bold">FIRMEZA</span> da sua pele hoje?</span>}>
            <div className="grid gap-4">
                {options.map((option) => (
                    <SelectionCard
                        key={option.value}
                        selected={answers.skinFirmness === option.value}
                        onClick={() => handleSelect(option.value)}
                        imageSrc={option.imageSrc}
                    >
                        <div className="flex justify-between items-center w-full">
                            <span className="font-bold text-lg text-zinc-800">{option.label}</span>
                            <span className="text-muted-foreground font-medium text-sm">{option.description}</span>
                        </div>
                    </SelectionCard>
                ))}
            </div>
        </StepCard>
    );
}
