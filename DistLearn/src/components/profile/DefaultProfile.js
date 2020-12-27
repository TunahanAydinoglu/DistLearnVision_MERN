import "./defaultProfile.scss";

export default function DefaultProfile(props) {
  const user = props.user;

  return (
    <div className="default-profile">
      <h2>Profil Sayfası</h2>
      <h3>Profil bilgilerinizi buradan inceleyebilirsiniz</h3>
      <div className="update-form">
        <div className="items">
          <div className="form-item">
            <span className="title-span">Ad Soyad :</span>
            <span className="value-span">{user.name}</span>
          </div>
          <div className="form-item">
            <span className="title-span">Email :</span>
            <span className="value-span">{user.email}</span>
          </div>
          <div className="form-item">
            <span className="title-span">Web Siteniz :</span>
            <a href={user.website} className="value-span">
              {user.website}
            </a>
          </div>
          <div className="form-item">
            <span className="title-span">Meslek :</span>
            <span className="value-span">{user.job}</span>
          </div>
          <div className="form-item">
            <span className="title-span">Konum :</span>
            <span className="value-span">{user.place}</span>
          </div>
          <div className="form-item">
            <span className="title-span">Hakkında :</span>
            <span className="value-span">{user.about}</span>
          </div>
        </div>
        <div className="submit-section"></div>
      </div>
    </div>
  );
}
