import React from 'react';
import '../../../../node_modules/react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import './Slider.css';


export const Slider = ()=>{
    return (
        <div className="slider">
            <div className="slider-inner">
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" data-interval="4000">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={require('../../../assets/images/slider.svg')} className="d-block w-100" alt="First Slide" />
                        </div> 
                        
                        <div className="carousel-item">
                            <img src={require('../../../assets/images/slider.svg')} className="d-block w-100" alt="Second Slide"/>
                        </div> 
                        <div className="carousel-item">
                            <img src={require('../../../assets/images/slider.svg')} className="d-block w-100" alt="Third Slide"/>
                        </div> 
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