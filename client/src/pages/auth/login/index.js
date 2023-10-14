import React from "react";
import styles from "./login.module.scss";
import Footer from "@/components/footer";

export default function Login() {
  return (
    <>
    <div className={styles.registerContainer}>
      <div className={styles.register}>
        <img src="/images/login-register.png" alt="" />
        <div className={styles.inputsContainer}>
          <label htmlFor="">
            <span>Kullanıcı Adı</span>
            <input type="text" placeholder="Kullanıcı adı giriniz" />
          </label>
          <label htmlFor="">
            <span>Şifre</span>
            <input type="password" placeholder="Şifrenizi giriniz" />
          </label>

          <button>Giriş Yap</button>
          <a href="/auth/register">Üye misiniz? Kayıt Ol</a>
        </div>
      </div>
      
    </div>
    <Footer />
    </>
  );
}
