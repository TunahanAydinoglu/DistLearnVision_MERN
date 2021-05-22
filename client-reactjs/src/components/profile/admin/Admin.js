import React, { useState } from "react";
import "./adminPage.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AdminCommentsComponent from "./components/AdminCommentsComponent";
import AdminUsersComponent from "./components/AdminUsersComponent";

function Admin() {
  const [active, setActive] = useState(window.location.pathname);
  const changePage = async (selected) => {
    await setActive(selected);
  };
  return (
    <div className="admin-page">
      <Router>
        <ul className="menu">
          <Link to="/profil/admin" onClick={() => changePage("/profil/admin")} className="menu-item">
            <li className={active === "/profil/admin" ? "active" : null}>
              Kullanıcılar
            </li>
          </Link>
          <div className="cizgi" ></div>
          <Link
            to="/profil/admin/yorumlar"
            onClick={() => changePage("/profil/admin/yorumlar")}
            className="menu-item"
          >
            <li
              className={active === "/profil/admin/yorumlar" ? "active" : null}
            >
              Yorumlar
            </li>
          </Link>
        </ul>
        <Switch>
          <Route path="/profil/admin/yorumlar">
            <AdminCommentsComponent />
          </Route>
          <Route path="/profil/admin">
            <AdminUsersComponent />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Admin;
