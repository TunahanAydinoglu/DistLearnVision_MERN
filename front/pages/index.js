import React from "react";
import App from "../components/root/App";
import MainPage from "../components/root/MainPage";

function HomePage() {
  return (
    <div>
      <App child={<MainPage />}></App>
    </div>
  );
}

export default HomePage;
