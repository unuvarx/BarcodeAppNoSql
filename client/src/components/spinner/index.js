import React from "react";
import styles from "./spinner.module.scss";

export default function Spinner() {
  return (
    <div className={styles.spinner}>
      <div className={styles.container}>
        <img src="/images/logo.jpg" alt="" />
      </div>
    </div>
  );
}
