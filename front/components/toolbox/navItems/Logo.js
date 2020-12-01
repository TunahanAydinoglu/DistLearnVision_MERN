import React from "react";
import styles from "./logo.module.css";
import { useRouter } from "next/router";


function Logo() {
    let router = useRouter();
    return (
      <div className={styles.logo}>
        <a
          onClick={() => {
            router.push("/");
          }}
        >
          Dist Learn Vision
        </a>
      </div>
    );
  }

export default Logo;
