const CommonUtils = {};

CommonUtils.range = (start, end) => {
    const len = end-start+1;
    if(len < 0)
        return [];

    return [...Array(len).keys()].map((i) => i+start);
};

CommonUtils.lastDay = (year, month) => {
    return new Date(year, month, 0).getDate();
};

CommonUtils.validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

CommonUtils.validatePassword = (password) => {
    var re = /^.{6,15}$/;
    var re2 = /^[A-Za-z]*$/;
    var re3 = /^[0-9]*$/;
    return !re2.test(password) && !re3.test(password) && re.test(password);
};

export default CommonUtils;
