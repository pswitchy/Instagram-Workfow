import React from 'react';
import { Box, Avatar, Typography, TextField, IconButton, Stack } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
// import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
// import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import { useWorkflowContext } from '../../contexts/WorkflowContext';
import { defaultUser } from '../../data/mockData';

// Helper for a single comment
const CommentEntry: React.FC<{
  username: string;
  avatarUrl: string | undefined;
  commentText: string;
  timestamp: string;
  initialLikes?: number;
}> = ({ username, avatarUrl, commentText, timestamp, initialLikes = 0 }) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(initialLikes);

  return (
    <Box display="flex" alignItems="flex-start" mb={2.5}>
      <Avatar src={avatarUrl} sx={{ width: 32, height: 32, mr: 1.5, mt: 0.5 }} />
      <Box flexGrow={1}>
        <Typography variant="body2" component="span" sx={{ fontWeight: 'bold', mr: 0.5 }}>
          {username}
        </Typography>
        <Typography variant="body2" component="span">
          {commentText}
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center" mt={0.75}>
          <Typography variant="caption" sx={{ color: '#a8a8a8' }}>
            {timestamp}
          </Typography>
          {likeCount > 0 && (
            <Typography variant="caption" sx={{ fontWeight: 'medium', color: '#a8a8a8' }}>
              {likeCount} {likeCount === 1 ? 'like' : 'likes'}
            </Typography>
          )}
          <Typography variant="caption" sx={{ fontWeight: 'medium', color: '#a8a8a8', cursor: 'pointer' }}>
            Reply
          </Typography>
        </Stack>
      </Box>
      <IconButton
        size="small"
        sx={{ color: isLiked ? 'red' : '#a8a8a8', p: 0.5, mt: 0.5 }}
        onClick={() => {
          setIsLiked(!isLiked);
          setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
        }}
      >
        {isLiked ? <FavoriteIcon fontSize="inherit" sx={{ width: 16, height: 16 }} /> : <FavoriteBorderIcon fontSize="inherit" sx={{ width: 16, height: 16 }} />}
      </IconButton>
    </Box>
  );
};


const InstagramCommentPreview: React.FC = () => {
  const { state } = useWorkflowContext();
  const { specificCommentWords, availablePosts, selectedSpecificPostId } = state;

  // This is the "other user" commenting on the post
  const otherUserComment = {
    username: 'SomeUser',
    avatarUrl: 'https://via.placeholder.com/100/FFC107/000000?Text=U',
    commentText: "This looks amazing! ✨ Love this post!", // Static example comment
    timestamp: "2h",
    initialLikes: Math.floor(Math.random() * 10) + 1,
  };

  const post = availablePosts.find(p => p.id === selectedSpecificPostId);
  const currentBusinessUser = post || defaultUser; // User whose perspective we are commenting from

  // The comment being typed in the left panel (by the business user)
  const businessUserCommentText = specificCommentWords.split(',')[0].trim(); // Take the first keyword/phrase

  return (
    <Box
      sx={{
        p: 2,
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* List of comments */}
      <Box sx={{
          flexGrow: 1,
          overflowY: "auto",
          pr: 0.5
      }}>
        {/* Display the static "other user's" comment */}
        <CommentEntry
          username={otherUserComment.username}
          avatarUrl={otherUserComment.avatarUrl}
          commentText={otherUserComment.commentText}
          timestamp={otherUserComment.timestamp}
          initialLikes={otherUserComment.initialLikes}
        />

        {/* Display the comment being typed by the business user, if any */}
        {businessUserCommentText && (
          <CommentEntry
            username={currentBusinessUser.username}
            avatarUrl={currentBusinessUser.userAvatar || currentBusinessUser.avatar} // Use userAvatar or fallback to avatar
            commentText={businessUserCommentText}
            timestamp="Now" // Or "Just now"
            initialLikes={0} // New comment, no likes yet
          />
        )}
      </Box>

      {/* Comment Input Area at the bottom */}
      <Box
        display="flex"
        alignItems="center"
        mt="auto"
        p={1}
        borderTop="1px solid #363636"
        sx={{ backgroundColor: 'black' }}
      >
        <Avatar src={currentBusinessUser.userAvatar || currentBusinessUser.avatar} sx={{ width: 36, height: 36, mr: 1.5 }} />
        <TextField
          variant="standard"
          // The value here could be bound to another state if you want the input field to be interactive
          // For this preview, it's just a placeholder showing who is "typing"
          placeholder={`Reply as ${currentBusinessUser.username}...`}
          fullWidth
          size="small"
          multiline
          maxRows={3}
          InputProps={{
            disableUnderline: true,
            sx: { color: 'white', fontSize: '0.9rem', p: '8px 12px', borderRadius: '20px', backgroundColor: '#262626' },
          }}
          sx={{ '& .MuiInputBase-input::placeholder': { color: '#a8a8a8' } }}
        />
      </Box>
    </Box>
  );
};

export default InstagramCommentPreview;