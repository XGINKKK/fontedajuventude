"use client";

import { QuizProvider, useQuiz } from "@/lib/quiz-context";
import { QuizLayout } from "@/components/quiz/quiz-layout";
import { StepAge } from "@/components/quiz/steps/step-age";
import { StepWelcome } from "@/components/quiz/steps/step-welcome";
import { StepMetabolism } from "@/components/quiz/steps/step-metabolism"; // New
import { StepGoal } from "@/components/quiz/steps/step-goal";
import { StepProblemArea }
  from "@/components/quiz/steps/step-problem-area"; // New
import { StepSymptoms } from "@/components/quiz/steps/step-symptoms";
import { StepStress } from "@/components/quiz/steps/step-stress"; // New
import { StepSkin } from "@/components/quiz/steps/step-skin";
import { StepPreviousAttempts } from "@/components/quiz/steps/step-previous-attempts"; // New
import { StepExercise } from "@/components/quiz/steps/step-exercise";
import { StepPain } from "@/components/quiz/steps/step-pain";
import { StepTime } from "@/components/quiz/steps/step-time"; // New
import { StepTransition } from "@/components/quiz/steps/step-transition";
import { StepHeight } from "@/components/quiz/steps/step-height";
import { StepWeight } from "@/components/quiz/steps/step-weight";
import { StepResult } from "@/components/quiz/steps/step-result";

function QuizContent() {
  const { step } = useQuiz();

  return (
    <QuizLayout>
      {step === 1 && <StepWelcome />}
      {step === 2 && <StepAge />}
      {step === 3 && <StepMetabolism />}
      {step === 4 && <StepGoal />}
      {step === 5 && <StepProblemArea />}
      {step === 6 && <StepSymptoms />}
      {step === 7 && <StepStress />}
      {step === 8 && <StepSkin />}
      {step === 9 && <StepPreviousAttempts />}
      {step === 10 && <StepExercise />}
      {step === 11 && <StepPain />}
      {step === 12 && <StepTime />}
      {step === 13 && <StepTransition />}
      {step === 14 && <StepHeight />}
      {step === 15 && <StepWeight />}
      {step === 16 && <StepResult />}
    </QuizLayout>
  );
}

export default function Home() {
  return (
    <QuizProvider>
      <QuizContent />
    </QuizProvider>
  );
}
