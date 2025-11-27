"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type AgeRange = "39-45" | "46-50" | "51-60" | "60+";
export type Goal = "fat_loss" | "tone" | "posture" | "energy";
export type Symptom = "hot_flashes" | "insomnia" | "fatigue" | "mood_swings";
export type StressLevel = "high" | "medium" | "low";
export type PreviousAttempts = "gym" | "diet" | "pills" | "none";
export type TimeAvailability = "5-10" | "15-30" | "30+";
export type ProblemArea = "belly" | "arms" | "legs" | "face";
export type Commitment = "yes" | "maybe" | "no";
export type ExerciseFreq = "0" | "1-2" | "3-4" | "5+";
export type Metabolism = "slow" | "normal" | "fast";
export type PainArea = "knees" | "back" | "neck" | "shoulders" | "hips" | "none";
export type SkinFirmness = "firm" | "moderate" | "sagging";

export interface QuizAnswers {
    name: string;
    whatsapp: string;
    ageRange: AgeRange | null;
    goal: Goal | null;
    problemArea: ProblemArea | null;
    symptoms: Symptom[];
    stressLevel: StressLevel | null;
    previousAttempts: PreviousAttempts | null;
    timeAvailability: TimeAvailability | null;
    height: string;
    weight: string;
    commitment: Commitment | null;

    // Deprecated/Removed from flow but kept for type safety if needed temporarily
    skinFirmness?: SkinFirmness;
    exerciseFreq?: ExerciseFreq;
    painAreas?: PainArea[];
    metabolism?: Metabolism;
}

interface QuizContextType {
    step: number;
    totalSteps: number;
    answers: QuizAnswers;
    setAnswer: <K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => void;
    nextStep: () => void;
    prevStep: () => void;
    goToStep: (step: number) => void;
    calculateBiologicalAge: () => { bioAge: number; chronologicalAge: number; bmi: number; ageDiff: number };
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

const MAX_STEPS = 13;

export function QuizProvider({ children }: { children: ReactNode }) {
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState<QuizAnswers>({
        name: "",
        whatsapp: "",
        ageRange: null,
        goal: null,
        problemArea: null,
        symptoms: [],
        stressLevel: null,
        previousAttempts: null,
        timeAvailability: null,
        height: "",
        weight: "",
        commitment: null,
    });

    const setAnswer = <K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => {
        setAnswers((prev) => ({ ...prev, [key]: value }));
    };

    const nextStep = () => {
        if (step < MAX_STEPS) setStep((prev) => prev + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep((prev) => prev - 1);
    };

    const goToStep = (s: number) => {
        if (s >= 1 && s <= MAX_STEPS) setStep(s);
    };

    const calculateBiologicalAge = () => {
        // Base age estimation from range
        let baseAge = 40;
        if (answers.ageRange === "46-50") baseAge = 48;
        if (answers.ageRange === "51-60") baseAge = 55;
        if (answers.ageRange === "60+") baseAge = 65;

        let bioAge = baseAge;

        // Symptoms (+1.5 per symptom to compensate for fewer questions)
        bioAge += answers.symptoms.length * 1.5;

        // Stress
        if (answers.stressLevel === "high") bioAge += 3;
        if (answers.stressLevel === "medium") bioAge += 1;

        // Previous Attempts (Yo-yo effect)
        if (answers.previousAttempts === "pills" || answers.previousAttempts === "diet") bioAge += 2;

        // BMI Calculation
        const cleanHeight = answers.height?.replace(',', '.') || "0";
        const cleanWeight = answers.weight?.replace(',', '.') || "0";

        const hVal = parseFloat(cleanHeight);
        const wVal = parseFloat(cleanWeight);

        const h = (isNaN(hVal) ? 0 : hVal) / 100; // cm to m
        const w = isNaN(wVal) ? 0 : wVal;

        let bmi = 0;

        if (h > 0 && w > 0) {
            bmi = w / (h * h);
            if (bmi > 25) bioAge += 2;
            if (bmi > 30) bioAge += 3;
        }

        // Ensure bioAge is always higher than chronological for sales impact
        if (bioAge <= baseAge) bioAge = baseAge + 2;

        return {
            bioAge: Math.round(bioAge),
            chronologicalAge: baseAge,
            bmi: parseFloat(bmi.toFixed(1)),
            ageDiff: Math.round(bioAge - baseAge)
        };
    };

    return (
        <QuizContext.Provider
            value={{
                step,
                totalSteps: MAX_STEPS,
                answers,
                setAnswer,
                nextStep,
                prevStep,
                goToStep,
                calculateBiologicalAge,
            }}
        >
            {children}
        </QuizContext.Provider>
    );
}

export function useQuiz() {
    const context = useContext(QuizContext);
    if (context === undefined) {
        throw new Error("useQuiz must be used within a QuizProvider");
    }
    return context;
}
