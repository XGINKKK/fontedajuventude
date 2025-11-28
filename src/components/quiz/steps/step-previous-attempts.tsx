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
    const [showFeedback, setShowFeedback] = React.useState(false);

    const handleSelect = (value: PreviousAttempts) => {
        setAnswer("previousAttempts", value);
        setShowFeedback(true);
        setTimeout(() => {
            nextStep();
        }, 4500); // Tempo maior para ler a mensagem importante
    };

    if (showFeedback) {
        return (
            <StepCard title="Uma verdade importante...">
                <div className="flex flex-col items-center justify-center py-8 space-y-6 animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-4xl">🛡️</span>
                    </div>
                    <h3 className="text-2xl font-bold text-center text-zinc-800">
                        Não é culpa sua.
                    </h3>
                    <p className="text-lg text-center text-zinc-600 max-w-sm leading-relaxed">
                        Dietas restritivas e academias foram feitas para corpos de 20 anos. Aos 40+, elas colocam seu corpo em <span className="font-bold text-red-500">"modo de alerta"</span> e ele estoca gordura para se proteger.<br /><br />
                        <span className="font-semibold text-primary">Você não falhou.</span> O método é que estava errado para seu momento biológico.
                    </p>
                </div>
            </StepCard>
        );
    }

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
