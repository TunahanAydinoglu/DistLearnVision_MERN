import React, { Component } from "react";
import cookie from "js-cookie";
// import { useRouter } from "next/router";

import Logo from "../toolbox/navItems/Logo";
import Menu from "../toolbox/navItems/Menu";
import SearchInput from "../toolbox/navItems/SearchInput";
import { SignInButton, SignUpButton } from "../toolbox/navItems/SignButton";
import * as Icons from "../icons/index";
import styles from "./navi.module.css";

function Navi() {
  // let router = useRouter();
  let auth = () => {
    let data;
    data = cookie.get("id");

    if (!data) {
      return (
        <div className={styles.buttons}>
          <SignInButton /> <SignUpButton />
        </div>
      );
    } else {
      return (
        <div className={styles.pp}>
          {/* <button onClick={() => router.push("/profile")}>
            Profil <Icons.Profile />
          </button> */}
          <button>
            Profil <Icons.Profile />
          </button>
          <button
            onClick={() => {
              cookie.remove("id", {
                expires: 1,
              });
              cookie.remove("token", {
                expires: 1,
              });
              // router.push("/login");
            }}
          >
            Çıkış Yap <Icons.Logout />
          </button>
        </div>
      );
    }
  };
  return (
    <nav className={styles.navi}>
      <Logo></Logo>
      <Menu />
      <SearchInput></SearchInput>
      <div className={styles.space}></div>
      {auth()}
    </nav>
  );
}

export default Navi;
