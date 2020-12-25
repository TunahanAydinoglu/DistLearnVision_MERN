import axios from "axios";
import { useState, useEffect } from "react";
import { getCookie } from "../../helpers/auth";
import "./updateImage.scss";
//FORMAT DOC NOT
export default function UpdateImage(props) {
  const [path, setPath] = useState('Geçerli formatlar ".jpg, .jpeg, .png"');
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(getCookie("token"));
  }, []);
  const [image, setImage] = useState(null);
  function handleSubmitImageUpdate(e) {
    e.preventDefault();
    let fd = new FormData();
    fd.append("profile_image", image);
    let url = "http://localhost:5000/api/auth/upload";

    axios
      .post(url, fd, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Authorization: token,
          Accept: "application/json",
        },
      })
      .then(() => alert("Fotografiniz guncellenmistir."));
  }
  return (
    <div className="updateProfile">
     <div className="header-wrapper-div">
     <h2>Fotoğraf</h2>
      <h3>Profil fotoğrafınızı bu alanda güncelleyebilirsiniz</h3>
     </div>
      <div className="user-image">
        <img src={props.image} />
      </div>
      <form className="update-form" onSubmit={handleSubmitImageUpdate}>
        <div className="items">
          <div className="update-image">
            <label htmlFor="profile_image">
              <span> {path} </span>
              <span className="select-button">Görsel Seç</span>
            </label>
          </div>
          <input
            name="profile_image"
            id="profile_image"
            type="file"
            hidden={true}
            required
            onChange={(e) => {
              setPath(e.target.files[0].name);
              setImage(e.target.files[0]);
            }}
          />
        </div>
        <div className="submit-section">
          <button type="submit">Profil Fotoğrafını Değiştir</button>
        </div>
      </form>
    </div>
  );
}
