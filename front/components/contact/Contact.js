import React from "react";
import {useForm} from "react-hook-form";

import SignButton from "../toolbox/signItems/SignButton";
import * as Icons from "../icons";
import styles from "./contact.module.css";

import { fetcherPost } from "../../lib/fetchSWR";

  const Contact=() => {
    let url = "http://localhost:5000/api/contact/new";

    const { register, handleSubmit, errors } = useForm();
    return (
      <div className={styles.contact}>
        <center>
          <div className={styles.header}>
            Şikayet ve Önerileriniz için <br /> Bize Ulaşın
          </div>
        </center>

        <form method="POST" onSubmit={handleSubmit((data)=>{fetcherPost(url,data)})}>
          <div className={styles.signInput}>
            <span>
              <Icons.ProfileFill />
            </span>
            <input
              ref={register}
              name="name"
              placeholder="Tam Adınız"
              type="text"
              minLength="3"
              maxLength="50"
            />
          </div>
          <div className={styles.signInput}>
            <span>
              <Icons.Email />
            </span>
            <input
              ref={register}
              name="email"
              placeholder="E-posta"
              type="email"
              minLength="3"
              maxLength="50"
            />
          </div>
          <div className={styles.signInput}>
            <span>
              <Icons.ExplorerFill />
            </span>
            <input
              ref={register}
              name="subject"
              placeholder="Konu"
              type="text"
              minLength="3"
              maxLength="50"
            />
          </div>
          <textarea
            className={styles.textarea}
            ref={register}
            name="content"
            placeholder="Mesajınızı Giriniz"
            maxLength="350"
            rows="8"
            cols="47"
          ></textarea>
          <SignButton children={"Gönder"} />
        </form>
      </div>
    );
  }

export default Contact;
