import Form from "@/Components/Form";
import Header from "@/Components/Header";
import PostItem from "@/Components/posts/PostItem";
import usePost from "@/Hooks/usePost";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

const postView = () => {
     const router = useRouter();
     const { postId } = router.query;

     const { data: fetchedPost, isLoading } = usePost(postId as string);

     if (isLoading || !fetchedPost) {
          return (
               <div className="flex justify-center items-center h-full">
                    <ClipLoader color="lightblue" size={80} />
               </div>
          );
     }
     return (
          <>
               <Header label={"Tweet"} showBackArrow />
               <PostItem data={fetchedPost} />
               <Form
                    placeholder="Tweet your reply"
                    postId={postId as string}
                    isComment
               />
          </>
     );
};
export default postView;
