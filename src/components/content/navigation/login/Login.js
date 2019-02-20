import React from 'react';
import './Login.css';
import LOGIN_BANNER from '../../../../assets/images/banner.png';
import LoginInput from './LoginInput';

export class Login extends React.Component{
    render(){
        return(
            <div className="container">
                <div className="login-container">
                    <img src={LOGIN_BANNER} alt="" className="login-banner-image" />
                    <div className="login-info">
                        맘가이드 홈페이지를 방문해주셔서 감사합니다.<br />
                        로그인하시면 홈페이지를 보다 편리하게 이용하실 수 있습니다.
                    </div>
                    <LoginInput nextPath='/'/>
                </div>
            </div>
        )
    }
}