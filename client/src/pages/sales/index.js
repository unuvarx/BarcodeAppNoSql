import React from "react";
import styles from "./sales.module.scss";
import withAuth from "@/lib/withAuth";
import Navbar from "@/components/navbar";
import FindBarcodeInput from "@/components/findBarcodeInput";


const Sales = () => {
  return (
    <div className={styles.salesContainer}>
      <Navbar />
      <div className={styles.sale}>
        <FindBarcodeInput />
        <div className={styles.productsListContainer}>
          <button>SATIŞI TAMAMLA</button>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Sales);
