import usePosts from "@/Hooks/usePosts";
import PostItem from "./PostItem";

interface PostfeedProps {
     userId?: string;
}

const Postfeed: React.FC<PostfeedProps> = ({ userId }) => {
     const { data: posts = [] } = usePosts(userId);
     return (
          <>
               {posts.map((post: Record<string, any>) => (
                    <PostItem userId={userId} key={post.id} data={post} />
               ))}
          </>
     );
};

export default Postfeed;
