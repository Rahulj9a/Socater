import Layout from "@/Components/Layout";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import LoginModal from "@/Components/modals/LoginModal";
import RegisterModal from "@/Components/modals/RegisterModal";

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import EditModal from "@/Components/modals/EditModal";

export default function App({ Component, pageProps }: AppProps) {
     return (
          <SessionProvider session={pageProps.session}>
               <Toaster />
               <EditModal />
               <RegisterModal />
               <LoginModal />
               <Layout>
                    <Component {...pageProps} />
               </Layout>
          </SessionProvider>
     );
}
