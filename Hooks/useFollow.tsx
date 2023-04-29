import { useCallback, useMemo } from "react";
import usecurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";
import { toast } from "react-hot-toast";
import axios from "axios";

const useFollow = (userId: string) => {
     const { data: currentUser, mutate: mutateCurrentUser } = usecurrentUser();
     const { mutate: mutateFetchedUser } = useUser(userId);

     const loginModal = useLoginModal();
     const isFollowing = useMemo(() => {
          const list = currentUser?.followingIds || [];
          return list.includes(userId);
     }, [currentUser, userId]);

     const toggleFollow = useCallback(async () => {
          if (!currentUser) {
               return loginModal.onOpen();
          }

          try {
               let request;
               if (isFollowing) {
                    request = () =>
                         axios.delete("/api/follow", { data: { userId } });
               } else {
                    request = () => axios.post("/api/follow", { userId });
               }

               await request();
               mutateCurrentUser();
               mutateFetchedUser();
          } catch (error) {
               toast.error("Something went wrong");
          }
     }, [
          userId,
          currentUser,
          loginModal,
          isFollowing,
          mutateCurrentUser,
          mutateFetchedUser,
     ]);

     return {
          isFollowing,
          toggleFollow,
     };
};

export default useFollow;
