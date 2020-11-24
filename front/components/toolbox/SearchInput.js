import React, { Component } from 'react';
import * as Icons from '../icons'
import styles from "./search-input.module.css";


class SearchInput extends Component {
    render() {
        return (
            <form className={styles.searchForm}>
                <span><Icons.Search/></span>
                <input type="text" placeholder="Udemy tam bir zirtapoz"></input>
            </form>
        );
    }
}

export default SearchInput;