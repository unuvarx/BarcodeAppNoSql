import React from "react";
import styles from "./footer.module.scss";

export default function Footer() {
  return (
    <div className={styles.footerContainer}>
      <span className={styles.title}>hizlibarkod.com</span>
      <div className={styles.footerPages}>
        <span>Anasayfa</span>
        <span>Hakkımızda</span>
        <span>Gizlilik Politikası</span>
        <span> Kullanıcı Sözleşmesi </span>
      </div>
      <div className={styles.icons}>
        
      </div>
    </div>
  );
}
