import "./lessonCart.scss";
import { LikeFa, DislikeFa } from "../icons/index";
import Axios from "axios";
import { useEffect, useState } from "react";

const LessonCart = (props) => {
  const [category, setCategory] = useState("");
  const [img, setImg] = useState("");
  let lesson = props.lesson;

  useEffect(() => {
    let lp = "";
    let url = "http://localhost:5000/api/categories/" + lesson.category;
    Axios.get(url)
      .then((res) => res.data.data)
      .then((data) => {
        setCategory(data);
        lp = "http://localhost:5000/categories/" + data.image;
        setImg(lp);
      });
  }, []);
  return (
    <div className="lesson-cart">
      <img alt="asd" src={img} />
      <div className="cart-content">
        <h4>{category.title}</h4>
        <a href="/">{lesson.content}</a>
        <div className="icons">
          <span className="like">
            <LikeFa />({lesson.likeCount})
          </span>
          <span className="dislike">
            <DislikeFa />({lesson.DislikeCount})
          </span>
        </div>
        <div className="cart-footer">
          <span>{lesson.instructor}</span>
        </div>
      </div>
    </div>
  );
};

export default LessonCart;
