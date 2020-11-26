import React, { Component } from "react";
import SignButton from "../toolbox/signItems/SignButton";
import SignInput from "../toolbox/signItems/SignInput";
import styles from "./signinPage.module.css";
import * as Icons from "../icons";

class SigninPage extends Component {
  render() {
    return (
      <div className={styles.signinPage}>
        <center>
          <div className={styles.header}>Dist Learn Vision</div>
        </center>

        <form>
          <SignInput
            icon={<Icons.Email />}
            name={"email"}
            placeholder={"E-posta"}
            type={"email"}
            minlength={"3"}
            maxlength={"25"}
          />
          <SignInput
            icon={<Icons.Password />}
            name={"password"}
            placeholder={"Şifre"}
            type={"password"}
            minlength={"7"}
            maxlength={"25"}
          />
          <SignButton children={"Oturum Aç"} />
        </form>
        <div className={styles.token}>
          <p>veya <a>Şifremi unuttum</a></p>
          <p>Hesabınız yok mu? <span>Kayıt Ol</span></p>
        </div>
      </div>
    );
  }
}

export default SigninPage;
