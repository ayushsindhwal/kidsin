import React from "react";
// import OwlCarousel from "react-owl-carousel2";
import { Link } from "react-router-dom";
const Section = () => {
  return (
    <>
    <section id="banner-slider" className="banner-slider">
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        </ol>
        <div className="carousel-inner" role="listbox">
          {/* <!-- Slide One - Set the background image for this slide in the line below --> */}
          <div className="carousel-item active" style={{backgroundImage:"url(/images/banner.jpg)"}}>
            <div className="carousel-caption">
			<p className="banner-cap-head">Welcome To</p>
              <h1><strong>Kids</strong>In</h1>
			  <p className="banner-caption">Your Path to Success</p>
			  <Link to="/register" className="banner-btn">Join Now</Link>
            </div>
          </div> 
          {/* <!-- Slide Two - Set the background image for this slide in the line below --> */}
    <div className="carousel-item " style={{backgroundImage:"url(/images/banner2.jpg)"}}>
            <div className="carousel-caption d-md-block">
			<p className="banner-cap-head">Welcome To</p>
              <h1><strong>Kids</strong>In</h1>
			  <p className="banner-caption">Your Path to Success</p>
			  <Link to="/register" className="banner-btn">Join Now</Link>
            </div>
          </div>  

        </div>
       <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span aria-hidden="true"><img src="/images/ban-left-btn.png"/></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span aria-hidden="true"><img src="/images/ban-right-btn.png"/></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </section>
    {/* <!-- Page Content --> */}
	<section id="welcome-section">
	<div className="container">
	  <div className="row">
	  
        <div className="col-lg-6">
		<div className="wel-ctn-boxs">
		<h1 style={{marginTop:'40px'}}>Stay Connected</h1>
<p className="head-captions">Usher Yourself To Success</p>		
		<p>In this digital age of smartphones and social media, why not start early and make a mark right from kindergarten. Sounds interesting!? Welcome to KidsIn!</p>
		<p>Getting connected and sharing your achievements with the digital world is important. KidsIn is the place where you can easily share your achievements, pursue your interests, and get connected to other like-minded and interest-sharing kids from all over the world. With a lot of amazing institutions and diverse courses to choose from KidsIn is your partner in success. Let us help our children discover their true potential now and we'll have an early generation of smart and confident professionals. Sign your little superstar up for success now!</p>
		</div>
		</div>
		<div className="col-lg-6">
		<img src="images/wel-pic.jpg" className="img-fluid"/>
		</div>
		</div>
      </div>
	</section>
	
	
	<section id="goal-sections">
	<div className="container">
	  <div className="row justify-content-center">
	   <div className="col-lg-10 text-center">
	   <h2 style={{marginBottom:'20px'}}>Achieve your goals</h2>
	   </div>
	  </div>
	   <div className="row">
        <div className="col-lg-3 col-md-3 col-sm-3">
		<div className="goal-ctn-box">
		<img src="images/goal-icon1.png" className="img-fluid"/>
		<h4>Update profile</h4>
		</div>
		</div>
		<div className="col-lg-3 col-md-3 col-sm-3">
		<div className="goal-ctn-box">
		<img src="images/goal-icon2.png" className="img-fluid"/>
		<h4>Get connected</h4>
		</div>
		</div>
		<div className="col-lg-3 col-md-3 col-sm-3">
		<div className="goal-ctn-box">
		<img src="images/goal-icon3.png" className="img-fluid"/>
		<h4>Career Options</h4>
		</div>
		</div>
		<div className="col-lg-3 col-md-3 col-sm-3">
		<div className="goal-ctn-box">
		<img src="images/goal-icon4.png" className="img-fluid"/>
		<h4>Earn a Credential</h4>
		</div>
		</div>

		</div>
      </div>
	</section>
	
	
<section id="institute-section">
	<div className="container-fluid">
	  <div className="row">
        <div className="col-lg-6 pr-0">
		 <div className="hm-abt-img-box">
<a className="youtube-link" youtubeid="t0JgzCyVOno"> <img src="images/video-bg.jpg" style={{width:"100%"}} className="img-fluid"/> </a> 
		</div>
		</div>
		<div className="col-lg-6 institute-ctn-box">
		<div className="hm-abt-ctn-box text-center">
		<h2>KidsIn for business</h2>	
		<div className="media text-left">
  <img src="images/inst-icon1.png" className="mr-2" alt="..."/>
  <div className="media-body">
  <h5 className="mt-0">Promote your courses</h5>
  </div>
</div>
<div className="media text-left">
  <img src="images/inst-icon2.png" className="mr-2" alt="..."/>
  <div className="media-body">
  <h5 id="textss" className="mt-0">Upcoming Events</h5>
  </div>
</div>
<div className="media text-left">
  <img src="images/inst-icon3.png" className="mr-2" alt="..."/>
  <div className="media-body">
    <h5  id="textss" className="mt-0">Opportunity</h5>
  </div>
</div>
<Link to="/register" className="inst-btn text-center">Join Us Now</Link>		
		</div>
		</div>
		</div>
      </div>
	</section>
	
	
	
	<section id="enterprise-section">
	<div className="container">
	  <div className="row justify-content-center">
        <div className="col-lg-10">
		<h1>Be More You</h1>		
		<p style={{marginBottom:'20px'}}>Come, be a part of this amazing life journey of staying connected and pursuing your passion for things that you love. This is your chance to get discovered by industry veterans for a career that you would like to excel in.</p>
		</div>
		</div>
		
		<div className="row">
        <div className="col-lg-6">
		<div className="ent-box-left">
		<img src="images/ent-pic1.png" className="img-fluid"/>
		<h3>KidsIn For Learning</h3>
		<Link to="/register" className="light-btn">Join Us Now</Link>
		</div>
		</div>
		
		<div className="col-lg-6">
		<div className="ent-box-right">
		<img src="images/ent-pic2.png" className="img-fluid"/>
		<h3>KidsIn For Business</h3>
		<Link to="/register" className="dark-btn">Join Us Now</Link>
		</div>
		</div>

		</div>
		
      </div>
	</section>
	
	
	
	
	
	
	
	
	

<section id="brand-section">
	<div className="container">  
<div className="row">
<div className="col-lg-12">
	<div id="demo-pranab">
        <div id="owl-brand" className="owl-carousel owl-theme">  	
 
<div className="item">
<img src="images/brand-icon1.png" className="img-fluid"/>
</div>
<div className="item">
<img src="images/brand-icon2.png" className="img-fluid"/>
</div>
<div className="item">
<img src="images/brand-icon3.png" className="img-fluid"/>
</div>
<div className="item">
<img src="images/brand-icon4.png" className="img-fluid"/>
</div>
<div className="item">
<img src="images/brand-icon1.png" className="img-fluid"/>
</div>
<div className="item">
<img src="images/brand-icon2.png" className="img-fluid"/>
</div>
<div className="item">
<img src="images/brand-icon3.png" className="img-fluid"/>
</div>
<div className="item">
<img src="images/brand-icon4.png" className="img-fluid"/>
</div>
</div>
    </div>
	</div>

	</div>
	  
	  </div>
	</section>
	

    </>
  );
};

export default Section;
