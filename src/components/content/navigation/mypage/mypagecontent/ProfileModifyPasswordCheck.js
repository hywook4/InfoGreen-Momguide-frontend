import React from 'react';
import './ProfileModifyPasswordCheck.css';
import axios from 'axios';
import history from '../../../../../history/history';
import { TokenUtil } from '../../../../../util';

export class ProfileModifyPasswordCheck extends React.Component{
    state = {
        nickname: '',
        password: ''
    };

    componentDidMount = async () => {
        const token = TokenUtil.getLoginToken();
        if(token === null) {
            alert('올바르지 않은 접근입니다.');
            history.push('/');
            return;
        }
        const headers = TokenUtil.getTokenRequestHeader(token);
        const res = await axios({
            method: 'get',
            url: `${process.env.API_URL}/api/auth/info`,
            headers: headers
        });
        this.setState({
            nickname: res.data.nickName
        });
    };

    redirectToProfileModify = async () => {
        const token = TokenUtil.getLoginToken();
        const headers = TokenUtil.getTokenRequestHeader(token);

        try {
            await axios({
                method: 'get',
                url: `${process.env.API_URL}/api/auth/editProfile/checkPassword?password=${this.state.password}`,
                headers: headers
            });
            history.push({
                pathname: '/mypage/profile-modify',
                state: {
                    authentication: true
                }
            })
        } catch(e) {
            alert('비밀번호가 틀렸습니다.');
        }
    };

    render() {
        return (
            <div className="profile-modify-password-check-container">
                <h5>{this.state.nickname} 님의 개인정보 보호를 위해 비밀번호를 다시 입력해주세요.</h5>
                <input
                    type="password"
                    value={this.state.password}
                    onChange={(e)=>{this.setState({password: e.target.value})}}
                    onKeyPress={(e)=>(e.key==='Enter'?this.redirectToProfileModify():null)}
                    placeholder="비밀번호를 입력하세요."
                />
                <br />
                <button
                    onClick={()=>this.redirectToProfileModify()}
                >
                    입력
                </button>
            </div>
        );
    }
}
