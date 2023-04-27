import usecurrentUser from "@/Hooks/useCurrentUser";
import useLoginModal from "@/Hooks/useLoginModal";
import usePosts from "@/Hooks/usePosts";
import useRegisterModal from "@/Hooks/useRegisterModal";
import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import Button from "./Button";
import RegisterModal from "./modals/RegisterModal";
import Avatar from "./Avatar";

interface FormProps {
     placeholder: string;
     isComment?: boolean;
     postId?: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
     const RegisterModal = useRegisterModal();
     const LoginModal = useLoginModal();
     const { data: currentUser } = usecurrentUser();
     const { mutate: mutatePosts } = usePosts();
     const [body, setBody] = useState("");
     const [isLoading, setisLoading] = useState(false);

     const onSubmit = useCallback(async () => {
          try {
               setisLoading(true);

               await axios.post("/api/posts", { body });
               toast.success("Tweet Created");
               setBody("");
               mutatePosts();
          } catch (error) {
               toast.error("Something went wrong");
          } finally {
               setisLoading(false);
          }
     }, [body, mutatePosts]);

     return (
          <div className="border-b-[1px] border-neutral-800 px-5 py-2 ">
               {currentUser ? (
                    <div className="flex flex-row gap-4">
                         <div>
                              <Avatar userId={currentUser?.id} />
                         </div>
                         <div className="w-full">
                              <textarea
                                   disabled={isLoading}
                                   className="disabled:opacity-800 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white"
                                   onChange={(e) => setBody(e.target.value)}
                                   value={body}
                                   placeholder={placeholder}></textarea>
                              <hr className="opacity-0 peer-focus:opacity-80 h-[1px] w-full border-neutral-800 transition" />
                              <div
                                   className="mt-4 flex flex-row justify-end
                              ">
                                   <Button
                                        disabled={isLoading || !body}
                                        onClick={onSubmit}
                                        label="Tweet"
                                   />
                              </div>
                         </div>
                    </div>
               ) : (
                    <div className="py-8">
                         <h1 className="text-white text-2xl text-center mb-4 font-bold">
                              Welcome to Twitter
                         </h1>
                         <div className="flex flex-row items-center justify-center gap-4">
                              <Button
                                   label="Login"
                                   onClick={LoginModal.onOpen}
                              />
                              <Button
                                   label="Register"
                                   onClick={RegisterModal.onOpen}
                                   secondary
                              />
                         </div>
                    </div>
               )}
          </div>
     );
};
export default Form;
