import React from 'react'
import styles from "./sales.module.scss";
import withAuth from '@/lib/withAuth';
import Navbar from '@/components/navbar';


const Sales = () => {

  return (
    <div className={styles.salesContainer}>
      <Navbar />
      <p>saef</p>
    </div>
  )
}

export default withAuth(Sales);
