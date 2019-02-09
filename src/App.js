import './App.css';
import React from 'react';
import {Home} from './container/Home';

import { connect } from 'react-redux';
import * as actions from './actions';

class App extends React.Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem("loginToken");

        if (token !== null) {
            console.log(token);
            props.handleLogin(token);
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