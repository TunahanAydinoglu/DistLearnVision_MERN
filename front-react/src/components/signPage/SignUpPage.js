import React, { Component } from "react";
import { useForm } from "react-hook-form";

import SignButton from "../toolbox/signItems/SignButton";
import * as Icons from "../icons";
import styles from "./signupPage.module.css";
import { useRouter } from "next/router";

import { fetcherPost } from "../../lib/fetchSWR";

const SignUpPage = () => {
  let url = "http://localhost:5000/api/auth/register";
  const router = useRouter();

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
          router.push("/login");
        })}
      >
        <div className={styles.signInput}>
          <span>
            <Icons.ProfileFill />
          </span>
          <input
            ref={register}
            name="name"
            placeholder="Ad Soyad"
            type="text"
            required="true"
            minLength="2"
          />
        </div>
        <div className={styles.signInput}>
          <span>
            <Icons.Email />
          </span>
          <input
            ref={register}
            name="email"
            placeholder="E-Posta"
            type="email"
            required="true"
            minLength="2"
          />
        </div>
        <div className={styles.signInput}>
          <span>
            <Icons.Password />
          </span>
          <input
            ref={register}
            name="password"
            placeholder="Şifre"
            type="password"
            minLength="7"
            required="true"
            maxLength="30"
          />
        </div>
        <SignButton child={"Kayıt Ol"} />
      </form>
      <div className={styles.token}>
        <p>
          Zaten bir hesabınız var mı? <a className={styles.span} onClick={()=>router.push("/login")}>Oturum Aç</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
