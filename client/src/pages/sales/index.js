import React, { useState } from "react";
import styles from "./sales.module.scss";
import withAuth from "@/lib/withAuth";
import Navbar from "@/components/navbar";
import FindBarcodeInput from "@/components/findBarcodeInput";
import { BsFillTrashFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { setData } from "@/redux/reducers/barcodeInputSlice";

import { AiOutlineCloseCircle } from "react-icons/ai";
import Footer from "@/components/footer";

const Sales = () => {
  const { data } = useSelector((state) => state.barcodeInputs);
  const dispatch = useDispatch();
  const handleDeleteAll = () => {
    dispatch(setData([]));
  };
  const Tr = ({ barcode, product, amount, price, id }) => {
    const [priceValue, setPriceValue] = useState(price);
    const [amountValue, setAmountValue] = useState(amount);
    const [costValue, setCostValue] = useState(price);

    const calculateCost = () => {
      setCostValue(String(Number(finded.price) * Number(finded.amount)));
    };
    const finded = data.find((item) => item.id === id);
    const changePrice = (e) => {
      const regex = /^[0-9]*\.?[0-9]*$/;
      if (regex.test(e.target.value)) {
        setPriceValue(e.target.value);
        finded.price = e.target.value;
        calculateCost();
      }
    };
  
    const handleDecrease = () => {
      try {
        if (amountValue >= 2) {
          finded.amount--;
          setAmountValue(Number(amountValue) - 1);
          calculateCost();
        }
      } catch (error) {
        console.log(error);
      }
    };
    const handleIncrease = () => {
      try {
        const updatedData = data.map((item) => {
          if (item.id === id) {
            return { ...item, amount: item.amount + 1 };
          }
          return item;
        });
        dispatch(setData(updatedData));
        setAmountValue(updatedData.find((item) => item.id === id).amount);
        calculateCost();
        console.log(String(Number(finded.price) * Number(finded.amount)));
      } catch (error) {
        console.log(error);
      }
    };
    const changeAmount = (e) => {
      const regex = /^[0-9]*$/;
      if (regex.test(e.target.value)) {
        setAmountValue(e.target.value);
        finded.amount = e.target.value;
        calculateCost();
      }
    };
    const changeUpdate = () => {
      finded.update = true;
    };

    const handleDelete = () => {
      const red = data.filter((item) => item.id !== id);
      dispatch(setData(red));
    };
    return (
      <tr>
        <td className={styles.close}>
          <span onClick={handleDelete}>
            <AiOutlineCloseCircle />
          </span>
        </td>
        <td>{barcode}</td>
        <td> {product} </td>
        <td className={styles.amount}>
          <button onClick={handleDecrease} className={styles.decrease}>
            -
          </button>{" "}
          <input onChange={changeAmount} value={amountValue} type="text" />{" "}
          <button onClick={handleIncrease} className={styles.increase}>
            +
          </button>
        </td>
        <td className={styles.price}>
          <input onChange={changePrice} value={priceValue} type="text" />
        </td>
        <td className={styles.cost}>
          <input readOnly={true} defaultValue={costValue} type="text" />
        </td>
        <td>
          <input onChange={changeUpdate} type="checkbox" />
        </td>
      </tr>
    );
  };

  return (
    <div className={styles.salesContainer}>
      <Navbar />
      <div className={styles.sale}>
        <FindBarcodeInput />
        <div className={styles.productsListContainer}>
          <button>SATIŞI TAMAMLA(F8)</button>
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
              <tbody>
                {data.map((item) => (
                  <Tr
                    key={item.id}
                    id={item.id}
                    barcode={item.barcode}
                    product={item.product}
                    amount={item.amount}
                    price={item.price}
                    cost={item.cost}
                  />
                ))}
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

export default withAuth(Sales);
