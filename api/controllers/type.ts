export type LikePost = {
  user_id?: string;
  post_id?: string;
};

export type CommentPost = {
  user_id?: string;
  post_id?: string;
  comment?: string;
};

export type UserRating = {
  rated_user_id?: string;
  giver_user_id?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
};
