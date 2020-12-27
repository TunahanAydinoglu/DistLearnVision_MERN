import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "../../helpers/auth";
import "./profilePage.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UpdateProfile from "./UpdateProfile";
import UpdateImage from "./UpdateImage";
import DefaultProfile from "./DefaultProfile";
import InstructorPage from "./instructor/InstructorPage";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [image, setImage] = useState("");
  const [active, setActive] = useState(window.location.pathname);
  const [role, setRole] = useState("user");

  const changePage = async (selected) => {
    await setActive(selected);
  };
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
            setRole(data.role);
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
                  <Link to="/profil" onClick={() => changePage("/profil")}>
                    <li className={active === "/profil" ? "active" : null}>
                      Profil
                    </li>
                  </Link>
                  <Link
                    to="/profil/guncelleme"
                    onClick={() => changePage("/profil/guncelleme")}
                  >
                    <li
                      className={
                        active === "/profil/guncelleme" ? "active" : null
                      }
                    >
                      Profil Düzenle
                    </li>
                  </Link>
                  <Link
                    to="/profil/fotograf"
                    onClick={() => changePage("/profil/fotograf")}
                  >
                    <li
                      className={
                        active === "/profil/fotograf" ? "active" : null
                      }
                    >
                      Fotograf
                    </li>
                  </Link>

                  {role !== "user" ? (
                    <Link
                      to="/profil/egitmen"
                      onClick={() => changePage("/profil/egitmen")}
                    >
                      <li
                        className={
                          active === "/profil/egitmen" ? "active" : null
                        }
                      >
                        Eğitmen Paneli
                      </li>
                    </Link>
                  ) : null}

                  <Link
                    to="/profil/account"
                    onClick={() => changePage("/profil/account")}
                  >
                    <li
                      className={active === "/profil/account" ? "active" : null}
                    >
                      Hesabı Sil
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
            <div className="form-panel">
              <Switch>
                <Route path="/profil/guncelleme">
                  <UpdateProfile user={user} />
                </Route>
                <Route path="/profil/fotograf">
                  <UpdateImage image={image} />
                </Route>
                <Route path="/profil/egitmen">
                  <InstructorPage user={user} />
                </Route>
                <Route path="/profil/">
                  <DefaultProfile user={user} />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};
export default ProfilePage;
