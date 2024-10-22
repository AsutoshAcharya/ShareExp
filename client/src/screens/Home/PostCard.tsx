import UserAvatar from "../../components/UserAvatar";

const PostCard = () => {
  return (
    <div className="h-[30rem] w-1/3 bg-white shadow-lg rounded-lg p-1">
      <div className="w-full flex flex-row align-baseline gap-2">
        <UserAvatar
          size={65}
          name="dadsad dad ddsd sda"
          className="text-gray-500"
          imageUrl="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
        />
        <div className="flex flex-col"></div>
      </div>
    </div>
  );
};

export default PostCard;
