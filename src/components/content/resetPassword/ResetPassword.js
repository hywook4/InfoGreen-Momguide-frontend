import React, { Component } from 'react';
import CONCEPT_BANNER from '../../../assets/images/banner.png';
import queryString from 'query-string';
import './ResetPassword.css';
import {TokenUtil} from '../../../util';
import axios from 'axios';
import history from '../../../history/history';

export class ResetPassword extends Component {
    constructor(props) {
        super(props);

        let headers = null;

        let token = TokenUtil.getLoginToken();
        if(token === null){
            token = this.getQueryString();
            headers = {
                Authorization: `Bearer ${token}`
            }
        } else{
            headers = TokenUtil.getTokenRequestHeader(token);
        }

        this.state = {
                newPassword: '',
                newPasswordCheck: '',
                token: token,
                headers: headers
        }

        // if logged in or get email verified 
        if(token){
            
        } else{
            alert("접근 권한이 없습니다.");
            history.push('/');
        }
    }

    getQueryString = () => {
        const value = queryString.parse(this.props.location.search);
        console.log(value.token);
        return value.token;
    }

    changeNewPassword = (e) => {
        const value = e.target.value;
        this.setState({
            newPassword: value
        });
    };

    changeNewPasswordCheck = (e) => {
        const value = e.target.value;
        this.setState({
            newPasswordCheck: value
        });
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
        if(this.state.token){
            if(this.state.newPassword === '' || this.state.newPasswordCheck === '') {
                alert('새로운 비밀번호를 입력해주세요.');
                return;
            }

            axios({
                method: 'put',
                url: process.env.API_URL + '/api/auth/editProfile/resetPassword',
                headers: this.state.headers,
                data: {
                    password: this.state.newPassword
                }
            }).then(()=>{
                alert('비밀번호가 성공적으로 변경되었습니다.');
                history.push('/');
            }).catch((err)=>{
                alert('알 수 없는 오류가 발생했습니다. 관리자에게 문의해 주시기 바랍니다.');
            })

        }else{
            alert("비정상적인 접근입니다.");
        }
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