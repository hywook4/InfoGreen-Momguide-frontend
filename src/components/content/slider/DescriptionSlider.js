import React from 'react';
import {Slider} from "react-slick";
import './DescriptionSlider.css';
import '../../common/staticCard/StaticCard';
import OwlCarousel from 'react-owl-carousel';
import '../../../../node_modules/owl.carousel/dist/assets/owl.carousel.css';
import '../../../../node_modules/owl.carousel/dist/assets/owl.theme.default.css';
// import 'react-owl-carousel2/style.css';
import {StaticCardSlider} from "../../common/staticCard/StaticCardSlider";
const options = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  items: 4,
};

export class DescriptionSlider extends React.Component {
  render() {
     
    return (
      <div className="tips-cover-container">
        
        {/* <Slider {...settings}>
          <div>
            <StaticCardSlider />
          </div>
          <div>
          <StaticCardSlider />
          </div>
          <div>
          <StaticCardSlider />
          </div>
          <div>
          <StaticCardSlider />
          </div>
          <div>
          <StaticCardSlider />
          </div>
          <div>
          <StaticCardSlider />
          </div>
         
        </Slider> */}
        <div className="container">
            <div className="card-title">
                    <i className="fa fa-heart slider-heading-icon" aria-hidden="true"></i>
                    <h5 className="slider-heading">Title</h5>
            </div>
          <OwlCarousel className="owl-theme" loop margin={40} nav >
            <div className="item">
                <div>
                  <div className="card-inr-div">
                    <div className="card-title">
                    <i className="fa fa-heart tip-card-hrt" aria-hidden="true"></i>
                      <h5 className="tip-card-inr-h5">Title</h5>
                    </div>
                    <div className="card-img-div">
                      <div className="card-img-inr-div">
                        <img className="img-fluid" src={require('../../../assets/images/tips.jpg')} alt=""/>
                      </div>
                      <div className="card-tip-info">
                        <div className="card-tip-heading">
                          <h4 className="tip-slider-desp-h4">Tips card</h4>
                            <p className="tip-slider-desp-p">Tips card Information</p>
                        </div>
                      </div>
                    </div>
              
                  </div>
              
                </div>
                {/* <img src={require('../../../assets/images/product1.png')}/> */}
            </div>
            <div class="item">
            <div>
                  <div className="card-inr-div">
                    <div className="card-title">
                      <i className="fa fa-heart tip-card-hrt" aria-hidden="true"></i>
                      <h5 className="tip-card-inr-h5">Title</h5>
                    </div>
                    <div className="card-img-div">
                      <div className="card-img-inr-div">
                        <img className="img-fluid" src={require('../../../assets/images/product1.png')} alt=""/>
                      </div>
                      <div className="card-tip-info">
                        <div className="card-tip-heading">
                          <h4 className="tip-slider-desp-h4">Tips card</h4>
                            <p className="tip-slider-desp-p">Tips card Information</p>
                        </div>
                      </div>
                    </div>
              
                  </div>
              
                </div>
            
                {/* <img src={require('../../../assets/images/tips.jpg')}/> */}
            </div>
            <div class="item">
            <div>
                  <div className="card-inr-div">
                    <div className="card-title">
                      <i className="fa fa-heart tip-card-hrt" aria-hidden="true"></i>
                      <h5 className="tip-card-inr-h5">Title</h5>
                    </div>
                    <div className="card-img-div">
                      <div className="card-img-inr-div">
                        <img className="img-fluid" src={require('../../../assets/images/product1.png')} alt=""/>
                      </div>
                      <div className="card-tip-info">
                        <div className="card-tip-heading">
                          <h4 className="tip-slider-desp-h4">Tips card</h4>
                            <p className="tip-slider-desp-p">Tips card Information</p>
                        </div>
                      </div>
                    </div>
              
                  </div>
              
                </div>
            {/* <img src={require('../../../assets/images/product1.png')}/> */}
            </div>
            <div class="item">
            <div>
                  <div className="card-inr-div">
                    <div className="card-title">
                      <i className="fa fa-heart tip-card-hrt" aria-hidden="true"></i>
                      <h5 className="tip-card-inr-h5">Title</h5>
                    </div>
                    <div className="card-img-div">
                      <div className="card-img-inr-div">
                        <img className="img-fluid" src={require('../../../assets/images/tips.jpg')} alt=""/>
                      </div>
                      <div className="card-tip-info">
                        <div className="card-tip-heading">
                          <h4 className="tip-slider-desp-h4">Tips card</h4>
                            <p className="tip-slider-desp-p">Tips card Information</p>
                        </div>
                      </div>
                    </div>
              
                  </div>
              
                </div>
            {/* <img src={require('../../../assets/images/tips.jpg')}/> */}
            </div>
            <div class="item">
            <div>
                  <div className="card-inr-div">
                    <div className="card-title">
                      <i className="fa fa-heart tip-card-hrt" aria-hidden="true"></i>
                      <h5 className="tip-card-inr-h5">Title</h5>
                    </div>
                    <div className="card-img-div">
                      <div className="card-img-inr-div">
                        <img className="img-fluid" src={require('../../../assets/images/product1.png')} alt=""/>
                      </div>
                      <div className="card-tip-info">
                        <div className="card-tip-heading">
                          <h4 className="tip-slider-desp-h4">Tips card</h4>
                            <p className="tip-slider-desp-p">Tips card Information</p>
                        </div>
                      </div>
                    </div>
              
                  </div>
              
                </div>
            {/* <img src={require('../../../assets/images/product1.png')}/> */}
            </div>
        </OwlCarousel>
        </div>
      </div>
    );
  }
}