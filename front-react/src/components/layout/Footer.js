import React from "react";
import styles from "./footer.module.css";
// import { useRouter } from "next/router";

function Footer() {
  // const router = useRouter();
  return (
    <footer className={styles.footer}>
      <div>
        <ul>
          <li>
            <h2>Süleyman Demirel Üniversitesi</h2>
          </li>
          <li>Bilgisayar Mühendisliği</li>
          <li>Bitirme Projesi</li>
        </ul>
        <ul>
          <li>
            <h2>Biz kimiz</h2>
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
          <h2>Dist Learn Vision</h2>
          <span>
            Projemiz uzaktan öğretim sertifikasyon sistemlerinde güven endeksini
            arttırmak için katılımcıların odaklanma oranlarına göre eğitim
            tamamlama sonucundaki sertifikasyon programını tamamlamarına olanak
            sağlıyoruz.
          </span>
          <br />
          <span>
            {/* <button onClick={() => router.push("/contact")}>
              Bizimle İletişime Geçin
            </button> */}
            <button>Bizimle İletişime Geçin</button>
          </span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;