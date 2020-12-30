import React, { useEffect, useState } from "react";
import * as Icons from "../icons/index";
import Axios from "axios";
import { getCookie } from "../../helpers/auth";
import { toast } from "react-toastify";
import "./commentCard.scss";
import StarRatingComponent from "react-star-rating-component";


const CommentCard = (props) => {
  const userId = props.user;
  const lessonId = props.lessonId;
  const questionId = props.questionId;
  const [user, setUser] = useState({});
  const [like, setLike] = useState(props.likeCount);
  const [dislike, setDislike] = useState(props.dislikeCount);
  const [userImage, setUserImage] = useState("");
  let token = getCookie("token");
  let question = {
    id: props.questionId,
    title: props.title,
    content: props.content,
    createdAt: props.createdAt,
    answerCount: props.answerCount,
    mark:props.mark,
    userImage: userImage,
    userName: user.name,
    token: token,
    lessonId: lessonId,
  };
  useEffect(() => {
    getUser(userId);
    return () => {};
  }, [userId]);

  const getUser = (userId) => {
    const url = "http://localhost:5000/api/users/profile/" + userId;
    Axios.get(url)
      .then((res) => res.data.data)
      .then((data) => {
        setUser(data);
        let pat = "http://localhost:5000/uploads/" + data.profile_image;
        setUserImage(pat);
      });
  };
  const likeHandler = () => {
    let config = {
      headers: {
        Authorization: token,
      },
    };
    let url =
      "http://localhost:5000/api/lessons/" +
      lessonId +
      "/comments/" +
      questionId +
      "/like";
    Axios.get(url, config)
      .then(() => {
        toast.success("Beğeniniz eklendi :) ", {
          position: "bottom-right",
          autoClose: 4000,
        });
        setLike(like + 1);
      })
      .catch(() => undoLikeHandler());
  };
  const undoLikeHandler = () => {
    let config = {
      headers: {
        Authorization: token,
      },
    };
    let url =
      "http://localhost:5000/api/lessons/" +
      lessonId +
      "/comments/" +
      questionId +
      "/undo_like";
    Axios.get(url, config).then(() => {
      toast.error("Beğeniniz geri alındı :(", {
        position: "bottom-right",
        autoClose: 4000,
      });
      setLike(like - 1);
    });
  };
  const dislikeHandler = () => {
    let url =
      "http://localhost:5000/api/lessons/" +
      lessonId +
      "/comments/" +
      questionId +
      "/dislike";
    Axios.get(url, {
      headers: {
        Authorization: token,
      },
    })
      .then(() => {
        toast.error("Dislike eklendi :(", {
          position: "bottom-right",
          autoClose: 4000,
        });
        setDislike(dislike + 1);
      })
      .catch(() => undoDislikeHandler());
  };
  const undoDislikeHandler = () => {
    let url =
      "http://localhost:5000/api/lessons/" +
      lessonId +
      "/comments/" +
      questionId +
      "/undo_dislike";
    Axios.get(url, {
      headers: {
        Authorization: token,
      },
    }).then(() => {
      toast.warn("Dislike geri alındı :) ", {
        position: "bottom-right",
        autoClose: 4000,
      });
      setDislike(dislike - 1);
    });
  };
  return (
    <div className="comment-card">
      <div className="card-wrapper">
        <div className="image">
          <img alt="" src={userImage} />
        </div>
        <div className="content-wrapper">
          <h2>{question.userName}</h2>
          <p className="content">{question.content}</p>
          <div className="content-bottom">
            <div>
                <StarRatingComponent
                  name="rate"
                  starCount={5}
                  value={question.mark}
                />
            </div>
            <div>
              <span>{question.createdAt}</span>
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
