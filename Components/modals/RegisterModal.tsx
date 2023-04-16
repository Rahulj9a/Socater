import useRegisterModal from "@/Hooks/useRegisterModal";
import useLoginModal from "@/Hooks/useLoginModal";
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";

const RegisterModal = () => {
     const registerModal = useRegisterModal();
     const loginModal = useLoginModal();

     const [email, setemail] = useState("");
     const [password, setpassword] = useState("");
     const [name, setname] = useState("");
     const [userName, setuserName] = useState("");
     const [loading, setloading] = useState(false);

     const onToggle = useCallback(() => {
          if (loading) {
               return;
          }
          registerModal.onClose();
          loginModal.onOpen();
     }, [loading, loginModal, registerModal]);

     const onSubmit = useCallback(async () => {
          try {
               setloading(true);
               //Todo:add Register and login

               registerModal.onClose();
          } catch (error) {
               console.log(error);
          } finally {
               setloading(false);
          }
     }, [registerModal]);

     const bodyContent = (
          <div className="flex flex-col gap-4">
               <Input
                    placeholder="Email"
                    onChange={(e) => setemail(e.target.value)}
                    value={email}
                    disabled={loading}
               />
               <Input
                    placeholder="Name"
                    onChange={(e) => setname(e.target.value)}
                    value={name}
                    disabled={loading}
               />
               <Input
                    placeholder="UserName"
                    onChange={(e) => setuserName(e.target.value)}
                    value={userName}
                    disabled={loading}
               />
               <Input
                    placeholder="Password"
                    onChange={(e) => setpassword(e.target.value)}
                    value={password}
                    disabled={loading}
               />
          </div>
     );

     const footerContent = (
          <div className="text-neutral-400 text-center mt-4">
               <p>
                    Already have an account?{" "}
                    <span
                         className="text-white cursor-pointer hover:underline"
                         onClick={onToggle}>
                         Sign in
                    </span>
               </p>
          </div>
     );
     return (
          <div>
               <Modal
                    disabled={loading}
                    isOpen={registerModal.isOpen}
                    title="Create an account"
                    actionLabel="Regsiter"
                    onClose={registerModal.onClose}
                    onSubmit={onSubmit}
                    body={bodyContent}
                    footer={footerContent}
               />
          </div>
     );
};

export default RegisterModal;
