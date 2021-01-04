import React, { useEffect, useState } from "react";
import * as Icons from "../icons/index";
import "./commentCard.scss";
import StarRatingComponent from "react-star-rating-component";
import { getDislikeOrUndoDislikeWithToast, getLikeOrUndoLikeWithToast, getSingleAxios } from "../../helpers/axiosHelpers";

const CommentCard = (props) => {
  const userId = props.user;
  const lessonId = props.lessonId;
  const commentId = props.commentId;
  const [user, setUser] = useState({});
  const [like, setLike] = useState(props.likeCount);
  const [dislike, setDislike] = useState(props.dislikeCount);
  const [userImage, setUserImage] = useState("");
  let itemUrl =
    "http://localhost:5000/api/lessons/" + lessonId + "/comments/" + commentId;
  let comment = {
    id: props.commentId,
    title: props.title,
    content: props.content,
    createdAt: props.createdAt,
    answerCount: props.answerCount,
    mark: props.mark,
    userImage: userImage,
    userName: user.name,
    lessonId: lessonId,
  };
  useEffect(() => {
    getUser(userId);
    return () => {};
  }, [userId]);

  const getUser = (userId) => {
    const url = "http://localhost:5000/api/users/profile/" + userId;
    getSingleAxios(url).then((data) => {
      setUser(data);
      setUserImage("http://localhost:5000/uploads/" + data.profile_image);
    });
  };

  const likeHandler = async () => {
    let rate = await getLikeOrUndoLikeWithToast(
      itemUrl,
      "Beğeniniz eklendi :) ",
      "Beğeniniz geri alındı :("
    );
    setLike(like + rate);
  };

  const dislikeHandler = async () => {
    let rate = await getDislikeOrUndoDislikeWithToast(
      itemUrl,
      "Dislike eklendi :(",
      "Dislike geri alındı :) "
    );
    setDislike(dislike + rate);
  };
  return (
    <div className="comment-card">
      <div className="card-wrapper">
        <div className="image">
          <img alt="" src={userImage} />
        </div>
        <div className="content-wrapper">
          <h2>{comment.userName}</h2>
          <p className="content">{comment.content}</p>
          <div className="content-bottom">
            <div>
              <StarRatingComponent
                name="rate"
                starCount={5}
                value={comment.mark}
              />
            </div>
            <div>
              <span>{comment.createdAt}</span>
            </div>
          </div>
        </div>
        <div className="icons">
          <div>
            <div>
              <div onClick={likeHandler}>
                <Icons.LikeFa />
              </div>
              <span>({like})</span>
            </div>
            <div>
              <div onClick={dislikeHandler}>
                <Icons.DislikeFa />
              </div>
              <span>({dislike})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
