import {
  getAxiosWithToken,
  putAxiosWithConfirmPop,
} from "../../../../helpers/axiosHelpers";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../../constant";

const AdminUsersComponent = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUserForAdmin();
    searchAxios();
  }, []);

  const getUserForAdmin = async () => {
    const userUrl = BASE_URL + "api/admin/users";
    let response = await getAxiosWithToken(userUrl);
    setUsers([...response.data]);
  };

  const searchAxios = async (value = "") => {
    const searchUserUrl = BASE_URL + "api/admin/search/users?name=" + value;
    const response = await getAxiosWithToken(searchUserUrl);
    setUsers([...response.data]);
  };
  const updateUserHandler = (e, id) => {
    e.preventDefault();
    const updateUrl = BASE_URL + `api/admin/users/${id}`;
    let item = {
      name: e.target[0].value,
      role: e.target[1].value,
    };
    putAxiosWithConfirmPop(updateUrl, item);
  };
  const changeBlockHandler = async (e, id, index) => {
    e.preventDefault();
    const blockUrl = BASE_URL + `api/admin/users/${id}/block`;
    const response = await getAxiosWithToken(blockUrl);
    if (response.success) {
      users[index].blocked = !users[index].blocked;
      setUsers([...users]);
    }
  };
  return (
    <div className="admin-users">
      <div className="table">
        <div className="thead">
          <div className="tr">
            <div className="th th-name">Kullanici</div>
            <div className="th th-role">Rol</div>
            <div className="th th-blocked">Durum</div>
            <div className="th th-setting">Ayarlar</div>
          </div>
        </div>
        <div className="search-field">
          <input
            placeholder="Kullanici ara"
            onChange={(e) => searchAxios(e.target.value)}
          />
        </div>
        <div className="tbody">
          {users.map((user, index) => (
            <form
              key={user._id}
              onSubmit={(e) => updateUserHandler(e, user._id)}
            >
              <div className={index % 2 === 0 ? "tr" : "tr tr-even"}>
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
                    onClick={(e) => changeBlockHandler(e, user._id, index)}
                  >
                    {user.blocked ? "Unblock" : "Block"}
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
