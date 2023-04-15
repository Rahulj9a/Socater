import Layout from "@/Components/Layout";
/* import Modal from "@/Components/Modal"; */
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
     return (
          <>
               {/* <Modal isOpen title="test modal" actionLabel="Submit" /> */}
               <Layout>
                    <Component {...pageProps} />
               </Layout>
          </>
     );
}
