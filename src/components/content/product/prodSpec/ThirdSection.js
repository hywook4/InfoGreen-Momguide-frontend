import React from 'react';
import './ProdSpec.css';
import {RatingRow} from './Ratings';

export const ThirdSection = (props)=>{
    return(
        <div className="col-md-12" style={{paddingTop:'40px',paddingBottom:'40px',paddingRight:'150px',paddingLeft:'150px'}}>
            <div className="row" style={{marginLeft:'150px'}}>
            <div className="row col-md-12">
                <h3 style={{color:'#666666',marginBottom:30,fontSize:'18px'}}>
                    <i style={{fontSize:'18px',color:'#b3b3b3',marginRight:10}} className="fa fa-heart"></i> 
                    베스트 리뷰
                </h3>
            </div>
            <div className="col-md-4 row">
                <i className="fa fa-user-circle-o userInsignia"></i>
                <span style={{textAlign:'center',display:'inline-block',lineHeight:'18px',paddingTop:'10px',borderRight:'2px solid grey',marginRight:15,paddingRight:15}}>
                    <b style={{fontSize:'18px'}}>홍길동</b><br/>
                    <span style={{fontSize:'10px',color:'#666666'}}>남자 / 30대</span>
                </span> 
                <span style={{display:'inline-block',lineHeight:'18px',paddingTop:'10px'}}>
                    자녀<br/>
                    <span style={{fontSize:'10px',color:'#666666'}}>사용기간</span>
                </span> 
                <span style={{marginLeft:5,textAlign:'center',display:'inline-block',lineHeight:'18px',paddingTop:'10px'}}>
                    3~5살<br/>
                    <span style={{fontSize:'10px',color:'#666666'}}>1년이상</span>
                </span>    
                    
            </div>
            <div className="col-md-12" style={{marginBottom:'10px'}}>&nbsp;</div>
                <div className="col-md-5 row">
                    <RatingRow config={{selected:3,text:'기능력',hideSubHeading:true}} />
                    <RatingRow config={{selected:4,text:'자극성',hideSubHeading:true}} />
                    <RatingRow config={{selected:5,text:'제품향',hideSubHeading:true}} />
                    <RatingRow config={{selected:2,text:'가성비',hideSubHeading:true}} />
                </div>

                <div className="col-md-7 imageCollection-second">
                    <div style={{position:'relative'}}>
                        <div className="imageContent-100">
                                <img className="img-responsive" src="http://lorempixel.com/200/201/sports/" alt="sample"/>
                            </div>
                            <div className="imageContent-100">
                                <img className="img-responsive" src="http://lorempixel.com/200/202/sports/" alt="sample"/>
                            </div>
                            <div className="imageContent-100">
                                <img className="img-responsive" src="http://lorempixel.com/200/203/sports/" alt="sample"/>
                            </div>
                            <div className="imageContent-100">
                                <img className="img-responsive" src="http://lorempixel.com/200/204/sports/" alt="sample"/>
                            </div>
                            <div className="imageContent-100">
                                <img className="img-responsive" src="http://lorempixel.com/200/205/sports/" alt="sample"/>
                                <div className="overlayBox">
                                    <h3>3</h3>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>)
}