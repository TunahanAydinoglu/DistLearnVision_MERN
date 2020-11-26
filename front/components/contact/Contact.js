import React, { Component } from "react";
import SignButton from "../toolbox/signItems/SignButton";
import SignInput from "../toolbox/signItems/SignInput";
import TextArea from "../toolbox/contact/TextArea";
import * as Icons from "../icons";
import styles from "./contact.module.css";

class Contact extends Component {
  render() {
    return (
      <div className={styles.contact}>
        <center>
          <div className={styles.header}>Şikayet ve Önerileriniz için <br/> Bize Ulaşın</div>
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
            icon={<Icons.Email />}
            name={"email"}
            placeholder={"E-posta"}
            type={"email"}
            minlength={"3"}
            maxlength={"50"}
          />
          <SignInput
            icon={<Icons.ExplorerFill />}
            name={"subject"}
            placeholder={"Konu"}
            type={"text"}
            minlength={"2"}
            maxlength={"25"}
          />
          <TextArea placeholder={"Mesajınızı giriniz"}/>
          <SignButton children={"Gönder"} />
        </form>
      </div>
    );
  }
}

export default Contact;
