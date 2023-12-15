import React, { useState } from "react";
import styles from "./register.module.scss";
import Footer from "@/components/footer";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setCookie, removeCookie } from "@/lib/cookie";
import axios from "axios";
import { setNamesurname, setMail, setUsername, setPassword, setIsAuth } from "@/redux/reducers/authSlice";
import { FaQuestionCircle } from "react-icons/fa";


export default function Register() {
  const [circleQuestion, setCircleQuestion] = useState(false);
  const [userInformations, setUserInformations] = useState({
    namesurname: "",
    mail: "",
    username: "",
    password: "",
    passwordagain: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const [isWarn, setIsWarn] = useState(false);

  const changeNamesurname = (e) => {
    setUserInformations({
      ...userInformations,
      namesurname: e.target.value,
    });
  };
  const changeMail = (e) => {
    setUserInformations({
      ...userInformations,
      mail: e.target.value,
    });
  };
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
  const changePasswordAgain = (e) => {
    setUserInformations({
      ...userInformations,
      passwordagain: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInformations.password === userInformations.passwordagain) {
      setIsWarn(false);
      try {
        if (removeCookie("key")) {

          removeCookie("key")
        }
        const res = await axios.post(
          "http://localhost:8800/api/auth/register",
          {
            username: userInformations.username,
            namesurname: userInformations.namesurname,
            email: userInformations.mail,
            password: userInformations.password,
          }
        );
        setCookie("key", res.data.token, { expires: 1})
        router.push("/sales")        
      } catch (error) {
        console.log(error);
        setIsWarn(true);
      }
    } else {
      setIsWarn(true);
    }
  };
  return (
    <>
      <div className={styles.registerContainer}>
        <div className={styles.register}>
          <img src="/images/login-register.png" alt="" />
          <form onSubmit={handleSubmit} className={styles.inputsContainer}>
            <label htmlFor="">
              <span>Ad Soyad</span>
              <input
                value={userInformations.namesurname}
                onChange={changeNamesurname}
                type="text"
                required
                placeholder="İsim Soyisim"
              />
            </label>
            <label htmlFor="">
              <span>E Posta</span>
              <input
                value={userInformations.mail}
                onChange={changeMail}
                required
                type="email"
                placeholder="example@mail.com"
              />
            </label>
            <label htmlFor="">
              <span>Kullanıcı Adı</span>
              <input
                value={userInformations.username}
                onChange={changeUsername}
                required
                type="text"
                placeholder="Bir kullanıcı adı girin"
              />
            </label>
            <label htmlFor="">
              <span>Şifre</span>
              <input
                value={userInformations.password}
                onChange={changePassword}
                required
                type="password"
                placeholder="Şifre oluşturun"
              />
            </label>
            <label htmlFor="">
              <span>Şifre (Tekrar)</span>
              <input
                required
                value={userInformations.passwordagain}
                onChange={changePasswordAgain}
                type="password"
                placeholder="Şifrenizi tekrar girin"
              />
            </label>
            {isWarn ? (
              <span className={styles.warn}>
                Bilgileri tekrar kontrol edin! <FaQuestionCircle onMouseEnter={() => setCircleQuestion(true)} onMouseLeave={() => setCircleQuestion(false)}  className={styles.circleQuestion} /> 
                {circleQuestion ? <div>Bu kullanıcı adından bir tane daha olabilir ve ya bu mail adresinden bir tane daha olabilir ve ya girilen iki şifre aynı olmayabilir.</div> : <></>}
              </span>
            ) : (
              <></>
            )}

            <button type="submit">Kayıt Ol</button>
            <a href="/auth/login">Zaten üye misiniz? Giriş Yap</a>
          </form>
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </>
  );
}
