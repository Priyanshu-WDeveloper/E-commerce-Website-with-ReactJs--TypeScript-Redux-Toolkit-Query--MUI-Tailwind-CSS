import React from "react";
import { Check } from "lucide-react";

const CheckboxStepper = ({
  //   steps = [
  //     { title: "Bag", description: "Items in your bag" },
  //     { title: "Address", description: "Delivery address" },
  //     { title: "Payment", description: "Payment method" },
  //     { title: "Confirmation", description: "Order confirmation" },
  //   ],
  steps,
  activeStep,
  onStepClick,
}) => {
  const getStepStatus = (stepIndex) => {
    if (stepIndex < activeStep) return "completed";
    if (stepIndex === activeStep) return "active";
    return "pending";
  };

  const handleStepClick = (stepIndex) => {
    onStepClick(stepIndex);
  };

  return (
    <div className="w-full mb-5">
      <div className="flex items-center justify-between relative">
        {/* Connection Line */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 z-0">
          <div
            className="h-full bg-pink-500 transition-all duration-500 ease-in-out"
            style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {steps.map((step, index) => {
          const status = getStepStatus(index);

          return (
            <div
              key={index}
              className="flex flex-col items-center relative z-10 cursor-pointer group"
              onClick={() => handleStepClick(index)}
            >
              {/* Step Circle/Checkbox */}
              <div
                className={`
                w-12 h-12 rounded-full border-2 flex items-center justify-center
                transition-all duration-300 ease-in-out transform group-hover:scale-110
                ${
                  status === "completed"
                    ? "bg-pink-500 border-pink-500 text-white"
                    : status === "active"
                    ? "bg-white border-pink-500 text-pink-500 shadow-lg"
                    : "bg-white border-gray-300 text-gray-400"
                }
              `}
              >
                {status === "completed" ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <span className="font-semibold">{index + 1}</span>
                )}
              </div>

              {/* Step Info */}
              <div className="mt-3 text-center">
                <h3
                  className={`font-medium text-sm transition-colors duration-300
                  ${
                    status === "active" || status === "completed"
                      ? "text-gray-800"
                      : "text-gray-500"
                  }
                `}
                >
                  {step.title}
                </h3>
                <p
                  className={`text-xs mt-1 transition-colors duration-300
                  ${
                    status === "active" || status === "completed"
                      ? "text-gray-600"
                      : "text-gray-400"
                  }
                `}
                >
                  {step.description}
                </p>
              </div>

              {/* Status Indicator */}
              {status === "active" && (
                <div className="absolute -bottom-2 w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CheckboxStepper;
