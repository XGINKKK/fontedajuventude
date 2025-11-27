"use client";

import { QuizProvider, useQuiz } from "@/lib/quiz-context";
import { QuizLayout } from "@/components/quiz/quiz-layout";
import { StepAge } from "@/components/quiz/steps/step-age";
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
      {step === 1 && <StepAge />}
      {step === 2 && <StepMetabolism />}
      {step === 3 && <StepGoal />}
      {step === 4 && <StepProblemArea />}
      {step === 5 && <StepSymptoms />}
      {step === 6 && <StepStress />}
      {step === 7 && <StepSkin />}
      {step === 8 && <StepPreviousAttempts />}
      {step === 9 && <StepExercise />}
      {step === 10 && <StepPain />}
      {step === 11 && <StepTime />}
      {step === 12 && <StepTransition />}
      {step === 13 && <StepHeight />}
      {step === 14 && <StepWeight />}
      {step === 15 && <StepResult />}
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
