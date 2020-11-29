import React from "react";
import styles from "./profileInput.module.css"

function ProfileInput({name, type,readOnly=false, placeholder, value, max, min}) {
  return (
  <input className={styles.profileInput}  readOnly={readOnly} style={readOnly?{"background-color":"rgba(236,82,0,0.2"}:null} value={value} name={name} type={type} placeholder={placeholder} maxLength={max} minLength={min}  />
  );
}

export default ProfileInput;
