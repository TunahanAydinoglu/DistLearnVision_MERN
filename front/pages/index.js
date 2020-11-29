import React from "react";
import ProfileUpdate from "../components/profile/ProfileUpdate";
import App from "../components/root/App";
import SigninPage from "../components/signPage/SignInPage";

function HomePage() {
  return (
    <div>
      <App child={<SigninPage />}></App>
    </div>
  );
}

export default HomePage;
