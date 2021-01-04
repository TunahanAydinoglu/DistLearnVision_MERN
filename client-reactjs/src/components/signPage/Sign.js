import React, { useState } from "react";
import { authenticate } from "../../helpers/auth";

import * as Icons from "../icons/index";
import "./sign.scss";
import Axios from "axios";
import { errorPop, successPop } from "../../helpers/alertHelpers";

const Sign = () => {
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [nameRegister, setNameRegister] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");

  let urlLogin = "http://localhost:5000/api/auth/login";
  let urlRegister = "http://localhost:5000/api/auth/register";

  const handleSubmitLogin = (event) => {
    event.preventDefault();

   const userLogin = {
      email: emailLogin,
      password: passwordLogin,
    };
    Axios.post(urlLogin, userLogin)
      .then((res) => {
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
        return res.data;
      })
      .then((data) => authenticate(data))
      .then(() => successPop("Giriş işlemi başarılı, Yönlendiriliyorsunuz."))
      .catch(() => errorPop("Bir şeyler yanlış gitmiş olmalı bilgilerinizi kontrol ediniz."));
  };
  const handleSubmitRegister = (event) => {
    event.preventDefault();
   const userRegister = {
      name: nameRegister,
      email: emailRegister,
      password: passwordRegister,
    };
    Axios.post(urlRegister, userRegister)
      .then((res) => res)
      .then(() => successPop("Kayıt işlemi başarılı, Giriş Yapabilirsiniz."))
      .catch(() => errorPop("Bir şeyler yanlış gitmiş olmalı kayıt eklenemedi."));
  };

  return (
    <div className="popup">
      <div className="login">
        <form onSubmit={handleSubmitLogin}>
          <h1>Giriş Yap</h1>
          <div className="form-item">
            <span>
              <Icons.Email />
            </span>
            <input
              name="email"
              placeholder="E-mail"
              value={emailLogin}
              type="email"
              required={true}
              minLength="2"
              onChange={(e) => setEmailLogin(e.target.value)}
            />
          </div>
          <div className="form-item">
            <span>
              <Icons.Password />
            </span>
            <input
              name="password"
              placeholder="Şifre"
              type="password"
              minLength="7"
              value={passwordLogin}
              required={true}
              maxLength="30"
              onChange={(e) => setPasswordLogin(e.target.value)}
            />
          </div>
          <button className="submit-button" type="submit">
            Giriş Yap
          </button>
        </form>
      </div>
      <div className="vertical-line"></div>
      <div className="register">
        <form onSubmit={handleSubmitRegister}>
          <h1>Kayit Ol</h1>
          <div className="form-item">
            <span>
              <Icons.ProfileFill />
            </span>
            <input
              name="name"
              placeholder="Ad Soyad"
              type="text"
              required={true}
              minLength="2"
              onChange={(e) => setNameRegister(e.target.value)}
            />
          </div>
          <div className="form-item">
            <span>
              <Icons.Email />
            </span>
            <input
              name="email"
              placeholder="E-mail"
              type="email"
              required={true}
              minLength="2"
              onChange={(e) => setEmailRegister(e.target.value)}
            />
          </div>
          <div className="form-item">
            <span>
              <Icons.Password />
            </span>
            <input
              name="password"
              placeholder="Şifre"
              type="password"
              minLength="7"
              required={true}
              maxLength="30"
              onChange={(e) => setPasswordRegister(e.target.value)}
            />
          </div>
          <button className="submit-button" type="submit">
            Kayıt Ol
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sign;
