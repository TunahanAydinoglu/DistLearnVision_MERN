import React from "react";

import styles from "./profileUpdate.module.css";
import ProfileInput from "../toolbox/profile/ProfileInput";
import SignButton from "../toolbox/signItems/SignButton";
import { useRouter } from "next/router";

function ProfileUpdate() {
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
  let router = useRouter();
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
              <h2>Kişisel Profiliniz</h2>
              <p>(Bilgiler Değiştirilemez)</p>
            </div>
            <div className={styles.inputDiv}>
              <div>
                <p>Temel Bilgiler:</p>
                <div>
                  <ProfileInput
                    name={"email"}
                    placeholder={data.email}
                    readOnly={true}
                  />
                  <ProfileInput
                    name={"name"}
                    readOnly={true}
                    placeholder={data.name}
                  />
                  <ProfileInput
                    name={"role"}
                    placeholder={data.role}
                    readOnly={true}
                  />
                  <ProfileInput
                    name={"createdAt"}
                    placeholder={data.createdAt}
                    readOnly={true}
                  />
                </div>
              </div>
            </div>
            <div className={styles.button}>
              <SignButton child="Kaydet" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileUpdate;
