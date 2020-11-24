import React, { Component } from "react";
import styles from "./sign-buttons.module.css"

class SignInButton extends Component {
  render() {
    return (
        <div className={styles.signinButton}>
          <button>Oturum Ac</button>
        </div>
    );
  }
}
class SignUpButton extends Component {
  render() {
    return (
        <div className={styles.signupButton}>
          <button>Kayit Ol</button>
        </div>
    );
  }
}


export {SignInButton,SignUpButton};
