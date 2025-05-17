import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { WorkflowState, WorkflowContextType, InstagramPostData, PreviewTabType } from '../types';
import { mockPosts } from '../data/mockData';

const initialState: WorkflowState = {
  currentStep: 0,
  selectedPostOption: 'specific',
  availablePosts: mockPosts,
  selectedSpecificPostId: mockPosts.length > 0 ? mockPosts[0].id : null,
  commentConditionType: 'specificWords',
  specificCommentWords: '',
  openingDMEnabled: true,
  openingDMMessage1: "Hey there! I'm so happy you're here, thanks so much for your interest 😊",
  openingDMMessage2: "Click below and I'll send you the link in just a sec ✨",
  openingDMButtonText: 'Send me the link',
  dmMessage: '',
  previewTab: 'Post',
  replyUnderPost: false,
  followUpReengage: true,
  askForFollow: false,
  askForEmails: false,
};

type Action =
  | { type: 'SET_CURRENT_STEP'; payload: number }
  | { type: 'SET_SELECTED_POST_OPTION'; payload: 'specific' | 'any' | 'next' }
  | { type: 'SET_SELECTED_SPECIFIC_POST_ID'; payload: string | null }
  | { type: 'SET_COMMENT_CONDITION_TYPE'; payload: 'specificWords' | 'anyWord' }
  | { type: 'SET_SPECIFIC_COMMENT_WORDS'; payload: string }
  | { type: 'SET_OPENING_DM_ENABLED'; payload: boolean }
  | { type: 'SET_OPENING_DM_MESSAGE_1'; payload: string }
  | { type: 'SET_OPENING_DM_MESSAGE_2'; payload: string }
  | { type: 'SET_OPENING_DM_BUTTON_TEXT'; payload: string }
  | { type: 'SET_DM_MESSAGE'; payload: string }
  | { type: 'SET_PREVIEW_TAB'; payload: PreviewTabType }
  | { type: 'TOGGLE_REPLY_UNDER_POST' }
  | { type: 'TOGGLE_FOLLOW_UP_REENGAGE' }
  | { type: 'TOGGLE_ASK_FOR_FOLLOW' }
  | { type: 'TOGGLE_ASK_FOR_EMAILS' }
  | { type: 'RESET_TO_STEP_0'};


const reducer = (state: WorkflowState, action: Action): WorkflowState => {
  switch (action.type) {
    case 'SET_CURRENT_STEP':
      return { ...state, currentStep: action.payload };
    case 'SET_SELECTED_POST_OPTION':
      return { ...state, selectedPostOption: action.payload };
    case 'SET_SELECTED_SPECIFIC_POST_ID':
      return { ...state, selectedSpecificPostId: action.payload, previewTab: 'Post' };
    case 'SET_COMMENT_CONDITION_TYPE':
      return { ...state, commentConditionType: action.payload };
    case 'SET_SPECIFIC_COMMENT_WORDS':
      return { ...state, specificCommentWords: action.payload };
    case 'SET_OPENING_DM_ENABLED':
      return { ...state, openingDMEnabled: action.payload };
    case 'SET_OPENING_DM_MESSAGE_1':
        return { ...state, openingDMMessage1: action.payload };
    case 'SET_OPENING_DM_MESSAGE_2':
        return { ...state, openingDMMessage2: action.payload };
    case 'SET_OPENING_DM_BUTTON_TEXT':
        return { ...state, openingDMButtonText: action.payload };
    case 'SET_DM_MESSAGE':
      return { ...state, dmMessage: action.payload };
    case 'SET_PREVIEW_TAB':
      return { ...state, previewTab: action.payload };
    case 'TOGGLE_REPLY_UNDER_POST':
      return { ...state, replyUnderPost: !state.replyUnderPost };
    case 'TOGGLE_FOLLOW_UP_REENGAGE':
      return { ...state, followUpReengage: !state.followUpReengage };
    case 'TOGGLE_ASK_FOR_FOLLOW':
      return { ...state, askForFollow: !state.askForFollow };
    case 'TOGGLE_ASK_FOR_EMAILS':
      return { ...state, askForEmails: !state.askForEmails };
    case 'RESET_TO_STEP_0':
        return {
            ...initialState,
            availablePosts: state.availablePosts, // keep loaded posts
            selectedSpecificPostId: state.availablePosts.length > 0 ? state.availablePosts[0].id : null,
        };
    default:
      return state;
  }
};

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export const WorkflowProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setSelectedSpecificPostId = (id: string | null) => {
    dispatch({ type: 'SET_SELECTED_SPECIFIC_POST_ID', payload: id });
  };

  const setPreviewTab = (tab: PreviewTabType) => {
    dispatch({ type: 'SET_PREVIEW_TAB', payload: tab });
  };
  
  const incrementStep = () => {
    const nextStep = state.currentStep + 1;
    dispatch({ type: 'SET_CURRENT_STEP', payload: Math.min(nextStep, 3) }); // Max 3 steps for now (0,1,2,3)
    if (nextStep === 1) dispatch({ type: 'SET_PREVIEW_TAB', payload: 'Comments' });
    if (nextStep === 2) dispatch({ type: 'SET_PREVIEW_TAB', payload: 'DM' });
     // Preview tab remains DM for step 3
  };


  return (
    <WorkflowContext.Provider value={{ state, dispatch, setSelectedSpecificPostId, setPreviewTab, incrementStep }}>
      {children}
    </WorkflowContext.Provider>
  );
};

export const useWorkflowContext = () => {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error('useWorkflowContext must be used within a WorkflowProvider');
  }
  return context;
};