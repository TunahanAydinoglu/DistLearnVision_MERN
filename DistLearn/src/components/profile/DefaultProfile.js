import Axios from "axios";
import { useState, useEffect } from "react";
import "./defaultProfile.scss";
import { getCookie } from "../../helpers/auth";

export default function DefaultProfile(props) {
  const user = props.user;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(user.website);
  const [job, setJob] = useState(user.job);
  const [place, setPlace] = useState(user.place);
  const [about, setAbout] = useState(user.about);

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setWebsite(user.setWebsite);
    setJob(user.job);
    setPlace(user.place);
    setAbout(user.about);
  }, []);

  function handleSubmitUpdate(e) {
    let urlUpdate = "http://localhost:5000/api/auth/updateDetails";
    let token = getCookie("token");

    e.preventDefault();
    let updatedUser = {
      name: name,
      email: email,
      website: website,
      job: job,
      place: place,
      about: about,
    };
    Axios.put(urlUpdate, updatedUser, {
      headers: {
        Authorization: token,
      },
    }).then(() => alert("Guncelleme Basarili"));
  }

  return (
    <div className="default-profile">
      <h2>Profil Sayfası</h2>
      <h3>Profil bilgilerinizi buradan güncelleyebilirsiniz</h3>
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
            <a href={user.website} target="_blank" className="value-span">{user.website}</a>
         
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
        <div className="submit-section">
          <button type="submit">Kaydet</button>
        </div>
      </div>
    </div>
  );
}
