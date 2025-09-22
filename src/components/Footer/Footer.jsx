import React from 'react'
import "./Footer.css";
import { TiSocialFacebookCircular } from "react-icons/ti";
import { TiSocialTwitterCircular } from "react-icons/ti";
import { TiSocialLinkedinCircular } from "react-icons/ti";
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-conten-left">
                <h1>FOOD.</h1>
                {/* <img src="https://media.istockphoto.com/id/1435983029/vector/food-delivery-logo-images.jpg?s=612x612&w=0&k=20&c=HXPxcjOxUiW4pMW1u9E0k2dJYQOU37a_0qZAy3so8fY=" className='logo' alt="" /> */}
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque tenetur ducimus voluptatem, laboriosam iste architecto recusandae maiores corporis cupiditate nihil! Beatae cupiditate quam molestias odit nesciunt obcaecati eos saepe id ratione, exercitationem soluta, ab animi natus eius alias? Nam, ipsum?</p>
                <div className="footer-social-icons">
                    <TiSocialFacebookCircular/>
                    <TiSocialTwitterCircular/>
                    <TiSocialLinkedinCircular/>
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-316-764-7896</li>
                    <li>contact@food.com</li>
                </ul>
            </div>
            
        </div>
        <hr />
        <p className='footer-copyright'>Copyright 2025 © Food - All Right Reserved.</p>
    </div>
  )
}

export default Footer