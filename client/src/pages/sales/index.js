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
import axios from "axios";
import { useRouter } from "next/router";

import Footer from "@/components/footer";
import Tr from "@/components/Tr";
import Spinner from "@/components/spinner";
import Layout from "@/lib/layout";
import Message from "@/components/message";

const Sales = () => {
  const router = useRouter();

  const { data, cost } = useSelector((state) => state.barcodeInputs);
  const { userInfo, numberOfTimesRemaining } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
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

  const reset = () => {
    dispatch(setBarcode(""));
    dispatch(setPaid(0));
    dispatch(setCost(0));
    dispatch(setChangeMoney(0));
    dispatch(setData([]));
  };
  const handleDeleteAll = () => {
    reset();
  };

  const updateProduct = async (product) => {
    try {
      await axios.put(
        `http://localhost:8800/api/product/update-price/${userInfo._id}/${product._id}`,

        {
          price: product.price,
        }
      );
      handleShowMessage(
        "Satış ve fiyat güncelleme işlemi başarılı bir şekilde gerçekleşmiştir.",
        true
      );
    } catch (error) {
      console.warn(error);
    }
  };
  const completeTheSale = async () => {
    if (numberOfTimesRemaining > 0) {
      if (cost > 0) {
        try {
          await axios.put(
            `http://localhost:8800/api/product/history/${userInfo._id}`,
            {
              totalCost: cost,
              products: data,
            }
          );

          data.map((product) => {
            if (product.isChecked) {
              updateProduct(product);
            } else {
              handleShowMessage(
                "Satış işlemi başarılı bir şekilde gerçekleşmiştir.",
                true
              );
            }
          });
          reset();
        } catch (error) {
          console.warn(error);
        }
      } else {
        handleShowMessage(
          "Satış işlemi ürün eklenmediği için başarısız oldu.",
          false
        );
      }
    } else {
      router.push("/buy-lisence");
    }
  };

  return (
    <Layout>
      <div className={styles.sale}>
        <FindBarcodeInput />
        {showMessage.showMessage && (
          <Message
            message={showMessage.message}
            onClose={handleCloseMessage}
            status={showMessage.status}
          />
        )}
        <div className={styles.productsListContainer}>
          <button
            disabled={showMessage.showMessage ? true : false}
            className={
              showMessage.showMessage
                ? `${styles.completeBtn} ${styles.disable}`
                : styles.completeBtn
            }
            onClick={completeTheSale}
          >
            SATIŞI TAMAMLA(F8)
          </button>

          <button className={styles.newCustomer}>
            <a href="http://localhost:3000/sales" target="_blank">
              Yeni Müşteri
            </a>
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
    </Layout>
  );
};

export default withAuth(Sales);
