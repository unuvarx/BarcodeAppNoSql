import React, { useState, useEffect, useRef, useReducer } from "react";
import styles from "./buy-lisence.module.scss";
import withAuth from "@/lib/withAuth";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar/[index]";
const BuyLisence = () => {

  return (
    <div className={styles.salesContainer}>
      <Navbar />
      <div className={styles.sale}>
        <h1>Lisans Satın Al</h1>
        <div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default withAuth(BuyLisence);
