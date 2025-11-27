"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Star, Clock, ShieldCheck, ChevronDown, ChevronUp } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ImageCarousel } from "./image-carousel";
import { ImageComparisonSlider } from "./image-comparison-slider";

interface SalesPageProps {
    bioAge: number;
}

export function SalesPage({ bioAge }: SalesPageProps) {
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    return (
        <div className="bg-white min-h-screen font-sans text-zinc-900">
            {/* --- BLOCK 1: URGENCY & OFFER --- */}
            <section className="bg-zinc-50 pb-12 pt-6 px-4 md:px-6 border-b border-zinc-200">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    {/* Timer */}
                    <div className="bg-[#E91E63]/10 text-[#E91E63] font-bold py-2 px-4 rounded-full inline-flex items-center gap-2 animate-pulse">
                        <Clock className="w-4 h-4" />
                        <span>DESCONTO RESERVADO POR: {formatTime(timeLeft)}</span>
                    </div>

                    {/* Headlines */}
                    <div className="space-y-4">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-[#E91E63] leading-tight">
                            SEU DIAGNÓSTICO NÃO MENTE: <br />
                            <span className="text-zinc-900">Sua Idade Biológica é de {bioAge} anos.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-zinc-600 font-medium">
                            O MÉTODO ORIENTAL DE 9 MINUTOS QUE REATIVA O CORPO FEMININO E REVERTE O RELÓGIO BIOLÓGICO MESMO APÓS OS 40!
                        </p>
                    </div>

                    {/* Before/After Hero Section (Interactive Slider) */}
                    <div className="py-6">
                        <ImageComparisonSlider
                            beforeImage="/images/hero-before.jpg"
                            afterImage="/images/hero-after.jpg"
                        />
                        <p className="text-sm text-zinc-400 mt-2 animate-pulse">
                            (Arraste para ver a transformação)
                        </p>
                    </div>

                    {/* Scarcity & Price */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-[#E91E63]/20 space-y-4">
                        <p className="text-red-500 font-bold text-sm uppercase tracking-wider">
                            🔥 ÚLTIMAS 23 VAGAS COM DESCONTO EXCLUSIVO! 🔥
                        </p>
                        <div className="space-y-2">
                            <p className="text-zinc-400 line-through text-lg">Fonte da Juventude ~R$ 67,90~</p>
                            <p className="text-4xl md:text-5xl font-black text-[#E91E63]">R$ 26,90</p>
                            <p className="text-zinc-500 text-sm">ou APENAS R$ 0,89 Por Dia</p>
                        </div>
                        <Button
                            className="w-full h-auto py-4 text-lg md:text-2xl font-bold bg-[#E91E63] hover:bg-[#D81B60] shadow-xl shadow-[#E91E63]/30 rounded-xl animate-bounce whitespace-normal leading-tight mt-6"
                            onClick={() => window.location.href = "https://www.ggcheckout.com/checkout/v2/sJfhrLfRRJSwyGfEVokp"}
                        >
                            QUERO REVERTER MEU RELÓGIO BIOLÓGICO AGORA!
                        </Button>
                    </div>
                </div>
            </section>

            {/* --- BLOCK 2: SOCIAL PROOF (BEFORE/AFTER) --- */}
            <section className="py-12 px-4 md:px-6 bg-white">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-zinc-800">
                        Veja a prova de que o seu Relógio Biológico pode ser <span className="text-[#E91E63]">REPROGRAMADO!</span>
                    </h2>

                    {/* GIF Integration */}
                    <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-[#E91E63]/10 max-w-sm mx-auto">
                        <img
                            src="https://media.inlead.cloud/uploads/39745/2025-10-16/bppGU-gif-app.gif"
                            alt="Demonstração do App"
                            className="w-full h-auto"
                        />
                    </div>

                    <p className="text-zinc-500 italic">"Barriga chapada, postura ereta e pele firme em apenas 4 semanas."</p>
                </div>

                {/* Carousel Section */}
                <div className="mt-12 px-4">
                    <ImageCarousel />
                    <div className="mt-8 text-center">
                        <Button
                            className="w-full max-w-md h-auto py-4 text-lg font-bold bg-[#E91E63] hover:bg-[#D81B60] shadow-xl shadow-[#E91E63]/30 rounded-xl animate-pulse whitespace-normal leading-tight"
                            onClick={() => window.location.href = "https://www.ggcheckout.com/checkout/v2/sJfhrLfRRJSwyGfEVokp"}
                        >
                            QUERO RESULTADOS ASSIM!
                        </Button>
                    </div>
                </div>
            </section>

            {/* --- BLOCK 3: AUTHORITY --- */}
            <section className="py-16 px-4 md:px-6 bg-zinc-50">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
                    <div className="w-full md:w-1/3">
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#E91E63] rounded-3xl rotate-6 opacity-20"></div>
                            <img
                                src="/images/trainer.png"
                                alt="Ellen Nakamura"
                                className="relative rounded-3xl shadow-2xl w-full object-cover aspect-[3/4]"
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-2/3 space-y-6 text-center md:text-left">
                        <h2 className="text-3xl font-bold text-zinc-900">
                            Conheça <span className="text-[#E91E63]">Ellen Nakamura</span>: <br />
                            A Especialista que Reverteu o Próprio Relógio Biológico.
                        </h2>
                        <div className="space-y-4 text-zinc-600 text-lg leading-relaxed">
                            <p>
                                Após anos estudando as técnicas milenares do oriente, Ellen descobriu que o segredo da juventude não estava em cremes caros ou cirurgias, mas na <strong>ativação hormonal</strong> através de movimentos específicos.
                            </p>
                            <p>
                                Ela adaptou o rigoroso método asiático para a rotina da mulher brasileira, criando o protocolo <strong>"Fonte da Juventude"</strong>: rápido, eficaz e 100% natural.
                            </p>
                        </div>
                        <Button
                            className="w-full md:w-auto px-8 h-auto py-3 text-lg font-bold bg-[#E91E63] hover:bg-[#D81B60] shadow-lg rounded-xl"
                            onClick={() => window.location.href = "https://www.ggcheckout.com/checkout/v2/sJfhrLfRRJSwyGfEVokp"}
                        >
                            CONHECER O MÉTODO
                        </Button>
                    </div>
                </div>
            </section>

            {/* --- BLOCK 4: DETAILED BENEFITS --- */}
            <section className="py-16 px-4 md:px-6 bg-white">
                <div className="max-w-3xl mx-auto space-y-10">
                    <h2 className="text-3xl font-bold text-center text-zinc-900">
                        O que você vai receber no <span className="text-[#E91E63]">Fonte da Juventude</span>:
                    </h2>
                    <div className="grid gap-6">
                        {[
                            { title: "Reversão Biológica", desc: "Treinos de 9 minutos que reprogramam o corpo para a composição hormonal de uma jovem." },
                            { title: "Corpo Esculpido", desc: "Exercícios leves para barriga chapada, cintura fina e glúteos firmes." },
                            { title: "Mente Zen", desc: "Técnicas de respiração para eliminar o estresse, a ansiedade e as ondas de calor." },
                            { title: "Postura e Articulações", desc: "Juntas mais flexíveis e postura elegante, eliminando dores e rigidez." }
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-zinc-50 transition-colors">
                                <div className="bg-[#E91E63]/10 p-2 rounded-full flex-shrink-0">
                                    <Check className="w-6 h-6 text-[#E91E63]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-zinc-900">{item.title}</h3>
                                    <p className="text-zinc-600">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 text-center">
                        <Button
                            className="w-full max-w-md h-auto py-4 text-lg font-bold bg-[#E91E63] hover:bg-[#D81B60] shadow-xl shadow-[#E91E63]/30 rounded-xl animate-bounce whitespace-normal leading-tight"
                            onClick={() => window.location.href = "https://www.ggcheckout.com/checkout/v2/sJfhrLfRRJSwyGfEVokp"}
                        >
                            QUERO ESSES BENEFÍCIOS
                        </Button>
                    </div>
                </div>
            </section>

            {/* --- BLOCK 5: RESULTS & TESTIMONIALS --- */}
            <section className="py-12 px-4 md:px-6 bg-white">
                <div className="max-w-2xl mx-auto text-center space-y-12">
                    <h2 className="text-2xl md:text-3xl font-extrabold leading-tight text-zinc-900">
                        Confira a transformação real de quem já está conquistando o <span className="text-[#E91E63]">corpo e a pele dos 20 de novo!</span>
                    </h2>

                    <div className="space-y-12">
                        {[
                            {
                                name: "Juliana",
                                loss: "-6kg",
                                text: "Perdeu 6kg em apenas 14 dias.",
                                image: "/images/testimonial-juliana.webp"
                            },
                            {
                                name: "Adriana",
                                loss: "-9kg",
                                text: "Perdeu 9kg em apenas 19 dias.",
                                image: "/images/testimonial-adriana.webp"
                            },
                            {
                                name: "Marta",
                                loss: "-9kg",
                                text: "Perdeu 9kg em apenas 17 dias.",
                                image: "/images/testimonial-marta.webp"
                            }
                        ].map((t, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className="mb-4 space-y-1">
                                    <h3 className="text-[#E91E63] font-bold text-xl uppercase tracking-wide">
                                        {t.name} | {t.loss}
                                    </h3>
                                    <p className="text-zinc-900 font-bold text-lg">
                                        {t.text}
                                    </p>
                                </div>
                                <div className="w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-zinc-100">
                                    <img
                                        src={t.image}
                                        alt={`Transformação de ${t.name}`}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 text-center">
                        <Button
                            className="w-full max-w-md h-auto py-4 text-lg font-bold bg-[#E91E63] hover:bg-[#D81B60] shadow-xl shadow-[#E91E63]/30 rounded-xl animate-pulse whitespace-normal leading-tight"
                            onClick={() => window.location.href = "https://www.ggcheckout.com/checkout/v2/sJfhrLfRRJSwyGfEVokp"}
                        >
                            QUERO MEU CORPO DE VOLTA
                        </Button>
                    </div>
                </div>
            </section>

            {/* --- BLOCK 6: VALUE STACK (BONUSES) --- */}
            <section className="py-16 px-4 md:px-6 bg-white">
                <div className="max-w-3xl mx-auto space-y-10">
                    <div className="text-center">
                        <span className="bg-[#E91E63] text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">Oferta Especial</span>
                        <h2 className="text-3xl font-bold text-zinc-900 mt-4">
                            + Bônus Exclusivos para Acelerar Sua Reversão
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            { title: "Guia de Nutrição 'Desincha Rápido'", val: "R$ 47,00" },
                            { title: "Rotina de Relaxamento 'Sono Profundo'", val: "R$ 37,00" },
                            { title: "Aulas de Baixo Impacto para Articulações Sensíveis", val: "R$ 57,00" }
                        ].map((bonus, i) => (
                            <div key={i} className="flex items-center justify-between p-4 border border-zinc-200 rounded-xl bg-zinc-50">
                                <div className="flex items-center gap-4">
                                    <div className="bg-[#E91E63] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                                        {i + 1}
                                    </div>
                                    <span className="font-bold text-zinc-800">{bonus.title}</span>
                                </div>
                                <span className="text-zinc-400 line-through text-sm hidden md:block">Valor: {bonus.val}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 text-center">
                        <Button
                            className="w-full max-w-md h-auto py-4 text-lg font-bold bg-[#E91E63] hover:bg-[#D81B60] shadow-xl shadow-[#E91E63]/30 rounded-xl animate-bounce whitespace-normal leading-tight"
                            onClick={() => window.location.href = "https://www.ggcheckout.com/checkout/v2/sJfhrLfRRJSwyGfEVokp"}
                        >
                            QUERO GARANTIR MEUS BÔNUS
                        </Button>
                    </div>
                </div>
            </section>

            {/* --- BLOCK 7: GUARANTEE & FAQ & FINAL CTA --- */}
            <section className="py-16 px-4 md:px-6 bg-zinc-50">
                <div className="max-w-3xl mx-auto space-y-12">
                    {/* Guarantee */}
                    <div className="bg-white p-8 rounded-3xl shadow-xl border border-zinc-100 text-center space-y-6">
                        <ShieldCheck className="w-16 h-16 text-[#E91E63] mx-auto" />
                        <h3 className="text-2xl font-bold text-zinc-900">Garantia de 30 Dias: Seu Risco é ZERO!</h3>
                        <p className="text-zinc-600">
                            Você tem 30 dias inteiros para testar o Fonte da Juventude. Se não sentir seu corpo mudando, nós devolvemos 100% do seu dinheiro. Sem perguntas.
                        </p>
                    </div>

                    {/* FAQ */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-center text-zinc-900 mb-6">Perguntas Frequentes</h3>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Como vou receber o acesso?</AccordionTrigger>
                                <AccordionContent>
                                    Imediatamente após a confirmação do pagamento, você receberá um e-mail com seu login e senha para acessar nossa plataforma exclusiva de alunas.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Tenho dores nas costas, posso fazer?</AccordionTrigger>
                                <AccordionContent>
                                    Sim! O método inclui um módulo específico de baixo impacto e fortalecimento para quem tem sensibilidade nas articulações.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Preciso de equipamentos?</AccordionTrigger>
                                <AccordionContent>
                                    Não. Todos os exercícios são feitos usando apenas o peso do corpo e podem ser realizados na sala da sua casa.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    {/* Final CTA */}
                    <div className="text-center space-y-6 pt-8">
                        <div className="space-y-2">
                            <p className="text-4xl font-black text-[#E91E63]">R$ 26,90</p>
                            <p className="text-zinc-500">Pagamento Único | Acesso Vitalício</p>
                        </div>
                        <Button
                            className="w-full h-20 text-2xl font-bold bg-[#E91E63] hover:bg-[#D81B60] shadow-2xl shadow-[#E91E63]/40 rounded-xl animate-pulse"
                            onClick={() => window.location.href = "https://www.ggcheckout.com/checkout/v2/sJfhrLfRRJSwyGfEVokp"}
                        >
                            QUERO MEU PLANO AGORA!
                        </Button>
                        <div className="flex items-center justify-center gap-2 text-sm text-zinc-500">
                            <ShieldCheck className="w-4 h-4" />
                            <span>Compra 100% Segura e Criptografada</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
