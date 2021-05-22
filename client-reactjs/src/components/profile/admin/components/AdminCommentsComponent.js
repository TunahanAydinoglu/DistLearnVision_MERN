import React, { useEffect, useState } from "react";
import {
  getAxiosWithToken,
  deleteAxiosWithConfirmPop,
} from "../../../../helpers/axiosHelpers";

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

  const deleteCommentHandler = async (e, id, index) => {
    e.preventDefault();
    const deleteUrl = `http://localhost:5000/api/admin/comments/${id}/delete`;
    const successMessage = "Yorum başarıyla silindi.";
    const errorMessage = "Bir şeyler yanlış gitmiş olmalı yorum silinemedi.";
    const result = await deleteAxiosWithConfirmPop(deleteUrl, successMessage, errorMessage);
    if(result){
      comments.splice(index,1);
      setComments([...comments]);
    }
  };
  return (
    <div className="admin-users">
      <div className="table">
        <div className="thead">
          <div className="tr">
            <div className="th th-name">Yorum</div>
            <div className="th th-role">Like</div>
            <div className="th th-blocked">Dislike</div>
            <div className="th th-setting">Ayarlar</div>
          </div>
        </div>
        <div className="search-field">
          <input
            placeholder="Yorum ara"
            onChange={(e) => searchAxios(e.target.value)}
          />
        </div>
        <div className="tbody">
          {comments.map((comment, index) => (
            <form key={comment._id}>
              <div className={index % 2 === 0 ? "tr" : "tr tr-even"}>
                <div className="td td-comment td-font">{comment.content}</div>
                <div className="td td-role td-font">{comment.likeCount}</div>
                <div className="td td-blocked td-font">
                  {comment.dislikeCount}
                </div>
                <div className="td td-setting">
                  <button
                    type="button"
                    onClick={(e) => deleteCommentHandler(e, comment._id, index)}
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
