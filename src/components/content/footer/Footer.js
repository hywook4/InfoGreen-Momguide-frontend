import React from 'react';
import './Footer.css';
// import MOMGUIDE_LOGO_WHITE from '../../../assets/images/MOMGUIDE_LOGO_WHITE.png';



export const Footer = ()=>{
    return(
        <div className="footer_container">
             {/* <h1>footer</h1> */}
            
            <div className="footer">
                <div className="row">
                    <div className="col-md-8 footer-col">
                        <div className="logofooter">
                            <img className="img-responsive dim" alt="" src={require('../../../assets/images/MOMGUIDE_LOGO_WHITE.png')} />
                        </div>
                        <p className="footer_para"><span>사업자 정보<b> |</b></span>
                            <span>이용약관 <b> | </b></span>      
                            <span>개인정보취급방침 <b></b></span>
                        </p>
                        <p className="footer_para-heading">
                            주식회사 인포그린 | 대표자 : 구진산 | 주소 : 서울특별시 서대문구 연세로50, 연세대학교 공학원 212B-1 <br/>
                            사업자등록번호: 327-87-01114 | 대표번호: 070-5056-2592 | 문의: help@momguide.co.kr
                        </p>
    
                        <p className="footer_para-heading">Copyrights @INFOGREENC Inc. All rights reserved.</p>
    
                    </div>
       
       
                    <div className="col-md-4 text-center footer-col">
          
                            {/* <ul className="footer-social pull-right tobottom">
                            <li><i className="fa fa-facebook social-icon facebook" aria-hidden="true"></i></li> 
                                <li><i className="fa fa-linkedin social-icon linked-in" aria-hidden="true"></i></li>
                        
                                <li><i className="fa fa-twitter social-icon twitter" aria-hidden="true"></i></li>
                            </ul> */}
                        <ul className="social-network social-circle  pull-right tobottom">
                            <li><a href="http://facebook.com" rel="noopener noreferrer" target="_blank" className="icoFacebook" title="Facebook"><i className="fa fa-facebook"></i></a></li>
                            <li><a href="http://instagram.com" rel="noopener noreferrer" target="_blank" className="icoInstagram" title="Instagram"><i className="fa fa-instagram"></i></a></li>
                            <li><a href="http://google.com" rel="noopener noreferrer" target="_blank" className="icoGoogle" title="Google +"><i className="fa fa-newspaper-o"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );

}