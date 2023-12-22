import React, { useState, useEffect, useRef, useReducer } from "react";
import styles from "./products-list.module.scss";
import withAuth from "@/lib/withAuth";

import FindBarcodeInput from "@/components/findBarcodeInput";
import { BsFillTrashFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { setData } from "@/redux/reducers/barcodeInputSlice/[index]";

import Footer from "@/components/footer";
import Tr from "@/components/Tr";
import Navbar from "@/components/navbar/[index]";

const ProductsList= () => {
  const { userInfo, cost } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  
  return (
    <div className={styles.salesContainer}>
     <Navbar/>
      <div className={styles.sale}>
        <h1>Ürünlerim</h1>
        <div className={styles.tableContainer}>
          <div className={styles.tableWrapper}>
            <table className={styles.flTable}>
              <thead>
                <tr>
                  <th>Barkod</th>
                  <th>Ürün</th>
                  <th>Fiyat</th>
                  
                </tr>
              </thead>
              <tbody className={styles.tBody}>
                {userInfo.products?.map((item, index) => (
                  <tr key={index}>
                    <td> {item.barcode} </td>
                    <td> {item.productName} </td>
                    <td>{item?.price} </td>
                  </tr>
                ))}
                <tr className={styles.hiddenTr}>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default withAuth(ProductsList);
