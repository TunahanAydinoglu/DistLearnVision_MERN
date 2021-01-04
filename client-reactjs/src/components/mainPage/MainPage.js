import React, { Component } from "react";
import { getAllAsArrayAxios } from "../../helpers/axiosHelpers";
import MainCard from "./MainCard";
import "./mainPage.scss";

export default class MainPage extends Component {
  state = {
    categories: [],
  };

 async componentDidMount() {
    const url = "http://localhost:5000/api/categories";
    const data = await getAllAsArrayAxios(url);
    this.setState({ categories: data })
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
        </ul>
      </div>
    );
  }
}
