import React from "react";
import App from "../components/root/App";
import Contact from "../components/contact/Contact";

function HomePage() {
  return (
    <div>
      <App child={<Contact />}></App>
    </div>
  );
}

export default HomePage;
