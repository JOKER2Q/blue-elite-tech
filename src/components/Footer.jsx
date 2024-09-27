import React from "react";
import "./footer.css";
import { NavLink } from "react-router-dom";
import Setting from "./Setting";
import { topStarting } from "./Header";
const Footer = () => {
  return (
    <footer className="footer center">
      <div className="container">
        <div className="grid-3">
          <div>
            <h1>blue elite tech</h1>
            <div className="flex icon">
              <a
                className="center twitter"
                target="_blank"
                href="https://x.com/Blue_Elite_tech"
              >
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a
                className="center whatsapp"
                target="_blank"
                href="https://wa.me/message/4BZQ53OETHOLG1"
              >
                <i className="fa-brands fa-whatsapp"></i>
              </a>
              <a
                className="center facebook"
                target="_blank"
                href="https://www.facebook.com/BlueEliteTech.home"
              >
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a
                className="center linkedin"
                target="_blank"
                href="https://www.linkedin.com/company/blue-elite-tech"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur, omnis?
            </p>
            <Setting position="footer" />
          </div>
          <div>
            <NavLink onClick={topStarting} to="/">
              home
            </NavLink>
            <NavLink onClick={topStarting} to="/services">
              our services
            </NavLink>
            <NavLink onClick={topStarting} to="/academy">
              academy
            </NavLink>
            <NavLink onClick={topStarting} to="/projects">
              our projects
            </NavLink>
          </div>
          <div>
            <NavLink onClick={topStarting} to="/contact">
              contact us
            </NavLink>
            <NavLink onClick={topStarting} to={"/join"}>
              join us
            </NavLink>
            <NavLink onClick={topStarting} to={"/about"}>
              about us
            </NavLink>
          </div>
        </div>
        <div className="copyright center">
          © 2024 All rights reserved for Blue Elite Tech.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
