import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "../../helpers/auth";
import "./profile.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UpdateProfile from "./UpdateProfile";
import UpdateImage from "./UpdateImage";
const Profile = () => {
  const [user, setUser] = useState({});
  const [image, setImage] = useState("");
  useEffect(() => {
    let getProfileUrl = "http://localhost:5000/api/auth/user";
    let getUserUrl = "http://localhost:5000/api/users/profile/";
    let prof = "";
    let token = getCookie("token");
    axios
      .get(getProfileUrl, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => res.data.data)
      .then((data) =>
        axios
          .get(getUserUrl + data.id)
          .then((res) => res.data.data)
          .then((data) => {
            setUser(data);
            prof = data.profile_image;
          })
          .then(() => setImage("http://localhost:5000/uploads/" + prof))
      );
  }, []);
  return (
    <Router>
      <div className="profile">
        <div className="wrapper">
          <div className="main">
            <div className="side-nav">
              <div className="pic">
                <img src={image} alt="profile" />
                <h2>{user.name}</h2>
              </div>
              <div className="navi">
                <ul>
                  <Link to="/">
                    <li>Profil</li>
                  </Link>
                  <Link to="/updateImage">
                    <li>Fotograf</li>
                  </Link>
                  <li>Hesabı Sil</li>
                </ul>
              </div>
            </div>
            <div className="form-panel">
              <Switch>
                <Route path="/updateImage">
                  <UpdateProfile user={user} />
                </Route>
                <Route path="/">
                  <UpdateImage image={user.profile_image}/>
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};
export default Profile;
