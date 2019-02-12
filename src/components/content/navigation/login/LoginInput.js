import React, { Component } from 'react';
import './LoginInput.css';
import NAVER_LOGIN from '../../../../assets/images/naver.svg';
import FACEBOOK_LOGIN from '../../../../assets/images/facebook.svg';
import KAKAO_LOGIN from '../../../../assets/images/kakao.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../../../actions';

class LoginInput extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            keepLogin: true,
            saveId: true
        }
    }


    handleEmailChange = (e) => {
        const {value} = e.target;
        this.setState({
            email: value
        });
    }

    handlePwChange = (e) => {
        const {value} = e.target;
        this.setState({
            password: value
        });
    }

    handleCheck = (e) => {
        const target = e.target;
        const value = target.checked;
        let option;
        if (value === true) {
            option = window.confirm("자동 로그인을 사용하시면 다음부터 아이디와 비밀번호를 입력하지 않으셔도 됩니다.\n\n컴퓨터 등에서는 개인정보가 유출될 수 있으니 사용을 자제하여 주십시오.\n\n자동로그인을 사용하시겠습니까? ");
        }
        if(option === true) {
            target.checked = true;
            this.setState({
                keepLogin: target.checked
            });

        } else if(option === false) {
            target.checked = false;
            this.setState({
                keepLogin: target.checked
            });
        }
    }

    handleLoginClick = (e) => {

        const { handleLogin } = this.props;
        if(this.state.email === '' || this.state.password === '') {
            alert('이메일 또는 비밀번호를 입력해주세요.');
            return;
        }

        if(this.state.keepLogin === true) {
            axios({
                method: 'post',
                url: process.env.API_URL + '/api/auth/login', 
                data: {
                    email: this.state.email,
                    password: this.state.password    
                }
            })
            .then((res) => {
                if('error' in res.data) {
                    alert('이메일 또는 비밀번호를 확인해주세요.');
                    console.log(res.error);
                    this.setState({
                        email: '',
                        password: ''
                    });
                    return;
                }

                localStorage.setItem("loginToken", res.data.token)
                if('token' in res.data) {
                    handleLogin(res.data.token);
                }
            }).catch((err) => {
                alert('유효하지 않은 로그인입니다.');
                console.log(err);
                this.setState({
                    email: '',
                    passowrd: ''
                });
                return;
            });
        } else if (this.state.keepLogin === false) {
            axios({
                method: 'post',
                url: process.env.API_URL + '/api/auth/login', 
                data: {
                    email: this.state.email,
                    password: this.state.password    
                }
            })
            .then((res) => {
                if('error' in res.data) {
                    alert('이메일 또는 비밀번호를 확인해주세요.');
                    console.log(res.error);
                    this.setState({
                        email: '',
                        password: ''
                    });
                    return;
                }
                if('token' in res.data) {
                    handleLogin(res.data.token);
                }
            }).catch((err) => {
                alert('유효하지 않은 로그인입니다.');
                console.log(err);
                this.setState({
                    email: '',
                    passowrd: ''
                });
                return;
            });
        }
    }

    render() {
        const {
            handleEmailChange,
            handlePwChange,
            handleCheck,
            handleLoginClick
        } = this;

        return (
            <div className="logininput-login-part">
                <div className="logininput-id">
                    <input type="text" placeholder="아이디를 입력하세요." onChange={handleEmailChange}/>
                </div>
                <div className="logininput-password">
                    <input type="password" placeholder="비밀번호를 입력하세요." onChange={handlePwChange}/>
                </div>
                <div>
                    <div className="logininput-login-options">
                        <div className="logininput-keep-login-box">
                            <input type="checkbox" id="keep" onClick={handleCheck}/>
                        </div>
                        <label htmlFor="keep" className="logininput-keep-login-text">
                            로그인 유지
                        </label>
                    </div>
                    <div className="logininput-login-options">
                        <div className="logininput-save-id-box">
                            <input type="checkbox" id="save"/>
                        </div>
                        <label htmlFor="save" className="logininput-save-id-text">
                            아이디 저장
                        </label>
                    </div>
                </div>
                <div className="logininput-buttons">
                    <button type="button" className="logininput-login-button" onClick={handleLoginClick}>로그인</button>
                </div>
                <div className="logininput-password-and-join">
                    <Link to="/login/findpassword">
                        <span className="logininput-find-password">비밀번호 찾기</span>
                    </Link>
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

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => {
    return ({
        storeInfo: (info) => {
            return dispatch(actions.storeInfo());
        },
        handleLogin: (token) => {
            return dispatch(actions.login(token));
        }
    });
};


export default connect(mapStateToProps, mapDispatchToProps)(LoginInput);