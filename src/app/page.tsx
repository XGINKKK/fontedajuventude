"use client";

import { QuizProvider, useQuiz } from "@/lib/quiz-context";
import { QuizLayout } from "@/components/quiz/quiz-layout";
import { StepAge } from "@/components/quiz/steps/step-age";
import { StepWelcome } from "@/components/quiz/steps/step-welcome";
import { StepGoal } from "@/components/quiz/steps/step-goal";
import { StepProblemArea } from "@/components/quiz/steps/step-problem-area";
import { StepSymptoms } from "@/components/quiz/steps/step-symptoms";
import { StepStress } from "@/components/quiz/steps/step-stress";
import { StepPreviousAttempts } from "@/components/quiz/steps/step-previous-attempts";
import { StepTime } from "@/components/quiz/steps/step-time";
import { StepHeightWeight } from "@/components/quiz/steps/step-height-weight";
import { StepCommitment } from "@/components/quiz/steps/step-commitment";
import { StepCapture } from "@/components/quiz/steps/step-capture";
import { StepTransition } from "@/components/quiz/steps/step-transition";
import { StepResult } from "@/components/quiz/steps/step-result";

function QuizContent() {
  const { step } = useQuiz();

  return (
    <QuizLayout>
      {step === 1 && <StepWelcome />}
      {step === 2 && <StepAge />}
      {step === 3 && <StepGoal />}
      {step === 4 && <StepProblemArea />}
      {step === 5 && <StepSymptoms />}
      {step === 6 && <StepStress />}
      {step === 7 && <StepPreviousAttempts />}
      {step === 8 && <StepTime />}
      {step === 9 && <StepHeightWeight />}
      {step === 10 && <StepCommitment />}
      {step === 11 && <StepTransition />}
      {step === 12 && <StepCapture />}
      {step === 13 && <StepResult />}
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
