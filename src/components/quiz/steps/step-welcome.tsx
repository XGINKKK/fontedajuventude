"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuiz } from "@/lib/quiz-context";
import { ArrowRight } from "lucide-react";

import Image from "next/image";

export function StepWelcome() {
    const { nextStep } = useQuiz();

    return (
        <div className="w-full max-w-md mx-auto relative mt-12">
            <div className="absolute left-1/2 -translate-x-1/2 -top-16 z-10">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl relative">
                    <Image
                        src="/images/trainer.png"
                        alt="Ellen Nakamura"
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 128px, 128px"
                    />
                </div>
            </div>

            <Card className="border-none shadow-2xl bg-white/90 backdrop-blur-sm rounded-3xl overflow-visible ring-1 ring-black/5 pt-16">
                <CardHeader className="text-center pb-2 px-6">
                    <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold mb-4">
                        Diagnóstico Gratuito
                    </div>
                    <CardTitle className="text-3xl md:text-4xl font-extrabold text-zinc-800 leading-tight">
                        Por que sua dieta parou de funcionar depois dos 40?
                    </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-8 pt-4 text-center">
                    <p className="text-zinc-600 mb-8 text-lg leading-relaxed">
                        Descubra se o seu Metabolismo entrou em <span className="text-primary font-bold">"Pausa Hormonal"</span> e receba um plano para destravá-lo.
                    </p>

                    <Button
                        onClick={nextStep}
                        className="w-full bg-primary hover:bg-primary/90 text-white text-xl font-bold py-8 rounded-2xl shadow-lg shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98] group"
                    >
                        Começar Diagnóstico
                        <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </Button>

                    <p className="mt-4 text-xs text-zinc-400">
                        Levará menos de 3 minutos.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
