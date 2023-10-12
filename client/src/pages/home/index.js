import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./home.module.scss";
import Carousel from "@/components/carousel";
import { FaCheckCircle } from "react-icons/fa";
import { MdBackup, MdOutlineSecurity } from "react-icons/md";
import { AiOutlinePauseCircle } from "react-icons/ai";
import { BiDevices } from "react-icons/bi";
import { AiOutlineSelect } from "react-icons/ai";
import { PiHourglassSimpleMediumBold } from "react-icons/pi";
import { FaHandshakeSimple } from "react-icons/fa";
import { MdGppGood } from "react-icons/md";
import { AiFillWechat } from "react-icons/ai";
import Footer from "@/components/footer";

export default function Home() {
  const cloudContainerRef = useRef(null);
  const cloudContainerLeftRef = useRef(null);
  const cloudContainerRightRef = useRef(null);

  const cardsControlRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const cloudContainer = cloudContainerRef.current;
    const cloudContainerLeft = cloudContainerLeftRef.current;
    const cloudContainerRight = cloudContainerRightRef.current;


    // Scroll olaylarını dinlemek için bir event listener ekleyin
    const handleScroll = () => {
      // Eğer cloudContainer sayfanın görünür bölgesine geldiyse animasyonu başlatın
      if (isElementInViewport(cloudContainer)) {
        gsap.from(cloudContainerLeft, {
          x: -500,
          duration: 1.25,
          opacity: 0,
          ease: "power2.out",
        });
        gsap.from(cloudContainerRight, {
          x: 500,
          duration: 1.25,
          opacity: 0,
          ease: "power2.out",
        });

        // Event listener'ı kaldırın, böylece tekrar tekrar çalışmaz
        window.removeEventListener("scroll", handleScroll);
      }
    };

    // Sayfa scroll olduğunda handleScroll fonksiyonunu çağırmak için event listener ekleyin
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Dinleyiciyi temizleyin
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    const cardsControl = cardsControlRef.current;
    const cards = cardsRef.current;
    // Scroll olaylarını dinlemek için bir event listener ekleyin
    const handleScroll = () => {
      // Eğer cloudContainer sayfanın görünür bölgesine geldiyse animasyonu başlatın
      if (isElementInViewport(cardsControl)) {
        gsap.from(cards, {
          x: 500,
          duration: 2,
          opacity: 0,
          ease: "power2.out",
        });
        // Event listener'ı kaldırın, böylece tekrar tekrar çalışmaz
        window.removeEventListener("scroll", handleScroll);
      }
    };

    // Sayfa scroll olduğunda handleScroll fonksiyonunu çağırmak için event listener ekleyin
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Dinleyiciyi temizleyin
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Bir elementin sayfanın görünür bölgesinde olup olmadığını kontrol eden bir yardımcı işlev
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeHead}>
        <img src="/images/logo.jpg" alt="" />
        <button>Hemen Kayıt Ol</button>
      </div>
      <div className={styles.homeTitle}>
        <div>
          <span className={styles.title}>
            Türkiye'nin En Hızlı ve Kullanışlı <br /> Barkodlu Satış Programı
          </span>
          <span className={styles.description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad expedita
            labore quisquam obcaecati earum praesentium, velit autem rem sint
            incidunt ratione nemo enim ea ipsam corrupti odit quis magnam.
            Repellendus!
          </span>
        </div>
      </div>
      <div className={styles.carousel}>
        <Carousel />
      </div>
      <div ref={cloudContainerRef}></div>
      <div className={styles.cloudContainer}>
        <img ref={cloudContainerLeftRef} src="/images/cloud.png" alt="" />
        <div ref={cloudContainerRightRef}>
          <span className={styles.title}>
            Şimdi Hızlı Barkod'u 1 hafta Ücretsiz Deneyin
          </span>
          <span className={styles.description}>
            Bulut tabanlı satış takip yazılımı olan Hızlı Barkod ile işletmenizi
            yönetin. 1 hafta boyunca ücretsiz olarak tüm uygulamalarımızı
            deneyin.
          </span>
          <span></span>
          <label htmlFor="">
            <FaCheckCircle />
            <span>Hızlı Okuma</span>
          </label>
          <label htmlFor="">
            <FaCheckCircle />
            <span>Yüksek Performans</span>
          </label>
          <label htmlFor="">
            <FaCheckCircle />
            <span>Satış Takip</span>
          </label>
          <label htmlFor="">
            <FaCheckCircle />
            <span>Gelir Hesaplama</span>
          </label>
          <label htmlFor="">
            <FaCheckCircle />
            <span>Satış Geçmişi Görüntüleme</span>
          </label>
          <label htmlFor="">
            <FaCheckCircle />
            <span>Kolay Analiz</span>
          </label>
          <label htmlFor="">
            <FaCheckCircle />
            <span>Ürün Listeleme</span>
          </label>
        </div>
      </div>
      <div ref={cardsControlRef}></div>
      <div ref={cardsRef} className={styles.cards}>
        <div className={styles.card}>
          <MdBackup />
          <span>
            Veri tabanımızdaki yedekleme sayesinde eklediğiniz ürünler siz
            silene kadar kayıtlıdır.
          </span>
        </div>
        <div className={styles.card}>
          <MdOutlineSecurity />
          <span>
            Yüksek güvenilirlik sayesinde eklediğiniz ürünler size aittir.
          </span>
        </div>
        <div className={styles.card}>
          <AiOutlinePauseCircle />
          <span>Süreli ücretsiz deneme tecrübesi ile deneme kolaylığı.</span>
        </div>
        <div className={styles.card}>
          <BiDevices />
          <span>
            Responsive tasarım ile internetin bağlı olduğu her cihaza uyumlu
            çalışır.
          </span>
        </div>
        <div className={styles.card}>
          <PiHourglassSimpleMediumBold />
          <span>
            Kolay ve anlaşılır arayüz sayesinde daha hızlı satış yapmak artık
            mümkün!
          </span>
        </div>
        <div className={styles.card}>
          <AiFillWechat />
          <span>
            7/24 Canlı destek sayesinde herhangi bir probleminizde bizimle
            iletişim kurabilirsiniz.
          </span>
        </div>
      </div>
      <Footer />
    </div>
  );
}
