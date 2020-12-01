import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import SignButton from "../toolbox/signItems/SignButton";
import * as Icons from "../icons";
import styles from "./contact.module.css";

import { fetcherPost } from "../../lib/fetchSWR";

const Contact = () => {
  let url = "http://localhost:5000/api/contact/new";
  let req = true;
  let router = useRouter();
  const { register, handleSubmit, errors } = useForm();
  return (
    <div className={styles.contact}>
      <center>
        <div className={styles.header}>
          Şikayet ve Önerileriniz için <br /> Bize Ulaşın
        </div>
      </center>

      <form
        method="POST"
        onSubmit={handleSubmit((data) => {
          fetcherPost(url, data);
          alert("Mesajınız İletilmiştir.");
          router.push("/");
        })}
      >
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
            required={req}
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
            required={req}
            maxLength="80"
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
            required={req}
            maxLength="50"
          />
        </div>
        <textarea
          className={styles.textarea}
          ref={register}
          name="content"
          placeholder="Mesajınızı Giriniz"
          required={req}
          maxLength="350"
          rows="8"
          cols="52"
        ></textarea>
        <SignButton child={"Gönder"} />
      </form>
    </div>
  );
};

export default Contact;
