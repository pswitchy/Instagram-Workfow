export interface InstagramPostData {
  id: string;
  imageUrl: string;
  thumbnailUrl: string; // Added thumbnailUrl
  caption: string;
  likes: number;
  commentsCount: number;
  date: string;
  username: string;
  userAvatar: string;
  avatar?: string;
}

export type PreviewTabType = 'Post' | 'Comments' | 'DM';

export interface WorkflowState {
  currentStep: number; // 0: Post, 1: Comment, 2: DM, 3: Other
  selectedPostOption: 'specific' | 'any' | 'next';
  availablePosts: InstagramPostData[];
  selectedSpecificPostId: string | null;
  commentConditionType: 'specificWords' | 'anyWord';
  specificCommentWords: string;
  openingDMEnabled: boolean;
  openingDMMessage1: string;
  openingDMMessage2: string;
  openingDMButtonText: string;
  dmMessage: string;
  previewTab: PreviewTabType;
  // Add states for "Other things to automate" toggles if needed
  replyUnderPost: boolean;
  followUpReengage: boolean;
  askForFollow: boolean;
  askForEmails: boolean;
}

export interface WorkflowContextType {
  state: WorkflowState;
  dispatch: React.Dispatch<any>; // Simplification for dispatch, can be more specific
  setSelectedSpecificPostId: (id: string | null) => void;
  setPreviewTab: (tab: PreviewTabType) => void;
  incrementStep: () => void;
}