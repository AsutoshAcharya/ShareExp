import NavBar from "../../components/NavBar";
import PostCard from "./PostCard";

const Home = () => {
  return (
    <div className=" bg-slate-300">
      <NavBar />
      <div className="flex w-dvw p-5">
        <PostCard
          _id={1}
          title="Sample Title"
          body="Sample body content for the post"
          posted_by="User123"
          image="https://www.shutterstock.com/image-photo/neon-avatar-vectorstyle-image-naruto-260nw-2515582615.jpg"
          total_likes={10}
          total_comments={5}
          createdAt="2023-10-18T12:00:00Z"
          updatedAt="2023-10-19T12:00:00Z"
          created_by_id="user123"
          created_by="John Doe"
          email="john@example.com"
          country="USA"
          company="Example Corp"
          profile_picture="https://www.shutterstock.com/image-photo/neon-avatar-vectorstyle-image-naruto-260nw-2515582615.jpg"
          comments={[
            {
              user: "Jane Smith",
              text: "Thanks for sharing! This is super helpful.",
              date: "2023-09-22T10:30:00Z",
            },
            {
              user: "Mike Johnson",
              text: "I had a similar experience with them. Great post!",
              date: "2023-09-23T14:45:00Z",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Home;
