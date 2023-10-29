import React from "react";
import styles from "./register.module.scss";
import Footer from "@/components/footer";
import { useSelector, useDispatch } from "react-redux";
import {
  setRegisterNamesurname,
  setRegisterUsername,
  setRegisterPassword,
  setRegisterPasswordAgain,
} from "@/redux/reducers/authSlice/register";

export default function Register() {
  const dispatch = useDispatch();

  const {
    registerNamesurname,
    registerUsername,
    registerPassword,
    registerPasswordAgain,
  } = useSelector((state) => state.register);

  const changeNamesurname = (e) => {
    dispatch(setRegisterNamesurname(e.target.value));
  };
  const changeUsername = (e) => {
    dispatch(setRegisterUsername(e.target.value));
  };
  const changePassword = (e) => {
    dispatch(setRegisterPassword(e.target.value));
  };
  const changePasswordAgain = (e) => {
    dispatch(setRegisterPasswordAgain(e.target.value));
  };

  const handleSubmit = () => {};
  return (
    <>
      <div className={styles.registerContainer}>
        <div className={styles.register}>
          <img src="/images/login-register.png" alt="" />
          <div className={styles.inputsContainer}>
            <label htmlFor="">
              <span>Ad Soyad</span>
              <input
                value={registerNamesurname}
                onChange={changeNamesurname}
                type="text"
                placeholder="Adınız soyadınız"
              />
            </label>
            <label htmlFor="">
              <span>Kullanıcı Adı</span>
              <input
                value={registerUsername}
                onChange={changeUsername}
                type="text"
                placeholder="Kullanıcı adı giriniz"
              />
            </label>
            <label htmlFor="">
              <span>Şifre</span>
              <input
                value={registerPassword}
                onChange={changePassword}
                type="password"
                placeholder="Şifre oluşturun"
              />
            </label>
            <label htmlFor="">
              <span>Şifre (Tekrar)</span>
              <input
                value={registerPasswordAgain}
                onChange={changePasswordAgain}
                type="password"
                placeholder="Şifrenizi tekrar girin"
              />
            </label>
            <button onClick={handleSubmit}>Kayıt Ol</button>
            <a href="/auth/login">Zaten üye misiniz? Giriş Yap</a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
