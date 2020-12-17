import "./contact.scss";

const Contact = () => {
  return (
    <div className="contact">
      <div className="map">
        <iframe
          title="map-sdu"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.3005499156156!2d30.523449315264134!3d37.82984921676203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c5c9d67590ea59%3A0x568ac62991a4f702!2sS%C3%BCleyman%20Demirel%20%C3%9Cniversitesi%20M%C3%BChendislik%20Fak%C3%BCltesi!5e0!3m2!1str!2str!4v1607791203091!5m2!1str!2str"
          width="600"
          height="450"
          frameborder="0"
          aria-hidden="false"
          tabindex="0"
        ></iframe>
      </div>
      <form className="contact-form">
        <h2>Mesaj Gönder</h2>
        <div className="contact-item">
          <label for="name">Ad Soyad</label>
          <input
            name="name"
            id="name"
            type="text"
            required
            placeholder="Ad Soyad"
          />
        </div>
        <div className="contact-item">
          <label for="email">Email</label>
          <input
            name="email"
            id="email"
            type="email"
            required
            placeholder="example@mail.com"
          />
        </div>
        <div className="contact-item">
          <label for="phone">Telefon</label>
          <input
            id="phone"
            name="phone"
            type="text"
            required
            placeholder="+90 555 555 5555"
          />
        </div>
        <div className="contact-item">
          <label for="subject">Konu</label>
          <input
            name="subject"
            id="subject"
            type="text"
            required
            placeholder="Konu"
          />
        </div>
        <div className="contact-item">
          <label for="message">Mesaj</label>
          <textarea
            name="message"
            id="message"
            type="text"
            required
            placeholder="Mesajınızı giriniz..."
          />
        </div>
        <button className="submit-button" type="submit">
          Gönder
        </button>
      </form>
    </div>
  );
};

export default Contact;
