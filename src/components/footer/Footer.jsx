import React from "react";
import {
    FaFacebookF, FaInstagram, FaTwitter, FaLinkedin,
} from "react-icons/fa";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import "./footer.scss";

const Footer = () => {
    return (
        <footer className="footer">
            <ContentWrapper>
                <ul className="menuItems">
                    <li className="menuItem">Terms Of Use</li>
                    <li className="menuItem">Privacy-Policy</li>
                    <li className="menuItem">About</li>
                    <li className="menuItem">Blog</li>
                    <li className="menuItem">FAQ</li>
                </ul>
                <div className="infoText">
                    Welcome to MovieX, your ultimate online destination for the latest movies and TV shows. Dive into a world of entertainment where you can stream and enjoy a vast collection of the newest blockbuster movies and trending television series. Explore our platform to stay updated with the hottest releases,
                    immerse yourself in thrilling narratives, and indulge in endless entertainment, all at your fingertips.
                </div>
                <div className="socialIcons">
                    <span className="icon">
                        <FaFacebookF />
                    </span>
                    <span className="icon">
                        <FaInstagram />
                    </span>
                    <span className="icon">
                        <FaTwitter />
                    </span>
                    <span className="icon">
                        <FaLinkedin />
                    </span>
                </div>
            </ContentWrapper>
        </footer>
    );
};

export default Footer;