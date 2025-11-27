"use client";

import React from "react";
import { StepCard } from "../step-card";
import { useQuiz, ExerciseFreq } from "@/lib/quiz-context";
import { SelectionCard } from "../selection-card";

const options: { label: string; value: ExerciseFreq }[] = [
    { label: "0 vezes (Sedentária)", value: "0" },
    { label: "1 a 2 vezes por semana", value: "1-2" },
    { label: "3 a 4 vezes por semana", value: "3-4" },
    { label: "5 vezes ou mais", value: "5+" },
];

export function StepExercise() {
    const { setAnswer, nextStep, answers } = useQuiz();

    const handleSelect = (value: ExerciseFreq) => {
        setAnswer("exerciseFreq", value);
        setTimeout(nextStep, 300);
    };

    return (
        <StepCard title={<span>Com que <span className="text-primary font-bold">frequência</span> você se exercita por semana?</span>}>
            <div className="grid gap-4">
                {options.map((option) => (
                    <SelectionCard
                        key={option.value}
                        selected={answers.exerciseFreq === option.value}
                        onClick={() => handleSelect(option.value)}
                    >
                        <span className="text-lg font-semibold text-zinc-700">{option.label}</span>
                    </SelectionCard>
                ))}
            </div>
        </StepCard>
    );
}
