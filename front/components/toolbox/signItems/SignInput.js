import React from "react";

import styles from "./signInput.module.css";
import * as Icons from "../../icons";

function SignInput({ child, name, placeholder, type, minlength, maxlength }) {
  return (
    <div className={styles.signInput}>
      <span>
        <Icons.Profile />
      </span>
      <input
        className={styles.signInput}
        name={name}
        placeholder={placeholder}
        type={type}
        min={minlength}
        max={maxlength}
      />
    </div>
  );
}

export default SignInput;
