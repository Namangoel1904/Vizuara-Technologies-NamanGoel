import { useState } from "react";
import UploadStep from "../components/UploadStep";
import PreprocessStep from "../components/PreprocessStep";
import SplitStep from "../components/SplitStep";
import ModelStep from "../components/ModelStep";
import ResultStep from "../components/ResultStep";
import Stepper from "../components/Stepper";

export default function Pipeline() {
  const [step, setStep] = useState(1);
  const [result, setResult] = useState(null);

  const resetPipeline = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center mb-2">
        No-Code ML Pipeline Builder
      </h1>
      <p className="text-center text-gray-600 mb-6">
        Build and run machine learning pipelines visually — no coding required
      </p>

      {/* Reset */}
      <div className="text-center mb-4">
        <button
          onClick={resetPipeline}
          className="text-sm text-red-600 hover:underline"
        >
          Reset Pipeline
        </button>
      </div>

      {/* Stepper */}
      <Stepper step={step} />

      {/* Pipeline Card */}
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        {step === 1 && (
          <UploadStep
            onSuccess={() => {
              setStep(2);
            }}
          />
        )}

        {step === 2 && (
          <PreprocessStep
            onSuccess={() => {
              setStep(3);
            }}
          />
        )}

        {step === 3 && (
          <SplitStep
            onSuccess={() => {
              setStep(4);
            }}
          />
        )}

        {step === 4 && (
          <ModelStep
            onSuccess={(res) => {
              setResult(res);
              setStep(5);
            }}
          />
        )}

        {step === 5 && <ResultStep result={result} />}
      </div>
    </div>
  );
}
