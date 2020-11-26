import React, { Component } from "react";
import styles from "./profileUpdate.module.css";
import ProfileInput from "../toolbox/profile/ProfileInput";
import SignButton from "../toolbox/signItems/SignButton";
class ProfileUpdate extends Component {
  render() {
    let imgUrl =
      "https://img-a.udemycdn.com/user/200_H/109959478_ce39.jpg?cMVIuUwFHdXGIhxXjWFrPkpcbPq6TYOi_EtIqVUoea7YCa76PKe_KSL3gvguOg4JXKASm0juAk6HgezOsHy_TT4HeKOOlUygqqTI7yt-8bkUpJZEkJbESt6yuQg";
    return (
      <div className={styles.profileUpdate}>
        <div className={styles.profileNavi}>
          <div className={styles.img}>
            <img src={imgUrl} />
          </div>
          <h2>Tunahan Aydınoğlu</h2>
          <ul>
              <li><input type="button" value="Profil"/></li>
              <li><input type="button" value="Fotoğraf"/></li>
              <li><input type="button" value="Hesap"/></li>
              <li><input type="button" value="Dersler"/></li>
            </ul>
        </div>
        <div className={styles.update}>
          <div className={styles.info}>
            <h2>Herkese acik profil</h2>
            <p>Kendiniz hakkinda bilgiler ekleyin</p>
          </div>
          <div className={styles.inputDiv}>
            <div>
              <p>Temel Bilgiler:</p>
              <ProfileInput placeholder="Ilk Adiniz" />
              <ProfileInput placeholder="Ilk Adiniz" />
              <ProfileInput placeholder="Ilk Adiniz" />
              <ProfileInput placeholder="Ilk Adiniz" />
              <ProfileInput placeholder="Ilk Adiniz" />
            </div>
          </div>
          <div className={styles.button}>
            <SignButton child="Kaydet" />
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileUpdate;
