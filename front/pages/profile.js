import React from "react";
import ProfileUpdate from "../components/profile/ProfileUpdate";
import App from "../components/root/App";

function Profile() {
  return (
    <div>
      <App child={<ProfileUpdate />}></App>
    </div>
  );
}

export default Profile;
