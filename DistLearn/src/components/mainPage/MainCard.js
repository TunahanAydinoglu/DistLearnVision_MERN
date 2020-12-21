import "./mainCard.scss";
import React, { Component } from "react";

export default class MainCard extends Component {
  render() {
    let category = this.props.category;
    let imgUrl = 'http://localhost:5000/categories/'+category.image;
    return (
      <div className="flow">
        <div className="main-card" style={{backgroundImage:`url(${imgUrl})`}}>
          <div className="content">
            <h2>{category.title}</h2>
            <span>Kurslarımızı Gör</span>
          </div>
        </div>
      </div>
    );
  }
}
