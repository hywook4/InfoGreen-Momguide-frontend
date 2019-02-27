import React, { Component } from 'react';
import './Header.css';
import MOMGUIDE_LOGO_WHITE from '../../../assets/images/MOMGUIDE_LOGO_WHITE.png';
import USER_ALARM from '../../../assets/images/alarm_on.png';
import * as actions from '../../../actions/index';

import { Link } from "react-router-dom";
import { connect } from 'react-redux';

class Header extends Component {
    render() {
        const isUserNick = (this.props.userNickName === undefined) || (this.props.userNickName === null);
        console.log(isUserNick);
        const loginTab =
            ((localStorage.getItem('loginToken') === null) && (sessionStorage.getItem('loginToken') === null) && isUserNick ? 
                (<div className="header-signup-and-login">
                    <li className="nav-item active">
                        <Link to="/login" className="nav-link">로그인</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/signup" className="nav-link">가입하기</Link>
                    </li>
                </div>) :
                (<div className="profile-tab">
                    <li className="header-user-profile">
                        <img src={this.props.userPhotoUrl} alt="" id="header-profile" />
                    </li>
                    <li className="header-user-nickname">
                        {this.props.userNickName}
                    </li>
                    <li className="header-user-alarm">
                        <img src={USER_ALARM} alt="" id="header-alarm" />
                    </li>
                </div>
            ));
        return(
            <div className="navbar header">
            <div className="navbar_container">
                <div className="navbar-inner">
                    <Link to="/">
                        <img src={MOMGUIDE_LOGO_WHITE} alt=""/>
                    </Link>
                </div>
                <div className="navbar_router">
                    <ul className="navbar_left">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">홈</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/category" className="nav-link">카테고리</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/tips" className="nav-link">꿀팁</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/events" className="nav-link">이벤트</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/request/loggedin" className="nav-link">문의하기</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link">서비스소개</Link>
                        </li>
                        
                    </ul>
                    <ul className="navbar_right">
                        <li className="navbar_search">
                            <input type="text" placeholder="검색하기" onFocus={function () {window.location.replace("/category");}}/>
                            <i className="fa fa-search" aria-hidden="true" />
                        </li>
                        {loginTab}
                    </ul>
                </div>
            </div>
            </div>
        )
        
    }
}

const mapStateToProps = (state) => {
    return({
        userNickName: state.auth.userNickName,
        userPhotoUrl: state.auth.userPhoto,
        isLogin: state.auth.isLogin
    });
};

const mapDispatchToProps = (dispatch) => {
    return({
        handleLogout: () => {
            return dispatch(actions.logout())
        }
    })
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);