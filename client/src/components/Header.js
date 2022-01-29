import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
  
<header id="main-header"> 
 <div id="top-head">
 <div className="container">
 <div className="row justify-content-between">
 <div className="col-lg-3 col-3">
 <div className="logo">
   <Link to="/">
 <img src="/images/smalllogo.png" className="img-fluid"/>
 </Link>
 </div>
 </div>

  <div className="col-lg-3 col-9">
  <div className="header-menu">
    <ul>
	<li><Link to="/login"><i className="fa fa-user"></i> Login</Link></li>
	<li className="top-btn"><Link to="/register"> Join Us Now</Link></li>
	</ul>
  </div>
  </div>
  
  
</div>

 </div>
 </div>
</header> 

);
};

export default Header;
