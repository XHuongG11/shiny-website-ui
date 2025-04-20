import styles from "./Footer.module.css";
import {
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaGithub,
  FaAngellist,
  FaDribbble,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Logo và mô tả */}
        <div className={styles.footerD}>
          <img
            src="../image/logo/logo.jpg"
            height="90"
            width="150"
          ></img>
          <p className={styles.footerDescription}>
            This growth plan will help you reach your resolutions and achieve
            the goals you have been striving towards.
          </p>
          {/* Social Icons */}
          <div className={styles.footerSocial}>
            <a href="#">
              <FaTwitter />
            </a>
            <a href="#">
              <FaLinkedin />
            </a>
            <a href="#">
              <FaFacebook />
            </a>
            <a href="#">
              <FaGithub />
            </a>
            <a href="#">
              <FaAngellist />
            </a>
            <a href="#">
              <FaDribbble />
            </a>
          </div>
        </div>

        {/* Danh mục */}
        <div className={styles.footerLinks}>
          <div className={styles.footerColums}>
            <h4>Marketplace</h4>
            <a href="#">Buy Product</a>
            <a href="#">Sell Product</a>
            <a href="#">Our Creator</a>
          </div>
          <div className={styles.footerColums}>
            <h4>Resources</h4>
            <a href="#">About Us</a>
            <a href="#">Event</a>
            <a href="#">Tutorial</a>
          </div>
          <div className={styles.footerColums}>
            <h4>Company</h4>
            <a href="#">Media</a>
            <a href="#">Blog</a>
            <a href="#">Pricing</a>
          </div>
          <div className={styles.footerColums}>
            <h4>Legal</h4>
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">Support</a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className={styles.footerCopyright}>
        © 2077 shiny. All rights reserved.
      </div>
    </footer>
  );
}
