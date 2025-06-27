import React from "react";
import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CircleIcon from "@mui/icons-material/Circle";

interface CheckboxStepperProps {
  steps: string[];
  activeStep: number;
  onStepClick?: (step: number) => void;
}

const CheckboxStepper: React.FC<CheckboxStepperProps> = ({
  steps,
  activeStep,
  onStepClick,
}) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      {steps.map((label, idx) => {
        const isCompleted = idx < activeStep;
        const isActive = idx === activeStep;

        return (
          <React.Fragment key={label}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              sx={{
                cursor: isCompleted && onStepClick ? "pointer" : "default",
              }}
              onClick={() => isCompleted && onStepClick && onStepClick(idx)}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: isActive
                    ? "#ff3f6c"
                    : isCompleted
                    ? "#fff"
                    : "#fff",
                  border: isActive
                    ? "2px solid #ff3f6c"
                    : isCompleted
                    ? "2px solid #43a047"
                    : "2px solid #bdbdbd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: isActive
                    ? "#ff3f6c"
                    : isCompleted
                    ? "#43a047"
                    : "#bdbdbd",
                  fontWeight: "bold",
                  fontSize: 20,
                  transition: "all 0.2s",
                }}
              >
                {isCompleted ? (
                  <CheckCircleIcon sx={{ color: "#43a047" }} />
                ) : isActive ? (
                  idx + 1
                ) : (
                  <RadioButtonUncheckedIcon sx={{ color: "#bdbdbd" }} />
                )}
              </Box>
              <Typography
                variant="caption"
                sx={{
                  mt: 1,
                  color: isActive
                    ? "#ff3f6c"
                    : isCompleted
                    ? "#43a047"
                    : "#757575",
                  fontWeight: isActive ? "bold" : "normal",
                  letterSpacing: 1,
                  fontSize: 13,
                  textTransform: "uppercase",
                }}
              >
                {label}
              </Typography>
            </Box>
            {idx < steps.length - 1 && (
              <Box
                sx={{
                  flex: 1,
                  height: 2,
                  background:
                    idx < activeStep
                      ? "linear-gradient(90deg, #43a047 60%, #bdbdbd 100%)"
                      : "#bdbdbd",
                  mx: 1.5,
                  minWidth: 32,
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </Box>
  );
};

export default CheckboxStepper;
