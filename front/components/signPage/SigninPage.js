import React, { Component } from "react";
import SignButton from "../toolbox/signItems/SignButton";
import styles from "./signinPage.module.css";
import * as Icons from "../icons";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import { fetcherPost } from "../../lib/fetchSWR";

const SigninPage = () => {
  let url = "http://localhost:5000/api/auth/login";
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm();
  return (
    <div className={styles.signinPage}>
      <center>
        <div className={styles.header}>Dist Learn Vision</div>
      </center>

      <form
        method="POST"
        onSubmit={handleSubmit((data) => {
          fetcherPost(url, data);
          router.push("/profile");
        })}
      >
        <div className={styles.signInput}>
          <span>
            <Icons.Email />
          </span>
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
          <span>
            <Icons.Password />
          </span>
          <input
            ref={register}
            name="password"
            placeholder="Şifre"
            type="password"
            minLength="2"
            maxLength="20"
          />
        </div>
        <SignButton children={"Oturum Aç"} />
      </form>
      <div className={styles.token}>
        <p>
          veya <a>Şifremi unuttum</a>
        </p>
        <p>
          Hesabınız yok mu? <span>Kayıt Ol</span>
        </p>
      </div>
    </div>
  );
};
export default SigninPage;
