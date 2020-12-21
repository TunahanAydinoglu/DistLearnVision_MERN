import "./lessonCart.scss";
import { LikeFa, DislikeFa, ArrowBottom } from "../icons/index";
import Axios from "axios";
import { getCookie } from "../../helpers/auth";
import { useEffect, useState } from "react";

const LessonCart = (props) => {
  let lesson = props.lesson;
  const [category, setCategory] = useState("");
  const [img, setImg] = useState("");
  const [like, setLike] = useState(lesson.likeCount);
  const [dislike, setDislike] = useState(lesson.dislikeCount);
  const likeHandler = () => {
    let config = {
      headers: {
        Authorization: getCookie("token"),
      },
    };
    let url = "http://localhost:5000/api/lessons/" + lesson._id;
    Axios.get(url + "/like", config).then(() => {
      alert("Begeniniz alindi tesekkurler");
      setLike(like + 1);
    });
  };
  const undoLikeHandler = () => {
    let config = {
      headers: {
        Authorization: getCookie("token"),
      },
    };
    let url = "http://localhost:5000/api/lessons/" + lesson._id;
    Axios.get(url + "/undo_like", config).then(() => {
      alert("Begeniniz kaldirildi");
      setLike(like - 1);
    });
  };
  const dislikeHandler = () => {
    let url = "http://localhost:5000/api/lessons/" + lesson._id + "/dislike";
    Axios.get(url, {
      headers: {
        Authorization: getCookie("token"),
      },
    }).then(() => {
      alert("Dislike eklendi");
      setDislike(dislike + 1);
    });
  };
  const undoDislikeHandler = () => {
    let url =
      "http://localhost:5000/api/lessons/" + lesson._id + "/undo_dislike";
    Axios.get(url, {
      headers: {
        Authorization: getCookie("token"),
      },
    }).then(() => {
      alert("Dislikeniniz geri alindi");
      setDislike(dislike - 1);
    });
  };

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
            <span onClick={likeHandler}>
              <LikeFa />
            </span>
            ({like})
          </span>
          <span className="dislike">
            <span onClick={dislikeHandler}>
              <DislikeFa />
            </span>
            ({dislike})
          </span>
          <div class="dropdown">
            <span>
              <ArrowBottom />
            </span>
            <div class="dropdown-content">
              <ul>
                <li onClick={undoLikeHandler}>Like geri al</li>
                <li onClick={undoDislikeHandler}>Dislike geri al</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="cart-footer">
          <span>{lesson.instructor}</span>
        </div>
      </div>
    </div>
  );
};

export default LessonCart;
