import React, { Component } from "react";

class SignInButton extends Component {
  render() {
    return (
        <div className="sign-in-button" style={{color:"#0f7c90"}}>
          <span>Oturum Ac</span>
        </div>
    );
  }
}
class SignUpButton extends Component {
  render() {
    return (
        <div className="sign-in-button" style={{color:"white",background:"#0f7c90"}}>
          <span>Kayit Ol</span>
        </div>
    );
  }
}


export {SignInButton,SignUpButton};
