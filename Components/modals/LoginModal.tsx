import useLoginModal from "@/Hooks/useLoginModal";
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/Hooks/useRegisterModal";

const LoginModal = () => {
     const loginModal = useLoginModal();
     const registerModal = useRegisterModal();
     const [email, setemail] = useState("");
     const [password, setpassword] = useState("");
     const [loading, setloading] = useState(false);
     const onToggle = useCallback(() => {
          if (loading) {
               return;
          }
          registerModal.onOpen();
          loginModal.onClose();
     }, [loading, loginModal, registerModal]);

     const onSubmit = useCallback(async () => {
          try {
               setloading(true);
               //Todo:add login

               loginModal.onClose();
          } catch (error) {
               console.log(error);
          } finally {
               setloading(false);
          }
     }, [loginModal]);

     const bodyContent = (
          <div className="flex flex-col gap-4">
               <Input
                    placeholder="Email"
                    onChange={(e) => setemail(e.target.value)}
                    value={email}
                    disabled={loading}
               />
               <Input
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setpassword(e.target.value)}
                    value={password}
                    disabled={loading}
               />
          </div>
     );
     const footerContent = (
          <div className="text-neutral-400 text-center mt-4">
               <p>
                    First time using twitter?{" "}
                    <span
                         className="text-white cursor-pointer hover:underline"
                         onClick={onToggle}>
                         Regsiter
                    </span>
               </p>
          </div>
     );

     return (
          <div>
               <Modal
                    disabled={loading}
                    isOpen={loginModal.isOpen}
                    title="Login"
                    actionLabel="Sign in"
                    onClose={loginModal.onClose}
                    onSubmit={onSubmit}
                    body={bodyContent}
                    footer={footerContent}
               />
          </div>
     );
};

export default LoginModal;
