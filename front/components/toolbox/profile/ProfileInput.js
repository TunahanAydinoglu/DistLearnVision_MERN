import React from "react";
import styles from "./profileInput.module.css"

function ProfileInput({name, type, placeholder, max, min}) {
  return (
  <input className={styles.profileInput} name={name} type={type} placeholder={placeholder} maxLength={max} minLength={min}  />
  );
}

export default ProfileInput;
