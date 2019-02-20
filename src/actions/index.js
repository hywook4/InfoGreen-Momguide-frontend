import * as types from './ActionTypes';
import axios from 'axios';

export const storeInfo = (info) => ({
    type: types.STOREINFO,
    info
});

export const login = (token) => {
    return (dispatch) => {
        console.log(token);
        if(token !== null) {
            axios({
                method: 'get',
                url: process.env.API_URL + '/api/auth/info', 
                headers: {token: 'Bearer ' + token}
            })
            .then((infoResult) => {
                const data = infoResult;
                dispatch(storeInfo(data));
            })
            .catch((err) => {
                console.log(err);
                dispatch(logout());
            });
        }
    }
};

export const logout = () => {
    return (dispatch) => {
        dispatch({
            type: types.LOGOUT
        });
        localStorage.removeItem('loginToken');
        sessionStorage.removeItem('loginToken');
    }
};