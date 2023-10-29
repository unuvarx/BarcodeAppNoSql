import React from "react";
import styles from "./addProduct.module.scss";

export default function AddProduct() {
  return (
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
  );
}
