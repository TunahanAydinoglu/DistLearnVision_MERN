import "./mainCard.scss";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../constant";

export default class MainCard extends Component {
  render() {
    let category = this.props.category;
    let imgUrl = BASE_URL + "categories/" + category.image;
    let categoryPath = "/dersler/" + category._id;
    return (
      <Link to={categoryPath}>
        <div className="flow">
          <div
            className="main-card"
            style={{ backgroundImage: `url(${imgUrl})` }}
          >
            <div className="content">
              <h2>{category.title}</h2>
              <span>Kurslarımızı Gör</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}
