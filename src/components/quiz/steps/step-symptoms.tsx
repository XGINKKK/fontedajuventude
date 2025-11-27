"use client";

import React from "react";
import { StepCard } from "../step-card";
import { useQuiz, Symptom } from "@/lib/quiz-context";
import { Button } from "@/components/ui/button";
import { SelectionCard } from "../selection-card";

const options: { label: string; value: Symptom; icon: string }[] = [
    { label: "Ondas de Calor ou Suor Noturno", value: "hot_flashes", icon: "🥵" },
    { label: "Insônia ou Sono Não Reparador", value: "insomnia", icon: "😴" },
    { label: "Cansaço Extremo ou Falta de Foco", value: "fatigue", icon: "😩" },
    { label: "Mudanças de Humor Inesperadas", value: "mood_swings", icon: "😠" },
];

export function StepSymptoms() {
    const { answers, setAnswer, nextStep } = useQuiz();

    const toggleSymptom = (value: Symptom) => {
        const current = answers.symptoms;
        if (current.includes(value)) {
            setAnswer("symptoms", current.filter((s) => s !== value));
        } else {
            setAnswer("symptoms", [...current, value]);
        }
    };

    return (
        <StepCard title={<span>Quais destes <span className="text-primary font-bold">SINAIS</span> de desgaste corporal você sente com mais frequência?</span>}>
            <div className="grid gap-4 mb-8">
                {options.map((option) => {
                    const isSelected = answers.symptoms.includes(option.value);
                    return (
                        <SelectionCard
                            key={option.value}
                            selected={isSelected}
                            onClick={() => toggleSymptom(option.value)}
                            multiSelect
                        >
                            <div className="flex items-center">
                                <span className="mr-4 text-3xl">{option.icon}</span>
                                <span className="text-lg font-semibold text-zinc-700">{option.label}</span>
                            </div>
                        </SelectionCard>
                    );
                })}
            </div>
            <Button
                className="w-full h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
                onClick={nextStep}
                disabled={answers.symptoms.length === 0}
            >
                Continuar
            </Button>
        </StepCard>
    );
}
