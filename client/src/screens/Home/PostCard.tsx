import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faShare } from "@fortawesome/free-solid-svg-icons";

interface Comment {
  user: string;
  text: string;
  date: string;
}

interface PostCardProps {
  _id: number;
  title: string;
  body: string;
  posted_by: string;
  image?: string;
  total_likes: number;
  total_comments: number;
  createdAt: string;
  updatedAt?: string;
  created_by_id: string;
  created_by: string;
  email: string;
  country: string;
  company: string;
  profile_picture: string;
  comments: Comment[];
}

const PostCard: React.FC<PostCardProps> = ({
  _id,
  title,
  body,
  posted_by,
  image,
  total_likes,
  total_comments,
  createdAt,
  updatedAt,
  created_by_id,
  created_by,
  email,
  country,
  company,
  profile_picture,
  comments,
}) => {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [postComments, setPostComments] = useState<Comment[]>(comments);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleAddComment = () => {
    if (commentInput.trim()) {
      const newComment = {
        user: "Current User", // Replace with the current user's name
        text: commentInput,
        date: new Date().toISOString(),
      };
      setPostComments([...postComments, newComment]);
      setCommentInput("");
    }
  };

  return (
    <div className="card w-full bg-white/30 backdrop-blur-lg shadow-lg rounded-xl overflow-hidden border border-gray-200 transition-transform duration-300 hover:shadow-2xl p-6">
      {/* Post Header */}
      <div className="flex items-center mb-4">
        <img
          src={profile_picture}
          alt={`${created_by}'s profile`}
          className="w-12 h-12 rounded-full border border-gray-300 mr-4"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{created_by}</h2>
          <p className="text-sm text-gray-500">
            {company}, {country}
          </p>
          <p className="text-xs text-gray-400">
            Posted on: {new Date(createdAt).toLocaleDateString()}
          </p>
          {updatedAt && (
            <p className="text-xs text-gray-400">
              Updated on: {new Date(updatedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-700 mb-4 overflow-hidden text-ellipsis">{body}</p>

      {image && (
        <figure className="mb-4 rounded-lg overflow-hidden">
          <img
            src={image}
            alt="Post visual"
            className="w-full h-64 object-cover rounded-md border border-gray-200"
          />
        </figure>
      )}

      <div className="flex justify-between items-center mt-4 border-t pt-4">
        <div className="flex items-center space-x-4 text-gray-600">
          <button
            onClick={handleLikeClick}
            className={`btn btn-ghost btn-sm flex items-center space-x-1 ${
              liked ? "text-red-500" : "text-gray-600"
            }`}
          >
            <FontAwesomeIcon icon={faHeart} />
            <span className="text-sm">
              {liked ? total_likes + 1 : total_likes}
            </span>
          </button>
          <button
            onClick={toggleComments}
            className="btn btn-ghost btn-sm flex items-center space-x-1"
          >
            <FontAwesomeIcon icon={faComment} />
            <span className="text-sm">{postComments.length}</span>
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
          <div className="mt-4 border-t pt-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Comments
            </h4>
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="text"
                className="input input-bordered w-full p-2 rounded-lg shadow-sm text-gray-700"
                placeholder="Add a comment..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
              />
              <button
                onClick={handleAddComment}
                className="btn btn-primary px-4 py-2 rounded-lg shadow-md text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
              >
                Post
              </button>
            </div>

            <ul className="space-y-4 max-h-64 overflow-y-auto">
              {postComments.map((comment, index) => (
                <li
                  key={index}
                  className="bg-white/50 backdrop-blur-md p-3 rounded-lg shadow-sm border border-gray-200"
                >
                  <div className="flex items-center mb-2">
                    <span className="font-medium text-gray-800 mr-2">
                      {comment.user}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(comment.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{comment.text}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
