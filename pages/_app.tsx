import Layout from "@/Components/Layout";
import LoginModal from "@/Components/modals/LoginModal";
import RegisterModal from "@/Components/modals/RegisterModal";

import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
     return (
          <>
               <LoginModal />
               <RegisterModal />
               <Layout>
                    <Component {...pageProps} />
               </Layout>
          </>
     );
}
