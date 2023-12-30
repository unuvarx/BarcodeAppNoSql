import React, { useState, useEffect } from "react";
import styles from "./addProduct.module.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
import { setData, addData } from "@/redux/reducers/barcodeInputSlice/[index]";
import { useDispatch } from "react-redux";
import { getUser } from "@/redux/reducers/userSlice/[index]";
import Message from "../message";

export default function AddProduct({ control }) {
  const [barcode, setBarcode] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [isThere, setIsThere] = useState(false);
  const [warning, setWarning] = useState(false);

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

  const dispatch = useDispatch();
  const router = useRouter();
  const { userInfo, numberOfTimesRemaining } = useSelector(
    (state) => state.user
  );
  const { data } = useSelector((state) => state.barcodeInputs);
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
  useEffect(() => {
    dispatch(getUser());
  }, [data]);

  const submit = async () => {
    try {
      if (numberOfTimesRemaining > 0) {
        const findedProduct = userInfo?.products.find(
          (product) => product.barcode === barcode
        );

        if (findedProduct) {
          setIsThere(true);
        } else {
          if (
            barcode.toString().length > 0 &&
            productName.toString().length > 0 &&
            price.toString().length > 0
          ) {
            const res = await axios.put(
              `http://localhost:8800/api/product/${userInfo?._id}`,
              {
                barcode,
                productName: productName.toUpperCase(),
                price,
              }
            );
            setBarcode("");
            setProductName("");
            setPrice("");
            if (control) {
              control(true);
            }
            if (router.pathname === "/sales") {
              let finded = res.data?.products.find(
                (product) => product.barcode === barcode
              );
              const newData = {
                ...finded,
                cost: finded.price,
                amount: 1,
                isChecked: false,
              };
              dispatch(addData(newData));
            }
            setIsThere(false);
            setWarning(false);

            dispatch(getUser());
            handleShowMessage(
              "Ekleme işlemi başarılı bir şekilde gerçekleşmiştir.",
              true
            );
          } else {
            setWarning(true);
          }
        }
      } else {
        handleShowMessage(
          "Ekleme işlemi yapılırken bir hatayla karşılaşıldı.",
          false
        );
        router.push("/buy-lisence");
      }
    } catch (error) {
      handleShowMessage(
        "Ekleme işlemi yapılırken bir hatayla karşılaşıldı.",
        false
      );
      console.warn(error);
    }
  };

  return (
    <div className={styles.container}>
      {showMessage.showMessage && (
        <Message
          message={showMessage.message}
          onClose={handleCloseMessage}
          status={showMessage.status}
        />
      )}
      <div className={styles.inputsContainer}>
        <div>
          <span>Barkod</span>
          <input
            required
            placeholder="Sadece sayılardan oluşur ve (en fazla 16 karakterli)"
            value={barcode}
            onChange={changeBarcode}
            type="text"
            maxLength={16}
            disabled={showMessage.showMessage ? true : false}
          />
        </div>
        <div>
          <span>Ürün Adı</span>
          <input
            required
            placeholder="Ürünün adını giriniz (en fazla 50 karakterli)"
            value={productName}
            onChange={changeProductName}
            type="text"
            maxLength={50}
            disabled={showMessage.showMessage ? true : false}
          />
        </div>

        <div>
          <span>Fiyat</span>
          <input
            required
            placeholder="Sadece sayı ve ''.'' kulanarak giriniz"
            value={price}
            onChange={changePrice}
            type="text"
            disabled={showMessage.showMessage ? true : false}
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
            Ekle
          </button>
        </div>
      </div>
    </div>
  );
}
