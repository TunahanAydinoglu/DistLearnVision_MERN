import "./lessonCart.scss";
import { LikeFa, DislikeFa, ArrowBottom } from "../icons/index";
import Axios from "axios";
import { getCookie } from "../../helpers/auth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const LessonCart = (props) => {
  let lesson = props.lesson;
  const [like, setLike] = useState(lesson.likeCount);
  const [dislike, setDislike] = useState(lesson.dislikeCount);
  const [locate, setLocate] = useState("");
  let token = getCookie("token");

  const likeHandler = () => {
    let config = {
      headers: {
        Authorization: token,
      },
    };
    let url = "http://localhost:5000/api/lessons/" + lesson._id;
    Axios.get(url + "/like", config)
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
    let url = "http://localhost:5000/api/lessons/" + lesson._id;
    Axios.get(url + "/undo_like", config).then(() => {
      toast.error("Beğeniniz geri alındı :(", {
        position: "bottom-right",
        autoClose: 4000,
      });
      setLike(like - 1);
    });
  };
  const dislikeHandler = () => {
    let url = "http://localhost:5000/api/lessons/" + lesson._id + "/dislike";
    Axios.get(url, {
      headers: {
        Authorization: token,
      },
    })
      .then(() => {
        toast
          .error("Dislike eklendi :(", {
            position: "bottom-right",
            autoClose: 4000,
          })
          .then(() => setDislike(dislike + 1));
        setDislike(dislike + 1);
      })
      .catch(() => undoDislikeHandler());
  };
  const undoDislikeHandler = () => {
    let url =
      "http://localhost:5000/api/lessons/" + lesson._id + "/undo_dislike";
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

  useEffect(() => {
    locateHelperMethod(lesson._id);
  }, [lesson._id]);
  const locateHelperMethod = (lessonId) => {
    let locateHelper = "/izle?id=" + lessonId;
    setLocate(locateHelper);
  };
  return (
    <div className="lesson-cart">
      <img alt="" src={lesson.image} />
      <div className="cart-content">
        <h4>{lesson.category.title}</h4>
        <Link to={locate}>{lesson.content}</Link>
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
          <div className="dropdown">
            <span>
              <ArrowBottom />
            </span>
            <div className="dropdown-content">
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
      <ToastContainer />
    </div>
  );
};

export default LessonCart;
