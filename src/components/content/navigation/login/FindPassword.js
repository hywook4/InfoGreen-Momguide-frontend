import React, { Component } from 'react';
import './FindPassword.css';
import CONCEPT_BANNER from '../../../../assets/images/banner.png';
import axios from 'axios';

export class FindPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: ''
        };
    }

    handleInputChange = (e) => {
        const { value } = e.target;
        this.setState({
            email: value
        });
    };

    handleButtonClick = (e) => {
        if(this.state.email === '') {
            alert('이메일을 입력해 주세요.');
            return;
        }
        axios({
            method: 'post',
            url: process.env.API_URL + '/api/auth/requestPassword',
            data: {
                email: this.state.email
            }
        })
    }
    render() {
        const {
            handleInputChange,
            handleButtonClick
        } = this;
        return (
            <div className="findpassword-container">
                <img src={CONCEPT_BANNER} alt=""></img>
                <div className="findpassword-text">
                    비밀번호 찾기
                </div>
                <div className="findpassword-info">
                    입력하신 메일 주소로 비밀번호 재설정 링크를 보내드립니다.
                </div>
                <div className="findpassword-email-input">
                    <input type="text" placeholder="&nbsp;&nbsp;&nbsp;&nbsp;이메일을 입력하세요." onChange={ handleInputChange } />
                </div>
                <div className="findpassword-email-submit" onClick={ handleButtonClick }>
                    <button type="button">입력</button>
                </div>
            </div>
        );
    }
}