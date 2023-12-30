import { useEffect, useState } from "react";
import styles from "./message.module.scss";
import { FaCheck } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";

const Message = ({ message, onClose, status }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    let timer;
    setTimeout(() => {
      timer = setInterval(() => {
        setProgress((prevProgress) => Math.max(prevProgress - 1, 0));
      }, 25);
    }, 50);

    setTimeout(() => {
      clearInterval(timer);
      onClose();
    }, 2500);

    return () => {
      clearInterval(timer);
    };
  }, [onClose]);

  return (
    <div
      className={styles.messageContainer}
      style={status ? { backgroundColor: "green" } : { backgroundColor: "red" }}
    >
      <div className={styles.successMessage}>
        <span>{message}</span>
        {status ? <FaCheck /> : <IoIosWarning />}
      </div>
      <div
        className={styles.progressBar}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default Message;
