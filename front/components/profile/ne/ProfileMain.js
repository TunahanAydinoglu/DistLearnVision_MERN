import React from "react";

import styles from "./profileUpdate.module.css";
import ProfileInput from "../../toolbox/profile/ProfileInput";
import SignButton from "../../toolbox/signItems/SignButton";
import ProfileNavi from "./ProfileNavi";

function ProfileMain() {
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

  return (
    <div>
      
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
              {/* <SignButton child="Kaydet" /> */}
            </div>
          </div>
  );
}

export default ProfileMain;
