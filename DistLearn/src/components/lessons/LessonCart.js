import "./lessonCart.scss";
import { StarSolid } from "../icons/index";
import pic from "../../assets/img/lessonPic.jpg";

const LessonCart = () => {
  return (
    <div className="lesson-cart">
      <img alt="asd" src={pic} />
      <div className="cart-content">
        <h4>Web Development</h4>
        <a href="/">Bastan sona React Gelistirme Egitimi Gelistirme Egitimi Gelistirme Egitimi</a>
        <ul>
          <li className="dolu">
            <StarSolid />
          </li>
          <li className="dolu">
            <StarSolid />
          </li>
          <li className="dolu">
            <StarSolid />
          </li>
          <li className="dolu">
            <StarSolid />
          </li>
          <li className="bos">
            <StarSolid />
          </li>
        </ul>
        <div className="cart-footer">
          <span>Tunahan Aydinoglu</span>
        </div>
      </div>
    </div>
  );
};

export default LessonCart;
