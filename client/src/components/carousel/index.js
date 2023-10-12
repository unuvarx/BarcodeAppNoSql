import React, { useState } from "react";
import styles from "./carousel.module.scss";

const Carousel = () => {
  const [activeItem, setActiveItem] = useState(1);

  const handleRadioChange = (event) => {
    
    console.log();
    setActiveItem(Number(event.target.value));
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.container}>
        <input
          value={1}
          checked={activeItem === 1}
          onChange={handleRadioChange}
          type="radio"
          name="slider"
          id={styles.item1}
        />
        <input
          value={2}
          checked={activeItem === 2}
          onChange={handleRadioChange}
          type="radio"
          name="slider"
          id={styles.item2}
        />
        <input
          value={3}
          checked={activeItem === 3}
          onChange={handleRadioChange}
          type="radio"
          name="slider"
          id={styles.item3}
        />
        <div className={styles.cards}>
          <label className={styles.card} htmlFor={styles.item1} id={styles.song1}>
            <img
              src="https://images.unsplash.com/photo-1530651788726-1dbf58eeef1f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=882&q=80"
              alt="song"
            />
          </label>
          <label className={styles.card} htmlFor={styles.item2} id={styles.song2}>
            <img
              src="https://images.unsplash.com/photo-1559386484-97dfc0e15539?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80"
              alt="song"
            />
          </label>
          <label className={styles.card} htmlFor={styles.item3} id={styles.song3}>
            <img
              src="https://images.unsplash.com/photo-1533461502717-83546f485d24?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
              alt="song"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
