const TokenUtils = {};

TokenUtils.getLoginToken = () => {
    const localToken = localStorage.getItem('loginToken');
    if(localToken)
        return localToken;

    const sessionToken = sessionStorage.getItem('loginToken');
    if(sessionToken)
        return sessionToken;

    return null;
};

TokenUtils.getTokenRequestHeader = (token) => {
    return {
        Authorization: `Bearer ${token}`
    }
};

export default TokenUtils;