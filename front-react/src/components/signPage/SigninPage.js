import React from "react";
import SignButton from "../toolbox/signItems/SignButton";
import styles from "./signinPage.module.css";
import * as Icons from "../icons";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import { authenticate } from "../../lib/fetchSWR";

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
        onSubmit={handleSubmit(async (data) => {
          const res = await fetch(url, {
            method: "POST",
            mode: "cors",
            redirect: "follow",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          });
          const response = await res.json();
          authenticate(await response);
          console.log(response);
          if (response.success === false) {
            alert("Kullanıcı bilgilerini kontrol ediniz.");
          } else {
            router.push("/");
          }
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
        <SignButton child={"Oturum Aç"} />
      </form>
      <div className={styles.token}>
        <p>
          veya <a>Şifremi unuttum</a>
        </p>
        <p>
          Hesabınız yok mu? <a className={styles.span} onClick={()=>router.push("/signup")}>Kayıt Ol</a>
        </p>
      </div>
    </div>
  );
};
export default SigninPage;
