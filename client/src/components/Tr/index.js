import React, { useReducer, useState, useEffect, useRef } from "react";
import styles from "./Tr.module.scss";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { setData, setCost } from "@/redux/reducers/barcodeInputSlice";

export default function Tr({ barcode, product, price, id }) {
  const { data } = useSelector((state) => state.barcodeInputs);

  const dispatch = useDispatch();

  let newDataRef = useRef(
    data.map((item) => {
      return { ...item, cost: 0, check: false };
    })
  );

  let amountRef = useRef(1);
  let priceRef = useRef(price);
  let costRef = useRef(price);
  let total = useRef(0);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    newDataRef.current.map((item) => {
      total.current += Number(item.price);
    });
  }, []);

  useEffect(() => {
    total.current = 0;
    newDataRef.current = data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          cost: Number(priceRef.current) * Number(amountRef.current),
        };
      } else {
        return { ...item };
      }
    });
    const totalCost = newDataRef.current.reduce((acc, item) => {
      if (item.cost === 0 || item.cost) {
        return acc + item.cost;
      } else {
        return acc + Number(item.price);
      }
    }, 0);
    total.current = totalCost;
    dispatch(setData(newDataRef.current));
    dispatch(setCost(total.current));
  }, [id, priceRef.current, amountRef.current]);

  useEffect(() => {
    newDataRef.current = data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          check: isChecked,
        };
      } else {
        return { ...item };
      }
    });

    dispatch(setData(newDataRef.current));
  }, [isChecked]);

  function useForceUpdate() {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    return forceUpdate;
  }

  const forceUpdate = useForceUpdate();
  const changeCost = () => {
    costRef.current = Number(priceRef.current) * Number(amountRef.current);
  };

  const increase = () => {
    try {
      amountRef.current = Number(amountRef.current) + 1;
      forceUpdate();
      changeCost();
    } catch (error) {
      console.log(error);
    }
  };
  const decrease = () => {
    try {
      if (Number(amountRef.current >= 2)) {
        amountRef.current = Number(amountRef.current) - 1;
        forceUpdate();
        changeCost();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const changePrice = (e) => {
    const regex = /^[0-9]*(\.[0-9]*)?$/;
    const inputValue = e.target.value;

    if (regex.test(inputValue)) {
      priceRef.current = inputValue;
      forceUpdate();
      changeCost();
    }
  };

  const changeAmount = (e) => {
    const regex = /^[0-9]+$/;
    const inputValue = e.target.value;
    if (regex.test(inputValue)) {
      amountRef.current = inputValue;
      forceUpdate();
      changeCost();
    }
  };
  const removeRow = () => {
    dispatch(setData(data.filter((item) => item.id !== id)));
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
      <td>{barcode}</td>
      <td> {product} </td>
      <td className={styles.amount}>
        <button onClick={decrease} className={styles.decrease}>
          -
        </button>
        <input
          onChange={changeAmount}
          value={Number(amountRef.current)}
          type="text"
        />
        <button onClick={increase} className={styles.increase}>
          +
        </button>
      </td>
      <td className={styles.price}>
        <input onChange={changePrice} value={priceRef.current} type="text" />
      </td>
      <td className={styles.cost}>
        <input
          readOnly
          onChange={changeCost}
          value={costRef.current}
          type="text"
        />
      </td>
      <td>
        <input checked={isChecked} onChange={changeCheck} type="checkbox" />
      </td>
    </tr>
  );
}
