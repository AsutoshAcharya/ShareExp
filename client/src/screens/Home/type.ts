export type Post = {
  id: string;
  title: string;
  body: string;
  postedById: string;
  totalLikes: number;
  totalComments: number;
  createdAt: Date;
  updatedAt: Date;
  postedByName: string;
  country?: string;
  company?: string;
  profilePicture?: string;
  image?: string;
  isLikedByYou: boolean;
};
