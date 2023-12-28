import React from "react";
import withAuth from "@/lib/withAuth";
import { removeCookie } from "@/lib/cookie";
import { useRouter } from "next/router";
import styles from "./profile.module.scss";
import { useSelector } from "react-redux";

import SpinnerData from "@/components/spinnerData";
import { IoIosLogOut } from "react-icons/io";
import { MdKey } from "react-icons/md";
import Navbar from "@/components/navbar/[index]";
import Footer from "@/components/footer";

const Profile = () => {
  const router = useRouter();
  const { userInfo, numberOfDaysRemaining, numberOfTimesRemaining } =
    useSelector((state) => state.user);

  const out = () => {
    try {
      removeCookie("key");
      router.push("/auth/login");
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.profileContainer}>
        <h1>Profil</h1>
        {userInfo?.username ? (
          <div className={styles.informations}>
            <div className={styles.labels}>
              <label htmlFor="">Ad Soyad</label>
              <div>{userInfo?.namesurname}</div>
            </div>
            <div className={styles.labels}>
              <label htmlFor="">Kullanıcı Adı</label>
              <div> {userInfo?.username} </div>
            </div>
            <div className={styles.labels}>
              <label htmlFor="">Email</label>
              <div>{userInfo?.email}</div>
            </div>
            <div className={styles.labels}>
              <label className={styles.key} htmlFor="">
                Lisans <MdKey />{" "}
              </label>
              <div className={styles.lisence}>
                {numberOfTimesRemaining > 0 ? (
                  userInfo?.token?.toUpperCase()
                ) : (
                  <a href="/buy-lisence">Lisans Satın AL</a>
                )}
              </div>
            </div>
            <div className={`${styles.lastTime} ${styles.labels}`}>
              <label htmlFor="">Kalan Lisans Süresi</label>
              <div className={styles.time}>
                {numberOfTimesRemaining > 0
                  ? `${numberOfDaysRemaining} Gün`
                  : 0}
              </div>
            </div>
            <div className={styles.buttons}>
              <button className={styles.out} onClick={out}>
                <span>Çıkış Yap</span>
                <IoIosLogOut size={25} />
              </button>
              {numberOfTimesRemaining > 0 ? (
                <a href="/buy-lisence" className={styles.buyLisence}>
                  Lisans Süresi Uzat
                </a>
              ) : (
                <a href="/buy-lisence" className={styles.buyLisence}>
                
                  Lisans Satın AL{" "}
                </a>
              )}
            </div>
          </div>
        ) : (
          <SpinnerData />
        )}
      </div>
      <Footer />
    </div>
  );
};
export default withAuth(Profile);
