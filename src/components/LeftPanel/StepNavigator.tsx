import React from 'react';
import { Button, Box } from '@mui/material';
import { useWorkflowContext } from '../../contexts/WorkflowContext';

const StepNavigator: React.FC = () => {
  const { state, incrementStep } = useWorkflowContext();
  const { currentStep } = state;

  if (currentStep >= 3) { // No "Next" button on the last step for this example
    return null;
  }

  return (
    <Box display="flex" justifyContent="flex-start" mt={2}>
      <Button variant="contained" onClick={incrementStep}>
        Next
      </Button>
    </Box>
  );
};

export default StepNavigator;