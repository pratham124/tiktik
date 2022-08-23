import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store, persistor } from "../app/store/store";
import { PersistGate } from "redux-persist/integration/react";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setisSSR] = useState(true);

  useEffect(() => {
    setisSSR(false);
  }, []);

  if (isSSR) return null;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider
          clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
        >
          <div className="xl:w-[1300px] m-auto overflow-hidden h-[100vh]">
            <Navbar />
            <div className="flex gap-6 md:gap-20">
              <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto videos">
                <Sidebar />
              </div>
              <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1 ">
                <Component {...pageProps} />
              </div>
            </div>
          </div>
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  );
};

export default MyApp;
