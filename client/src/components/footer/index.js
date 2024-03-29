import React from "react";
import styles from "./footer.module.scss";
import {useRouter} from "next/router";
import {
  AiOutlineInstagram,
  AiFillLinkedin,
  AiFillTwitterSquare,
} from "react-icons/ai";

export default function Footer() {
  const router = useRouter();
  return (
    <div className={styles.footerContainer}>
      <span className={styles.title}>hizlibarkod.com</span>
      <div className={styles.footerPages}>
        <span onClick={() => {
          router.push('/home')
        }}>Anasayfa</span>
        <span>Hakkımızda</span>
        <span>Gizlilik Politikası</span>
        <span> Kullanıcı Sözleşmesi </span>
      </div>
      <div className={styles.icons}>
        <AiOutlineInstagram />
        <AiFillTwitterSquare />
        <AiFillLinkedin />
      </div>
      <div className={styles.hr}></div>
      <div className={styles.foot}>
        <span>Copyright © <label htmlFor="">Hızlı Barkod</label> 2023 tüm hakları saklıdır.</span>
      </div>
    </div>
  );
}
