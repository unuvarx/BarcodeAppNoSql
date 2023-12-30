import React, { useState, useEffect } from "react";
import styles from "./findBarcodeInput.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";

import {
  setBarcode,
  setPaid,
  setChangeMoney,
  setData,
  addData,
} from "@/redux/reducers/barcodeInputSlice/[index]";

import { useRouter } from "next/router";
import AddProduct from "../addProduct";
export default function FindBarcodeInput() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isThere, setIsThere] = useState(true);

  const barcodeInputsState = useSelector((state) => state.barcodeInputs);
  const { barcode, paid, cost, changeMoney, data } = barcodeInputsState;

  const { userInfo, numberOfTimesRemaining } = useSelector(
    (state) => state.user
  );

  const changePaid = (e) => {
    const regex = /^[0-9]*(\.[0-9]*)?$/;
    const inputValue = e.target.value;
    if (regex.test(inputValue)) {
      dispatch(setPaid(inputValue));
      dispatch(setChangeMoney(inputValue - cost));
    }
  };

  const handleEnterKeyPress = () => {
    handleSearch();
  };


  const handleSearch = async () => {
    try {
      if (numberOfTimesRemaining > 0) {
        await new Promise((resolve) => setTimeout(resolve));
        const findedProduct = userInfo?.products.find(
          (product) => product.barcode === Number(barcode)
        );
        if (findedProduct) {
          
          let isSameProduct = data.find(
            (item) => item.barcode === Number(barcode)
          );
          if (isSameProduct) {
            const newData = data.map((item) =>
              item._id === isSameProduct._id
                ? {
                    ...item,
                    amount: item.amount + 1,
                    cost: (item.amount + 1) * item.price,
                  }
                : { ...item }
            );
            dispatch(setData(newData));
          } else {
            const newData = {
              ...findedProduct,
              cost: findedProduct.price,
              amount: 1,
              isChecked: false,
            };
            dispatch(addData(newData));
          }
        } else {
          setIsThere(false);
        }
        dispatch(setBarcode(""));
      } else {
        router.push("/buy-lisence");
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const changeBarcode = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    dispatch(setBarcode(value));
  };
  useEffect(() => {
    if (barcode.length === 16) {
      handleSearch();
    }
  }, [barcode]);
  

  const handleIsThere = () => {
    setIsThere(true);
  }
  return (
    <div className={styles.container}>
      <div className={styles.barcode}>
        <input
          value={barcode}
          onChange={changeBarcode}
          onKeyDown={(e) => e.key === "Enter" && handleEnterKeyPress()}
          type="text"
          placeholder="ÜRÜN BARKODU OKUTUNUZ"
        />
        <button onClick={handleSearch}>
          <AiOutlineSearch />
          <span>Ara</span>
        </button>
      </div>
      <div className={styles.results}>
        <div className={styles.paid} htmlFor="">
          <span>Ödenen(₺)</span>
          <input value={paid} onChange={changePaid} type="text" />
        </div>
        <div className={styles.cost} htmlFor="">
          <span>Tutar(₺)</span>
          <input value={cost} readOnly={true} type="text" />
        </div>
        <div className={styles.change} htmlFor="">
          <span>Para Üstü(₺)</span>
          <input readOnly={true} value={changeMoney} type="text" />
        </div>
      </div>
      {!isThere ? (
        <div className={styles.modal}>
          <span onClick={handleIsThere} className={styles.exit}>
            <IoClose size={50} />
          </span>
          <AddProduct control={setIsThere} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
