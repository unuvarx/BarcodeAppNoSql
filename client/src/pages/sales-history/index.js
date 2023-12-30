import React, { useState, useEffect } from "react";
import styles from "./sales-history.module.scss";
import withAuth from "@/lib/withAuth";
import { useRouter } from "next/router";

import FindBarcodeInput from "@/components/findBarcodeInput";
import { BsFillTrashFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { MdCallMissedOutgoing } from "react-icons/md";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar/[index]";
import { formatDate } from "@/redux/reducers/userSlice/[index]";
import SpinnerData from "@/components/spinnerData";
import Layout from "@/lib/layout";
import Message from "@/components/message";

const SalesHistory = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  

  const router = useRouter();
  const goHistory = (history) => {
    router.push(`/sales-history-detail/${history._id}`);
  };

  const renderPaginationButtons = () => {
    const pageCount = Math.ceil(
      (userInfo.salesHistory ? userInfo.salesHistory.flat().length : 0) /
        pageSize
    );

    const buttons = [];
    for (let i = 1; i <= pageCount; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={currentPage === i ? styles.activePage : ""}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  const currentPageProducts = userInfo.salesHistory
    ? userInfo.salesHistory
        .flat()
        .reverse()
        .slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : [];

  return (
    <Layout>
      <div className={styles.sale}>
        <h1>Satışlarım</h1>
        {userInfo.products ? (
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
                  {currentPageProducts.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <button
                          onClick={() => goHistory(item)}
                          className={styles.goSale}
                        >
                          <MdCallMissedOutgoing size={30} color={"white"} />
                        </button>
                      </td>
                      <td>{formatDate(item?.time)}</td>
                      <td className={styles.amountofProducts}>
                        {item.products.length}
                      </td>
                      <td className={styles.totalCost}>
                        {item?.totalCost.toFixed(2)}₺
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <SpinnerData />
        )}
        <div className={styles.pagination}>
          <div>{renderPaginationButtons()}</div>
        </div>
        
      </div>
    </Layout>
  );
};

export default withAuth(SalesHistory);
