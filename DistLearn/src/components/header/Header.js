import React, { useState, useEffect } from "react";
import Popup from "../toolbox/Popup";
import { getCookie, signout } from "../../helpers/auth";

import "./header.scss";
import * as Icons from "../icons/index";
import Logo from "./Logo";
import Sign from "../signPage/Sign";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    let token = getCookie("token");
    if (token) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, []);
  const togglePopup = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  return (
    <header>
      <div className="container">
        <div className="container-inner">
          <div className="header-left">
            <div className="logo">
              <Logo />
            </div>
            <nav>
              <ul>
                <li>
                  <a href="/">ANASAYFA</a>
                </li>
                <li>
                  <a href="/">DERSLER</a>
                </li>
                <li>
                  <a href="/">HAKKIMIZDA</a>
                </li>
                <li>
                  <a href="/"> İLETİŞİM </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="header-right">
            <Icons.SearchFa />
            <span className="line"></span>
            {valid ? (
              <div className="valid">
                <a href="/">
                  <Icons.Profile />
                  Profil
                </a>
                <span>/</span>
                <a href="/" onClick={() => signout()}>
                  Çıkış Yap
                  <Icons.ArrowBottom />
                </a>
              </div>
            ) : (
              <div className="valid">
                <a href="/" onClick={togglePopup}>
                  Giriş Yap
                </a>
                /
                <a href="/" onClick={togglePopup}>
                  Kayıt Ol
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      {isOpen && <Popup content={<Sign />} handleClose={togglePopup} />}
    </header>
  );
}

export default Header;
