import "./lessonCart.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import StarRatingComponent from "react-star-rating-component";

const LessonCart = (props) => {
  let lesson = props.lesson;
  const [locate, setLocate] = useState("");

  useEffect(() => {
    locateHelperMethod(lesson._id);
  }, [lesson._id]);
  const locateHelperMethod = (lessonId) => {
    let locateHelper = "/izle?id=" + lessonId;
    setLocate(locateHelper);
  };
  return (
    <div className="lesson-cart">
      <Link to={locate}>
        <img alt="" src={lesson.image} />
      </Link>
      <div className="cart-content">
        <Link to={locate}><h4>{lesson.title}</h4></Link>
        <Link to={locate}>{lesson.content}</Link>
        <div className="icons">
        <StarRatingComponent
                  name="rate"
                  starCount={5}
                  value={Math.round(lesson.markAverage)}
                />
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
