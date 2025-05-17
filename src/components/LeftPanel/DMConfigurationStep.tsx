import React from 'react';
import { Box, Typography, Switch, FormControlLabel, TextField, Button, Link } from '@mui/material';
import { useWorkflowContext } from '../../contexts/WorkflowContext';

const DMConfigurationStep: React.FC = () => {
  const { state, dispatch } = useWorkflowContext();
  const { openingDMEnabled, openingDMMessage1, openingDMMessage2, openingDMButtonText, dmMessage } = state;

  return (
    <Box mb={3}>
      <Typography variant="h6" gutterBottom>
        They will get
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={openingDMEnabled}
            onChange={(e) => dispatch({ type: 'SET_OPENING_DM_ENABLED', payload: e.target.checked })}
          />
        }
        label="an opening DM"
      />
      {openingDMEnabled && (
        <Box pl={6} mt={1} mb={2} borderLeft="2px solid #eee" ml={2}>
          {/* ---- CHECK THIS TEXTFIELD CAREFULLY ---- */}
          <TextField
            fullWidth
            multiline
            rows={2}
            variant="outlined"
            value={openingDMMessage1}
            onChange={(e) => dispatch({ type: 'SET_OPENING_DM_MESSAGE_1', payload: e.target.value })}
            size="small"
            sx={{ mb: 1 }} 
            // Make sure there are no other sx, size, or any other duplicated props here
          />
          {/* ---- END CHECK ---- */}
          <TextField
            fullWidth
            multiline
            rows={2}
            variant="outlined"
            value={openingDMMessage2}
            onChange={(e) => dispatch({ type: 'SET_OPENING_DM_MESSAGE_2', payload: e.target.value })}
            size="small"
            sx={{ mb: 1 }}
          />
           <TextField // Simulating the button text input
            fullWidth
            variant="outlined"
            value={openingDMButtonText}
            onChange={(e) => dispatch({ type: 'SET_OPENING_DM_BUTTON_TEXT', payload: e.target.value })}
            size="small"
            label="Button text for opening DM"
            sx={{ mb: 1 }}
          />
          <Link href="#" underline="hover" variant="caption">
            Why does an Opening DM matter?
          </Link>
        </Box>
      )}

      <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 'medium' }}>
        a DM with the link
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={3}
        variant="outlined"
        placeholder="Write a message"
        value={dmMessage}
        onChange={(e) => dispatch({ type: 'SET_DM_MESSAGE', payload: e.target.value })}
        helperText="Create the DM you'd like to send"
        size="small"
        sx={{ mt: 1 }}
      />
      <Button variant="outlined" sx={{ mt: 1 }}>
        + Add A Link
      </Button>
    </Box>
  );
};

export default DMConfigurationStep;