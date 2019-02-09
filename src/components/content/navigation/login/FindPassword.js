import React, { Component } from 'react';
import './FindPassword.css';
import CONCEPT_BANNER from '../../../../assets/images/banner.png';

export class FindPassword extends Component {
    render() {
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
                    <input type="text" placeholder="&nbsp;&nbsp;&nbsp;&nbsp;이메일을 입력하세요." />
                </div>
                <div className="findpassword-email-submit">
                    <button type="button">입력</button>
                </div>
            </div>
        );
    }
}