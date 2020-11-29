import React from "react";
import useSWR from "swr";

import styles from "./profileUpdate.module.css";
import ProfileInput from "../toolbox/profile/ProfileInput";
import SignButton from "../toolbox/signItems/SignButton";

import {fetcherGet} from "../../lib/fetchSWR";

function ProfileUpdate() {
  let url = "http://localhost:5000/api/users/5fc107295109b421f8c360b2";
  const { data, error } = useSWR(url, fetcherGet);
  console.log(data);
  //   //useState fetch
  //   const [data, dataSet] = React.useState([]);
  //   const [dataLoading, dataLoadingSet] = React.useState(true);

  //   async function getData() {
  //     let url = "http://localhost:5000/api/users/5fb6c5076c4c15278418bf27";
  //     const res = await fetch(url);
  //     const data = await res.json();
  //     dataSet(data);
  //     dataLoadingSet(false);
  //   }
  //   React.useEffect(() => {
  //     getData();
  //   }, []);
  // //useState/////

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
                <input type="button" value="Profil" />
              </li>
              <li>
                <input type="button" value="Fotoğraf" />
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
              <h2>Herkese acik profil</h2>
              <p>Kendiniz hakkinda bilgiler ekleyin</p>
            </div>
            <div className={styles.inputDiv}>
              <div>
                <p>Temel Bilgiler:</p>
                <div>
                  <ProfileInput name={"email"} placeholder={data.email} readOnly={true} />
                  <ProfileInput name={"name"} placeholder={data.name} />
                  <ProfileInput name={"role"} placeholder={data.role} readOnly={true} />
                  <ProfileInput name={"createdAt"} placeholder={data.createdAt} readOnly={true}/>
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
