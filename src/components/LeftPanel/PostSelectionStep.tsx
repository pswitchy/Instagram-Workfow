import React from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  // Tooltip, // Tooltip might be too much for this clean look unless captions are very short
  Fade,
} from '@mui/material';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Removing the overlay for a cleaner look like the image
import { useWorkflowContext } from '../../contexts/WorkflowContext';
import { InstagramPostData } from '../../types';
import PROBadge from '../PROBadge';

const MAX_THUMBNAILS_VISIBLE = 3; // Matches the image

const PostSelectionStep: React.FC = () => {
  const { state, dispatch, setSelectedSpecificPostId } = useWorkflowContext();
  const { selectedPostOption, availablePosts, selectedSpecificPostId } = state;
  // const [showAllPosts, setShowAllPosts] = React.useState(false); // "Show All" not in the provided image

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_SELECTED_POST_OPTION', payload: event.target.value as 'specific' | 'any' | 'next' });
    if (event.target.value !== 'specific') {
      setSelectedSpecificPostId(null);
    } else if (availablePosts.length > 0 && !selectedSpecificPostId) {
        // Auto-select the first post if 'specific' is chosen and nothing is selected yet
        setSelectedSpecificPostId(availablePosts[0].id);
    }
  };

  const handlePostSelect = (postId: string) => {
    setSelectedSpecificPostId(postId);
  };

  // const displayedPosts = showAllPosts ? availablePosts : availablePosts.slice(0, MAX_THUMBNAILS_VISIBLE);
  const displayedPosts = availablePosts.slice(0, MAX_THUMBNAILS_VISIBLE); // Always show first 3 as per image

  return (
    <Box mb={3}>
      <Typography variant="h6" sx={{ fontWeight: 500, mb: 1.5 }}> {/* Matches image style */}
        When someone comments on
      </Typography>
      <RadioGroup value={selectedPostOption} onChange={handleOptionChange}>
        <FormControlLabel
          value="specific"
          control={<Radio size="medium" sx={{p: '9px', mr: 0.5}} />} // Standard size, slight margin adjustment
          label={<Typography variant="body1">A specific post or reel</Typography>} // Matches image font size
          sx={{mb: selectedPostOption === 'specific' ? 1 : 0 }} // Add margin below if specific is selected
        />
        {selectedPostOption === 'specific' && (
          <Fade in={selectedPostOption === 'specific'} timeout={300}>
            <Box mt={0.5} mb={2} pl={0}> {/* No extra left padding for thumbnails based on image */}
              <Grid container spacing={1}> {/* Reduced spacing between thumbnails */}
                {displayedPosts.map((post: InstagramPostData) => (
                  <Grid item xs={4} key={post.id}> {/* 3 items per row */}
                    {/* Tooltip removed for cleaner look, can be added back if needed */}
                    {/* <Tooltip title={post.caption.substring(0, 70) + '...'} placement="top" arrow> */}
                      <Card
                        variant="outlined"
                        sx={{
                          height: 75, // Fixed height for thumbnails, adjust as needed
                          borderRadius: '6px', // Matches image's rounded corners
                          overflow: 'hidden',
                          borderColor: selectedSpecificPostId === post.id ? 'primary.main' : 'transparent', // Selected border
                          boxShadow: selectedSpecificPostId === post.id ? (theme) => `0 0 0 2px ${theme.palette.primary.main}` : 'none',
                          transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                        }}
                      >
                        <CardActionArea onClick={() => handlePostSelect(post.id)} sx={{ height: '100%' }}>
                          <CardMedia
                            component="img"
                            image={post.thumbnailUrl || post.imageUrl || `https://via.placeholder.com/120x80?text=Post`}
                            alt={`Post ${post.id}`}
                            sx={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover', // Ensures image covers, crops if necessary
                            }}
                          />
                           {/* Optional: A more subtle selection indicator if border is not enough */}
                           {/* {selectedSpecificPostId === post.id && (
                            <Box sx={{ position: 'absolute', top: 4, right: 4, width: 12, height: 12, borderRadius: '50%', bgcolor: 'primary.main', border: '1px solid white' }} />
                          )} */}
                        </CardActionArea>
                      </Card>
                    {/* </Tooltip> */}
                  </Grid>
                ))}
              </Grid>
              {/* "Show All" button removed to match the simpler UI in the image */}
              {/* {availablePosts.length > MAX_THUMBNAILS_VISIBLE && ( ... )} */}
            </Box>
          </Fade>
        )}
        {/* Other radio options */}
        <FormControlLabel
          value="any"
          control={<Radio size="medium" sx={{p: '9px', mr: 0.5}} />}
          label={
            <Box display="flex" alignItems="center">
             <Typography variant="body1">Any post or reel</Typography> <PROBadge />
            </Box>
          }
          disabled
          sx={{mt:1}}
        />
        <FormControlLabel
          value="next"
          control={<Radio size="medium" sx={{p: '9px', mr: 0.5}} />}
          label={
            <Box display="flex" alignItems="center">
              <Typography variant="body1">Next post or reel</Typography> <PROBadge />
            </Box>
          }
          disabled
          sx={{mt:0.5}}
        />
      </RadioGroup>
    </Box>
  );
};

export default PostSelectionStep;