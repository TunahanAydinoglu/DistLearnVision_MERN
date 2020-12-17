import "./mainCard.scss";
import React, { Component } from "react";

export default class mainCard extends Component {
  render() {
    return (
      <div className="flow">
        <div className="main-card">
          <div className="content">
            <h2>Tasarım</h2>
            <span>Kurslarımızı Gör</span>
          </div>
        </div>
      </div>
    );
  }
}
