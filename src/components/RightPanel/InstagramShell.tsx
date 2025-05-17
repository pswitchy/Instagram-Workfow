import React, { ReactNode } from 'react';
import { Box, Typography, IconButton, Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchIcon from '@mui/icons-material/Search';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

interface InstagramShellProps {
  children: ReactNode;
  activeTab: 'Post' | 'Comments' | 'DM';
  username?: string;
  time?: string;
}

const InstagramShell: React.FC<InstagramShellProps> = ({ children, activeTab, username = "botspacehq", time }) => {
  const renderHeader = () => {
    switch (activeTab) {
      case 'Post':
        return (
          <Box display="flex" justifyContent="space-between" alignItems="center" p={1.5} borderBottom="1px solid #dbdbdb">
            <IconButton size="small"><ArrowBackIosNewIcon fontSize="small" /></IconButton>
            <Typography variant="subtitle2" fontWeight="bold">{username}</Typography>
            <IconButton size="small"><MoreHorizIcon /></IconButton>
          </Box>
        );
      case 'Comments':
        return (
          <Box display="flex" justifyContent="space-between" alignItems="center" p={1.5} borderBottom="1px solid #dbdbdb">
            <IconButton size="small"><ArrowBackIosNewIcon fontSize="small" /></IconButton>
            <Typography variant="subtitle2" fontWeight="bold">Comments</Typography>
            <IconButton size="small"><SendOutlinedIcon fontSize="small" /></IconButton>
          </Box>
        );
      case 'DM':
        return (
          <Box display="flex" justifyContent="space-between" alignItems="center" p={1.5} borderBottom="1px solid #dbdbdb">
            <IconButton size="small"><ArrowBackIosNewIcon fontSize="small" /></IconButton>
            <Box textAlign="center">
                <Typography variant="subtitle2" fontWeight="bold">{username}</Typography>
                {time && <Typography variant="caption" color="textSecondary">{time}</Typography>}
            </Box>
            <Box>
                <IconButton size="small"><VideocamOutlinedIcon /></IconButton>
                <IconButton size="small"><InfoOutlinedIcon /></IconButton>
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: 390,
        height: 700,
        borderRadius: '30px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'black',
        color: 'white',
        border: '8px solid black',
        position: 'relative',
      }}
    >
      {renderHeader()}
      <Box
        flexGrow={1}
        sx={{
          overflowY: "auto", // MOVED HERE
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none', // CSS property for IE/Edge
          scrollbarWidth: 'none'    // CSS property for Firefox
        }}
      >
        {children}
      </Box>
      {activeTab === 'Post' && (
        <BottomNavigation showLabels sx={{ bgcolor: 'black', borderTop: '1px solid #363636' }}>
          <BottomNavigationAction sx={{color: 'white'}} label="" icon={<HomeOutlinedIcon />} />
          <BottomNavigationAction sx={{color: 'white'}} label="" icon={<SearchIcon />} />
          <BottomNavigationAction sx={{color: 'white'}} label="" icon={<OndemandVideoOutlinedIcon />} />
          <BottomNavigationAction sx={{color: 'white'}} label="" icon={<ShoppingBagOutlinedIcon />} />
          <BottomNavigationAction sx={{color: 'white'}} label="" icon={<AccountCircleOutlinedIcon />} />
        </BottomNavigation>
      )}
    </Paper>
  );
};

export default InstagramShell;