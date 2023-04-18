import useRegisterModal from "@/Hooks/useRegisterModal";
import useLoginModal from "@/Hooks/useLoginModal";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import axios from "axios";

const RegisterModal = () => {
     const registerModal = useRegisterModal();
     const loginModal = useLoginModal();

     const [email, setemail] = useState("");
     const [password, setpassword] = useState("");
     const [name, setname] = useState("");
     const [username, setuserName] = useState("");
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

               //add Register and login
               console.log(name, username, password, email);
               await axios.post("/api/register", {
                    email,
                    password,
                    username,
                    name,
               });

               toast.success("Account created");

               signIn("credentials", { email, password });

               registerModal.onClose();
          } catch (error) {
               console.log(error);
               toast.error("Something went wrong");
          } finally {
               setloading(false);
          }
     }, [registerModal, email, password, username, name]);

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
                    value={username}
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
