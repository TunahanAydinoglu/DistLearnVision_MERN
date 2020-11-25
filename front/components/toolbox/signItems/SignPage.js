import React, { Component } from "react";
import SignButton from "./SignButton";
import SignInput from "./SignInput";
import styles from "./signPage.module.css";
import * as Icons from "../../icons";

class SignPage extends Component {
  render() {
    let child = "deneme";
    let name = "deneme";
    let placeholder = "E-posta";
    let type = "email";
    let minlength = "3";
    let maxlength = "25";
    return (
      <div className={styles.signPage}>

        <div className={styles.header}>Dist Learn Vision</div>
        


        <form>
          <SignInput
            icon={<Icons.ProfileFill />}
            name={name}
            placeholder={placeholder}
            type={type}
            minlength={minlength}
            maxlength={maxlength}
          />
          <SignInput
            icon={<Icons.Password />}
            name={"password"}
            placeholder={"Şifre"}
            type={"password"}
            minlength={7}
            maxlength={25}
          />
          <SignButton children={"Oturum Aç"} />
        </form>
      </div>
    );
  }
}

export default SignPage;
