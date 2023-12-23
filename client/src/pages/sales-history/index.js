import React, { useState, useEffect, useRef, useReducer } from "react";
import styles from "./sales-history.module.scss";
import withAuth from "@/lib/withAuth";

import FindBarcodeInput from "@/components/findBarcodeInput";
import { BsFillTrashFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { setData } from "@/redux/reducers/barcodeInputSlice/[index]";
import { MdCallMissedOutgoing } from "react-icons/md";

import Footer from "@/components/footer";
import Tr from "@/components/Tr";
import Navbar from "@/components/navbar/[index]";

const SalesHistory = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const formatDate = (date) => {
    const rawDateFromDatabase = date;
    const dateObject = new Date(rawDateFromDatabase);

    const optionsDate = { day: "numeric", month: "numeric", year: "numeric" };
    const optionsTime = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    const formattedDate = dateObject.toLocaleDateString("tr-TR", optionsDate);
    const formattedTime = dateObject.toLocaleTimeString("tr-TR", optionsTime);

    return formattedDate + " - " + formattedTime;
  };

  const goHistory = (history) => {
    console.log(history);
  };
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
                      <td>{formatDate(item?.time)}</td>
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
