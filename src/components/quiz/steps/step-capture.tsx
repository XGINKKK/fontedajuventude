"use client";

import React, { useState } from "react";
import { StepCard } from "../step-card";
import { useQuiz } from "@/lib/quiz-context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock } from "lucide-react";

export function StepCapture() {
    const { setAnswer, nextStep, answers } = useQuiz();
    const [name, setName] = useState(answers.name || "");
    const [whatsapp, setWhatsapp] = useState(answers.whatsapp || "");

    const formatPhone = (value: string) => {
        const numbers = value.replace(/\D/g, "");
        if (numbers.length <= 11) {
            return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
                .replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
        }
        return value;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhone(e.target.value);
        setWhatsapp(formatted);
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleNext = async () => {
        if (name && whatsapp.length >= 14) {
            setIsSubmitting(true);
            // Simulate a small delay for better UX
            await new Promise(resolve => setTimeout(resolve, 500));
            setAnswer("name", name);
            setAnswer("whatsapp", whatsapp);
            nextStep();
        }
    };

    const isValid = name.trim().length > 0 && whatsapp.length >= 14;

    return (
        <StepCard title={<span>Seu resultado está <span className="text-primary font-bold">PRONTO!</span></span>}>
            <div className="space-y-6">
                <p className="text-zinc-600 text-center text-lg">
                    Para onde devemos enviar seu diagnóstico completo e seu plano personalizado de rejuvenescimento?
                </p>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-lg font-semibold text-zinc-700">Primeiro Nome</Label>
                        <Input
                            id="name"
                            placeholder="Seu primeiro nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="text-lg py-6 rounded-xl border-zinc-300 focus:ring-primary"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="whatsapp" className="text-lg font-semibold text-zinc-700">WhatsApp</Label>
                        <Input
                            id="whatsapp"
                            placeholder="(DDD) 99999-9999"
                            value={whatsapp}
                            onChange={handlePhoneChange}
                            maxLength={15}
                            className="text-lg py-6 rounded-xl border-zinc-300 focus:ring-primary"
                        />
                    </div>
                </div>

                <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100 flex items-center justify-center gap-2 text-zinc-500 text-sm">
                    <Lock className="w-4 h-4" />
                    <span>Seus dados estão 100% seguros. Não enviamos spam.</span>
                </div>

                <Button
                    onClick={handleNext}
                    disabled={!isValid || isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-white text-lg font-bold py-6 rounded-xl shadow-lg shadow-primary/20 transition-all"
                >
                    {isSubmitting ? "Processando..." : "Ver Meu Resultado"}
                    {!isSubmitting && <ArrowRight className="ml-2 w-5 h-5" />}
                </Button>
            </div>
        </StepCard>
    );
}
