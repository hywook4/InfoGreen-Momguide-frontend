import React from 'react';
import './Footer.css';
import {Link} from 'react-router-dom';


class Footer extends React.Component {

    render() {
        return(
            <div className="footer_container">
                {/* <h1>footer</h1> */}
                
                <div className="footer">
                    <div className="row">
                        <div className="col-md-8 footer-col">
                            <div className="logofooter">
                                <img className="img-responsive dim" alt="" src={require('../../../assets/images/MOMGUIDE_LOGO_WHITE.png')} />
                            </div>
                            <p className="footer_para">
                                <span>사업자 정보<b> |</b></span>     
                                <Link to="/license"><span>이용약관 <b> | </b></span></Link>   
                                <Link to="/personal-info"><span>개인정보취급방침 <b></b></span></Link>
                            </p>
                            <p className="footer_para-heading">
                                주식회사 인포그린 | 대표자 : 구진산 | 주소 : 서울특별시 서대문구 연세로50, 연세대학교 공학원 212B-1 <br/>
                                사업자등록번호: 327-87-01114 | 대표번호: 070-5056-2592 | 문의: help@momguide.co.kr
                            </p>
        
                            <p className="footer_para-heading">Copyrights @INFOGREENC Inc. All rights reserved.</p>
        
                        </div>
        
                        <div className="col-md-4 text-center footer-col">
                            <ul className="social-network social-circle  pull-right tobottom">
                                <li><a href="https://www.facebook.com/momguide/" rel="noopener noreferrer" target="_blank" title="Facebook">
                                    <img src={require('../../../assets/images/common_icons/facebook.png')} className='footer-url-icon' alt='facebook'/>
                                </a></li>
                                <li><a href="https://www.instagram.com/momguideofficial/" rel="noopener noreferrer" target="_blank" title="Instagram">
                                    <img src={require('../../../assets/images/common_icons/instagram.png')} className='footer-url-icon' alt='instagram'/>
                                </a></li>
                                <li><a href="https://post.naver.com/momguideofficial/" rel="noopener noreferrer" target="_blank" title="naver blog">
                                    <img src={require('../../../assets/images/common_icons/naverblog.png')} className='footer-url-icon' alt='naver'/>
                                </a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
