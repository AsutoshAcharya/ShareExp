import React, { useState } from "react";
import uniqolor from "uniqolor";
import { useQueryClient } from "@tanstack/react-query";

//icons imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faShare } from "@fortawesome/free-solid-svg-icons";

//local imports
import { Post } from "./type";
import UserAvatar from "../../components/UserAvatar";
import { useApiCall } from "../../hooks";
import { Post as PostService } from "../../services";
import useCreds from "../../hooks/useCreds";
import { toast } from "react-toastify";
import Comment from "./Comment";

interface Comment {
  user: string;
  text: string;
  date: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { user } = useCreds("id", "token");
  const [showComments, setShowComments] = useState(false);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const client = useQueryClient();

  const avatarBg = uniqolor(post.postedByName).color;

  const handleLike = useApiCall({
    fn: post.isLikedByYou ? PostService.dislikePost : PostService.likePost,
    onSuccess: () => {
      toast.success(`Post ${post.isLikedByYou ? "Disliked" : "Liked"}`);
      client.invalidateQueries(["get-all-posts", user.id]);
    },
    onError: () => toast.error("Something went wrong!"),
  });

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="card w-full bg-secondary backdrop-blur-lg shadow-lg rounded-xl overflow-hidden border border-gray-200 transition-transform duration-300 hover:shadow-2xl p-6 flex-shrink-0">
      {/* Post Header */}
      <div className="flex items-center mb-4 gap-3">
        <UserAvatar
          imageUrl={post?.profilePicture}
          name={post?.postedByName}
          style={{ backgroundColor: avatarBg }}
          size={50}
        />
        <div>
          <h2 className="text-lg font-semibold text-neutral">
            {post?.postedByName}
          </h2>
          {post?.company && (
            <p className="text-sm text-neutral">{post?.company}</p>
          )}
          <p className="text-xs text-neutral">
            Posted on: {post.createdAt.toLocaleDateString()}
          </p>
          {post.updatedAt && (
            <p className="text-xs text-neutral">
              Updated on: {post.updatedAt.toLocaleDateString()}
            </p>
          )}
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
      <p className="text-gray-700 mb-4 overflow-hidden text-ellipsis">
        {post.body}
      </p>

      {/* {image && (
        <figure className="mb-4 rounded-lg overflow-hidden">
          <img
            src={image}
            alt="Post visual"
            className="w-full h-64 object-cover rounded-md border border-gray-200"
          />
        </figure>
      )} */}

      <div className="flex justify-between items-center mt-4 border-t pt-4">
        <div className="flex items-center space-x-4 text-gray-600">
          <button
            onClick={() => {
              handleLike.mutate({
                ...user,
                data: {
                  user_id: user.id,
                  post_id: post.id,
                },
              });
            }}
            className={`btn btn-ghost btn-sm flex items-center space-x-1 ${
              post.isLikedByYou ? "text-red-500" : "text-gray-600"
            }`}
          >
            <FontAwesomeIcon icon={faHeart} />
            <span className="text-sm">{post.totalLikes}</span>
          </button>
          <button
            onClick={toggleComments}
            className="btn btn-ghost btn-sm flex items-center space-x-1"
          >
            <FontAwesomeIcon icon={faComment} />
            <span className="text-sm">{post.totalComments}</span>
          </button>
          <button className="btn btn-ghost btn-sm flex items-center space-x-1 text-gray-600">
            <FontAwesomeIcon icon={faShare} />
          </button>
        </div>
      </div>
      <div
        className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
          showComments ? "max-h-screen" : "max-h-0"
        }`}
      >
        {showComments && (
          <Comment showComments={showComments} postId={post.id} />
        )}
      </div>
    </div>
  );
};

export default PostCard;
