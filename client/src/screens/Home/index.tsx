import NavBar from "../../components/NavBar";
import PostCard from "./PostCard";

const Home = () => {
  return (
    <div className="h-dvh w-dvw bg-slate-300">
      <NavBar />
      <div className="flex w-dvw p-2">
        <PostCard />
      </div>
    </div>
  );
};

export default Home;
