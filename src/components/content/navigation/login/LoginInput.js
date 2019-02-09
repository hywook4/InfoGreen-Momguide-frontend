import React, { Component } from 'react';
import './LoginInput.css';
import NAVER_LOGIN from '../../../../assets/images/naver.svg';
import FACEBOOK_LOGIN from '../../../../assets/images/facebook.svg';
import KAKAO_LOGIN from '../../../../assets/images/kakao.svg';
import { Link } from 'react-router-dom';
class LoginInput extends Component {


    handleCheck = (e) => {
        const target = e.target;
        const value = target.checked;
        let option;
        if (value === true) {
            option = window.confirm("자동 로그인을 사용하시면 다음부터 아이디와 비밀번호를 입력하지 않으셔도 됩니다.\n\n컴퓨터 등에서는 개인정보가 유출될 수 있으니 사용을 자제하여 주십시오.\n\n자동로그인을 사용하시겠습니까? ");
        }
        if(option === true) {
            target.checked = true;
        } else if(option === false) {
            target.checked = false;
        }
    }

    render() {
        const {
            handleCheck,
        } = this;
        return (
            <div className="logininput-login-part">
                <div className="logininput-id">
                    <input type="text" placeholder="아이디를 입력하세요."/>
                </div>
                <div className="logininput-password">
                    <input type="password" placeholder="비밀번호를 입력하세요."/>
                </div>
                <div>
                    <div className="logininput-login-options">
                        <div className="logininput-keep-login-box">
                            <input type="checkbox" id="keep" onClick={handleCheck}/>
                        </div>
                        <label for="keep" className="logininput-keep-login-text">
                            로그인 유지
                        </label>
                    </div>
                    <div className="logininput-login-options">
                        <div className="logininput-save-id-box">
                            <input type="checkbox" id="save"/>
                        </div>
                        <label for="save" className="logininput-save-id-text">
                            아이디 저장
                        </label>
                    </div>
                </div>
                <div className="logininput-buttons">
                    <button type="button" className="logininput-login-button">로그인</button>
                </div>
                <div className="logininput-password-and-join">
                    <span className="logininput-find-password">비밀번호 찾기</span>
                    <Link to="/signup">
                        <span className="logininput-sign-up">회원가입</span>
                    </Link>
                </div>
                <div className="logininput-buttons">
                    <div className="logininput-other-login">
                        <img src={NAVER_LOGIN} alt="" className="logininput-images"></img>
                        <button type="button" className="logininput-login-naver">
                            네이버 아이디로 로그인
                        </button>
                    </div>                 
                </div>
                <div className="logininput-buttons">
                    <div className="logininput-other-login">
                        <img src={FACEBOOK_LOGIN} alt="" className="logininput-images"></img>
                        <button type="button" className="logininput-login-facebook">
                            페이스북 아이디로 로그인
                        </button>
                    </div>                  
                </div>
                <div className="logininput-buttons">
                    <div className="logininput-other-login">
                        <img src={KAKAO_LOGIN} alt="" className="logininput-images"></img>
                        <button type="button" className="logininput-login-kakao">
                            카카오 아이디로 로그인
                        </button>
                    </div>                  
                </div>
                <div className="logininput-buttons">
                    <div className="logininput-other-login">
                        <Link to="/signup">
                            <button type="button" className="logininput-email-signup">
                                E-mail로 회원가입
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginInput;