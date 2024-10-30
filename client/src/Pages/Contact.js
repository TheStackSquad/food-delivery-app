import React from 'react';
import { Link } from  'react-router-dom';
import user1 from '../asset/img/user1.webp';
import user2 from '../asset/img/user2.webp';
import user3 from '../asset/img/user3.webp';
import user4 from '../asset/img/user4.webp';
import user5 from '../asset/img/user5.webp';
import MenuBook from '../asset/img/menu-book.png';
import { FaArrowRight, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import '../css/contact.css';

function Contact() {
  return (
    <div className='contact'>
        <div className='contact-grid'>
            <div className='pitch'>
                <h2>Get in touch</h2>
                <div className='img-box'>
                    <img src={user1} alt='user1' className='user-image' />
                    <img src={user2} alt='user2' className='user-image' />
                    <img src={user3} alt='user3' className='user-image' />
                    <img src={user4} alt='user4' className='user-image' />
                    <img src={user5} alt='user5' className='user-image' />
                </div>
                <div className='pitch-text'>
                    <p className='text'>Urgently want to reach us?</p>
                    <p className='text-2'>We're available 9 am - 11 pm WAT <br />
                    Seven days a week. (And we respond within 5 mins!)</p>
                </div>
                <div className='chat-widget-toggle'>
                    <h3 className='widget-toggler'>Start a conversation</h3>
                    <FaArrowRight className='arrow-icon' />
                </div>
            </div>

            <div className='email-grid'>
                <h1>Email Us</h1>
                <p className='email-text'>
                    Want to mail us instead?
                </p>

                <form className='email-form'>
                    {/* Name Field */}
                    <div className='input-group'>
                        <FaUser className='input-icon' />
                        <input type='text' placeholder='Your name' className='input-field' />
                    </div>

                    {/* Email Field */}
                    <div className='input-group'>
                        <FaEnvelope className='input-icon' />
                        <input type='email' placeholder='Your email address' className='input-field' />
                    </div>

                    {/* Phone Field */}
                    <div className='input-group'>
                        <FaPhone className='input-icon' />
                        <input type='tel' placeholder='Your phone number' className='input-field' />
                    </div>

                    {/* Topic Dropdown */}
                    <div className='input-group'>
                        <select className='input-field'>
                            <option value=''>Select topic</option>
                            <option value='general'>General Inquiry</option>
                            <option value='support'>Support</option>
                            <option value='feedback'>Feedback</option>
                            <option value='other'>Other</option>
                        </select>
                    </div>

                    {/* Message Text Area */}
                    <div className='input-group'>
                        <textarea placeholder='Your message' className='input-field textarea-field'></textarea>
                    </div>

                    {/* Send Message Button */}
                    <button type='submit' className='send-button'>Send Message</button>
                </form>
            </div>

            <div className='faq-grid'>
                <h1 className='faq-header'>FAQs</h1>
                <p className='email-text about-us'>
                DevKitchen is a dynamic online platform dedicated to streamlining logistics
                for food vendors and enhancing the dining experience for customers.
                We connect food businesses with efficient delivery solutions, enabling
                them to focus on what they do best—creating delicious meals.
                From seamless order processing to reliable delivery,
                DevKitchen is here to help food vendors expand their
                reach and provide customers with easy access to
                their favorite flavors, all in one convenient platform.
                </p>

                <button type='submit' className='send-button'>What is DevKitchen</button>
            </div>

            <div className='place-order-card'>
                <img src={MenuBook} alt='menu-img' className='menu-img' />
                <h1 className='order-header'>Place your <br />
                order in seconds</h1>
                <button className='promo-card'>
                DEV3BTZPT
                </button>
                <p className='promo-text'>
                    Get N300 off your first order
                    when you use this promo code!
                </p>

                <Link to="/menu" className="send-button send-btn">
  Order Here
</Link>
            </div>
        </div>
    </div>
  );
}

export default Contact;
