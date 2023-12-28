import React from "react";
import styles from "./add-product.module.scss";
import withAuth from "@/lib/withAuth";
import Navbar from "@/components/navbar/[index]";
import Footer from "@/components/footer";





const AddProductPage = () => {
  return (
    <div className={styles.addProductContainer}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.title}>
          <span>Ürün Ekleme</span>
        </div>
        <div className={styles.inputsContainer}>
          <div>
            <span>Barkod</span>
            <input type="text" />
          </div>
          <div>
            <span>Ürün</span>
            <input type="text" />
          </div>

          <div>
            <span>Fiyat</span>
            <input type="text" />
          </div>

          <div>
            <button>Ekle</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default withAuth(AddProductPage);
