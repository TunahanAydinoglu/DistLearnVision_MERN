import React from "react";
import styles from "./footer.module.css";

class Footer extends React.Component {
  render() {
    return (
      <footer className={styles.footer}>
        <div>
          <ul>
            <li>Süleyman Demirel Üniversitesi</li>
            <li>Bilgisayar Mühendisliği</li>
            <li>Bitirme Projesi</li>
          </ul>
          <ul>
            <li>
              <h2>Hakkımızda :</h2>
            </li>
            <li>
              <a>Asım Sinan Yüksel</a>
            </li>
            <li>
              <a>Tunahan Aydınoğlu</a>
            </li>
            <li>
              <a>Semih Kalkan</a>
            </li>
          </ul>
          <p>
            Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır
            metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat
            numune kitabı oluşturmak üzere bir yazı galerisini alarak
            karıştırdığı 1500'lerden ayıncılık yazılımları ile popüler olmuştur.
          </p>
        </div>
      </footer>
    );
  }
}

export default Footer;
