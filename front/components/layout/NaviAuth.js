import React, { Component } from "react";

import Logo from "../toolbox/navItems/Logo";
import Menu from "../toolbox/navItems/Menu";
import SearchInput from "../toolbox/navItems/SearchInput";
import { SignInButton, SignUpButton } from "../toolbox/navItems/SignButton";
import styles from "./navi.module.css";

function NaviAuth() {
  return (
    <nav className={styles.navi}>
      <Logo></Logo>
      <Menu />
      <SearchInput></SearchInput>
      <div className={styles.space}></div>
    </nav>
  );
}

export default NaviAuth;
