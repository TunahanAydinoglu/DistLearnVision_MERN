import { useEffect, useState } from "react";
import "./defaultProfile.scss";
import {
  getAuthProfileAxios,
  getSingleAxios,
} from "../../helpers/axiosHelpers";
import { BASE_URL } from "../../constant";

export default function DefaultProfile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    let getUserUrl = BASE_URL + "api/users/profile/";
    getAuthProfileAxios().then((data) =>
      getSingleAxios(getUserUrl + data.id).then((data) => setUser(data))
    );
  }, []);
  return (
    <div className="default-profile">
      <h2>Profil Sayfası</h2>
      <h3>Profil bilgilerinizi buradan inceleyebilirsiniz</h3>
      <div className="update-form">
        <div className="items">
          <div className="form-item">
            <span className="title-span">Ad Soyad :</span>
            <span className="value-span">{user.name}</span>
          </div>
          <div className="form-item">
            <span className="title-span">Email :</span>
            <span className="value-span">{user.email}</span>
          </div>
          <div className="form-item">
            <span className="title-span">Web Siteniz :</span>
            <a href={user.website} className="value-span">
              {user.website}
            </a>
          </div>
          <div className="form-item">
            <span className="title-span">Meslek :</span>
            <span className="value-span">{user.job}</span>
          </div>
          <div className="form-item">
            <span className="title-span">Konum :</span>
            <span className="value-span">{user.place}</span>
          </div>
          <div className="form-item">
            <span className="title-span">Hakkında :</span>
            <span className="value-span">{user.about}</span>
          </div>
        </div>
        <div className="submit-section"></div>
      </div>
    </div>
  );
}
