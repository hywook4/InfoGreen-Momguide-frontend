import React from 'react';
import './Header.css';
import MOMGUIDE_LOGO_WHITE from '../../../assets/images/MOMGUIDE_LOGO_WHITE.png';
 
import { Link} from "react-router-dom";

export const Header = ()=>{
    return(
        <div className="navbar header">
            <div className="navbar_container">
                <div className="navbar-inner">
                    <Link to="/">
                        <img src={MOMGUIDE_LOGO_WHITE} alt=""/>
                    </Link>
                    {/* <img src={ require('../../assets/images/MOMGUIDE_LOGO_WHITE.png') } /> */}
                </div>
                    <div className="navbar_router">
                        <ul>
                            <li className="nav-item active">
                                <Link to="/" className="nav-link">홈</Link>
                            </li>
                            <li className="nav-item active">
                                <Link to="/category" className="nav-link">카테고리</Link>
                            </li>
                            <li className="nav-item active">
                                <Link to="/tips" className="nav-link">꿀팁</Link>
                            </li>
                            <li className="nav-item active">
                                <Link to="/events" className="nav-link">이벤트</Link>
                            </li>
                            <li className="nav-item active">
                                <Link to="/request/loggedin" className="nav-link">문의하기</Link>
                            </li>
                            <li className="nav-item active">
                                <Link to="/about" className="nav-link">서비스소개</Link>
                            </li>
                        </ul>
                         <div className="navbar_search">
                            <input type="text" placeholder="검색하기" onFocus={function () {
                                window.location.replace("/category");
                            }}/>
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </div>
                        
                        <ul >
                            <li className="nav-item active">
                                <Link to="/signup" className="nav-link">가입하기</Link>
                            </li>
                            <li className="nav-item active">
                                <Link to="/request" className="nav-link">로그인</Link>
                            </li>
                        </ul>
                    </div>
            </div>

        </div>
 
    )

};