import React, { useEffect, useState } from "react";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import "./answerCard.scss";
import {
  getSingleAxios,
  getLikeOrUndoLikeWithToast,
  getDislikeOrUndoDislikeWithToast,
} from "../../helpers/axiosHelpers";

const AnswerCard = (props) => {
  const answer = props.answer;
  const [userImage, setUserImage] = useState("");
  const [rankingCount, setRankingCount] = useState(answer.sumCount);
  const itemUrl = props.answerUrl + answer._id;

  useEffect(() => {
    getUser(answer.user);
    return () => {};
  }, [answer.user]);
  const getUser = (userId) => {
    const url = "http://localhost:5000/api/users/profile/" + userId;
    getSingleAxios(url).then((data) => {
      setUserImage("http://localhost:5000/uploads/" + data.profile_image);
    });
  };
  const likeButtonHandler = async () => {
    let rate = await getLikeOrUndoLikeWithToast(itemUrl,"Cevap puanı arttırıldı :) ","Cevap puaniniz geri alındı.");
    setRankingCount(rankingCount + rate);
  };
  const dislikeHandler = async () => {
    let rate = await getDislikeOrUndoDislikeWithToast(itemUrl,"Cevap puanı azaltildi.","Cevap puaniniz geri alındı :) ");
    setRankingCount(rankingCount - rate);
  };

  return (
    <div className="answer-card">
      <aside className="answer-card-left-side">
        <img alt="tuna" src={userImage} />
      </aside>
      <div className="answer">
        <p className="answer-content">{answer.content}</p>
        <div className="answer-footer">
          <span>{answer.userName}</span>
          <span>{answer.createdAt.split("T")[0]}</span>
        </div>
      </div>
      <div className="answer-ranking">
        <BiUpArrow className="up-button" onClick={likeButtonHandler} />
        {rankingCount}
        <BiDownArrow className="down-button" onClick={dislikeHandler} />
      </div>
    </div>
  );
};

export default AnswerCard;
