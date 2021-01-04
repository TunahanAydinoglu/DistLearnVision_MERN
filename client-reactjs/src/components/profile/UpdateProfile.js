import { useState, useEffect } from "react";
import "./updateProfile.scss";
import {
  putAxiosWithConfirmPop,
  getAuthProfileAxios,
  getSingleAxios,
} from "../../helpers/axiosHelpers";

export default function UpdateProfile(props) {
  const [user, setUser] = useState({});
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [website, setWebsite] = useState(user.website);
  const [job, setJob] = useState(user.job);
  const [place, setPlace] = useState(user.place);
  const [about, setAbout] = useState(user.about);

  useEffect(() => {
    let getUserUrl = "http://localhost:5000/api/users/profile/";
    getAuthProfileAxios().then((data) =>
      getSingleAxios(getUserUrl + data.id).then((data) => setUser(data))
    );
  }, []);

  function handleSubmitUpdate(e) {
    let updateUrl = "http://localhost:5000/api/auth/updateDetails";

    e.preventDefault();
    let updatedUser = {
      name: name,
      email: email,
      website: website,
      job: job,
      place: place,
      about: about,
    };
    putAxiosWithConfirmPop(updateUrl, updatedUser);
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
              defaultValue={user.name}
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
              defaultValue={user.email}
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
              defaultValue={user.website}
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
              defaultValue={user.job}
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
              defaultValue={user.place}
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
              defaultValue={user.about}
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
