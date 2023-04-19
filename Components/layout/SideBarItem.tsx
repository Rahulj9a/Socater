import { useRouter } from "next/router";
import { IconType } from "react-icons";
import { useCallback } from "react";
import usecurrentUser from "@/Hooks/useCurrentUser";
import useLoginModal from "@/Hooks/useLoginModal";

interface SidebarItemProps {
     label: String;
     href?: String;
     icon: IconType;
     onClick?: void;
     auth?: boolean;
}

const SideBarItem: React.FC<SidebarItemProps> = ({
     label,
     href,
     icon: Icon,
     onClick,
     auth,
}) => {
     const loginModal = useLoginModal();
     const { data: currentUser } = usecurrentUser();
     const router = useRouter();
     const handleClick = useCallback(() => {
          if (onClick) {
               return onClick();
          }
          if (auth && !currentUser) {
               loginModal.onOpen();
          } else if (href) {
               router.push(href);
          }
     }, [router, onClick, href, currentUser, auth, loginModal]);
     return (
          <div onClick={handleClick} className="flex flex-row items-center">
               <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
                    <Icon size={28} color="white" />
               </div>
               <div className="relative rounded-full gap-4 items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer hidden lg:flex">
                    <Icon size={24} color="white" />
                    <p className="hidden lg:block text-white text-xl">
                         {label}
                    </p>
               </div>
          </div>
     );
};

export default SideBarItem;
