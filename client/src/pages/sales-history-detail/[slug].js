import React, { useEffect, useState } from "react";
import styles from "./sales-history-detail.module.scss";
import Navbar from "@/components/navbar/[index]";
import withAuth from "@/lib/withAuth";
import Footer from "@/components/footer";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { formatDate } from "@/redux/reducers/userSlice/[index]";

const SalesHistoryDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { userInfo } = useSelector((state) => state.user);

  const [history, setHistory] = useState({});

  const findDetail = () => {
    try {
      const foundHistory = userInfo?.salesHistory?.find(
        (history) => history[0]._id === slug
      );
      if (foundHistory) {
        setHistory(foundHistory);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    findDetail();
  }, [userInfo, history]);

  return (
    <div className={styles.salesContainer}>
      <Navbar />
      <div className={styles.sale}>
        <h1>Satış Detayı</h1>
        <div className={styles.tableContainer}>
          <div className={styles.tableWrapper}>
            <table className={styles.flTable}>
              <thead>
                <tr>
                  <th>Barkod</th>
                  <th>Ürün Adı</th>
                  <th>Miktar</th>
                  <th>Fiyat</th>
                  <th>Tutar</th>
                </tr>
              </thead>
              <tbody className={styles.tBody}>
                {history[0]?.products?.map((item, index) => (
                  <tr key={index}>
                    <td> {item.barcode}</td>
                    <td> {item.productName} </td>
                    <td> {item.amount} </td>
                    <td> {item.price}₺ </td>
                    <td className={styles.totalCost}> {item.cost}₺ </td>
                  </tr>
                ))}
                <tr className={styles.hiddenTr}>
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
export default withAuth(SalesHistoryDetail);
