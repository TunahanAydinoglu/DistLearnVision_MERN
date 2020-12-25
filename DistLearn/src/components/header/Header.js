import React, { useState, useEffect } from "react";
import Popup from "../toolbox/Popup";
import { getCookie, signout } from "../../helpers/auth";
import { Link } from "react-router-dom";

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
                  <Link to="/">ANASAYFA</Link>
                </li>
                <li>
                  <Link to="/dersler">DERSLER</Link>
                </li>
                <li>
                  <Link to="/hakkimizda">HAKKIMIZDA</Link>
                </li>
                <li>
                  <Link to="/iletisim"> İLETİŞİM </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="header-right">
            <Link to="/dersler"><Icons.SearchFa /></Link>
            <span className="line"></span>
            {valid ? (
              <div className="valid">
                <Link to="/profil">
                  <Icons.Profile />
                  Profil
                </Link>
                <span>/</span>
                <a href="/" onClick={() => signout()}>
                  Çıkış Yap
                  <Icons.ArrowBottom />
                </a>
              </div>
            ) : (
              <div className="valid">
                <Link to="/" onClick={togglePopup}>
                  Giriş Yap
                </Link>
                &nbsp;|
                <Link to="/" onClick={togglePopup}>
                  Kayıt Ol
                </Link>
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
