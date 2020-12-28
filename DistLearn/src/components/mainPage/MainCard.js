import "./mainCard.scss";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class MainCard extends Component {
  render() {
    let category = this.props.category;
    let imgUrl = "http://localhost:5000/categories/" + category.image;
    let url = "http://localhost:5000/api/lessons/category/";
    return (
      <Link to={{
        pathname: '/dersler/category='+category._id,
        state:{
          categoryUrl: url + category._id
        }
      }}>
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
