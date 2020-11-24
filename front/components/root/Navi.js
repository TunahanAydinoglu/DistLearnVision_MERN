import React, { Component } from "react";

import Logo from "../toolbox/Logo";
import Menu from "../toolbox/Menu";
import SearchInput from "../toolbox/SearchInput"
import { SignInButton, SignUpButton } from "../toolbox/SignButton";
import styles from "./navi.module.css";


class Navi extends Component {
  render() {
    return (
      <nav  className={styles.navi}>
        <Logo></Logo>
        <Menu />
        <SearchInput></SearchInput>
        <SignInButton />
        <SignUpButton />
      </nav>
    );
  }
}

export default Navi;
