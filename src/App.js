import './App.css';
import React from 'react';
import {Home} from './container/Home';

import { connect } from 'react-redux';
import * as actions from './actions';
import axios from 'axios';

// localStorage.removeItem('loginToken');
// localStorage.removeItem('userEmail');
// sessionStorage.removeItem('loginToken');
// localStorage.setItem('isLogin', false);
// console.log('Login Token: ' + localStorage.getItem('loginToken'));
// console.log('User Email:' + localStorage.getItem('userEmail'));

class App extends React.Component {
    tokenRefreshRequest = (sendTokenApplyRequest) => {
        const localToken = localStorage.getItem("loginToken");
        const sessionToken = sessionStorage.getItem("loginToken");

        if(localToken || sessionToken) {
            axios({
                method: 'post',
                url: `${process.env.API_URL}/api/auth/refreshToken`,
                headers: {
                    Authorization: `Bearer ${localToken ? localToken : sessionToken}`
                }
            }).then((msg) => {
                const token = msg.data.token;
                if(typeof token !== 'string') {
                    this.props.handleLogout();
                    return;
                }

                if(sendTokenApplyRequest) {
                    this.props.handleLogin(token);
                }

                // setTimeout(()=>this.props.handleLogout(), 3000);
                if(localToken) {
                    localStorage.setItem('loginToken', token);
                } else {
                    sessionStorage.setItem('loginToken', token);
                }
            }).catch(() => {
                this.props.handleLogout();
            })
        }

        // 1시간 마다 refresh
        setTimeout(() => {
            this.tokenRefreshRequest(false);
        }, 60*60*1000);
    };

    constructor(props) {
        super(props);

        this.tokenRefreshRequest(true);
    }
    render() {
        return (
            <Home/>
        )
    }
}

const mapStateToProps = null;
const mapDispatchToProps = (dispatch) => {
    return ({
        handleLogin: (token) => {
            return dispatch(actions.login(token));
        },
        handleLogout: () => {
            return dispatch(actions.logout());
        }
    })
};

export default connect(mapStateToProps, mapDispatchToProps)(App);