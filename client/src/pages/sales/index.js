import React, { useState } from "react";
import styles from "./sales.module.scss";
import withAuth from "@/lib/withAuth";
import Navbar from "@/components/navbar";
import FindBarcodeInput from "@/components/findBarcodeInput";
import { BsFillTrashFill } from "react-icons/bs";

import { AiOutlineCloseCircle } from "react-icons/ai";
import Footer from "@/components/footer";

const Sales = () => {
  const data = [
    {
      id: "asfasfrg1234343425",
      barcode: "1234567891234567",
      product: "EKMEK",
      price: "7.50",
    },
    {
      id: "asf23442343242343",
      barcode: "1234567891234567",
      product: "SU",
      price: "4.50",
    },
    {
      id: "as56546242343",
      barcode: "1234567891234567",
      product: "ETİ KARAM",
      price: "9.50",
    },
    {
      id: "62342134231465sdfgsd",
      barcode: "1234567891234567",
      product: "SİMİT",
      price: "1.50",
    },
  ];
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
        finded.amount++;
        setAmountValue(Number(amountValue) + 1);
        calculateCost();
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
    console.log(data);

    return (
      <tr>
        <td className={styles.close}>
          <AiOutlineCloseCircle />
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
                    <BsFillTrashFill />
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
                    amount={(item.amount = 1)}
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
