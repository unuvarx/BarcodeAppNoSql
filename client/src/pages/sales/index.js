import React, { useState, useEffect, useRef, useReducer } from "react";
import styles from "./sales.module.scss";
import withAuth from "@/lib/withAuth";
import Navbar from "@/components/navbar/[index]";
import FindBarcodeInput from "@/components/findBarcodeInput";
import { BsFillTrashFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import {
  setData,
  setBarcode,
  setPaid,
  setCost,
  setChangeMoney,
} from "@/redux/reducers/barcodeInputSlice/[index]";

import Footer from "@/components/footer";
import Tr from "@/components/Tr";
import Spinner from "@/components/spinner";

const Sales = () => {
  const { data } = useSelector((state) => state.barcodeInputs);
  const dispatch = useDispatch();

  const handleDeleteAll = () => {
    dispatch(setBarcode(""));
    dispatch(setPaid(0));
    dispatch(setCost(0));
    dispatch(setChangeMoney(0));
    dispatch(setData([]));
  };

  const completeTheSale = () => {
    dispatch(setBarcode(""));
    dispatch(setPaid(0));
    dispatch(setCost(0));
    dispatch(setChangeMoney(0));
    dispatch(setData([]));

    // satışı tamamladıktan sonra...
  };

  return (
    <div className={styles.salesContainer}>
      <Navbar />
      <div className={styles.sale}>
        <FindBarcodeInput />
        <div className={styles.productsListContainer}>
          <button className={styles.completeBtn} onClick={completeTheSale}>
            SATIŞI TAMAMLA(F8)
          </button>

          <button className={styles.newCustomer}>
            <a href="http://localhost:3000/sales" target="_blank">Yeni Müşteri</a>
          </button>
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
                {data?.map((item, index) => (
                  <Tr
                    key={index}
                    id={item._id}
                    productBarcode={item.barcode}
                    product={item.productName}
                    price={item.price}
                    amount={item?.amount}
                    cost={item?.cost}
                  />
                ))}
                <tr className={styles.hiddenTr}>
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
