"use client";

import React from "react";
import { StepCard } from "../step-card";
import { useQuiz, ProblemArea } from "@/lib/quiz-context";
import { SelectionCard } from "../selection-card";

const options: { label: string; value: ProblemArea; imageSrc?: string }[] = [
    { label: "Barriga / Pochete", value: "belly", imageSrc: "/images/problem-belly.png" },
    { label: "Braços (Tchauzinho)", value: "arms", imageSrc: "/images/problem-arms.png" },
    { label: "Coxas e Culote", value: "legs", imageSrc: "/images/problem-legs.png" },
    { label: "Rosto e Papada", value: "face", imageSrc: "/images/problem-face.png" },
];

export function StepProblemArea() {
    const { setAnswer, nextStep, answers } = useQuiz();
    const [showFeedback, setShowFeedback] = React.useState(false);

    const handleSelect = (value: ProblemArea) => {
        setAnswer("problemArea", value);

        if (value === "belly") {
            setShowFeedback(true);
            setTimeout(() => {
                nextStep();
            }, 3500); // Tempo para ler o feedback
        } else {
            setTimeout(nextStep, 300);
        }
    };

    if (showFeedback) {
        return (
            <StepCard title="Analisando...">
                <div className="flex flex-col items-center justify-center py-8 space-y-6 animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-4xl">⚠️</span>
                    </div>
                    <h3 className="text-2xl font-bold text-center text-zinc-800">
                        A famosa "Barriga Hormonal"
                    </h3>
                    <p className="text-lg text-center text-zinc-600 max-w-sm leading-relaxed">
                        Diferente da gordura comum, ela é causada pela queda de estrogênio e aumento do cortisol. <br /><br />
                        <span className="font-semibold text-primary">Abdominais comuns só pioram</span> porque estressam mais o corpo. Precisamos de uma abordagem diferente.
                    </p>
                </div>
            </StepCard>
        );
    }

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
