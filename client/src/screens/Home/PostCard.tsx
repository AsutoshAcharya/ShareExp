import P from "../../components/P";
import UserAvatar from "../../components/UserAvatar";

const PostCard = () => {
  return (
    <div className="w-1/3 bg-white shadow-lg rounded-lg p-2 flex flex-col gap-4">
      <div className="w-full flex flex-row item-center gap-2">
        <UserAvatar
          size={65}
          name="dadsad dad ddsd sda"
          className="text-gray-500"
          imageUrl="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
        />
        <div className="flex flex-col text-gray-500 text-sm justify-center">
          <p>written By,Asutosh</p>
          <p>India</p>
          <p>Frontend Dev</p>
        </div>
        <div className="flex-grow" />
        <p className="flex items-center text-sm text-gray-500">12-Oct-2024</p>
      </div>
      <div className="h-[20rem] w-full relative bg-gray-600 rounded-md">
        <img
          className="`bg-cover bg-center rounded-md bg-no-repeat bg-contain w-full h-full"
          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg"
          loading="lazy"
          alt="postimage"
        />
        <P
          title="TitleTitleTitleTitleTitl"
          className="text-white absolute top-[45%] text-3xl"
        />
      </div>
      <P title="body" className="text-base text-gray-700" />
      <div className="flex flex-row items-stretch justify-center"></div>
      <button className="btn w-64 rounded-full">Button</button>
    </div>
  );
};

export default PostCard;
