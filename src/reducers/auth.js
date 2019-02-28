import * as types from '../actions/ActionTypes';
import { initialState } from './index';
export default (state=initialState, action) => {
    switch(action.type) {
        case types.STOREINFO:
            return {
                ...state,
                userIndex: action.info.data.index,
                userEmail: action.info.data.email,
                userNickName: action.info.data.nickName,
                userPhoto: action.info.data.photoUrl,
                memberBirthYear: action.info.data.memberBirthYear,
                userGender: action.info.data.gender,
                childBirthYear: action.info.data.childBirthYear
            };
        case types.LOGOUT:
            return {
                ...state,
                userIndex: null,
                userEmail: null,
                userNickName: null,
                userPhoto: null,
                token: ''
            };
        default:
            return state;
    }
};