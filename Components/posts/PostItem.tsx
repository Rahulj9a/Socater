import usecurrentUser from "@/Hooks/useCurrentUser";
import useLoginModal from "@/Hooks/useLoginModal";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import Avatar from "../Avatar";

interface PostItemProps {
     data: Record<string, any>;
     userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
     const router = useRouter();
     const loginModal = useLoginModal();

     const { data: currentUser } = usecurrentUser();

     const goToUser = useCallback(
          (event: any) => {
               event.stopPropgation();

               router.push(`/user/${data.user.id}`);
          },
          [router, data.user.id],
     );

     const goToPost = useCallback(() => {
          router.push(`/posts/${data.id}`);
     }, [router, data.id]);

     const onLike = useCallback(
          (event: any) => {
               event.stopPropgation();
               loginModal.onOpen;
          },
          [loginModal],
     );
     const createdAt = useMemo(() => {
          if (!data?.createdAt) {
               return null;
          }
          return formatDistanceToNowStrict(new Date(data.createdAt));
     }, [data?.createdAt]);
     return (
          <>
               <div
                    onClick={goToPost}
                    className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
                    <div className="flex flex-row items-start gap-3">
                         <Avatar userId={data.user.id} />
                         <div>
                              <div className="flex flex-row items-center gap-2">
                                   <p
                                        className="text-white cursor-pointer hover:underline font-semibold "
                                        onClick={goToUser}>
                                        {data.user.name}
                                   </p>
                                   <span
                                        onClick={goToUser}
                                        className="text-neutral-500 cursor-ponter hover:underline hidden md:block">
                                        @{data.user.username}
                                   </span>
                                   <span
                                        onClick={goToUser}
                                        className="text-neutral-500 text-sm">
                                        {createdAt}
                                   </span>
                              </div>
                              <div className="text-white mt-1">{data.body}</div>
                         </div>
                    </div>
               </div>
          </>
     );
};
export default PostItem;
