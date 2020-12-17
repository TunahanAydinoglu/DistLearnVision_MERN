import React, { useState } from "react";
import axios from "axios";
import { authenticate } from "../../helpers/auth";

import * as Icons from "../icons/index";
import "./sign.scss";

const Sign = () => {
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [nameRegister, setNameRegister] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [registerStat, setRegisterStat] = useState(false);
  const [loginStat, setLoginStat] = useState(false);

  let urlLogin = "http://localhost:5000/api/auth/login";
  let urlRegister = "http://localhost:5000/api/auth/register";
  let userLogin = {
    email: "",
    password: "",
  };
  let userRegister = {
    name: "",
    email: "",
    password: "",
  };
  function handleSubmitLogin(event) {
    event.preventDefault();

    userLogin = {
      email: emailLogin,
      password: passwordLogin,
    };
    axios
      .post(urlLogin, userLogin)
      .then((res) => {
        if (res.status === 200) {
          setLoginStat(true);
          setTimeout(() => {window.location.reload(false)}, 2000);
        }
        return res.data;
      })
      .then((data) => authenticate(data));
  }
  function handleSubmitRegister(event) {
    event.preventDefault();
    userRegister = {
      name: nameRegister,
      email: emailRegister,
      password: passwordRegister,
    };
    axios.post(urlRegister, userRegister).then((res) => {
      if (res.status === 200) {
        setRegisterStat(true);
        console.log(res);
      }
    });
  }
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

          {!loginStat ? (
            <button className="submit-button" type="submit">
              Giriş Yap
            </button>
          ) : (
            <span className="myAlert">
              Giriş işlemi başarılı, Yönlendiriliyorsunuz.  
            </span>
                    
          )}
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

          {!registerStat ? (
            <button className="submit-button" type="submit">
              Kayıt Ol
            </button>
          ) : (
            <span className="myAlert">
              Kayıt işlemi başarılı, Giriş Yapabilirsiniz.
            </span>
          )}
        </form>
      </div>
    </div>
  );
};

export default Sign;
