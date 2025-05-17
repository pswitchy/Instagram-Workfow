import React from 'react';
import { Box, Avatar, Typography, Button, TextField, IconButton, Stack } from '@mui/material';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined'; // Gallery
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';        // Mic
// import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined'; // Emoji not clearly visible
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'; // Camera for DMs
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // For the "sticker/gif" like button

import { useWorkflowContext } from '../../contexts/WorkflowContext';
import { defaultUser } from '../../data/mockData';

interface MessageBubbleProps {
  text?: string;
  isUserSender?: boolean; // True if message is from the "user" (e.g., botspacehq), false if from "receiver"
  avatarSrc?: string;
  timestamp?: string;
  showAvatar?: boolean; // Control avatar visibility for sequential messages
  isButtonMessage?: boolean;
  buttonText?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  text,
  isUserSender,
  avatarSrc,
  timestamp,
  showAvatar = false,
  isButtonMessage = false,
  buttonText,
}) => {
  const bubbleSide = isUserSender ? 'flex-start' : 'flex-end';
  // Colors from the image
  const senderBubbleColor = '#262626'; // Darker grey for sender's messages
  const senderButtonColor = '#363636'; // Slightly lighter grey for sender's button
  const receiverBubbleColor = '#5865F2'; // Purple for receiver
  const textColor = 'white';

  const content = buttonText || text || "";

  return (
    <Box
      display="flex"
      justifyContent={bubbleSide}
      mb={isButtonMessage ? 1.5 : 0.75} // More space after a button
      alignItems="flex-end" // Align avatar with bottom of bubble
    >
      {isUserSender && showAvatar && (
        <Avatar src={avatarSrc} sx={{ width: 28, height: 28, mr: 1 }} />
      )}
      {!isUserSender && !showAvatar && <Box sx={{width: 28, mr:1}} />} {/* Spacer if receiver avatar not shown */}


      <Box
        sx={{
          bgcolor: isButtonMessage ? senderButtonColor : (isUserSender ? senderBubbleColor : receiverBubbleColor),
          color: textColor,
          py: isButtonMessage ? '10px' : '8px',
          px: '14px',
          borderRadius: '22px',
          maxWidth: '70%', // Max width for bubbles
          wordBreak: 'break-word',
          cursor: isButtonMessage ? 'pointer' : 'default',
          textAlign: isButtonMessage && isUserSender ? 'center' : 'left', // Center text for sender's button
          width: isButtonMessage && isUserSender ? 'calc(70% - 28px - 8px)' : 'auto', // Adjust width for sender button
          ml: isUserSender && !showAvatar ? '36px' : 0, // Indent subsequent messages from sender
        }}
      >
        <Typography variant="body2" sx={{ lineHeight: 1.45, whiteSpace: 'pre-wrap' }}>
          {content}
        </Typography>
      </Box>
      {/* Timestamp could be added here if needed, but not prominent in the image for each bubble */}
    </Box>
  );
};

const InstagramDMPreview: React.FC = () => {
  const { state } = useWorkflowContext();
  const {
    openingDMEnabled,
    openingDMMessage1,
    openingDMMessage2,
    openingDMButtonText,
    dmMessage, // This is the "Hey" from botspacehq in the image
    availablePosts,
    selectedSpecificPostId,
  } = state;

  // botspacehq is the "User Sender" in this context
  const businessUser = availablePosts.find(p => p.id === selectedSpecificPostId) || defaultUser;

  // The message "Send me the link" from the "Receiver"
  const receiverResponseMessage = openingDMButtonText; // The text of the button the receiver "clicks"

  return (
    <Box
      sx={{
        // p: '8px 8px 0 8px', // Shell will handle this now
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        color: 'white',
        bgcolor: 'black',
      }}
    >
      {/* Message Area */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          px: 1.5, // Padding for messages from edge
          pt: 1,   // Padding from top header
          mb: 1,   // Space before input
          '&::-webkit-scrollbar': { width: '0px' }, // Hide scrollbar as per image
          '&::-webkit-scrollbar-thumb': { backgroundColor: '#444', borderRadius: '3px' },
        }}
      >
        {/* Simulating the conversation flow from the image */}
        {openingDMEnabled && (
          <>
            {/* Message 1 from botspacehq */}
            <MessageBubble
              text={openingDMMessage1}
              isUserSender={true}
              avatarSrc={businessUser.userAvatar}
              showAvatar={true}
            />
            {/* Message 2 from botspacehq */}
            <MessageBubble
              text={openingDMMessage2}
              isUserSender={true}
              avatarSrc={businessUser.userAvatar}
              showAvatar={false} // No avatar for subsequent message from same sender
            />
            {/* Button "Send me the link" from botspacehq */}
            <MessageBubble
              isUserSender={true}
              avatarSrc={businessUser.userAvatar}
              showAvatar={false}
              isButtonMessage={true}
              buttonText={openingDMButtonText}
            />
          </>
        )}

        {/* Receiver's response (purple bubble) */}
        {openingDMEnabled && ( // Assuming this happens after the opening DM
          <MessageBubble
            text={receiverResponseMessage}
            isUserSender={false} // This is the receiver
            // No avatar for receiver in the image provided for their own message
          />
        )}

        {/* "Hey" message from botspacehq */}
        {dmMessage && ( // dmMessage from context is "Hey"
           <MessageBubble
            text={dmMessage}
            isUserSender={true}
            avatarSrc={businessUser.userAvatar}
            showAvatar={true} // Show avatar as it's a new "turn"
          />
        )}
      </Box>

      {/* DM Input Area - Styled to match image */}
      <Box
        display="flex"
        alignItems="center"
        p="10px 12px" // Padding inside the input bar
        sx={{
          // borderTop: '1px solid #363636', // No visible border in image, bg implies separation
          bgcolor: 'black', // Match shell background
        }}
      >
        <IconButton sx={{ color: '#0095f6', p: '6px' }} >
          <CameraAltOutlinedIcon sx={{fontSize: '28px'}} />
        </IconButton>
        <TextField
          variant="standard"
          placeholder="Message..."
          fullWidth
          // multiline // Not multiline in the image
          // maxRows={4}
          size="small"
          InputProps={{
            disableUnderline: true,
            sx: {
              color: 'white',
              fontSize: '0.95rem',
              p: '8px 16px',
              borderRadius: '22px',
              backgroundColor: '#262626', // Input field background
              ml: 1,
              mr: 1,
            },
          }}
          sx={{
            '& .MuiInputBase-input::placeholder': { color: '#737373' }, // Placeholder color from image
          }}
        />
        <Stack direction="row" spacing={0.5}> {/* Reduced spacing */}
          <IconButton sx={{ color: 'white', p: '6px' }}>
            <MicNoneOutlinedIcon sx={{fontSize: '26px'}} />
          </IconButton>
          <IconButton sx={{ color: 'white', p: '6px' }}>
            <AddPhotoAlternateOutlinedIcon sx={{fontSize: '26px'}} />
          </IconButton>
          <IconButton sx={{ color: 'white', p: '6px' }}>
            <AddCircleOutlineIcon sx={{fontSize: '26px'}} /> {/* "Sticker/GIF" icon */}
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
};

export default InstagramDMPreview;