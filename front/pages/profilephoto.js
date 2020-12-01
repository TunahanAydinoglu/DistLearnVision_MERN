import React from "react";
import ProfilePhoto from "../components/profile/ProfilePhoto";
import App from "../components/root/App";

function Profile() {
  return (
    <div>
      <App child={<ProfilePhoto />}></App>
    </div>
  );
}

export default Profile;
