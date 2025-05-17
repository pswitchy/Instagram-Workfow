import React from 'react';
import { Paper } from '@mui/material';
import PostSelectionStep from './PostSelectionStep';
import CommentConditionStep from './CommentConditionStep';
import DMConfigurationStep from './DMConfigurationStep';
import OtherAutomationStep from './OtherAutomationStep';
import StepNavigator from './StepNavigator';
import { useWorkflowContext } from '../../contexts/WorkflowContext';

const LeftPanel: React.FC = () => {
  const { state } = useWorkflowContext();
  const { currentStep } = state;

  return (
    <Paper elevation={0} sx={{ p: 2, height: 'calc(100vh - 64px - 32px)', overflowY: 'auto', borderRight: '1px solid #ddd' }}>
      <PostSelectionStep />
      {currentStep >= 1 && <CommentConditionStep />}
      {currentStep >= 2 && <DMConfigurationStep />}
      {currentStep >= 3 && <OtherAutomationStep />}
      <StepNavigator />
    </Paper>
  );
};

export default LeftPanel;