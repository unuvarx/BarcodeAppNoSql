import React, { useState, useEffect, useRef, useReducer } from "react";
import styles from "./sales.module.scss";
import withAuth from "@/lib/withAuth";
import Navbar from "@/components/navbar";
import FindBarcodeInput from "@/components/findBarcodeInput";
import { BsFillTrashFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { setData } from "@/redux/reducers/barcodeInputSlice";

import Footer from "@/components/footer";
import Tr from "@/components/Tr";

const Sales = () => {
  const { data, cost } = useSelector((state) => state.barcodeInputs);
  const dispatch = useDispatch();

  const handleDeleteAll = () => {
    dispatch(setData([]));
  };
  return (
    <div className={styles.salesContainer}>
      <Navbar />
      <div className={styles.sale}>
        <FindBarcodeInput />
        <div className={styles.productsListContainer}>
          <button>SATIŞI TAMAMLA(F8)</button>
        </div>
        <div className={styles.tableContainer}>
          <div className={styles.tableWrapper}>
            <table className={styles.flTable}>
              <thead>
                <tr>
                  <th className={styles.trash}>
                    <span onClick={handleDeleteAll}>
                      <BsFillTrashFill />
                    </span>
                  </th>
                  <th>Barkod</th>
                  <th>Ürün</th>
                  <th>Miktar</th>
                  <th>Fiyat</th>
                  <th>Tutar</th>
                  <th className={styles.update}>
                    <span>
                      Kalıcı olarak <br /> güncellensin mi?
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className={styles.tBody}>
                {data?.map((item) => (
                  <Tr
                    key={item.id}
                    id={item.id}
                    barcode={item.barcode}
                    product={item.product}
                    price={item.price}
                    cost={item.cost}
                  />
                ))}
                <tr style={{ visibility: "hidden" }}>
                  <td></td>
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

export default withAuth(Sales);
