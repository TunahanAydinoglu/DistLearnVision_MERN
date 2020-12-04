import React from "react";
import styles from "./signButton.module.css"

function SignButton({child, signUp}) {
  return (
    <input type="submit" onSubmit={()=>{signUp}} className={styles.signButton} value={child}/>
  );
}

export default SignButton;