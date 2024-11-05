import { Fragment, FC, useState } from "react";
import { range } from "../../helpers";
import CommentSkeleton from "../../components/CommentSkeleton";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PostComment } from "./type";
import { Post } from "../../services";
import { useApiCall, useCreds } from "../../hooks";
import { Some } from "../../helpers/Some";
import clsx from "clsx";
import { toast } from "react-toastify";
import moment from "moment-timezone";
import UserAvatar from "../../components/UserAvatar";
import uniqolor from "uniqolor";

interface Props {
  showComments: boolean;
  postId: string;
}

const Comment: FC<Props> = ({ showComments, postId }) => {
  const { user } = useCreds("token", "id");
  const [commentInput, setCommentInput] = useState("");
  const client = useQueryClient();

  const addComment = useApiCall({
    fn: Post.addComment,
    onSuccess: () => {
      toast.success("Comment added");
      client.invalidateQueries(["get-all-comments", postId]);
      client.invalidateQueries(["get-all-posts", user.id]);
      setCommentInput("");
    },
    onError: () => toast.error("Something went wrong!"),
  });

  function toComment(data: any): PostComment {
    return {
      id: Some.String(data?._id),
      postId: Some.String(data?.post_id),
      comment: Some.String(data?.comment),
      date: Some.Date(data?.createdAt),
      commentedBy: Some.String(data?.commented_by_name),
      commentedById: Some.String(data?.commented_by_id),
      country: Some.String(data?.country),
      profilePicture: Some.String(data?.profile_picture),
    };
  }

  async function getAllComments() {
    const resp = await Post.getAllCommentByPostId({ ...user, postId });
    return Some.Array(resp?.data);
  }

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["get-all-comments", postId],
    select: (data) => data.map(toComment),
    queryFn: getAllComments,
    enabled: Some.Boolean(postId),
    initialData: [],
  });

  function handleAdd() {
    const apiData = {
      ...user,
      data: {
        user_id: user.id,
        post_id: postId,
        comment: commentInput,
      },
    };
    addComment.mutate(apiData);
  }

  return (
    <Fragment>
      {showComments && (
        <div className="mt-4 border-t pt-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">Comments</h4>
          <div className="flex items-center space-x-2 mb-4">
            <input
              type="text"
              className="input input-bordered w-full p-2 rounded-lg shadow-sm text-gray-700"
              placeholder="Add a comment..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <button
              onClick={handleAdd}
              disabled={commentInput.trim().length === 0}
              className={clsx(
                "btn btn-primary px-4 py-2 rounded-lg shadow-md text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200",
                commentInput.trim().length === 0 && "disabled"
              )}
            >
              Post
            </button>
          </div>

          <ul className="space-y-4 max-h-64 overflow-y-auto">
            {isLoading || isFetching ? (
              range(3).map((r) => <CommentSkeleton key={r} />)
            ) : (
              <Fragment>
                {data.map((comment) => {
                  const avatarBg = uniqolor(comment.commentedBy).color;
                  return (
                    <li
                      key={comment.id}
                      className="bg-white/50 backdrop-blur-md p-3 rounded-lg shadow-sm border border-gray-200"
                    >
                      <div className="flex items-center mb-2 gap-2">
                        <UserAvatar
                          imageUrl={comment?.profilePicture}
                          name={comment?.commentedBy}
                          style={{ backgroundColor: avatarBg }}
                          size={40}
                        />
                        <div>
                          <span className="font-medium text-gray-800 mr-2">
                            {comment.commentedBy}
                          </span>
                          <span className="text-xs text-gray-400">
                            {moment(comment.date)
                              .tz("Asia/Kolkata")
                              .format("MMM D, YYYY [at] h:mm A")}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{comment.comment}</p>
                    </li>
                  );
                })}
              </Fragment>
            )}
          </ul>
        </div>
      )}
    </Fragment>
  );
};

export default Comment;
