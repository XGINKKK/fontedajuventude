"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
    {
        id: 1,
        title: "Perda de Peso e Corpo Esculpido",
        description: "Diga adeus à gordura que te impede de ter a silhueta dos seus 20! Com o Fonte da Juventude, você elimina o excesso de peso e modela o corpo, revelando uma versão mais magra, firme e deslumbrante.",
        image: "/images/carousel-1.webp"
    },
    {
        id: 2,
        title: "Postura Deslumbrante e Elegância",
        description: "Uma postura impecável rejuvenesce e exala confiança! Seu plano personalizado inclui exercícios para alinhar seu corpo, eliminar dores e te fazer parecer mais alta, esguia e elegante, como nos seus melhores anos.",
        image: "/images/carousel-2.webp"
    },
    {
        id: 3,
        title: "Força e Vitalidade Jovem",
        description: "Sinta a energia e a força de volta para viver intensamente! Com apenas 9 minutos diários do nosso plano, você fortalece o corpo, ganha disposição e esculpe os músculos, exibindo uma vitalidade que desafia a idade.",
        image: "/images/carousel-3.webp"
    },
    {
        id: 4,
        title: "Mente Jovem e Leve",
        description: "O estresse e a ansiedade não combinam com a sua beleza! Nossas técnicas acalmam a mente, diminuem a tensão e previnem o ganho de peso causado pelo nervosismo, deixando você com um semblante sereno.",
        image: "/images/carousel-4.webp"
    }
];

export function ImageCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(timer);
    }, [currentIndex]);

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    return (
        <div className="relative w-full max-w-md mx-auto">
            <div className="relative h-[580px] md:h-[650px] rounded-3xl shadow-xl bg-white border border-zinc-200 overflow-hidden">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className="absolute inset-0 flex flex-col h-full"
                    >
                        {/* Image Section - Top */}
                        <div className="w-full h-[60%] md:h-[65%] relative bg-white">
                            <img
                                src={slides[currentIndex].image}
                                alt={slides[currentIndex].title}
                                className="w-full h-full object-contain object-center"
                            />
                        </div>

                        {/* Content Section - Bottom */}
                        <div className="w-full h-[40%] md:h-[35%] p-6 pb-12 flex flex-col items-center justify-center text-center bg-white">
                            <h3 className="text-lg md:text-2xl font-extrabold text-zinc-900 mb-2 md:mb-4 leading-tight">
                                {slides[currentIndex].title}
                            </h3>
                            <p className="text-zinc-600 text-xs md:text-base leading-relaxed line-clamp-5">
                                {slides[currentIndex].description}
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <button
                    className="absolute left-2 top-[25%] -translate-y-1/2 bg-white/80 hover:bg-white text-[#E91E63] p-2 rounded-full shadow-lg z-10 transition-all backdrop-blur-sm border border-zinc-100"
                    onClick={prevSlide}
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    className="absolute right-2 top-[25%] -translate-y-1/2 bg-white/80 hover:bg-white text-[#E91E63] p-2 rounded-full shadow-lg z-10 transition-all backdrop-blur-sm border border-zinc-100"
                    onClick={nextSlide}
                >
                    <ChevronRight className="w-6 h-6" />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setDirection(index > currentIndex ? 1 : -1);
                                setCurrentIndex(index);
                            }}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentIndex ? "bg-[#E91E63] w-8" : "bg-zinc-300 hover:bg-[#E91E63]/50"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
