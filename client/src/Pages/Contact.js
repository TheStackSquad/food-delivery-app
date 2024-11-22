//client/src/Pages/Contact.js
// client/src/Pages/Contact.js
import React from "react";
import { useSelector, useDispatch } from "react-redux"; // Import useSelector and useDispatch from Redux
import { toggleChat } from "../redux/actions/layoutActions"; // Ensure this is the correct action
import { Link } from "react-router-dom";
import user1 from "../asset/img/user1.webp";
import user2 from "../asset/img/user2.webp";
import user3 from "../asset/img/user3.webp";
import user4 from "../asset/img/user4.webp";
import user5 from "../asset/img/user5.webp";
import MenuBook from "../asset/img/menu-book.png";
import { FaArrowRight, FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import styles from "../css/Contact.module.css";

function Contact() {
  // Accessing Redux state
  const { isChatOpen, isChatIconVisible } = useSelector((state) => state.layout);
  const dispatch = useDispatch();

  // Handle the chat toggle by dispatching the Redux action
  const handleToggleChat = () => {
    dispatch(toggleChat()); // This will toggle the chat open/closed and its visibility
  };

  return (
    <div className={`contact ${styles.contact}`}>
      <div className={styles["contact-grid"]}>
        {/* Live Chat Grid */}
        <div className={styles.pitch}>
          <h2>Get in touch</h2>
          <div className={styles["img-box"]}>
            <img src={user1} alt="user1" className={styles["user-image"]} />
            <img src={user2} alt="user2" className={styles["user-image"]} />
            <img src={user3} alt="user3" className={styles["user-image"]} />
            <img src={user4} alt="user4" className={styles["user-image"]} />
            <img src={user5} alt="user5" className={styles["user-image"]} />
          </div>
          <div className={styles.pitchText}>
            <p className={styles.text}>Urgently want to reach us?</p>
            <p className={styles.text2}>
              We're available 9 am - 11 pm WAT <br />
              Seven days a week. (And we respond within 5 mins!)
            </p>
          </div>
          {/* Toggle Chat Widget */}
          <div
            className={styles["chat-widget-toggle"]}
            onClick={handleToggleChat}
          >
            <h3 className={styles["widget-toggler"]}>Start a conversation</h3>
            <FaArrowRight className={styles["arrow-icon"]} />
          </div>
        </div>

        {/* Email Grid */}
        <div className={styles["email-grid"]}>
          <h1>Email Us</h1>
          <p className={styles["email-text"]}>Want to mail us instead?</p>

          <form className={styles["email-form"]}>
            {/* Name Field */}
            <div className={styles["input-group"]}>
              <FaUser className={styles["input-icon"]} />
              <input
                type="text"
                placeholder="Your name"
                className={styles["input-field"]}
              />
            </div>

            {/* Email Field */}
            <div className={styles["input-group"]}>
              <FaEnvelope className={styles["input-icon"]} />
              <input
                type="email"
                placeholder="Your email address"
                className={styles["input-field"]}
              />
            </div>

            {/* Phone Field */}
            <div className={styles["input-group"]}>
              <FaPhone className={styles["input-icon"]} />
              <input
                type="tel"
                placeholder="Your phone number"
                className={styles["input-field"]}
              />
            </div>

            {/* Topic Dropdown */}
            <div className={styles["input-group"]}>
              <select className={styles["input-field"]}>
                <option value="" className="select-dropdown">Select topic</option>
                <option value="general">General Inquiry</option>
                <option value="support">Support</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Message Text Area */}
            <div className={styles["input-group"]}>
              <textarea
                placeholder="Your message"
                className={`${styles["input-field"]} ${styles["textarea-field"]}`}
              ></textarea>
            </div>

            {/* Send Message Button */}
            <button type="submit" className={styles["send-button"]}>
              Send Message
            </button>
          </form>
        </div>

        {/* FAQ Grid */}
        <div className={styles["faq-grid"]}>
          <h1 className={styles["faq-header"]}>FAQs</h1>
          <p className={`${styles["email-text"]} ${styles["about-us"]}`}>
            DevKitchen is a dynamic online platform dedicated to streamlining
            logistics for food vendors and enhancing the dining experience for
            customers. We connect food businesses with efficient delivery
            solutions, enabling them to focus on what they do best—creating
            delicious meals.
          </p>

          <button type="button" className={styles["send-button"]}>
            What is DevKitchen
          </button>
        </div>

        {/* Order Grid */}
        <div className={styles["place-order-card"]}>
          <img src={MenuBook} alt="menu-img" className={styles["menu-img"]} />
          <h1 className={styles["order-header"]}>
            Place your <br /> order in seconds
          </h1>
          <button className={styles["promo-card"]}>DEV3BTZPT</button>
          <p className={styles["promo-text"]}>
            Get N300 off your first order when you use this promo code!
          </p>
          <Link
            to="/menu"
            className={`${styles["order-button"]} ${styles["send-btn"]}`}
          >
            Order Here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Contact;
