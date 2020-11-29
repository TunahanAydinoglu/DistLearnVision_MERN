import React, { Component } from "react";
import { useForm } from "react-hook-form";

import SignButton from "../toolbox/signItems/SignButton";
import * as Icons from "../icons";
import styles from "./signupPage.module.css";

import { fetcherPost } from "../../lib/fetchSWR";

const SignUpPage = () => {
  let url = "http://localhost:5000/api/auth/register";

  const { register, handleSubmit, errors } = useForm();
  return (
    <div className={styles.signupPage}>
      <center>
        <div className={styles.header}>Kaydolun ve Öğrenmeye Başlayın!</div>
      </center>

      <form
        method="POST"
        onSubmit={handleSubmit((data) => {
          fetcherPost(url, data);
        })}
      >
        <div className={styles.signInput}>
          <span><Icons.ProfileFill/></span>
          <input
            ref={register}
            name="name"
            placeholder="Tam Adınız"
            type="text"
            minLength="2"
            maxLength="20"
          />
        </div>
        <div className={styles.signInput}>
          <span> <Icons.Email/> </span>
          <input
            ref={register}
            name="email"
            placeholder="E-Posta"
            type="email"
            minLength="2"
            maxLength="20"
          />
        </div>
        <div className={styles.signInput}>
          <span> <Icons.Password/> </span>
          <input
            ref={register}
            name="password"
            placeholder="şifreniz"
            type="password"
            minLength="2"
            maxLength="20"
          />
        </div>
        <SignButton child={"Kayıt Ol"} />
      </form>
      <div className={styles.token}>
        <p>
          Zaten bir hesabınız var mı? <span>Oturum Aç</span>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
