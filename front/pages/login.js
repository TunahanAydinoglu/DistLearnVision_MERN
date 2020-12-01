import React from "react";
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
