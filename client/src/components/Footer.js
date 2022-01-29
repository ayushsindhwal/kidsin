import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer id="main_footer">
    <div id="footer_columns">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="second-footer">
              <img src="images/smalllogo.png" className="img-fluid mb-2" alt=""/>
              <p className="footer-contact">Call Us Now!</p>
			  <p className="footer-contact"><strong><i className="fa fa-phone" aria-hidden="true"></i> +971 543269507</strong></p>
			  <p className="footer-contact"><strong><i className="fa fa-phone" aria-hidden="true"></i> +971 543427468</strong></p>
              <p className="footer-contact">Email Us At <strong>info@kidsin.org</strong></p>
            </div>
          </div>





          <div className="col-lg-12">
            <div className="third-footer">
              <ul className="footer-social">
                <li><a href="https://www.facebook.com/YOURPATHTOSUCCESS/" target="_blank"><i className="fa fa-facebook-f"></i></a></li>
                <li><a href="https://www.linkedin.com/company/79352740" target="_blank"><i className="fa fa-linkedin"></i></a></li>
              </ul>
            </div>
          </div>
        </div>

      </div>

    </div>

    <div id="footer_copyright">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 copyright-area">
            <p>Copyright 2020 © KidsIn. All Rights Reserved. Design &amp; Developed By <a href="https://www.webredas.com/">Webredas</a></p>
          </div>
        </div>
      </div>
    </div>

    </footer>

  );
};

export default Footer;
