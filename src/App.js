import './App.css';
import React from 'react';
import {Home} from './container/Home';

import { connect } from 'react-redux';
import * as actions from './actions';

// localStorage.removeItem('loginToken');
// localStorage.removeItem('userEmail');
// sessionStorage.removeItem('loginToken');
// localStorage.setItem('isLogin', false);
console.log('Login Token: ' + localStorage.getItem('loginToken'));
console.log('User Email:' + localStorage.getItem('userEmail'));

class App extends React.Component {
    constructor(props) {
        super(props);
        const localToken = localStorage.getItem("loginToken");
        const sessionToken = sessionStorage.getItem("loginToken");
        if (localToken !== null) {
            props.handleLogin(localToken);
        } else if (sessionToken !== null) {
            console.log('debug 3');
            props.handleLogin(sessionToken);
        }
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
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(App);