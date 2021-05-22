import React, { useEffect, useState } from "react";
import { getAxiosWithToken } from "../../../../helpers/axiosHelpers";

function AdminCommentsComponent() {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getCommentsForAdmin();
  }, []);

  const getCommentsForAdmin = async () => {
    const commentsUrl = "http://localhost:5000/api/admin/comments";
    let response = await getAxiosWithToken(commentsUrl);
    setComments([...response.data]);
  };
  const searchAxios = async (value = "") => {
    const searchUserUrl =
      "http://localhost:5000/api/admin/search/comments?content=" + value;
    const response = await getAxiosWithToken(searchUserUrl);
    setComments([...response.data]);
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
    // let deleteUrl = url + id + "/delete";
    // deleteAxiosWithConfirmPop(
    //   deleteUrl,
    //   "Bölüm başarıyla silindi.",
    //   "Bir şeyler yanlış gitmiş olmalı ders sılınemedı."
    // ).then(() => getItems(url));
  };
  return (
    <div className="admin-users">
      <div className="table">
        <div className="thead">
          <div className="tr">
            <div className="th th-name">Yorum</div>
            <div className="th th-role">Like</div>
            <div className="th th-blocked">Dislike</div>
            <div className="th th-setting">Settings</div>
          </div>
        </div>
        <div className="search-field">
          <input
            placeholder="Yorum ara"
            onChange={(e) => searchAxios(e.target.value)}
          />
        </div>
        <div className="tbody">
          {comments.map((comment, i) => (
            <form
              key={comment._id}
              onSubmit={(e) => updateUserHandler(e, comment._id)}
            >
              <div className={i % 2 === 0 ? "tr" : "tr tr-even"}>
                <div className="td td-comment td-font">{comment.content}</div>
                <div className="td td-role td-font">{comment.likeCount}</div>
                <div className="td td-blocked td-font">
                  {comment.dislikeCount}
                </div>
                <div className="td td-setting">
                  <button
                    type="button"
                    onClick={(e) => changeBlockHandler(e, comment._id)}
                  >
                    Sil
                  </button>
                </div>
              </div>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminCommentsComponent;
