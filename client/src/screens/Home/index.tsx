import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
//local imports

import NavBar from "../../components/NavBar";
import PostCard from "./PostCard";
import useCreds from "../../hooks/useUser";
import { Post as PostService } from "../../services";
import { Some } from "../../helpers/Some";
import { Post } from "./type";
import { BlurryLoader } from "../../components";

const Home = () => {
  const { user } = useCreds("id", "token");
  const [offset, setOffset] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [postData, setPostData] = useState<Array<Post>>([]);

  function toPost(data: any): Post {
    return {
      id: Some.String(data?._id),
      title: Some.String(data?.title),
      body: Some.String(data?.body),
      postedById: Some.String(data?.posted_by),
      totalLikes: Some.Number(data?.total_likes),
      totalComments: Some.Number(data?.total_comments),
      createdAt: Some.Date(data?.createdAt),
      updatedAt: Some.Date(data?.updatedAt),
      postedByName: Some.String(data?.created_by),
      country: Some.String(data?.country),
      company: Some.String(data?.company),
      profilePicture: Some.String(data?.profile_picture),
      image: Some.String(data?.image),
      isLikedByYou: Some.Boolean(data?.isLikedByYou),
    };
  }
  async function getAllPosts() {
    const resp = await PostService.getAllPost({ ...user, offset });
    return Some.Array(resp?.data);
  }
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["get-all-posts", user.id, offset],
    queryFn: getAllPosts,
    select: (data) => data.map(toPost),
    onSuccess: (data) => {
      if (isAtBottom) setPostData((prev) => [...prev, ...data]);
      else {
        setPostData(data);
      }
    },
    refetchOnWindowFocus: false,
    initialData: [] as Array<Post>,
  });
  console.log(offset);
  return (
    <div className="h-screen w-screen">
      <NavBar />
      <div
        className="flex h-[95%] flex-grow w-dvw p-5 flex-col gap-5 overflow-auto"
        onScroll={(e) => {
          const { scrollTop, scrollHeight, offsetHeight } = e.currentTarget;
          const diff = scrollHeight - offsetHeight;
          setIsAtBottom(false);
          if (
            Math.floor(scrollTop) === diff ||
            (Math.ceil(scrollTop) === diff && data.length !== 0)
          ) {
            setIsAtBottom(true);
            setOffset((prev) => prev + 5);
          }
        }}
      >
        {isLoading ? (
          <BlurryLoader style={{ height: "80dvh" }} />
        ) : (
          postData.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default Home;
