import Form from "@/Components/Form";
import Header from "@/Components/Header";
import Postfeed from "@/Components/posts/Postfeed";

export default function Home() {
     return (
          <>
               <Header label="Home" />
               <Form placeholder="What's happening" />
               <Postfeed />
          </>
     );
}
