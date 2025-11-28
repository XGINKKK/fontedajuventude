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
    const [showFeedback, setShowFeedback] = React.useState(false);

    const toggleSymptom = (value: Symptom) => {
        const current = answers.symptoms;
        if (current.includes(value)) {
            setAnswer("symptoms", current.filter((s) => s !== value));
        } else {
            setAnswer("symptoms", [...current, value]);
        }
    };

    const handleNext = () => {
        const hasFatigueOrInsomnia = answers.symptoms.includes("fatigue") || answers.symptoms.includes("insomnia");

        setShowFeedback(true);
        setTimeout(() => {
            nextStep();
        }, hasFatigueOrInsomnia ? 4000 : 1500);
    };

    if (showFeedback) {
        const hasFatigueOrInsomnia = answers.symptoms.includes("fatigue") || answers.symptoms.includes("insomnia");

        return (
            <StepCard title="Analisando sintomas...">
                <div className="flex flex-col items-center justify-center py-8 space-y-6 animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-4xl">🧬</span>
                    </div>
                    <h3 className="text-2xl font-bold text-center text-zinc-800">
                        {hasFatigueOrInsomnia ? "Não é \"coisa da idade\"" : "Entendido"}
                    </h3>
                    <p className="text-lg text-center text-zinc-600 max-w-sm leading-relaxed">
                        {hasFatigueOrInsomnia ? (
                            <>
                                Muitas mulheres acham que esse cansaço é normal. <span className="font-bold text-red-500">Não é.</span><br /><br />
                                É seu corpo gritando que suas <span className="font-semibold text-primary">mitocôndrias</span> (usinas de energia) estão bloqueadas. Vamos reativá-las.
                            </>
                        ) : (
                            "Vamos analisar como esses sintomas estão afetando sua idade biológica e criar um plano para revertê-los."
                        )}
                    </p>
                </div>
            </StepCard>
        );
    }

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
                onClick={handleNext}
                disabled={answers.symptoms.length === 0}
            >
                Continuar
            </Button>
        </StepCard>
    );
}
