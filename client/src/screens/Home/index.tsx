import { useQuery } from "@tanstack/react-query";
import NavBar from "../../components/NavBar";
import PostCard from "./PostCard";
import useCreds from "../../hooks/useUser";
import { useState } from "react";
import { Post as PostService } from "../../services";
import { Some } from "../../helpers/Some";
import { Post } from "./type";
import { BlurryLoader } from "../../components";

const Home = () => {
  const { user } = useCreds("id", "token");
  const [offset, setOffset] = useState(0);

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
    };
  }
  async function getAllPosts() {
    const resp = await PostService.getAllPost({ ...user, offset });
    return Some.Array(resp?.data);
  }
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["get-all-posts", user.id],
    queryFn: getAllPosts,
    select: (data) => data.map(toPost),
    refetchOnWindowFocus: false,
    initialData: [] as Array<Post>,
  });
  // console.log(data);
  return (
    <div className="  h-screen w-screen">
      <NavBar />
      <div className="flex flex-grow w-dvw p-5 flex-col gap-5 overflow-auto">
        {isLoading ? (
          <BlurryLoader style={{ height: "80dvh" }} />
        ) : (
          data.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default Home;
