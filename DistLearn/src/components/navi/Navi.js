import * as Icons from "../icons/index";
import "./navi.scss";

const Navi = () => {
  return (
    <nav className="nav">
      <div>
        <ul className="nav-menu">
          <li>
            <a href="/.">Anasayfa</a>
          </li>
          <li>
            <a href="/.">Dersler</a>
          </li>
          <li>
            <a href="/.">İletişim</a>
          </li>
          <li>
            <a href="/.">Hakkımızda</a>
          </li>
        </ul>
        <div className="input-search">
        <i className="fas fa-search"></i>
        <input type="text" placeholder=" Egitim Ara..."/>
        </div>

        <div className="auth">
          <span>
            Profil <Icons.Profile />
          </span>
          <span>
            Cikis Yap <Icons.Retweet />
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navi;
