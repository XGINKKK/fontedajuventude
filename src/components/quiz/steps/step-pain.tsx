"use client";

import React from "react";
import { StepCard } from "../step-card";
import { useQuiz, PainArea } from "@/lib/quiz-context";
import { Button } from "@/components/ui/button";
import { SelectionCard } from "../selection-card";

const options: { label: string; value: PainArea; imageSrc?: string }[] = [
    { label: "Costas / Coluna", value: "back", imageSrc: "/images/pain-back.png" },
    { label: "Joelhos / Articulações", value: "knees", imageSrc: "/images/pain-knees.png" },
    { label: "Ombros / Pescoço", value: "shoulders", imageSrc: "/images/pain-shoulders.png" },
    { label: "Quadril", value: "hips", imageSrc: "/images/pain-back.png" }, // Placeholder
    { label: "✅ Nenhuma das acima", value: "none" },
];

export function StepPain() {
    const { answers, setAnswer, nextStep } = useQuiz();

    const togglePain = (value: PainArea) => {
        const current = answers.painAreas || [];

        if (value === "none") {
            // If "none" is selected, clear others or toggle off
            if (current.includes("none")) {
                setAnswer("painAreas", []);
            } else {
                setAnswer("painAreas", ["none"]);
            }
            return;
        }

        // If other option selected, remove "none"
        let newSelection = current.filter((p) => p !== "none");

        if (newSelection.includes(value)) {
            newSelection = newSelection.filter((p) => p !== value);
        } else {
            newSelection = [...newSelection, value];
        }
        setAnswer("painAreas", newSelection);
    };

    return (
        <StepCard title={<span>Quais áreas do seu corpo precisam de um cuidado especial devido a <span className="text-primary font-bold">SENSIBILIDADE</span> ou dor?</span>}>
            <div className="grid gap-4 mb-8">
                {options.map((option) => {
                    const isSelected = (answers.painAreas || []).includes(option.value);
                    return (
                        <SelectionCard
                            key={option.value}
                            selected={isSelected}
                            onClick={() => togglePain(option.value)}
                            multiSelect
                            imageSrc={option.imageSrc}
                        >
                            <span className="text-lg font-semibold text-zinc-700">{option.label}</span>
                        </SelectionCard>
                    );
                })}
            </div>
            <Button
                className="w-full h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
                onClick={nextStep}
                disabled={(answers.painAreas || []).length === 0}
            >
                Continuar
            </Button>
        </StepCard>
    );
}
