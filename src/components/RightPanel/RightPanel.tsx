import React from 'react';
import { Box, Typography, Tabs, Tab, Paper } from '@mui/material';
import InstagramShell from './InstagramShell';
import InstagramPostPreview from './InstagramPostPreview';
import InstagramCommentPreview from './InstagramCommentPreview';
import InstagramDMPreview from './InstagramDMPreview';
import { useWorkflowContext } from '../../contexts/WorkflowContext';
import { PreviewTabType } from '../../types';
import { defaultUser } from '../../data/mockData';

const RightPanel: React.FC = () => {
  const { state, setPreviewTab } = useWorkflowContext();
  const { previewTab, selectedSpecificPostId, availablePosts } = state;

  const handleChange = (event: React.SyntheticEvent, newValue: PreviewTabType) => {
    setPreviewTab(newValue);
  };

  const currentPost = availablePosts.find(p => p.id === selectedSpecificPostId);

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', height: 'calc(100vh - 64px)', bgcolor: '#f7f7f7' }}>
      <Typography variant="overline" color="textSecondary" sx={{ mb: 1, alignSelf: 'flex-start' }}>
        Preview
      </Typography>
      <InstagramShell activeTab={previewTab} username={currentPost?.username || defaultUser.username} time={previewTab === 'DM' ? '1:37' : undefined}>
        {previewTab === 'Post' && <InstagramPostPreview />}
        {previewTab === 'Comments' && <InstagramCommentPreview />}
        {previewTab === 'DM' && <InstagramDMPreview />}
      </InstagramShell>
      <Paper elevation={0} sx={{ width: 340, mt: 1 }}>
        <Tabs
          value={previewTab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Post" value="Post" />
          <Tab label="Comments" value="Comments" />
          <Tab label="DM" value="DM" />
        </Tabs>
      </Paper>
    </Box>
  );
};

export default RightPanel;