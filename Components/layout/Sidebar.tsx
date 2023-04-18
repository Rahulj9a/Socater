import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import SideBarLogo from "./SideBarLogo";

import SideBarItem from "./SideBarItem";
import SidebarTweetButton from "./SidebarTweetButton";
import usecurrentUser from "@/Hooks/useCurrentUser";
import { signOut } from "next-auth/react";

const SideBar = () => {
     const { data: currentUser } = usecurrentUser();

     const items = [
          {
               label: "Home",
               href: "/",
               icon: BsHouseFill,
          },
          {
               label: "Notifications",
               href: "notifications",
               icon: BsBellFill,
          },
          {
               label: "Profile",
               href: "/user123",
               icon: FaUser,
          },
     ];

     return (
          <div className="col-span-1 h-full pr-4 md:pr-6">
               <div className="flex flex-col items-end">
                    <div className="space-y-2 lg:w-[230px]">
                         <SideBarLogo />
                         {items.map((item) => {
                              return (
                                   <SideBarItem
                                        key={item.href}
                                        href={item.href}
                                        icon={item.icon}
                                        label={item.label}
                                   />
                              );
                         })}
                         {currentUser && (
                              <SideBarItem
                                   onClick={() => signOut()}
                                   icon={BiLogOut}
                                   label="Logout"
                              />
                         )}
                         <SidebarTweetButton />
                    </div>
               </div>
          </div>
     );
};
export default SideBar;
