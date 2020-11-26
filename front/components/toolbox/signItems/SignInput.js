import React from "react";

import styles from "./signInput.module.css";

function SignInput({ icon, name, placeholder, type, minlength, maxlength }) {
  return (
    <div className={styles.signInput}>
      <span>
        {icon}
      </span>
      <input
        name={name}
        placeholder={placeholder}
        type={type}
        minLength={minlength}
        maxLength={maxlength}
      />
    </div>
  );
}

export default SignInput;
