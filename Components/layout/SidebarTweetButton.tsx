import usecurrentUser from "@/Hooks/useCurrentUser";
import useLoginModal from "@/Hooks/useLoginModal";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { FaFeather } from "react-icons/fa";

const SidebarTweetButton = () => {
     const { data: currentUser } = usecurrentUser();
     const router = useRouter();
     const loginModal = useLoginModal();
     const onClick = useCallback(() => {
          if (!currentUser) {
               return loginModal.onOpen();
          }
          router.push("/");
     }, [loginModal, currentUser]);

     return (
          <div onClick={onClick}>
               <div className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-500 hover:bg-opacity-80 transition cursor-pointer">
                    <FaFeather size={24} color="white" />
               </div>
               <div className="rounded-full hidden lg:block mt-6 px-4 py-2 bg-sky-500 hover:bg-opacity-90 cursor-pointer transition">
                    <p className="hidden lg:block text-center font-semibold text-white text-[20px]">
                         Tweet
                    </p>
               </div>
          </div>
     );
};

export default SidebarTweetButton;
