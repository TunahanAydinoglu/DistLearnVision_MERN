import Axios from "axios";
import { useState, useEffect } from "react";
import "./updateProfile.scss";
import { getCookie } from "../../helpers/auth";

export default function UpdateProfile(props) {
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
    <div className="updateProfile">
      <h2>Profil Sayfası</h2>
      <h3>Profil bilgilerinizi buradan güncelleyebilirsiniz</h3>
      <form className="update-form" onSubmit={handleSubmitUpdate}>
        <div className="items">
          <div className="form-item">
            <label htmlFor="name">Ad Soyad</label>
            <input
              name="name"
              id="name"
              type="text"
              required
              placeholder="Ad Soyad"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-item">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              required
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-item">
            <label htmlFor="website">Web Siteniz</label>
            <input
              id="website"
              name="website"
              type="text"
              placeholder="www.ornek.com"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div className="form-item">
            <label htmlFor="job">Meslek</label>
            <input
              id="job"
              name="job"
              type="text"
              placeholder=""
              value={job}
              onChange={(e) => setJob(e.target.value)}
            />
          </div>
          <div className="form-item">
            <label htmlFor="place">Konum</label>
            <input
              name="place"
              id="place"
              type="text"
              placeholder=""
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
          </div>
          <div className="form-item">
            <label htmlFor="about">Hakkında</label>
            <textarea
              name="about"
              id="about"
              type="text"
              placeholder="Kendinizden bahsetmek ister misiniz?"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
        </div>
        <div className="submit-section">
          <button type="submit">Kaydet</button>
        </div>
      </form>
    </div>
  );
}
