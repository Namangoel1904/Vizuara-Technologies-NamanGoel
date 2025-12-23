export default function Stepper({ step }) {
    const steps = ["Upload", "Preprocess", "Split", "Model", "Results"];
  
    return (
      <div className="flex justify-center mb-6">
        {steps.map((label, index) => {
          const current = index + 1;
          const status =
            step > current
              ? "bg-green-500"
              : step === current
              ? "bg-blue-500"
              : "bg-gray-300";
  
          return (
            <div key={label} className="flex items-center mr-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${status}`}
              >
                {current}
              </div>
              <span className="ml-2 text-sm">{label}</span>
            </div>
          );
        })}
      </div>
    );
  }
  