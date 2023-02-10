import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import '@/styles/globals.css';
import { useRouter } from 'next/router';
import FullScreenWrapper from './components/layout/MainWrapper';
import DocumentHead from './components/layout/DocumentHead';
import { AppProvider } from "./context/context";


export default function App({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap.bundle")
      : null;

    /*if(typeof document !== 'undefined'){
      window.onbeforeunload = () => {
        const confirm = window.confirm('Are you sure you want to reload page ?');
        if(confirm){
         router.reload();
        }
        return false;
      }
    } */

  }, [router.events]);

  return (
    <AppProvider>
      <FullScreenWrapper>
        <DocumentHead />
        <Component {...pageProps} />
      </FullScreenWrapper>
    </AppProvider>
  );

  
}
