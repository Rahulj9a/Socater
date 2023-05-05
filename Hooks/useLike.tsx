import usecurrentUser from "./useCurrentUser";
import usePost from "./usePost";
import usePosts from "./usePosts";
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
     const { data: currentUser } = usecurrentUser();
     const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
     const { mutate: mutateFetchedPosts } = usePosts(userId);

     const LoginModal = useLoginModal();

     const hasLiked = useMemo(() => {
          const list = fetchedPost?.likedIds || [];
          return list.includes(currentUser?.id);
     }, [currentUser?.id, fetchedPost?.likedIds]);

     const toggleLike = useCallback(async () => {
          if (!currentUser) {
               return LoginModal.onOpen;
          }
          try {
               let request;
               if (hasLiked) {
                    request = () => axios.delete(`/api/likes?postId=${postId}`);
               } else {
                    request = () => axios.post("/api/likes", { postId });
               }

               await request();
               mutateFetchedPost();
               mutateFetchedPosts();

               /* toast.success("Liked"); */
          } catch (error) {
               toast.error("Something went wrong");
          }
     }, [
          currentUser,
          mutateFetchedPost,
          mutateFetchedPosts,
          postId,
          hasLiked,
          LoginModal,
     ]);
     return {
          hasLiked,
          toggleLike,
     };
};

export default useLike;
