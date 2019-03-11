import React from 'react';
import '../../../../node_modules/react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import './Slider.css';
import {Link} from 'react-router-dom';

export const Slider = ()=>{
    return (
        <div className="slider main-banner-slider-container">
            <div className="slider-inner">
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" data-interval="4000">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        {/*<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>*/}
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active main-banner-slider">
                            <Link to="/request/contact-us">
                                <img src="https://s3.ap-northeast-2.amazonaws.com/infogreenmomguide/mainpage-banner/banner-1.jpg" className="d-block w-100" alt="First Slide" />
                            </Link>
                        </div> 
                        {/*<div className="carousel-item main-banner-slider">
                            <Link to="/request/contact-us">
                                <img src="https://s3.ap-northeast-2.amazonaws.com/infogreenmomguide/mainpage-banner/banner-1.jpg" className="d-block w-100" alt="Second Slide" />
                            </Link>
                        </div> 
                        <div className="carousel-item main-banner-slider">
                            <Link to="/request/contact-us">
                                <img src="https://s3.ap-northeast-2.amazonaws.com/infogreenmomguide/mainpage-banner/banner-1.jpg" className="d-block w-100" alt="Third Slide" />
                            </Link>
                        </div>*/} 
                    </div>    
                
                    <a href="#carouselExampleIndicators" className="carousel-control-prev" role="button" data-slide="prev">
                        <span carousel="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a href="#carouselExampleIndicators" className="carousel-control-next" role="button" data-slide="next">
                        <span carousel="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>    

            </div>   
        </div>    
 
       
    );

};