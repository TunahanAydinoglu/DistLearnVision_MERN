import { getAxiosWithToken } from "../../../../helpers/axiosHelpers";
import React, { useEffect, useState } from "react";

const AdminUsersComponent = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUserForAdmin();
    searchAxios();
  }, []);

  const getUserForAdmin = async () => {
    const userUrl = "http://localhost:5000/api/admin/users";
    let response = await getAxiosWithToken(userUrl);
    setUsers([...response.data]);
  };

  const searchAxios = async (value = "") => {
    const searchUserUrl =
      "http://localhost:5000/api/admin/search/users?name=" + value;
    const response = await getAxiosWithToken(searchUserUrl);
    setUsers([...response.data]);
  };
  const updateUserHandler = (e, id) => {
    e.preventDefault();
    // let putUrl = url + id + "/edit";
    let item = {
      ranking: e.target[0].value,
      title: e.target[1].value,
      url: e.target[2].value,
    };
  };
  const changeBlockHandler = (e, id) => {
    e.preventDefault();
  };
  return (
    <div className="admin-users">
      <div className="table">
        <div className="thead">
          <div className="tr">
            <div className="th th-name">Kullanici</div>
            <div className="th th-role">Rol</div>
            <div className="th th-blocked">Block</div>
            <div className="th th-setting">Settings</div>
          </div>
        </div>
        <div className="search-field">
          <input placeholder="Kullanici ara" onChange={(e) => searchAxios(e.target.value)} />
        </div>
        <div className="tbody">
          {users.map((user, i) => (
            <form
              key={user._id}
              onSubmit={(e) => updateUserHandler(e, user._id)}
            >
              <div className={i % 2 === 0 ? "tr" : "tr tr-even"}>
                <div className="td td-name">
                  <input name="name" defaultValue={user.name} required />
                </div>
                <div className="td td-role">
                  <input name="title" defaultValue={user.role} required />
                </div>
                <div className="td td-blocked td-font">
                  {user.blocked ? "Pasif" : "Aktif"}
                </div>
                <div className="td td-setting">
                  <button type="submit">Güncelle</button>
                  <button
                    type="button"
                    onClick={(e) => changeBlockHandler(e, user._id)}
                  >
                    Block
                  </button>
                </div>
              </div>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminUsersComponent;
