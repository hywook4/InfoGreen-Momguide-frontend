import React, { Component } from 'react';
import CONCEPT_BANNER from '../../../assets/images/banner.png';
import queryString from 'query-string';
import './ResetPassword.css';
import axios from 'axios';
import history from '../../../history/history';

export class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newPassword: '',
            newPasswordCheck: ''
        }
    }

    getQueryString = () => {
        const value = queryString.parse(this.props.location.search);
        return value.token;
    }

    changeNewPassword = (e) => {
        const value = e.target.value;
        this.setState({
            newPassword: value
        });
        console.log(this.state.newPassword);
    };

    changeNewPasswordCheck = (e) => {
        const value = e.target.value;
        this.setState({
            newPasswordCheck: value
        });
        console.log(this.state.newPasswordCheck);
    };

    passwordCompare = () => {
        const {newPassword, newPasswordCheck} = this.state;
        if(newPassword !== '' && newPasswordCheck !== '' && newPassword !== newPasswordCheck) {
            return 'diff';
        }
        if(newPassword === '' || newPasswordCheck === '') {
            return '';
        }
        return 'same';
    };

    handleSubmitClick = (e) => {
        if(this.state.newPassword === '' || this.state.newPasswordCheck === '') {
            alert('새로운 비밀번호를 입력해주세요.');
            return;
        }
        axios({
            method: 'put',
            url: process.env.API_URL + '/api/auth/editProfile/resetPassword',
            headers: {Authorization: 'Bearer ' + this.getQueryString()},
            data: {
                password: this.state.newPassword
            }
        })
        .then(() => {
            history.push('/');
        })
        .catch((err) => {
            alert('알 수 없는 오류가 발생했습니다. 관리자에게 문의해 주시기 바랍니다.');
        })

    }

    render() {
        const {
            changeNewPassword,
            changeNewPasswordCheck,
            handleSubmitClick
        } = this;

        return (
            <div className="resetpassword-container">
                <img src={CONCEPT_BANNER} alt="" className="resetpassword-banner"></img>
                <div className="resetpassword-text">
                    비밀번호 재설정
                </div>
                <div className="resetpassword-new-password">
                    <span className="resetpassword-new-password-text">새로운 비밀번호</span>
                    <span className="resetpassword-new-password-condition">&nbsp;&nbsp;|&nbsp;&nbsp;6~15자의 영문, 숫자 조합으로 입력해 주세요.</span>
                </div>
                <div className={"resetpassword-input-box " + this.passwordCompare()}>
                    <input type="password" placeholder="비밀번호를 입력하세요." className="resetpassword-new-password-input" onChange={changeNewPassword}/>
                </div>
                <div className="resetpassword-password-check">
                    새로운 확인 비밀번호
                </div>
                <div className={"resetpassword-input-box " + this.passwordCompare()}>
                    <input type="password" placeholder="비밀번호를 입력하세요." className="resetpassword-new-password-input" onChange={changeNewPasswordCheck}/>
                </div>
                {
                    (this.passwordCompare()!=='') ?
                        (<div className={`resetpassword-message-container ${this.passwordCompare()}`}>
                            {this.passwordCompare() === 'same' ? '확인되었습니다.' : '비밀번호가 일치하지 않습니다.'}
                        </div>) :
                        null
                }
                <div className="resetpassword-button">
                    <button type="button" className="resetpassword-submit" onClick={handleSubmitClick}>설정</button>
                </div>
                
            </div>
        );
    }
}