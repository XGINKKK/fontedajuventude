"use client";

import React from "react";
import { useQuiz } from "@/lib/quiz-context";
import { motion, AnimatePresence } from "framer-motion";

import Image from "next/image";

export function QuizLayout({ children }: { children: React.ReactNode }) {
    const { step, totalSteps } = useQuiz();
    const progress = (step / totalSteps) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 flex flex-col items-center py-10 px-4 font-sans">
            {/* Logo & Progress Section */}
            <div className="w-full max-w-lg mb-10 space-y-6 flex flex-col items-center">
                <div className="relative h-48 w-full max-w-[300px]">
                    <Image
                        src="/logo.png"
                        alt="Pilates Asiático Logo"
                        fill
                        className="object-contain"
                        priority
                        sizes="(max-width: 768px) 80vw, 300px"
                    />
                </div>

                <div className="w-full space-y-3">
                    <div className="flex justify-between text-sm font-semibold text-muted-foreground tracking-wide uppercase">
                        <span>Diagnóstico Corporal</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-3 w-full bg-secondary rounded-full overflow-hidden shadow-inner">
                        <motion.div
                            className="h-full bg-gradient-to-r from-pink-500 to-rose-600 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="w-full max-w-lg perspective-1000">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 50, rotateY: -5 }}
                        animate={{ opacity: 1, x: 0, rotateY: 0 }}
                        exit={{ opacity: 0, x: -50, rotateY: 5 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="w-full"
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
