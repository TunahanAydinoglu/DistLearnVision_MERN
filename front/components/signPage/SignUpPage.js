import React, { Component } from "react";
import useSWR from "swr";
import { useForm } from "react-hook-form";

import SignButton from "../toolbox/signItems/SignButton";
import SignInput from "../toolbox/signItems/SignInput";
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
          console.log(url+data.name);
        })}
      >
        <input ref={register} name="name" placeholder="Tam Adınız" />
        <input ref={register} name="email" placeholder="email" />
        <input ref={register} name="password" placeholder="password" />

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
