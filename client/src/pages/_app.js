import React from "react";
import { Provider } from "react-redux";
import store from "@/redux/store";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap"
        rel="stylesheet"
      />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
