import React from "react";
import { useForm } from "react-hook-form";

import styles from "./profilePhoto.module.css";
import ProfileInput from "../toolbox/profile/ProfileInput";
import SignButton from "../toolbox/signItems/SignButton";
import { fetcherPut } from "../../lib/fetchSWR";
import { useRouter } from "next/router";

function ProfilePhoto() {
  const { register, handleSubmit, errors } = useForm();
  //useState fetch
  const [data, dataSet] = React.useState([]);
  const [dataLoading, dataLoadingSet] = React.useState(true);

  async function getData() {
    let id1 = await localStorage.getItem("id");
    let id = await id1.substring(1, id1.length - 1);
    let url = `http://localhost:5000/api/users/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    dataSet(data);
    dataLoadingSet(false);
  }
  React.useEffect(() => {
    getData();
  }, []);
  //useState/////
  const router = useRouter();

  return (
    <div>
      {!data && <div></div>}
      {data && (
        <div className={styles.profileUpdate}>
          <div className={styles.profileNavi}>
            <div className={styles.img}>
              <img src={data.profile_image} />
            </div>
            <h2>{data.name}</h2>
            <ul>
              <li>
                <input
                  type="button"
                  onClick={() => router.push("/profile")}
                  value="Profil"
                />
              </li>
              <li>
                <input
                  type="button"
                  onClick={() => router.push("/profilephoto")}
                  value="Fotoğraf"
                />
              </li>
              <li>
                <input type="button" value="Hesap" />
              </li>
              <li>
                <input type="button" value="Dersler" />
              </li>
            </ul>
          </div>
          <div className={styles.update}>
            <div className={styles.info}>
              <h2>Fotoğraf</h2>
              <p>Profil Fotoğrafınızı Değiştirebilirsiniz</p>
            </div>
            <form
              method="PUT"
              onSubmit={handleSubmit((data) => {
                fetcherPut(data);
                //Route
              })}
            >
              <div className={styles.inputDiv}>
                <img src={data.profile_image} />
                <input
                  ref={register}
                  name="profile_image"
                  placeholder="Fotoğraf url'i giriniz"
                  type="text"
                />
              </div>
              <div className={styles.button}>
                <SignButton child="Kaydet" />
              </div>
              <p>
                (Kaydettikten sonra profilinizin güncellenmesi için çıkış
                yapmanız gerekir)
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePhoto;
