import { useState, useEffect } from "react";
import "./profilePage.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UpdateProfile from "./UpdateProfile";
import UpdateImage from "./UpdateImage";
import DefaultProfile from "./DefaultProfile";
import InstructorPage from "./instructor/InstructorPage";
import {
  getAuthProfileAxios,
  getSingleAxios,
} from "../../helpers/axiosHelpers";
import Admin from "./admin/Admin";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [image, setImage] = useState("");
  const [active, setActive] = useState(window.location.pathname);
  const [role, setRole] = useState("user");

  const changePage = async (selected) => {
    await setActive(selected);
  };
  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    let prof = "";
    let getUserUrl = "http://localhost:5000/api/users/profile/";
    getAuthProfileAxios().then((data) => {
      getSingleAxios(getUserUrl + data.id)
        .then((data) => {
          setUser(data);
          setRole(data.role);
          prof = data.profile_image;
        })
        .then(() => setImage("http://localhost:5000/uploads/" + prof));
    });
  };
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

                  {role === "teacher" || "admin" ? (
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

                  {role === "admin" ? (
                    <Link
                      to="/profil/admin"
                      onClick={() => changePage("/profil/admin")}
                    >
                      <li
                        className={
                          active === "/profil/admin" ? "active" : null
                        }
                      >
                        Admin Paneli
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
                <Route path="/profil/admin">
                <Admin user={user} />
              </Route>
                <Route path="/profil/">
                  <DefaultProfile />
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
