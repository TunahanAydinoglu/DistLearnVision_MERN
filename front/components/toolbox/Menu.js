import React, { Component } from "react";
import styles from "./menu.module.css";

class Menu extends Component {
  render() {
    return (
      <nav className={styles.menu}>
        <button>Kategoriler</button>
      </nav>
    );
  }
}

export default Menu;
