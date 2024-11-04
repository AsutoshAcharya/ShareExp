const CommentSkeleton = () => {
  return (
    <div className="flex w-96 flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
        <div className="flex flex-col gap-4">
          <div className="skeleton h-4 w-20"></div>
          <div className="skeleton h-4 w-60"></div>
        </div>
      </div>
    </div>
  );
};

export default CommentSkeleton;
