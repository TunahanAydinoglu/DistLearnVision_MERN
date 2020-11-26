import React, { Component } from "react";
import SignButton from "../toolbox/signItems/SignButton";
import SignInput from "../toolbox/signItems/SignInput";
import * as Icons from "../icons";
import styles from "./signupPage.module.css";

class SignUpPage extends Component {
  render() {
    return (
      <div className={styles.signupPage}>
        <center>
          <div className={styles.header}>Kaydolun ve Öğrenmeye Başlayın!</div>
        </center>

        <form>
          <SignInput
            icon={<Icons.ProfileFill />}
            name={"name"}
            placeholder={"Tam Adınız"}
            type={"text"}
            minlength={"3"}
            maxlength={"50"}
          />
          <SignInput
            icon={<Icons.Email/>}
            name={"email"}
            placeholder={"E-posta"}
            type={"email"}
            minlength={"3"}
            maxlength={"50"}
          />
          <SignInput
            icon={<Icons.Password />}
            name={"password"}
            placeholder={"Şifre"}
            type={"password"}
            minlength={"7"}
            maxlength={"25"}
          />
          <SignButton children={"Kayıt Ol"} />
        </form>
        <div className={styles.token}>
          <p>
            Zaten bir hesabınız var mı? <span>Oturum Aç</span>
          </p>
        </div>
      </div>
    );
  }
}

export default SignUpPage;
