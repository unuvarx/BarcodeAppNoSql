import React from "react";
import styles from "./home.module.scss";
import Carousel from "@/components/carousel";

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeHead}>
        <img src="/images/logo.jpg" alt="" />
        <button>Hemen Kayıt Ol</button>
      </div>
      <div className={styles.homeTitle}>
        <div>
          <span className={styles.title}>
            Türkiye'nin En Hızlı ve Kullanışlı <br /> Barkod Programı
          </span>
          <span className={styles.description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum cumque
            quam magnam, ipsum voluptates, cupiditate ut hic at illum quaerat
            sapiente, accusantium id error! Ducimus veniam perspiciatis vel!
            Aperiam, eveniet.
          </span>
        </div>
      </div>
      <div className={styles.carousel}>
      <Carousel />
      </div>
    </div>
  );
}
