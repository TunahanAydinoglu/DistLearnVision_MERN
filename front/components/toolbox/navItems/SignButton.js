import React, { Component } from "react";
import styles from "./sign-buttons.module.css";
import { useRouter } from "next/router";


function SignInButton() {
  const router = useRouter();

  return (
    <div className={styles.signinButton}>
      <button onClick={() => router.push("/login")}>Oturum Ac</button>
    </div>
  );
}

function SignUpButton() {
  const router = useRouter();

  return (
    <div className={styles.signupButton}>
      <button onClick={() => router.push("/signup")}>Kayit Ol</button>
    </div>
  );
}

export { SignInButton, SignUpButton };
