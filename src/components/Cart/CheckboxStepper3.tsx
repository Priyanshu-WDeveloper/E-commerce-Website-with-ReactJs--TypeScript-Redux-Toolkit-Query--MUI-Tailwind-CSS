import React from "react";
import {
  Box,
  Typography,
  Step,
  StepLabel,
  Stepper,
  StepConnector,
  stepConnectorClasses,
  StepIconProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";

// Custom connector with pink color
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(95deg, #ff3f6c 0%, #ff527b 50%, #ff6b8a 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(95deg, #ff3f6c 0%, #ff527b 50%, #ff6b8a 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

// Custom step icon with Myntra-style design
const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 40,
  height: 40,
  // height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  transition: "all 0.3s ease-in-out",
  border: "2px solid #ccc",
  "&:hover": {
    transform: "scale(1.1)",
    boxShadow: "0 4px 20px rgba(255, 63, 108, 0.3)",
  },
  ...(ownerState.active && {
    backgroundImage: "linear-gradient(136deg, #fff 0%, #fff 100%)",
    border: "2px solid #ff3f6c",
    color: "#ff3f6c",
    boxShadow: "0 4px 10px 0 rgba(255, 63, 108, 0.3)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient(136deg, #ff3f6c 0%, #ff527b 50%, #ff6b8a 100%)",
    border: "2px solid #ff3f6c",
    color: "#fff",
  }),
}));

function ColorlibStepIcon(props: StepIconProps & { onClick?: () => void }) {
  const { active, completed, className, onClick } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: (
      <Typography variant="body2" fontWeight="600">
        1
      </Typography>
    ),
    2: (
      <Typography variant="body2" fontWeight="600">
        2
      </Typography>
    ),
    3: (
      <Typography variant="body2" fontWeight="600">
        3
      </Typography>
    ),
    4: (
      <Typography variant="body2" fontWeight="600">
        4
      </Typography>
    ),
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
      onClick={onClick}
    >
      {completed ? <CheckIcon /> : icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

// Active step indicator dot
const ActiveStepIndicator = styled(Box)({
  position: "absolute",
  bottom: -8,
  left: "50%",
  transform: "translateX(-50%)",
  width: 8,
  height: 8,
  backgroundColor: "#ff3f6c",
  borderRadius: "50%",
  animation: "pulse 2s infinite",
  "@keyframes pulse": {
    "0%": {
      opacity: 1,
    },
    "50%": {
      opacity: 0.5,
    },
    "100%": {
      opacity: 1,
    },
  },
});

// Custom step label with enhanced styling
const StyledStepLabel = styled(StepLabel)(({ theme }) => ({
  "& .MuiStepLabel-label": {
    fontSize: "10px",
    fontWeight: 500,
    marginTop: theme.spacing(1),
    "&.MuiStepLabel-active": {
      color: theme.palette.text.primary,
      fontWeight: 600,
    },
    "&.MuiStepLabel-completed": {
      color: theme.palette.text.primary,
      fontWeight: 500,
    },
  },
  "& .MuiStepLabel-iconContainer": {
    position: "relative",
  },
}));

interface CheckboxStepperProps {
  steps?: Array<{ title: string; description?: string }>;
  activeStep?: number;
  // onStepClick?: (step: number) => void;
  onStepClick?: (step: number) => void;
}

const CheckboxStepper: React.FC<CheckboxStepperProps> = ({
  // steps = [
  //   { title: "Bag", description: "Items in your bag" },
  //   { title: "Address", description: "Delivery address" },
  //   { title: "Payment", description: "Payment method" },
  //   { title: "Confirmation", description: "Order confirmation" },
  // ],
  // activeStep = 0,
  // onStepClick = () => {},
  steps = [],
  activeStep = 0,
  onStepClick,
}) => {
  const handleStepClick = (stepIndex: number) => {
    // onStepClick(stepIndex);
    if (onStepClick) {
      onStepClick(stepIndex);
    }
  };

  return (
    <Box sx={{ width: "100%", py: 2 }}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
        sx={{
          "& .MuiStep-root": {
            cursor: "pointer",
          },
        }}
      >
        {steps.map((step, index) => (
          <Step
            key={step.title}
            onClick={() => handleStepClick(index)}
            sx={{
              "& .MuiStepLabel-root": {
                cursor: "pointer",
              },
            }}
          >
            <StyledStepLabel
              StepIconComponent={(props) => (
                <Box sx={{ position: "relative", display: "inline-flex" }}>
                  <ColorlibStepIcon
                    {...props}
                    onClick={() => handleStepClick(index)}
                  />
                  {activeStep === index && <ActiveStepIndicator />}
                </Box>
              )}
            >
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight:
                      activeStep === index || index < activeStep ? 600 : 400,
                    color:
                      activeStep === index || index < activeStep
                        ? "text.primary"
                        : "text.secondary",
                    transition: "all 0.3s ease",
                  }}
                >
                  {step.title}
                </Typography>
                {step.description && (
                  <Typography
                    variant="caption"
                    sx={{
                      display: "block",
                      color:
                        activeStep === index || index < activeStep
                          ? "text.secondary"
                          : "text.disabled",
                      mt: 0.5,
                      transition: "all 0.3s ease",
                    }}
                  >
                    {step.description}
                  </Typography>
                )}
              </Box>
            </StyledStepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default CheckboxStepper;
