"use client";

import React from "react";
import { StepCard } from "../step-card";
import { useQuiz } from "@/lib/quiz-context";
import { Button } from "@/components/ui/button";
import { Quote, ArrowRight } from "lucide-react";

import Image from "next/image";

export function StepTransition() {
    const { nextStep } = useQuiz();
    const [imgError, setImgError] = React.useState(false);

    return (
        <StepCard title={<span>A jornada para um corpo <span className="text-primary font-bold">mais jovem</span> começa aqui.</span>}>
            <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-full h-80 bg-zinc-100 rounded-2xl flex items-center justify-center overflow-hidden relative shadow-lg">
                    {!imgError ? (
                        <Image
                            src="/images/trainer.png"
                            alt="Ellen Nakamura - Treinadora Pilates Asiático"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                            onError={() => setImgError(true)}
                            sizes="(max-width: 512px) 100vw, 512px"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center text-zinc-400 p-6">
                            <span className="text-4xl mb-2">🧘‍♀️</span>
                            <span className="text-sm font-medium">Ellen Nakamura</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-center pb-6">
                        <div className="text-center bg-black/30 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/10">
                            <p className="text-white/90 text-xs font-medium tracking-widest uppercase mb-1">Sua Mentora</p>
                            <p className="text-white font-bold text-xl">Ellen Nakamura</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <Quote className="w-10 h-10 text-primary mx-auto opacity-20" />
                    <h3 className="text-2xl font-bold text-foreground">
                        &quot;Seu corpo não precisa envelhecer no ritmo do seu <span className="text-primary">calendário</span>.&quot;
                    </h3>
                    <p className="text-muted-foreground text-lg">
                        O Pilates Asiático é validado por estudos que comprovam a reversão dos efeitos do tempo no corpo feminino.
                    </p>
                </div>

                <Button
                    onClick={nextStep}
                    className="w-full bg-primary hover:bg-primary/90 text-white text-xl font-bold py-8 rounded-2xl shadow-lg shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                    Descobrir Minha Idade Biológica
                    <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
            </div>
        </StepCard>
    );
}
