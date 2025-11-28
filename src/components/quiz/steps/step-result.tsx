"use client";

import React, { useEffect, useState } from "react";
import { StepCard } from "../step-card";
import { useQuiz } from "@/lib/quiz-context";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight, Activity, AlertTriangle } from "lucide-react";

import dynamic from "next/dynamic";

const SalesPage = dynamic(() => import("@/components/sales/sales-page").then(mod => mod.SalesPage), {
    loading: () => <div className="h-screen w-full flex items-center justify-center bg-white"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>
});

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { saveQuizResult } from "@/lib/quiz-service";

export function StepResult() {
    const { calculateBiologicalAge, answers } = useQuiz();
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<{ bioAge: number; chronologicalAge: number; bmi: number; ageDiff: number } | null>(null);
    const [showSales, setShowSales] = useState(false);

    useEffect(() => {
        // 1. Calcular resultado imediatamente
        let res: any = null;
        try {
            res = calculateBiologicalAge();
            setResult(res);
        } catch (error) {
            console.error("Error calculating age:", error);
            setLoading(false);
            return;
        }

        // 2. Salvar no Supabase em background (sem bloquear a UI)
        const saveToDb = async () => {
            const leadId = localStorage.getItem("currentLeadId");
            if (leadId && res) {
                await saveQuizResult(leadId, res);
            }
        };
        saveToDb();

        // 3. Timer apenas para a experiência visual (reduzido para 1.5s)
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);

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

    if (!result) {
        return (
            <StepCard title="Erro ao calcular">
                <div className="text-center space-y-4">
                    <p>Ocorreu um erro ao processar seus dados.</p>
                    <Button onClick={() => window.location.reload()}>Tentar Novamente</Button>
                </div>
            </StepCard>
        );
    }

    if (showSales) {
        return <SalesPage bioAge={result.bioAge} />;
    }

    const symptomCauses: Record<string, string> = {
        "hot_flashes": "Indica desequilíbrio hormonal",
        "insomnia": "Sinal de cortisol elevado",
        "fatigue": "Metabolismo desacelerado",
        "mood_swings": "Flutuação hormonal acelerada"
    };

    const selectedSymptoms = (answers.symptoms || []).filter(s => symptomCauses[s]);

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">

            {/* Urgency Banner */}
            <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3 text-red-800 text-sm font-medium shadow-sm">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <p>A cada mês sem ação, sua idade biológica pode aumentar mais 0,5 anos.</p>
            </div>

            <Card className="border-none shadow-2xl bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden ring-1 ring-black/5">
                <CardHeader className="text-center pb-2 pt-8 px-6">
                    <CardTitle className="text-2xl md:text-3xl font-extrabold text-zinc-800 leading-tight uppercase">
                        SEU PERFIL ESTÁ PRONTO, <span className="text-primary">{answers.name || "VISITANTE"}</span>!
                    </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-8 pt-4 space-y-8">

                    {/* Age Comparison */}
                    <div className="flex justify-center items-end gap-4 md:gap-8">
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Idade Real</span>
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-zinc-200 flex items-center justify-center bg-zinc-50">
                                <span className="text-3xl md:text-4xl font-bold text-zinc-400">{result.chronologicalAge}</span>
                            </div>
                        </div>

                        <div className="pb-8 md:pb-10">
                            <ArrowRight className="w-8 h-8 text-zinc-300" />
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <span className="text-sm font-semibold text-primary uppercase tracking-wider font-bold">Idade Biológica</span>
                            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-primary shadow-xl shadow-primary/20 flex items-center justify-center bg-white relative overflow-hidden">
                                <div className="absolute inset-0 bg-primary/5 animate-pulse"></div>
                                <span className="text-4xl md:text-5xl font-extrabold text-primary relative z-10">{result.bioAge}</span>
                            </div>
                        </div>
                    </div>

                    {/* Symptom Analysis Section */}
                    {/* Symptom Analysis Section */}
                    {selectedSymptoms.length > 0 && (
                        <div className="bg-zinc-50 rounded-2xl p-6 space-y-4 border border-zinc-100">
                            <h3 className="font-bold text-zinc-800 text-lg flex items-center gap-2">
                                <Activity className="w-5 h-5 text-primary" />
                                Seu Metabolismo não está "lento", ele está <span className="text-red-500 uppercase">BLOQUEADO</span>.
                            </h3>

                            <p className="text-zinc-600 leading-relaxed">
                                Sua Idade Biológica de <span className="font-bold text-zinc-900">{result.bioAge} anos</span> mostra um corpo em resistência.
                            </p>

                            <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm space-y-3">
                                <p className="text-zinc-700 font-medium">
                                    Você notou que a gordura mudou? Que ela foi para a barriga e costas?
                                </p>
                                <p className="text-zinc-600 text-sm">
                                    Isso é o <span className="font-bold text-primary">"Escudo de Cortisol"</span>. Seu corpo está tentando se proteger das mudanças hormonais acumulando energia.
                                </p>
                                <p className="text-zinc-600 text-sm italic border-l-2 border-primary pl-3">
                                    "Fazer dieta agora é como tentar tirar dinheiro de um banco em crise: ele vai travar o cofre."
                                </p>
                            </div>

                            <p className="text-sm text-zinc-500 text-center pt-2">
                                O <span className="font-bold text-primary">Método Asiático</span> não "ataca" a gordura. Ele convence seu corpo de que é seguro liberá-la.
                            </p>
                        </div>
                    )}

                    {/* BMI Section (Simplified) */}
                    <div className="text-center space-y-2">
                        <p className="text-zinc-600">
                            Seu IMC calculado é <span className="font-bold text-zinc-900">{result.bmi}</span>
                        </p>
                        <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden mt-2">
                            <div className="h-full bg-gradient-to-r from-green-400 to-red-500 w-full opacity-50"></div>
                        </div>
                    </div>

                    {/* CTA */}
                    <Button
                        onClick={() => setShowSales(true)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white text-xl font-bold py-8 rounded-2xl shadow-lg shadow-green-600/20 animate-bounce-slow"
                    >
                        Ver Meu Plano de Rejuvenescimento
                    </Button>

                </CardContent>
            </Card>
        </div>
    );
}
