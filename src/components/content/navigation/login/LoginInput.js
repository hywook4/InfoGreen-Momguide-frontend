import React, { Component } from 'react';
import './LoginInput.css';
import NAVER_LOGIN from '../../../../assets/images/naver.svg';
import FACEBOOK_LOGIN from '../../../../assets/images/facebook.svg';
import KAKAO_LOGIN from '../../../../assets/images/kakao.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../../../actions';
import history from '../../../../history/history';
import $ from 'jquery';

class LoginInput extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: localStorage.getItem('userEmail'),
            password: '',
            keepLogin: false,
            saveId: localStorage.getItem('userEmail') ? true : false
        }
    }

    handleEmailChange = (e) => {
        const {value} = e.target;
        this.setState({
            email: value
        });
    };

    handlePwChange = (e) => {
        const {value} = e.target;
        this.setState({
            password: value
        });
    };

    handleKeepLoginCheck = (e) => {
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
    };
    
    handleSaveEmailCheck = (e) => {
        const value = e.target.checked;
        this.setState({
            saveId: value
        });
    };

    handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            this.handleLoginClick();
        }
    }

    handleLoginClick = (e) => {

        const { handleLogin } = this.props;
        if(this.state.email === '' || this.state.password === '') {
            alert('이메일 또는 비밀번호를 입력해주세요.');
            return;
        }

        axios({
            method: 'post',
            url: process.env.API_URL + '/api/auth/login', 
            data: {
                email: this.state.email,
                password: this.state.password    
            }
        })
        .then((res) => {
            if (this.state.keepLogin === true) {
                localStorage.setItem('loginToken', res.data.token);
                sessionStorage.removeItem('loginToken');
            }
            else if(this.state.keepLogin === false) {
                sessionStorage.setItem('loginToken', res.data.token);
                localStorage.removeItem('loginToken');
            }
            //아이디 저장 on
            if(this.state.saveId === true) {
                localStorage.setItem('userEmail', this.state.email);
            } else if(this.state.saveId === false) {
                localStorage.setItem('userEmail', '');
            }

            if('token' in res.data) {
                if(this.props.modalId) {
                    $(`#${this.props.modalId}`).modal('hide');
                }
                handleLogin(res.data.token);
                history.push(this.props.nextPath);
            }
        })
        .catch((err) => {
            if(err.response.status === 400) {
                alert('이메일과 비밀번호를 입력해주세요.');
                return;
            } else if(err.response.status === 424) {
                if (err.response.data.error === 'no member') {
                    alert('없는 계정입니다. 이메일을 다시 확인해주세요.');
                    return;
                } else {
                    alert('알 수 없는 에러가 발생했습니다. 관리자에게 문의해 주시기 바랍니다.');
                }
            } else if (err.response.status === 403) {
                alert('비밀번호를 다시 확인해주세요.');
                return;
            }
        });
    }

    render() {
        console.log(this.state.saveId);
        if(this.props.isLogin) {
            history.push('/');
        }
        //emailDefalut 설정
        let emailDefault = '';
        if(typeof localStorage.getItem('userEmail') !== undefined || localStorage.getItem('userEmail') !== '') {
            emailDefault = localStorage.getItem('userEmail');
            
        }
        const {
            handleEmailChange,
            handlePwChange,
            handleKeepLoginCheck,
            handleLoginClick,
            handleSaveEmailCheck,
            handleKeyPress
        } = this;

        return (
            <div className="logininput-login-part">
                <div className="logininput-id" >
                    <input id="emailinput" type="text" defaultValue={emailDefault} className="logininput-input"
                           placeholder="아이디를 입력하세요." onChange={handleEmailChange} onKeyPress={handleKeyPress}/>
                </div>
                <div className="logininput-password">
                    <input type="password" placeholder="비밀번호를 입력하세요." className="logininput-input"
                           onChange={handlePwChange} onKeyPress={handleKeyPress}/>
                </div>
                <div>
                    <div className="logininput-login-options">
                        <div className="logininput-keep-login-box">
                            <input type="checkbox" id="keep" onClick={handleKeepLoginCheck}/>
                        </div>
                        <label htmlFor="keep" className="logininput-keep-login-text">
                            로그인 유지
                        </label>
                    </div>
                    <div className="logininput-login-options">
                        <div className="logininput-save-id-box">
                            <input type="checkbox" id="save" defaultChecked={this.state.saveId} onClick={handleSaveEmailCheck}/>
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

const mapStateToProps = (state) => {
    return ({
        isLogin: state.auth.isLogin
    })
};

const mapDispatchToProps = (dispatch) => {
    return ({
        handleLogin: (token) => {
            return dispatch(actions.login(token));
        }
    });
};


export default connect(mapStateToProps, mapDispatchToProps)(LoginInput);