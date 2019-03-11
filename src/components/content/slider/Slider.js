import React from 'react';
import '../../../../node_modules/react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import './Slider.css';
import axios from 'axios';


export class Slider extends React.Component {

    state = {
        sliders: []
    }
    componentDidMount = () => {
    
        axios.get(`${process.env.API_URL}/api/main/slider`)
        .then((res) => {
            this.setState({
                sliders: res.data
            })
        });
    }

    render() {
    

        return (
            <div className="slider main-banner-slider-container">
                <div className="slider-inner">
                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" data-interval="4000">
                        <ol className="carousel-indicators">
                            {
                                this.state.sliders.map((d, i) => {
                                    return (
                                        <li data-target="#carouselExampleIndicators" data-slide-to={i} className={i === 0 ? "active" : ""} key={i}></li>
                                    )
                                })
                            }
                           
                        </ol>
                        <div className="carousel-inner">
                            {
                                this.state.sliders.map((d, i) => {
                                    return(
                                        <div className={`carousel-item main-banner-slider ${i === 0 ? "active" : ""}`} key={i}>
                                            <a href={d.linkUrl} target="_blank" rel="noopener noreferrer">
                                                <img src={d.imageUrl} className="d-block w-100" alt={`Slide ${d.index}`} />
                                            </a>
                                        </div> 
                                    )
                                })
                            }

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
        )
    }
}