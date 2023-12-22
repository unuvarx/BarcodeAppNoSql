import React, {
  useState,
  useEffect,
  useRef,
  useReducer
} from "react";
import styles from "./sales-history.module.scss";
import withAuth from "@/lib/withAuth";

import FindBarcodeInput from "@/components/findBarcodeInput";
import {
  BsFillTrashFill
} from "react-icons/bs";
import {
  useSelector,
  useDispatch
} from "react-redux";
import {
  setData
} from "@/redux/reducers/barcodeInputSlice/[index]";

import Footer from "@/components/footer";
import Tr from "@/components/Tr";
import Navbar from "@/components/navbar/[index]";

const SalesHistory = () => {
  const {
    data,
    cost
  } = useSelector((state) => state.barcodeInputs);
  const dispatch = useDispatch();

  const handleDeleteAll = () => {
    dispatch(setData([]));
  };


  const completeTheSale = () => {
    console.log(data);
  };
  return ( <
    div className = {
      styles.salesContainer
    } >
    <
    Navbar / >
    <
    div className = {
      styles.sale
    } >
    <
    h1 > Satışlarım < /h1> <
    div className = {
      styles.tableContainer
    } >
    <
    div className = {
      styles.tableWrapper
    } >
    <
    table className = {
      styles.flTable
    } >
    <
    thead >
    <
    tr >
    <
    th className = {
      styles.trash
    } >
    <
    span onClick = {
      handleDeleteAll
    } >
    <
    BsFillTrashFill / >
    <
    /span> <
    /th> <
    th > Barkod < /th> <
    th > Ürün < /th> <
    th > Miktar < /th> <
    th > Fiyat < /th> <
    th > Tutar < /th> <
    /tr> <
    /thead> <
    tbody className = {
      styles.tBody
    } > {
      data ? .map((item, index) => ( <
        tr key = {
          index
        } >
        <
        td > < /td> <
        td > {
          item.barcode
        } < /td> <
        td > {
          item.product
        } < /td> <
        td > {
          item ? .amount
        } < /td> <
        td > {
          item ? .price
        } < /td> <
        td > {
          item ? .cost
        } < /td> <
        /tr>
      ))
    } <
    tr className = {
      styles.hiddenTr
    } >
    <
    td > < /td> <
    td > < /td> <
    td > < /td> <
    td > < /td> <
    td > < /td> <
    td > < /td> <
    /tr> <
    /tbody> <
    tbody > < /tbody> <
    /table> <
    /div> <
    /div> <
    /div> <
    Footer / >
    <
    /div>
  );
};

export default withAuth(SalesHistory);