import * as types from '../actions/ActionTypes';
import { initialState } from './index';
export default (state=initialState, action) => {
    switch(action.type) {
        case types.STOREINFO:
            console.log(action);
            return {
                ...state,
                userIndex: action.info.data.index,
                userEmail: action.info.data.email,
                userNickName: action.info.data.nickName,
                userPhoto: action.info.data.photoUrl
            };
        case types.LOGIN:
            return {
                ...state,
                token: action.token
            };
        case types.LOGOUT:
            return {
                ...state,
                userInfo: null,
                token: ''
            };
        default:
            return state;
    }
};