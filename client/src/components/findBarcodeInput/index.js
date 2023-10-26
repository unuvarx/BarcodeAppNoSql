import React, { useState, useEffect } from "react";
import styles from "./findBarcodeInput.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setBarcode, setPaid } from "@/redux/reducers/barcodeInputSlice";

export default function FindBarcodeInput() {
  const dispatch = useDispatch();
  const { barcode, paid, cost, changeMoney } = useSelector(
    (state) => state.barcodeInputs
  );

  const changeBarcode = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    dispatch(setBarcode(value));
  };

  const changePaid = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    dispatch(setPaid(value));
  };

  return (
    <div className={styles.container}>
      <div className={styles.barcode}>
        <input
          value={barcode}
          onChange={changeBarcode}
          type="text"
          placeholder="ÜRÜN BARKODU OKUTUNUZ"
        />
        <button>
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
