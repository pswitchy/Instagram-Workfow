import { InstagramPostData } from '../types';

// Helper for Lorem Picsum specific images
const getPicsumImageUrlById = (id: number, width = 600, height = 500) => `https://picsum.photos/id/${id}/${width}/${height}`;
const getPicsumThumbnailUrlById = (id: number, width = 100, height = 100) => `https://picsum.photos/id/${id}/${width}/${height}`;

// Example IDs (You'll need to find your own that you like)
const POST_IMAGE_IDS = {
  whatsapp: 200, // Example: A techy/abstract image
  ironMan: 1062, // Example: Something metallic or heroic
  momMarketing: 431, // Example: A warm, friendly image
  aiGoldmine: 823, // Example: Something related to data or innovation
  user: 1005, // Example: A person for the avatar
};

const userAvatarUrl = getPicsumThumbnailUrlById(POST_IMAGE_IDS.user, 50, 50);

export const mockPosts: InstagramPostData[] = [
  {
    id: 'post1',
    imageUrl: getPicsumImageUrlById(POST_IMAGE_IDS.whatsapp, 600, 500),
    thumbnailUrl: getPicsumThumbnailUrlById(POST_IMAGE_IDS.whatsapp),
    caption: 'WhatsApp hits 3 Billion Users! 🎉 ...',
    likes: 3000,
    commentsCount: 100,
    date: '17 May, 2023',
    username: 'botspacehq',
    userAvatar: userAvatarUrl,
  },
  {
    id: 'post2',
    imageUrl: getPicsumImageUrlById(POST_IMAGE_IDS.ironMan, 500, 550),
    thumbnailUrl: getPicsumThumbnailUrlById(POST_IMAGE_IDS.ironMan),
    caption: 'Before using BotSpace 🤖 If Iron Man trusts BotSpace...',
    likes: 13,
    commentsCount: 4,
    date: '10 May, 2023',
    username: 'botspacehq',
    userAvatar: userAvatarUrl,
  },
  {
    id: 'post3',
    imageUrl: getPicsumImageUrlById(POST_IMAGE_IDS.momMarketing, 450, 500),
    thumbnailUrl: getPicsumThumbnailUrlById(POST_IMAGE_IDS.momMarketing),
    caption: "When your mom turns into your marketing manager...",
    likes: 71,
    commentsCount: 22,
    date: '03 May, 2023',
    username: 'botspacehq',
    userAvatar: userAvatarUrl,
  },
  {
    id: 'post4',
    imageUrl: getPicsumImageUrlById(POST_IMAGE_IDS.aiGoldmine, 500, 500),
    thumbnailUrl: getPicsumThumbnailUrlById(POST_IMAGE_IDS.aiGoldmine),
    caption: "Unlock Instagram's hidden goldmine with AI! ...",
    likes: 199,
    commentsCount: 35,
    date: '01 Jun, 2023',
    username: 'botspacehq',
    userAvatar: userAvatarUrl,
  },
];

export const defaultUser = {
  username: 'botspacehq',
  avatar: userAvatarUrl,
  userAvatar: userAvatarUrl,
};

