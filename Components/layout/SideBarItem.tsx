import { useRouter } from "next/router";
import { IconType } from "react-icons";
import { useCallback } from "react";
import usecurrentUser from "@/Hooks/useCurrentUser";
import useLoginModal from "@/Hooks/useLoginModal";
import { BsDot } from "react-icons/bs";

interface SidebarItemProps {
     label: string;
     href?: string;
     icon: IconType;
     onClick?: () => void;
     auth?: boolean;
     alert?: boolean;
}

const SideBarItem: React.FC<SidebarItemProps> = ({
     label,
     href,
     icon: Icon,
     onClick,
     auth,
     alert,
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
                    {alert ? (
                         <BsDot
                              className="text-sky-500 absolute -top-4 left-0"
                              size={80}
                         />
                    ) : null}
               </div>
               <div className="relative rounded-full gap-4 items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer hidden lg:flex">
                    <Icon size={24} color="white" />
                    <p className="hidden lg:block text-white text-xl">
                         {label}
                    </p>
                    {alert ? (
                         <BsDot
                              className="text-sky-500 absolute -top-4 left-0"
                              size={80}
                         />
                    ) : null}
               </div>
          </div>
     );
};

export default SideBarItem;
