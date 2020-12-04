import React from "react";

function ProfileNavi() {
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
         </div>
  );
}

export default ProfileNavi;
