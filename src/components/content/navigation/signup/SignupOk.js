import React from 'react';
import { Link } from 'react-router-dom';
import './SignupOk.css';

export const SignupOk = (props) => {
    const email = props.location.state ? props.location.state.email : '';
    return (
        <div className="signup-ok-container">
            <div className="signup-ok-banner">
                <div className="signup-ok-banner-text">
                    회원가입
                </div>
            </div>
            <h1>회원가입이 완료되었습니다.</h1>
            <div className="signup-ok-detail">
                회원님의 가입 이메일은 <br/>
                <span>{email}</span> 입니다.
            </div>
            <Link to="/login">
                <button className="signup-ok-button">
                    로그인
                </button>
            </Link>
        </div>
    );
};
