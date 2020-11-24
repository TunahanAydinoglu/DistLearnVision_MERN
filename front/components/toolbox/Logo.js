import React, { Component } from 'react';
import styles from "./logo.module.css";

class Logo extends Component {
    render() {
        return (
            <div className={styles.logo}>
            <a href="#">
                Dist Learn Vision
            </a>
            </div>
        );
    }
}

export default Logo;