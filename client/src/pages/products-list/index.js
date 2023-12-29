// import React, { useState, useEffect, useRef, useReducer } from "react";
// import styles from "./products-list.module.scss";
// import withAuth from "@/lib/withAuth";

// import FindBarcodeInput from "@/components/findBarcodeInput";
// import { BsFillTrashFill } from "react-icons/bs";
// import { useSelector, useDispatch } from "react-redux";
// import { setData } from "@/redux/reducers/barcodeInputSlice/[index]";

// import Footer from "@/components/footer";
// import Tr from "@/components/Tr";
// import Navbar from "@/components/navbar/[index]";

// const ProductsList= () => {
//   const { userInfo } = useSelector((state) => state.user);
//   const dispatch = useDispatch();

//   return (
//     <div className={styles.salesContainer}>
//      <Navbar/>
//       <div className={styles.sale}>
//         <h1>Ürünlerim</h1>
//         <div className={styles.tableContainer}>
//           <div className={styles.tableWrapper}>
//             <table className={styles.flTable}>
//               <thead>
//                 <tr>
//                   <th>Barkod</th>
//                   <th>Ürün</th>
//                   <th>Fiyat</th>

//                 </tr>
//               </thead>
//               <tbody className={styles.tBody}>
//                 {userInfo.products?.map((item, index) => (
//                   <tr key={index}>
//                     <td> {item.barcode} </td>
//                     <td> {item.productName} </td>
//                     <td>{item?.price} </td>
//                   </tr>
//                 ))}
//                 <tr className={styles.hiddenTr}>
//                   <td></td>
//                   <td></td>
//                   <td></td>
//                 </tr>
//               </tbody>
//               <tbody></tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default withAuth(ProductsList);
import React, { useState } from "react";
import styles from "./products-list.module.scss";
import withAuth from "@/lib/withAuth";
import { useSelector } from "react-redux";
import Navbar from "@/components/navbar/[index]";
import Footer from "@/components/footer";
import SpinnerData from "@/components/spinnerData";

const ProductsList = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const renderPaginationButtons = () => {
    const pageCount = Math.ceil(
      (userInfo.products ? userInfo.products.length : 0) / pageSize
    );

    const buttons = [];
    for (let i = 1; i <= pageCount; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={currentPage === i ? styles.activePage : ""}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  const currentPageProducts = userInfo.products
    ? userInfo.products.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      )
    : [];

  return (
    <div className={styles.salesContainer}>
      <Navbar />
      <div className={styles.sale}>
        <h1>Ürünlerim</h1>
        {userInfo.products ? (
          <div className={styles.tableContainer}>
          <div className={styles.tableWrapper}>
            <table className={styles.flTable}>
              <thead>
                <tr>
                  <th>Barkod</th>
                  <th>Ürün</th>
                  <th>Fiyat</th>
                </tr>
              </thead>
              <tbody className={styles.tBody}>
                {currentPageProducts.map((item, index) => (
                  <tr key={index}>
                    <td>{item.barcode}</td>
                    <td>{item.productName}</td>
                    <td>{item?.price}</td>
                  </tr>
                ))}
                <tr className={styles.hiddenTr}>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.pagination}>
            <div>{renderPaginationButtons()}</div>
          </div>
        </div>
        ) : (
          <SpinnerData />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default withAuth(ProductsList);
