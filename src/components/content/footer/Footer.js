import React from 'react';
import './Footer.css';
// import MOMGUIDE_LOGO_WHITE from '../../../assets/images/MOMGUIDE_LOGO_WHITE.png';



export const Footer = ()=>{
    return(
        <div className="footer_container">
             {/* <h1>footer</h1> */}
            <div className="container-fluid bg">
                <div className="footer">
                    <div className="row">
                        <div className="col-md-6 footer-col">
                            <div className="logofooter">
                                <img className="img-responsive dim" alt="" src={require('../../../assets/images/MOMGUIDE_LOGO_WHITE.png')} />
                            </div>
                            <p className="footer_para"><span>사업자 정보<b> |</b></span>
                                <span>이용약관 <b> | </b></span>      
                                <span>개인정보취급방침 <b></b></span>
                            </p>
                            <p className="footer_para-heading">
                                주(인포그린) | 대표자 : 구진산 | 개인정보보호책임자 : 우영기 | 사업자등록번호 : 000-00-00000
                                통신판매 신고번호 : 제 2016 -경기성남-0000호 | 건강기능식품판매 : 제 2000-0000000 호 | 의료기기판매 : 제 0000-0000000-00000
                            </p>
    
                            <p className="footer_para-heading">Copyrights @INFOGREENC Inc. All rights reserved.</p>
    
          
                        </div>
       
       
                        <div className="col-md-6 text-center footer-col">
          
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
        </div>
    );

}