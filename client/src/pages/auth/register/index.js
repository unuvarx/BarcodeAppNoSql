import React from "react";
import styles from "./register.module.scss";
import Footer from "@/components/footer";

export default function Register() {
  return (
    <>
    <div className={styles.registerContainer}>
      <div className={styles.register}>
        <img src="/images/login-register.png" alt="" />
        <div className={styles.inputsContainer}>
          <label htmlFor="">
            <span>Ad Soyad</span>
            <input type="text" placeholder="Adınız soyadınız" />
          </label>
          <label htmlFor="">
            <span>Kullanıcı Adı</span>
            <input type="text" placeholder="Kullanıcı adı giriniz" />
          </label>
          <label htmlFor="">
            <span>Şifre</span>
            <input type="password" placeholder="Şifre oluşturun" />
          </label>
          <label htmlFor="">
            <span>Şifre (Tekrar)</span>
            <input type="password" placeholder="Şifrenizi tekrar girin" />
          </label>
          <button>Kayıt Ol</button>
          <a href="/auth/login">Zaten üye misiniz? Giriş Yap</a>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
