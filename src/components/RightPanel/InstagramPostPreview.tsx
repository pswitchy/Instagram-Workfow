import React from 'react';
import { Box, CardMedia, Typography, IconButton, Avatar } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'; // Or a Share icon
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'; // Often present on posts
import { useWorkflowContext } from '../../contexts/WorkflowContext';
import { defaultUser } from '../../data/mockData';

const InstagramPostPreview: React.FC = () => {
  const { state } = useWorkflowContext();
  const { selectedSpecificPostId, availablePosts } = state;

  const post = availablePosts.find(p => p.id === selectedSpecificPostId);

  if (!post) {
    return (
      <Box p={2} textAlign="center" sx={{ color: 'white', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography>Select a post to preview</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ color: 'white', bgcolor: 'black', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Post Header */}
      <Box display="flex" alignItems="center" p="12px 16px">
        <Avatar src={post.userAvatar || defaultUser.userAvatar} sx={{ width: 32, height: 32, mr: 1.5 }} />
        <Typography variant="subtitle2" fontWeight="bold" sx={{flexGrow: 1}}>
          {post.username}
        </Typography>
        <IconButton sx={{ color: 'white' }} size="small">
          <MoreHorizIcon />
        </IconButton>
      </Box>

      {/* Image Container - Key for aspect ratio handling */}
      <Box
        sx={{
          width: '100%',
          // Max height for the image area, prevents super tall images from taking over.
          // Instagram might have a max aspect ratio instead, e.g., 4:5 for portrait.
          // For simplicity, a maxHeight is easier here.
          maxHeight: 'calc(100% - 160px)', // Estimate remaining height after header, actions, caption
          minHeight: 200, // Ensure a minimum height for very wide images
          bgcolor: 'black', // Background for letterboxing if image is not 1:1 with this box
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden', // Just in case
          flexGrow: 1, // Allow this to take available vertical space
        }}
      >
        <CardMedia
          component="img"
          image={post.imageUrl || `https://via.placeholder.com/400x300.png?text=No+Image`}
          alt={post.caption.substring(0, 30) || "Instagram Post"}
          sx={{
            maxWidth: '100%',
            maxHeight: '100%', // Image will not exceed the container's maxHeight
            width: 'auto',    // Let width be auto based on height to maintain aspect ratio
            height: 'auto',   // Let height be auto based on width to maintain aspect ratio
            objectFit: 'contain', // Crucial: scales image down to fit, maintaining aspect ratio
          }}
        />
      </Box>

      {/* Post Actions & Info */}
      <Box p="8px 12px">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
          <Box>
            <IconButton sx={{ color: 'white', p: '8px' }}><FavoriteBorderIcon /></IconButton>
            <IconButton sx={{ color: 'white', p: '8px' }}><ChatBubbleOutlineIcon /></IconButton>
            <IconButton sx={{ color: 'white', p: '8px' }}><SendOutlinedIcon /></IconButton>
          </Box>
          <IconButton sx={{ color: 'white', p: '8px' }}><BookmarkBorderOutlinedIcon /></IconButton>
        </Box>
        {post.likes > 0 && (
            <Typography variant="subtitle2" fontWeight="bold" sx={{ px: '4px' }}>
            {post.likes.toLocaleString()} likes
            </Typography>
        )}
        <Box sx={{ px: '4px', mt: 0.5, maxHeight: '6em', overflowY: 'auto' }}> {/* Limit caption height */}
          <Typography variant="body2" component="span" fontWeight="bold" sx={{ mr: 0.5 }}>
            {post.username}
          </Typography>
          <Typography variant="body2" component="span" sx={{ whiteSpace: 'pre-wrap' }}>
            {post.caption}
          </Typography>
        </Box>
        {post.commentsCount > 0 && (
          <Typography variant="caption" color="#a8a8a8" display="block" sx={{ px: '4px', mt: 0.5, cursor: 'pointer' }}>
            View all {post.commentsCount} comments
          </Typography>
        )}
        <Typography variant="caption" color="#a8a8a8" display="block" sx={{ px: '4px', mt: 0.5 }}>
          {post.date}
        </Typography>
      </Box>
    </Box>
  );
};

export default InstagramPostPreview;