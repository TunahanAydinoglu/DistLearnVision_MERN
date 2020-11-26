import React from "react";
import styles from "./signButton.module.css"

function SignButton({child}) {
  return (
    <input type="submit" className={styles.signButton} value={child}/>
  );
}

export default SignButton;