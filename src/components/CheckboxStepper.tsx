import React from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  stepConnectorClasses,
  styled,
  Typography,
  Checkbox,
  CheckboxProps
} from '@mui/material';
import { Check } from '@mui/icons-material';

// Custom connector for the stepper
const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

// Custom checkbox that looks like a step
const StepCheckbox = styled(Checkbox)<CheckboxProps>(({ theme }) => ({
  padding: 0,
  width: 24,
  height: 24,
  borderRadius: '50%',
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
  border: `2px solid ${theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#aeaeae'}`,
  '&.Mui-checked': {
    backgroundColor: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.main}`,
    color: theme.palette.common.white,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 16,
  },
}));

interface CheckboxStepperProps {
  steps: string[];
  activeStep: number;
  onStepClick?: (step: number) => void;
  orientation?: 'horizontal' | 'vertical';
  showLabels?: boolean;
}

const CheckboxStepper: React.FC<CheckboxStepperProps> = ({
  steps,
  activeStep,
  onStepClick,
  orientation = 'horizontal',
  showLabels = true
}) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper 
        activeStep={activeStep} 
        alternativeLabel={orientation === 'horizontal'} 
        orientation={orientation}
        connector={<CustomConnector />}
      >
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: { optional?: React.ReactNode } = {};
          
          return (
            <Step key={label} {...stepProps}>
              <StepLabel 
                {...labelProps}
                StepIconComponent={() => (
                  <StepCheckbox
                    checked={index <= activeStep}
                    onChange={() => onStepClick && onStepClick(index)}
                    checkedIcon={<Check />}
                    disabled={!onStepClick}
                  />
                )}
              >
                {showLabels && (
                  <Typography 
                    variant="body2" 
                    color={index <= activeStep ? 'primary' : 'text.secondary'}
                    sx={{ fontWeight: index === activeStep ? 'bold' : 'normal' }}
                  >
                    {label}
                  </Typography>
                )}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};

export default CheckboxStepper;