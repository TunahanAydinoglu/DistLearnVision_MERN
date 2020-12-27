import Axios from "axios";
import React, { Component } from "react";
import MainCard from "./MainCard";
import "./mainPage.scss";

export default class MainPage extends Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    const url = "http://localhost:5000/api/categories";
    let arr = [];
    Axios.get(url)
      .then((res) => res.data.data)
      .then((data) => data.map((c) => arr.push(c)))
      .then(() => this.setState({ categories: arr }));
  }
  render() {
    let categories = this.state.categories;
    return (
      <div className="mainpage">
        <h2>Yeni birşeyler öğrenmeye ne dersiniz!</h2>
        <h4>
          En sevilen kategorileri sizler için seçtik
        </h4>

        <ul>
          {categories.map((c) => (
            <li key={c._id}>
              <MainCard category={c} />
            </li>
          ))}
           {categories.map((c) => (
            <li key={c._id}>
              <MainCard category={c} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
