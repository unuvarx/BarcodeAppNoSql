import React from "react";
import styles from "./layout.module.scss";
import Navbar from "@/components/navbar/[index]";
import Footer from "@/components/footer";

export default function Layout({ children }) {
  return (
    <React.Fragment>
      <div className={styles.salesContainer}>
        <Navbar />
        {children}
      </div>
      <Footer />
    </React.Fragment>
  );
}
