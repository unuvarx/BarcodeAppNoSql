import React, { useState, useEffect } from "react";
import withAuth from "@/lib/withAuth";
import styles from "./product-update.module.scss";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Navbar from "@/components/navbar/[index]";
import Footer from "@/components/footer";
import SpinnerData from "@/components/spinnerData";
import axios from "axios";
import Layout from "@/lib/layout";
import Message from "@/components/message";

import { getUser } from "@/redux/reducers/userSlice/[index]";
import { useDispatch } from "react-redux";

const ProductUpdate = () => {
  const [product, setProduct] = useState({});
  const [barcode, setBarcode] = useState();
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [isThere, setIsThere] = useState(false);
  const [warning, setWarning] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { slug } = router.query;

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

  const findDetail = () => {
    try {
      const foundProduct = userInfo?.products?.find(
        (item) => item._id === slug
      );
      if (foundProduct) {
        setProduct(foundProduct);
        setBarcode(foundProduct.barcode);
        setProductName(foundProduct.productName);
        setPrice(foundProduct.price);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    findDetail();
  }, [userInfo, product]);

  const changeBarcode = (event) => {
    const value = event.target.value;
    const regex = /^[0-9]*([0-9]*)?$/;
    if (regex.test(value)) {
      setBarcode(Number(value));
    }
  };
  const changeProductName = (event) => {
    const value = event.target.value;

    setProductName(value);
  };
  const changePrice = (event) => {
    const value = event.target.value;
    const regex = /^[0-9]*(\.[0-9]*)?$/;
    if (regex.test(value)) {
      setPrice(value);
    }
  };

  const submit = async () => {
    try {
      const found = userInfo?.products?.find(
        (item) => item.barcode === barcode && item._id !== slug
      );

      if (found) {
        setIsThere(true);
      } else {
        if (
          barcode.toString().length > 0 &&
          productName.toString().length > 0 &&
          price.toString().length > 0
        ) {
          if (
            barcode === product.barcode &&
            productName === product.productName &&
            price === product.price
          ) {

            handleShowMessage(
              "Bir değişiklik yapılmadığı için güncelleme gerçekleştirilemedi.",
              false
            );

          } else {
            await axios.put(
              `http://localhost:8800/api/product/update-product/${userInfo?._id}/${slug}`,
              {
                barcode,
                productName: productName.toUpperCase(),
                price,
              }
            );
            dispatch(getUser());
            handleShowMessage(
              "Ürün güncelleme işlemi başarılı bir şekilde gerçekleşmiştir.",
              true
            );
          }
        } else {
          setWarning(true);
        }
      }
    } catch (error) {
      handleShowMessage(
        "Ürün güncelleme işlemi sırasında bir hata ile karşılaşıldı.",
        false
      );
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
        <h1>Ürün Güncelle</h1>
        {product?._id ? (
          <div className={styles.container}>
            <div className={styles.inputsContainer}>
              <div>
                <span>Barkod</span>
                <input
                  disabled={showMessage.showMessage ? true : false}
                  required
                  value={barcode}
                  onChange={changeBarcode}
                  type="text"
                  maxLength={16}
                />
              </div>
              <div>
                <span>Ürün Adı</span>
                <input
                  disabled={showMessage.showMessage ? true : false}
                  required
                  value={productName}
                  onChange={changeProductName}
                  type="text"
                  maxLength={50}
                />
              </div>

              <div>
                <span>Fiyat</span>
                <input
                  disabled={showMessage.showMessage ? true : false}
                  required
                  value={price}
                  onChange={changePrice}
                  type="text"
                />
              </div>
              <div>
                {isThere ? (
                  <span className={styles.isThere}>
                    Bu barkoda sahip bir ürün zaten mevcut!
                  </span>
                ) : (
                  <></>
                )}
                {warning ? (
                  <span className={styles.isThere}>
                    Girilen değerleri kontrol edin!
                  </span>
                ) : (
                  <></>
                )}

                <button
                  disabled={showMessage.showMessage ? true : false}
                  className={showMessage.showMessage ? styles.disable : ""}
                  onClick={submit}
                >
                  Güncelle
                </button>
              </div>
            </div>
          </div>
        ) : (
          <SpinnerData />
        )}
      </div>
    </Layout>
  );
};

export default withAuth(ProductUpdate);
