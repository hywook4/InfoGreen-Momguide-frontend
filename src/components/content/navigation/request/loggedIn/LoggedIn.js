import React from 'react';
import './LoggedIn.css';
import { TokenUtil } from '../../../../../util';
import axios from 'axios';
import history from '../../../../../history/history';
import $ from 'jquery';
import LoginInput from '../../login/LoginInput';

export class LoggedIn extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            loginView: false
        }
    }

    handleLogin = async (token) => {
        try {
            const data = await axios({
                method: 'get',
                headers: TokenUtil.getTokenRequestHeader(token),
                url: `${process.env.API_URL}/api/auth/info`
            });
            return data;
        } catch(err) {
            console.log(err);
            return null;
        }
    };

    handleLink = async (e) => {
        e.preventDefault();
        const nextPath = e.currentTarget.pathname;

        const token = TokenUtil.getLoginToken();
        if(token === null) {
            this.setState({
                loginView: true,
                nextPath: nextPath
            });
            return;
        }

        const loginResponse = await this.handleLogin(token);
        if(loginResponse === null) {
            this.setState({
                loginView: true,
                nextPath: nextPath
            });
            return;
        }

        history.push(nextPath);
    };

    componentDidUpdate() {
        if(this.state.loginView) {
            $('#loginModalCenter').modal();
        }
    }

    render() {
        const loginModal = this.state.loginView ?
            (<div>
                <div className="modal fade" id="loginModalCenter" tabIndex="-1" role="dialog" aria-labelledby="loginModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <LoginInput nextPath={this.state.nextPath} modalId={'loginModalCenter'}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>) :
            null;
        return(
            <React.Fragment>
                <div className="loggedin">
                    <div className="help-row">
                        <a href="/request/request-comment" className="ingr-anchor" onClick={this.handleLink}>
                            <div className="ingr-anly">
                                <div className="inr-ingr">
                                    <h2>성분 분석 요청하기</h2>
                                    <p><small>검색해도 나오지 않는 제품이 있다면?</small></p>
                                </div>
                            </div>
                        </a>
                        <a href="/request/contact-us" className="ingr-anchor" onClick={this.handleLink}>
                            <div className="ingr-anly">
                                <div className="inr-ingr">
                                    <h2>1:1 문의하기</h2>
                                    <p><small>문의사항이나 MomGuide에게 바라는 점이 있다면?</small></p>
                                </div>
                            </div>
                        </a>
                    </div>
                    {loginModal}
                </div>
            </React.Fragment>
        )
    }
}




