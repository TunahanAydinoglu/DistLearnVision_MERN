import React, { Component } from "react";
import styles from "./menu.module.css";
import * as Icons from "../../icons";

class Menu extends Component {
  render() {
    return (
      <nav className={styles.menu}>
        <button>
          Kategoriler
          <Icons.ArrowBottom></Icons.ArrowBottom>
        </button>
      </nav>
    );
  }
}

export default Menu;
