import usecurrentUser from "@/Hooks/useCurrentUser";
import useEditModal from "@/Hooks/useEditModal";
import useUser from "@/Hooks/useUser";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "../Modal";
import Input from "../Input";
import ImageUpload from "../ImageUpload";

const EditModal = () => {
     const { data: currentUser } = usecurrentUser();
     const { mutate: mutatefetchedUser } = useUser(currentUser?.id);
     const editModal = useEditModal();

     const [profileImage, setprofileImage] = useState("");
     const [bio, setbio] = useState("");
     const [coverImage, setcoverImage] = useState("");
     const [name, setname] = useState("");
     const [username, setusername] = useState("");

     useEffect(() => {
          setprofileImage(currentUser?.profileImage);
          setcoverImage(currentUser?.coverImage);
          setusername(currentUser?.username);
          setname(currentUser?.name);
          setbio(currentUser?.bio);
     }, [
          currentUser?.name,
          currentUser?.username,
          currentUser?.bio,
          currentUser?.profileImage,
          currentUser?.coverImage,
     ]);

     const [isLoading, setisLoading] = useState(false);

     const onSubmit = useCallback(async () => {
          try {
               setisLoading(true);
               await axios.patch("/api/edit", {
                    name,
                    username,
                    bio,
                    profileImage,
                    coverImage,
               });

               mutatefetchedUser();
               toast.success("Updated");

               editModal.onClose();
          } catch (error) {
               toast.error("Something went wrong");
               return;
          } finally {
               setisLoading(false);
          }
     }, [
          bio,
          name,
          username,
          profileImage,
          coverImage,
          editModal,
          mutatefetchedUser,
     ]);

     const bodyContent = (
          <div className="flex flex-col gap-4">
               <ImageUpload
                    value={profileImage}
                    disabled={isLoading}
                    onChange={(image) => setprofileImage(image)}
                    label="upload profile Image"
               />
               <ImageUpload
                    value={coverImage}
                    disabled={isLoading}
                    onChange={(image) => setcoverImage(image)}
                    label="upload Cover Image"
               />
               <Input
                    placeholder="Name"
                    onChange={(e) => setname(e.target.value)}
                    value={name}
                    disabled={isLoading}
               />
               <Input
                    placeholder="Username"
                    onChange={(e) => setusername(e.target.value)}
                    value={username}
                    disabled={isLoading}
               />
               <Input
                    placeholder="Bio"
                    onChange={(e) => setbio(e.target.value)}
                    value={bio}
                    disabled={isLoading}
               />
          </div>
     );

     return (
          <Modal
               disabled={isLoading}
               isOpen={editModal.isOpen}
               title="Edit your profile"
               actionLabel="Save"
               onClose={editModal.onClose}
               onSubmit={onSubmit}
               body={bodyContent}
          />
     );
};
export default EditModal;
