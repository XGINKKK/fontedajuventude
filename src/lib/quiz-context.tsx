"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type AgeRange = "39-45" | "46-50" | "51-60" | "60+";
export type Goal = "fat_loss" | "tone" | "posture" | "energy";
export type Symptom = "hot_flashes" | "insomnia" | "fatigue" | "mood_swings";
export type SkinFirmness = "sagging" | "moderate" | "firm";
export type ExerciseFreq = "0" | "1-2" | "3-4" | "5+";
export type PainArea = "back" | "knees" | "shoulders" | "hips" | "none";

// New Types for 15-Step Funnel
export type Metabolism = "slow" | "normal" | "fast";
export type ProblemArea = "belly" | "arms" | "legs" | "face";
export type StressLevel = "high" | "medium" | "low";
export type PreviousAttempts = "gym" | "diet" | "pills" | "none";
export type TimeAvailability = "5-10" | "15-30" | "30+";

export interface QuizAnswers {
    ageRange: AgeRange | null;
    goal: Goal | null;
    symptoms: Symptom[];
    skinFirmness: SkinFirmness | null;
    exerciseFreq: ExerciseFreq | null;
    painAreas: PainArea[];
    height: string; // keeping as string for input handling
    weight: string;

    // New Fields
    metabolism: Metabolism | null;
    problemArea: ProblemArea | null;
    stressLevel: StressLevel | null;
    previousAttempts: PreviousAttempts | null;
    timeAvailability: TimeAvailability | null;
}

interface QuizContextType {
    step: number;
    totalSteps: number;
    answers: QuizAnswers;
    setAnswer: <K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => void;
    nextStep: () => void;
    prevStep: () => void;
    goToStep: (step: number) => void;
    calculateBiologicalAge: () => { bioAge: number; chronologicalAge: number; bmi: number };
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

const TOTAL_STEPS = 15;

export function QuizProvider({ children }: { children: ReactNode }) {
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState<QuizAnswers>({
        ageRange: null,
        goal: null,
        symptoms: [],
        skinFirmness: null,
        exerciseFreq: null,
        painAreas: [],
        height: "",
        weight: "",
        metabolism: null,
        problemArea: null,
        stressLevel: null,
        previousAttempts: null,
        timeAvailability: null,
    });

    const setAnswer = <K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => {
        setAnswers((prev) => ({ ...prev, [key]: value }));
    };

    const nextStep = () => {
        if (step < TOTAL_STEPS) setStep((prev) => prev + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep((prev) => prev - 1);
    };

    const goToStep = (s: number) => {
        if (s >= 1 && s <= TOTAL_STEPS) setStep(s);
    };

    const calculateBiologicalAge = () => {
        // Base age estimation from range
        let baseAge = 40;
        if (answers.ageRange === "46-50") baseAge = 48;
        if (answers.ageRange === "51-60") baseAge = 55;
        if (answers.ageRange === "60+") baseAge = 65;

        let bioAge = baseAge;

        // Symptoms (+1 per symptom)
        bioAge += answers.symptoms.length;

        // Skin Firmness
        if (answers.skinFirmness === "sagging") bioAge += 3;
        if (answers.skinFirmness === "moderate") bioAge += 1;
        // firm: 0

        // Exercise
        if (answers.exerciseFreq === "0") bioAge += 3;
        if (answers.exerciseFreq === "1-2") bioAge += 1;
        if (answers.exerciseFreq === "3-4") bioAge -= 1;
        if (answers.exerciseFreq === "5+") bioAge -= 3;

        // New Factors Logic
        if (answers.metabolism === "slow") bioAge += 3;
        if (answers.stressLevel === "high") bioAge += 2;
        if (answers.previousAttempts === "pills" || answers.previousAttempts === "diet") bioAge += 1; // Yo-yo effect penalty

        // BMI Calculation
        const h = parseFloat(answers.height) / 100; // cm to m
        const w = parseFloat(answers.weight);
        let bmi = 0;

        if (h > 0 && w > 0) {
            bmi = w / (h * h);
            if (bmi > 25) bioAge += 2;
            if (bmi > 30) bioAge += 2; // Additional penalty
        }

        return {
            bioAge,
            chronologicalAge: baseAge,
            bmi: parseFloat(bmi.toFixed(1))
        };
    };

    return (
        <QuizContext.Provider
            value={{
                step,
                totalSteps: TOTAL_STEPS,
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
