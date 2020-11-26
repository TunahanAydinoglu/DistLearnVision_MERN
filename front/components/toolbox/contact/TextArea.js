import React from "react";
import styles from "./textArea.module.css";

function TextArea({ name, max = 350, rows = 8, cols = 47, placeholder }) {
  return (
    <div>
      <textarea
        className={styles.textarea}
        name={name}
        placeholder={placeholder}
        maxLength={max}
        rows={rows}
        cols={cols}
      ></textarea>
    </div>
  );
}
export default TextArea;
