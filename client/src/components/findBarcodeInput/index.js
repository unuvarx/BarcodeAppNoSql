import React, { useState, useEffect } from "react";
import styles from "./findBarcodeInput.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  setBarcode,
  setPaid,
  setChangeMoney,
  setData,
  addData,
} from "@/redux/reducers/barcodeInputSlice/[index]";

export default function FindBarcodeInput() {
  const dispatch = useDispatch();

  const barcodeInputsState = useSelector((state) => state.barcodeInputs);
  const { barcode, paid, cost, changeMoney, data } = barcodeInputsState;

  const userInfo = useSelector((state) => state.user.userInfo);

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
    await new Promise((resolve) => setTimeout(resolve, 125));
    const findedProduct = userInfo?.products.find(
      (product) => product.barcode === Number(barcode)
    );

   
    if (findedProduct) {
      let isSameProduct = data.find((item) => item.barcode === Number(barcode));
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
    }

    dispatch(setBarcode(""));
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
    </div>
  );
}
