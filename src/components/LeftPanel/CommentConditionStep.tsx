import React from 'react';
import { Box, Typography, RadioGroup, FormControlLabel, Radio, TextField, Button, Stack } from '@mui/material';
import { useWorkflowContext } from '../../contexts/WorkflowContext';

const CommentConditionStep: React.FC = () => {
  const { state, dispatch } = useWorkflowContext();
  const { commentConditionType, specificCommentWords } = state;

  const handleConditionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_COMMENT_CONDITION_TYPE', payload: event.target.value as 'specificWords' | 'anyWord' });
  };

  const handleWordsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_SPECIFIC_COMMENT_WORDS', payload: event.target.value });
  };

  const addKeyword = (keyword: string) => {
    const newWords = specificCommentWords ? `${specificCommentWords}, ${keyword}` : keyword;
    dispatch({ type: 'SET_SPECIFIC_COMMENT_WORDS', payload: newWords });
  };

  return (
    <Box mb={3}>
      <Typography variant="h6" gutterBottom>
        And this comment has
      </Typography>
      <RadioGroup value={commentConditionType} onChange={handleConditionChange}>
        <FormControlLabel
          value="specificWords"
          control={<Radio />}
          label="a specific word or words"
        />
        {commentConditionType === 'specificWords' && (
          <Box pl={4} mt={1}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter a word or multiple"
              value={specificCommentWords}
              onChange={handleWordsChange}
              helperText="Use commas to separate words"
              size="small"
            />
            <Typography variant="caption" display="block" mt={0.5} mb={1}>
              For example:
            </Typography>
            <Stack direction="row" spacing={1}>
              {['Price', 'Link', 'Shop'].map((keyword) => (
                <Button key={keyword} variant="outlined" size="small" onClick={() => addKeyword(keyword)}>
                  {keyword}
                </Button>
              ))}
            </Stack>
          </Box>
        )}
        <FormControlLabel
          value="anyWord"
          control={<Radio />}
          label="any word"
        />
      </RadioGroup>
    </Box>
  );
};

export default CommentConditionStep;