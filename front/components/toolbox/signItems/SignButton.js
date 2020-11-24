import React from "react";
import styles from "./signButton.module.css"

function SignButton({ children}) {
  return (
    <input type="submit" className={styles.signButton} value={children}/>
  );
}

export default SignButton;