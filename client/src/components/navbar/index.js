import React, { useEffect, useState, useRef } from "react";
import styles from "./navbar.module.scss";
import { MdOutlineSell, MdAutorenew } from "react-icons/md";
import {
  AiOutlineHistory,
  AiOutlineUnorderedList,
  AiOutlineInsertRowAbove,
  AiOutlineUser,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";

import { useRouter } from "next/router";
import { gsap } from "gsap";

export default function Navbar() {
  const [url, setUrl] = useState("");
  const [windowWidth, setWindowWidth] = useState(0);
  const [navbarControl, setNavbarControl] = useState(false);
  const navbarRef = useRef();
  const router = useRouter();

  useEffect(() => {
    const currentUrl = router.asPath;
    setUrl(currentUrl);
  }, [router]);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    setWindowWidth(window.innerWidth);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleOpenNavbar = () => {
    setNavbarControl(!navbarControl);
    const navbar = navbarRef.current;
    gsap.to(navbar, {
      x: 0, // Navbar'ı orijinal konumuna geri getir
      duration: 0.6,
      opacity: 1, // Opaklığı yeniden eski haline getir
    });
  };
  const handleCloseNavbar = () => {
    const navbar = navbarRef.current;
    setNavbarControl(!navbarControl);
    console.log(navbarControl);
    gsap.to(navbar, {
      x: -500, // Navbar'ı orijinal konumuna geri getir
      duration: 0.8,
      opacity: 1, // Opaklığı yeniden eski haline getir
    });
  };
  const OpenAndClose = () => {
    if (windowWidth <= 918) {
      if (navbarControl) {
        
        return <AiOutlineMenu onClick={handleOpenNavbar} />;
      } else {
        return <AiOutlineClose onClick={handleCloseNavbar} />;
      }
    } else {
      const navbar = navbarRef.current;
      gsap.to(navbar, {
        x: 0, // Navbar'ı orijinal konumuna geri getir
        duration: 0.8,
        opacity: 1, // Opaklığı yeniden eski haline getir
      });

     
      return <></>;
    }
  };
  useEffect(() => {
    setNavbarControl(false)
  }, [windowWidth])
  return (
    <div className={styles.navbarContainer}>
      <div className={styles.profile}>
        <OpenAndClose />
        <div>
          <a href="/profile">Username</a>
          <AiOutlineUser />
        </div>
      </div>
      <div className={styles.navbar} ref={navbarRef}>
        <div className={styles.img}>
          <img src="/images/logo.jpg" alt="" />
        </div>
        <div className={styles.pagesContainer}>
          <div
            onClick={() => {
              router.push("/sales");
            }}
            className={url === "/sales" ? styles.active : styles.deActive}
          >
            <MdOutlineSell />
            <span>Satış Yap</span>
          </div>
          <div
            onClick={() => {
              router.push("/sales-history");
            }}
            className={
              url === "/sales-history" ? styles.active : styles.deActive
            }
          >
            <AiOutlineHistory />
            <span>Geçmiş Satışlar</span>
          </div>
          <div
            onClick={() => {
              router.push("/products-list");
            }}
            className={
              url === "/products-list" ? styles.active : styles.deActive
            }
          >
            <AiOutlineUnorderedList />
            <span>Ürünler Listesi</span>
          </div>
          <div
            onClick={() => {
              router.push("/add-product");
            }}
            className={url === "/add-product" ? styles.active : styles.deActive}
          >
            <AiOutlineInsertRowAbove />
            <span>Ürün Ekle</span>
          </div>
          <div
            onClick={() => {
              router.push("/update-product");
            }}
            className={
              url === "/update-product" ? styles.active : styles.deActive
            }
          >
            <MdAutorenew />
            <span>Ürün Güncelle</span>
          </div>
        </div>
      </div>
    </div>
  );
}
