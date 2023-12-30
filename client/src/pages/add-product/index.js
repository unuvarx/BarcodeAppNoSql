import React from "react";
import styles from "./add-product.module.scss";
import withAuth from "@/lib/withAuth";
import Navbar from "@/components/navbar/[index]";
import Footer from "@/components/footer";
import AddProduct from "@/components/addProduct";
import Layout from "@/lib/layout";

const AddProductPage = () => {
  return (
    <Layout>
      <div className={styles.addProductContainer}>
     
        <h1>Ürün Ekle</h1>
        <AddProduct />
     
      </div>
    </Layout>
  );
};
export default withAuth(AddProductPage);
