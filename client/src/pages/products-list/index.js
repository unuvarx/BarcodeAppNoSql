import React, { useState } from "react";
import styles from "./products-list.module.scss";
import withAuth from "@/lib/withAuth";
import { useSelector } from "react-redux";
import Navbar from "@/components/navbar/[index]";
import Footer from "@/components/footer";
import SpinnerData from "@/components/spinnerData";
import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "@/redux/reducers/userSlice/[index]";
import Layout from "@/lib/layout";
import Message from "@/components/message";

const ProductsList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const handleShowMessage = (msg, sts) => {
    setShowMessage({
      showMessage: true,
      message: msg,
      status: sts,
    });
  };

  const handleCloseMessage = () => {
    setShowMessage({
      showMessage: false,
      message: "",
      status: true,
    });
  };
  const [showMessage, setShowMessage] = useState({
    showMessage: false,
    message: "",
    status: true,
  });

  const renderPaginationButtons = () => {
    const pageCount = Math.ceil(
      (userInfo.products ? userInfo.products.length : 0) / pageSize
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

  const currentPageProducts = userInfo.products
    ? userInfo.products
        .slice()
        .reverse()
        .slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : [];

  const goUpdate = (item) => {
    router.push(`/product-update/${item._id}`);
  };

  const deleteProduct = async (item) => {
    try {
      await axios.delete(
        `http://localhost:8800/api/product/delete-product/${userInfo?._id}/${item._id}`
      );
      handleShowMessage(
        "Silme işlemi başarılı bir şekilde gerçekleşmiştir.",
        true
      );
      dispatch(getUser());
    } catch (error) {
      console.warn(error);
    }
  };
  return (
    <Layout>
      <div className={styles.sale}>
        {showMessage.showMessage && (
          <Message
            message={showMessage.message}
            onClose={handleCloseMessage}
            status={showMessage.status}
          />
        )}
        <h1>Ürünlerim</h1>
        {userInfo.products ? (
          <div className={styles.tableContainer}>
            <div className={styles.tableWrapper}>
              <table className={styles.flTable}>
                <thead>
                  <tr>
                    <th>Ürünü Sil</th>
                    <th>Ürünü Düzenle</th>
                    <th>Barkod</th>
                    <th>Ürün</th>
                    <th>Fiyat</th>
                  </tr>
                </thead>
                <tbody className={styles.tBody}>
                  {currentPageProducts.map((item, index) => (
                    <tr key={index}>
                      <td className={styles.deleteBtn}>
                        <button
                          className={
                            showMessage.showMessage ? styles.disable : ""
                          }
                          disabled={showMessage.showMessage ? true : false}
                          onClick={() => deleteProduct(item)}
                        >
                          <MdDelete />
                        </button>
                      </td>
                      <td className={styles.updateBtn}>
                        <button onClick={() => goUpdate(item)}>
                          <GrUpdate color={"#fff"} />
                        </button>
                      </td>
                      <td>{item.barcode}</td>
                      <td>{item.productName}</td>
                      <td>{item?.price.toFixed(2)}</td>
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
              </table>
            </div>
            <div className={styles.pagination}>
              <div>{renderPaginationButtons()}</div>
            </div>
          </div>
        ) : (
          <SpinnerData />
        )}
      </div>
    </Layout>
  );
};

export default withAuth(ProductsList);
