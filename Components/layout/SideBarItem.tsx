import { IconType } from "react-icons";

interface SidebarItemProps {
     label: String;
     href?: String;
     icon: IconType;
     onClick?: void;
}

const SideBarItem: React.FC<SidebarItemProps> = ({
     label,
     href,
     icon: Icon,
     onClick,
}) => {
     return (
          <div className="flex flex-row items-center">
               <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 curser-pointer lg:hidden">
                    <Icon size={28} color="white" />
               </div>
               <div className="relative rounded-full gap-4 items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 curser-pointer hidden lg:flex">
                    <Icon size={24} color="white" />
                    <p className="hidden lg:block text-white text-xl">
                         {label}
                    </p>
               </div>
          </div>
     );
};

export default SideBarItem;
