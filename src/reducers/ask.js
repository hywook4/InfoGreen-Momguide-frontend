import * as types from '../actions/ActionTypes';
import { initialState } from './index';

export default (state=initialState, action) => {
    switch(action.type) {
        case types.STOREINGREDANALINFO:
            return {
                analName: action.info.title,
                analIsCosmetic: action.info.isCosmetic,
                analContent: action.info.requestContent,
                analFile: action.info.requestFileUrl,
                analResponse: action.info.responseContent,
                analResponseFile: action.info.responseFileUrl
            };
        default:
            return state;
    }
}