import React from 'react';
import { Box, CssBaseline, AppBar, Toolbar, Typography, IconButton, Avatar, List, ListItemIcon, ThemeProvider, Button, ListItemButton } from '@mui/material'; // Added ListItemButton
// import MenuIcon from '@mui/icons-material/Menu'; // Example icon
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import LeftPanel from './components/LeftPanel/LeftPanel';
import RightPanel from './components/RightPanel/RightPanel';
import { WorkflowProvider, useWorkflowContext } from './contexts/WorkflowContext';
import theme from './theme';

const drawerWidth = 60;

const AppContent: React.FC = () => {
  const { dispatch } = useWorkflowContext();

  const handleLogoClick = () => {
    dispatch({ type: 'RESET_TO_STEP_0' });
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'background.default' }}>
      <Box
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          bgcolor: '#FAFAFA',
          borderRight: '1px solid #DBDBDB',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 2,
        }}
      >
        <IconButton onClick={handleLogoClick} sx={{ mb: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32, fontSize: '1rem' }}>M</Avatar>
        </IconButton>
        <List dense>
          {[
            { icon: <HomeIcon />, text: 'Home' },
            { icon: <BarChartIcon />, text: 'Analytics' },
            { icon: <MailOutlineIcon />, text: 'Messages' },
            { icon: <SettingsIcon />, text: 'Settings' },
          ].map((item, index) => (
            // Use ListItemButton instead of ListItem with button prop
            <ListItemButton
              key={item.text}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center', // Center icon
                mb: 1,
                p: 1, // Adjusted padding
                borderRadius: '8px', // Optional: for better click feedback appearance
                width: '48px', // Ensure consistent width
                height: '48px', // Ensure consistent height
                '&.Mui-selected': { // Example for selected state
                    backgroundColor: 'action.selected',
                },
              }}
              selected={index === 2} // Example: Select the "Messages" icon
            >
              <ListItemIcon sx={{ minWidth: 'auto', color: index === 2 ? 'primary.main' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
        <Box sx={{ marginTop: 'auto' }}>
            <IconButton sx={{ mb: 1 }}>
                <HelpOutlineIcon />
            </IconButton>
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }} src="/assets/user_avatar.png" />
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <AppBar position="static" sx={{ bgcolor: 'background.paper', boxShadow: 'none', borderBottom: '1px solid #DBDBDB' }} elevation={0}>
          <Toolbar variant="dense">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'text.primary' }}>
              {/* Workflow Title or Page Title */}
            </Typography>
            <Button variant="contained" color="primary" sx={{ fontWeight: 'bold' }}>
              Go Live
            </Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
          <Box sx={{ width: '40%', minWidth: 350, borderRight: '1px solid #DBDBDB', overflowY: 'auto' }}>
            <LeftPanel />
          </Box>
          <Box sx={{ flexGrow: 1, overflowY: 'auto', bgcolor: '#F9F9F9' }}>
            <RightPanel />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WorkflowProvider>
        <AppContent />
      </WorkflowProvider>
    </ThemeProvider>
  );
};

export default App;