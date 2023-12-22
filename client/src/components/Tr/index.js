import React, { useState, useEffect } from "react";
import styles from "./Tr.module.scss";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { setData, setCost } from "@/redux/reducers/barcodeInputSlice/[index]";

export default function Tr({
  productBarcode,
  product,
  price,
  id,
  amount,
  cost,
}) {
  const { data } = useSelector((state) => state.barcodeInputs);
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  let finded = data.find((item) => item._id === id);

  const calculateTotalCost = () => {
    const totalCost = data.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.cost;
    }, 0);
    dispatch(setCost(totalCost));
  };
  useEffect(() => {
    calculateTotalCost();
  }, [data]);
  useEffect(() => {
    const newData = data.map((item) =>
      item._id === finded._id
        ? {
            ...item,
            isChecked: isChecked,
          }
        : { ...item }
    );
    dispatch(setData(newData));
  }, [isChecked]);

  const increase = () => {
    try {
      const newData = data.map((item) =>
        item._id === finded._id
          ? {
              ...item,
              amount: Number(item.amount + 1),
              cost: Number(item.amount + 1) * Number(item.price),
            }
          : { ...item }
      );
      dispatch(setData(newData));
    } catch (error) {
      console.warn(error);
    }
  };
  const decrease = () => {
    try {
      if (Number(finded.amount >= 2)) {
        const newData = data.map((item) =>
          item._id === finded._id
            ? {
                ...item,
                amount: Number(item.amount - 1),
                cost: Number(item.amount - 1) * Number(item.price),
              }
            : { ...item }
        );
        dispatch(setData(newData));
      }
    } catch (error) {
      console.warn(error);
    }
  };
  const changePrice = (e) => {
    const regex = /^[0-9]*(\.[0-9]*)?$/;
    const inputValue = e.target.value;
    if (regex.test(inputValue)) {
      const newData = data.map((item) =>
        item._id === finded._id
          ? {
              ...item,
              price: inputValue,
              cost: Number(inputValue) * Number(item.amount),
            }
          : { ...item }
      );
      dispatch(setData(newData));
    }
  };

  const changeAmount = (e) => {
    const regex = /^[0-9]+$/;
    const inputValue = e.target.value;

    if (regex.test(inputValue) || inputValue === "") {
      const newData = data.map((item) =>
        item._id === finded._id
          ? {
              ...item,
              amount: inputValue !== "" ? Number(inputValue) : "",
              cost: inputValue !== "" ? inputValue * item.price : "",
            }
          : { ...item }
      );
      dispatch(setData(newData));
    }
  };

  const removeRow = () => {
    dispatch(setData(data.filter((item) => item._id !== id)));
  };

  const changeCheck = () => {
    setIsChecked(!isChecked);
  };
  return (
    <tr className={styles.tr}>
      <td className={styles.close}>
        <span onClick={removeRow}>
          <AiOutlineCloseCircle />
        </span>
      </td>
      <td>{productBarcode}</td>
      <td> {product} </td>
      <td className={styles.amount}>
        <button onClick={decrease} className={styles.decrease}>
          -
        </button>
        <input onChange={changeAmount} value={Number(amount)} type="text" />
        <button onClick={increase} className={styles.increase}>
          +
        </button>
      </td>
      <td className={styles.price}>
        <input onChange={changePrice} value={price} type="text" />
      </td>
      <td className={styles.cost}>
        <input readOnly value={cost} type="text" />
      </td>
      <td>
        <input checked={isChecked} onChange={changeCheck} type="checkbox" />
      </td>
    </tr>
  );
}
