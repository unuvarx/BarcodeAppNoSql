import React from "react";
import styles from "./add-product.module.scss";
import withAuth from "@/lib/withAuth";
import Navbar from "@/components/navbar/[index]";
import Footer from "@/components/footer";
import AddProduct from "@/components/addProduct";





const AddProductPage = () => {
  return (
    <div className={styles.addProductContainer}>
      <Navbar />
      <h1>Ürün Ekle</h1>
      <AddProduct/>
      <Footer />
    </div>
  );
};
export default withAuth(AddProductPage);
