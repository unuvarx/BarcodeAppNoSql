import React, { useState } from "react";
import styles from "./login.module.scss";
import Footer from "@/components/footer";
import axios from "axios";
import { useDispatch} from "react-redux";
import { useRouter } from "next/router";
import { setCookie, removeCookie } from "@/lib/cookie";

import { setUsername, setPassword, setIsAuth, setMail, setNamesurname } from "@/redux/reducers/authSlice";
export default function Login() {
  const [userInformations, setUserInformations] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();

  const changeUsername = (e) => {
    setUserInformations({
      ...userInformations,
      username: e.target.value,
    });
  };
  const changePassword = (e) => {
    setUserInformations({
      ...userInformations,
      password: e.target.value,
    });
  };

  const signIn = async () => {
    try {
      if (removeCookie("key")) {
        removeCookie("key")
      }
      const res = await axios.post("http://localhost:8800/api/auth/login", {
        username: userInformations.username,
        password: userInformations.password,
      });
      setCookie("key", res.data.details.token, { expires: 1})
      router.push("/sales");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.registerContainer}>
        <div className={styles.register}>
          <img src="/images/login-register.png" alt="" />
          <div className={styles.inputsContainer}>
            <label htmlFor="">
              <span>Kullanıcı Adı</span>
              <input
                required
                value={userInformations.username}
                onChange={changeUsername}
                type="text"
                placeholder="Kullanıcı adı giriniz"
              />
            </label>
            <label htmlFor="">
              <span>Şifre</span>
              <input
                required
                value={userInformations.password}
                onChange={changePassword}
                type="password"
                placeholder="Şifrenizi giriniz"
              />
            </label>
            <button onClick={signIn}>Giriş Yap</button>
            <a href="/auth/register">Üye değil misiniz? Kayıt Ol</a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
