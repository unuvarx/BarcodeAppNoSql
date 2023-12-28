import React, { useState, useEffect, useRef, useReducer } from "react";
import styles from "./sales-history.module.scss";
import withAuth from "@/lib/withAuth";
import { useRouter } from 'next/router';

import FindBarcodeInput from "@/components/findBarcodeInput";
import { BsFillTrashFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { setData } from "@/redux/reducers/barcodeInputSlice/[index]";
import { MdCallMissedOutgoing } from "react-icons/md";

import Footer from "@/components/footer";
import Tr from "@/components/Tr";
import Navbar from "@/components/navbar/[index]";
import { formatDate } from "@/redux/reducers/userSlice/[index]";

const SalesHistory = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const router = useRouter();
  const goHistory = (history) => {
    router.push(`/sales-history-detail/${history[0]._id}`);
  };


  
  const baseDate = new Date('2023-12-26T01:33:57.101+00:00');
  const sevenDaysLater = new Date(baseDate.getTime() + 7 * 24 * 60 * 60 * 1000);


  return (
    <div className={styles.salesContainer}>
      <Navbar />
      <div className={styles.sale}>
        <h1>Satışlarım</h1>
        <div className={styles.tableContainer}>
          <div className={styles.tableWrapper}>
            <table className={styles.flTable}>
              <thead>
                <tr>
                  <th>Satış Detayına Git</th>
                  <th>Satış Tarih</th>
                  <th>Ürün Adet</th>
                  <th>Satış Tutarı</th>
                </tr>
              </thead>
              <tbody className={styles.tBody}>
                {userInfo.salesHistory?.map((history) =>
                  history.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <button
                          onClick={() => goHistory(history)}
                          className={styles.goSale}
                        >
                          <MdCallMissedOutgoing size={30} color={"white"} />
                        </button>
                      </td>
                      <td>{formatDate(item?.time)} --- {formatDate(sevenDaysLater.toISOString())} </td>
                      <td className={styles.amountofProducts}>{item.products.length}</td>
                      <td className={styles.totalCost}>{item?.totalCost}₺</td>
                    </tr>
                  ))
                )}
                <tr className={styles.hiddenTr}>
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

export default withAuth(SalesHistory);
