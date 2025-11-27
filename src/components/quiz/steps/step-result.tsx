"use client";

import React, { useEffect, useState } from "react";
import { StepCard } from "../step-card";
import { useQuiz } from "@/lib/quiz-context";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";
import { BMIChart } from "../bmi-chart";
import { SalesPage } from "@/components/sales/sales-page";

export function StepResult() {
    const { calculateBiologicalAge, answers } = useQuiz();
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<{ bioAge: number; chronologicalAge: number; bmi: number } | null>(null);
    const [showSales, setShowSales] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setResult(calculateBiologicalAge());
            setLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, [calculateBiologicalAge]);

    if (loading) {
        return (
            <StepCard title="Analisando seu Perfil Biológico...">
                <div className="flex flex-col items-center justify-center py-12 space-y-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                        <Loader2 className="h-16 w-16 animate-spin text-primary relative z-10" />
                    </div>
                    <div className="space-y-2 text-center">
                        <p className="text-lg font-medium text-zinc-600">Processando dados metabólicos...</p>
                        <p className="text-sm text-muted-foreground">Calculando idade biológica real</p>
                    </div>
                </div>
            </StepCard>
        );
    }

    if (!result) return null;

    if (showSales) {
        return <SalesPage bioAge={result.bioAge} />;
    }

    const ageDifference = result.bioAge - result.chronologicalAge;
    const isOlder = result.bioAge > result.chronologicalAge;

    return (
        <StepCard title={<span className="text-primary uppercase tracking-widest text-sm font-bold">Seu perfil está pronto!</span>}>
            <div className="space-y-10">

                {/* Age Comparison Section */}
                <div className="bg-zinc-50 rounded-3xl p-6 border border-zinc-100 shadow-sm">
                    <h3 className="text-center text-xl font-bold text-zinc-800 mb-6">Comparativo de Idade</h3>
                    <div className="flex items-center justify-between gap-4">
                        {/* Chronological Age */}
                        <div className="flex-1 flex flex-col items-center space-y-2">
                            <span className="text-sm font-medium text-zinc-500 uppercase tracking-wide">Idade Real</span>
                            <div className="w-24 h-24 rounded-full border-4 border-zinc-200 flex items-center justify-center bg-white shadow-sm">
                                <span className="text-3xl font-bold text-zinc-700">{result.chronologicalAge}</span>
                            </div>
                        </div>

                        {/* Arrow/Difference */}
                        <div className="flex flex-col items-center">
                            <div className="h-px w-12 bg-zinc-300 mb-2"></div>
                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${isOlder ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                {isOlder ? `+${ageDifference} anos` : `${ageDifference} anos`}
                            </span>
                        </div>

                        {/* Biological Age */}
                        <div className="flex-1 flex flex-col items-center space-y-2">
                            <span className="text-sm font-medium text-zinc-500 uppercase tracking-wide">Idade Biológica</span>
                            <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center bg-white shadow-md relative overflow-hidden ${isOlder ? 'border-red-500' : 'border-emerald-500'}`}>
                                <span className={`text-3xl font-bold ${isOlder ? 'text-red-600' : 'text-emerald-600'}`}>{result.bioAge}</span>
                                {isOlder && <div className="absolute inset-0 bg-red-500/10 animate-pulse"></div>}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-zinc-600 leading-relaxed">
                            {isOlder
                                ? <span>Seu corpo está envelhecendo <span className="font-bold text-red-600">mais rápido</span> que o normal. Isso indica inflamação e desgaste metabólico.</span>
                                : <span>Parabéns! Seu corpo está <span className="font-bold text-emerald-600">mais jovem</span> que sua idade real. Continue assim!</span>}
                        </p>
                    </div>
                </div>

                {/* BMI Chart Section */}
                <div className="bg-white rounded-3xl p-2">
                    <div className="bg-primary/5 rounded-xl p-4 mb-6 text-center">
                        <span className="text-primary font-medium">Seu (IMC) Índice de Massa Corporal é: <span className="font-bold text-xl ml-2">{result.bmi}</span></span>
                    </div>
                    <BMIChart bmi={result.bmi} />
                </div>

                {/* CTA */}
                <div className="pt-4">
                    <Button
                        className="w-full h-16 text-xl font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/50 transition-all bg-primary hover:bg-primary/90 animate-pulse"
                        onClick={() => setShowSales(true)}
                    >
                        Ver Plano de Rejuvenescimento
                        <ArrowRight className="ml-2 h-6 w-6" />
                    </Button>
                    <p className="text-xs text-center text-muted-foreground mt-4">
                        Baseado em seus {answers.symptoms.length} sintomas e hábitos diários.
                    </p>
                </div>
            </div>
        </StepCard>
    );
}
