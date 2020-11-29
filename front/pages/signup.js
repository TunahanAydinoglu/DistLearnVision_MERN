import React from "react";
import SignUpPage from "../components/signPage/SignUpPage";
import App from "../components/root/App";

function Profile() {
  return (
    <div>
      <App child={<SignUpPage />}></App>
    </div>
  );
}

export default Profile;
