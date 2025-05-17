import React from 'react';
import { Box, Typography, FormControlLabel, Switch, List, ListItem } from '@mui/material';
import { useWorkflowContext } from '../../contexts/WorkflowContext';
import PROBadge from '../PROBadge';

const OtherAutomationStep: React.FC = () => {
  const { state, dispatch } = useWorkflowContext();

  const automations = [
    { key: 'replyUnderPost', label: 'Reply under the post so people feel seen and special', pro: false, action: 'TOGGLE_REPLY_UNDER_POST' },
    { key: 'followUpReengage', label: 'Follow up to re-engage and build trust', pro: true, action: 'TOGGLE_FOLLOW_UP_REENGAGE' },
    { key: 'askForFollow', label: 'Automatically ask for a follow to build your audience', pro: true, action: 'TOGGLE_ASK_FOR_FOLLOW' },
    { key: 'askForEmails', label: 'Ask for emails in DMs to keep in touch beyond social', pro: true, action: 'TOGGLE_ASK_FOR_EMAILS' },
  ];

  return (
    <Box mb={3}>
      <Typography variant="h6" gutterBottom>
        Other things to automate
      </Typography>
      <List dense>
        {automations.map((item) => (
          <ListItem key={item.key} disableGutters sx={{py: 0.5}}>
            <FormControlLabel
              control={
                <Switch
                  checked={state[item.key as keyof typeof state] as boolean}
                  onChange={() => dispatch({ type: item.action })}
                  size="small"
                />
              }
              label={
                <Box display="flex" alignItems="center">
                  <Typography variant="body2">{item.label}</Typography>
                  {item.pro && <PROBadge />}
                </Box>
              }
              sx={{width: '100%', justifyContent: 'space-between', ml:0, mr:0}}
              labelPlacement="start"
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default OtherAutomationStep;