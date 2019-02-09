import * as types from './ActionTypes';
import axios from 'axios';
import history from '../history/history';

export const storeInfo = (info) => ({
    type: types.STOREINFO,
    info
});

export const login = (token) => {
    return (dispatch) => {
        console.log(token);
        axios({
            method: 'get',
            url: process.env.API_URL + '/api/auth/info', 
            headers: {token: 'Bearer ' + token}
        })
        .then((infoResult) => {
            const data = infoResult;
            dispatch(storeInfo(data));
            history.push('/');
        })
        .catch((err) => {
            dispatch(logout());
        });
    }
};

export const logout = () => ({
    type: types.LOGOUT
});