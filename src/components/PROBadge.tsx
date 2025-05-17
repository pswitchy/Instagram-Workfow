import React from 'react';
import { Chip } from '@mui/material';

const PROBadge: React.FC = () => {
  return (
    <Chip
      label="PRO"
      size="small"
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        ml: 1,
        height: '18px',
        fontSize: '0.7rem',
        fontWeight: 'bold',
        borderRadius: '4px',
      }}
    />
  );
};

export default PROBadge;