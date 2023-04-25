import Header from "@/Components/Header";
import useUser from "@/Hooks/useUser";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

//react-spinners
const UserView = () => {
     const router = useRouter();
     const { userId } = router.query;

     const { data: fetchUser, isLoading } = useUser(userId as string);

     if (isLoading || !fetchUser) {
          return (
               <div className="flex justify-center items-center h-full">
                    <ClipLoader color="Lightblue" size={80} />
               </div>
          );
     }
     return (
          <>
               <Header showBackArrow label={fetchUser?.name} />
          </>
     );
};
export default UserView;
