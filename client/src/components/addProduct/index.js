import React, { useState, useEffect } from "react";
import styles from "./addProduct.module.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
import { setData, addData } from "@/redux/reducers/barcodeInputSlice/[index]";
import { useDispatch } from "react-redux";
import { getUser } from "@/redux/reducers/userSlice/[index]";

export default function AddProduct({ control }) {
  const [barcode, setBarcode] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [isThere, setIsThere] = useState(false);
  const [warning, setWarning] = useState(false);

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
          (product) => product.barcode === Number(barcode)
        );
        if (findedProduct) {
          console.log(findedProduct);
          setIsThere(true);
        } else {
          if (
            barcode.toString().length > 0 &&
            productName.length > 0 &&
            price.length > 0
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
          } else {
            if (
              barcode.toString().length <= 0 ||
              productName.length <= 0 ||
              price.length <= 0
            ) {
              setWarning(true);
            }
          }
        }
      } else {
        router.push("/buy-lisence");
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div className={styles.container}>
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

          <button onClick={submit}>Ekle</button>
        </div>
      </div>
    </div>
  );
}
