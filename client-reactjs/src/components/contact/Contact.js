import Axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../../constant";

import { successPop, errorPop } from "../../helpers/alertHelpers";
import "./contact.scss";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const contactSubmitHandler = (e) => {
    e.preventDefault();
    const contactUrl = BASE_URL + "api/contact/new";
    const item = {
      name,
      email,
      subject,
      content,
    };

    Axios.post(contactUrl, item)
      .then(() => {
        successPop("Mesajınız iletilmiştir.");
        e.target[0].value = "";
        e.target[1].value = "";
        e.target[2].value = "";
        e.target[3].value = "";
      })
      .catch(() => {
        errorPop("Bir hata oluştu bilgileri kontrol ediniz.");
      });
  };

  return (
    <div className="contact">
      <div className="map">
        <iframe
          title="map-sdu"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.3005499156156!2d30.523449315264134!3d37.82984921676203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c5c9d67590ea59%3A0x568ac62991a4f702!2sS%C3%BCleyman%20Demirel%20%C3%9Cniversitesi%20M%C3%BChendislik%20Fak%C3%BCltesi!5e0!3m2!1str!2str!4v1607791203091!5m2!1str!2str"
          width="600"
          height="450"
          frameBorder={0}
          aria-hidden={false}
          tabIndex={0}
        ></iframe>
      </div>
      <form className="contact-form" onSubmit={contactSubmitHandler}>
        <h2>Mesaj Gönder</h2>
        <div className="contact-item">
          <label htmlFor="name">Ad Soyad</label>
          <input
            name="name"
            id="name"
            type="text"
            required
            placeholder="Ad Soyad"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="contact-item">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            type="email"
            required
            placeholder="example@mail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* <div className="contact-item">
          <label htmlFor="phone">Telefon</label>
          <input
            id="phone"
            name="phone"
            type="text"
            required
            placeholder="+90 555 555 5555"
          />
        </div> */}
        <div className="contact-item">
          <label htmlFor="subject">Konu</label>
          <input
            name="subject"
            id="subject"
            type="text"
            required
            placeholder="Konu"
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="contact-item">
          <label htmlFor="message">Mesaj</label>
          <textarea
            name="message"
            id="message"
            type="text"
            required
            placeholder="Mesajınızı giriniz..."
            onChange={(e) => setContent(e.target.value)}
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
