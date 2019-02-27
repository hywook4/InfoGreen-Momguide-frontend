const CommonUtils = {};

CommonUtils.getAge = (year) => {
    const currentYear = Number(new Date().getFullYear());
    return currentYear - Number(year);
};

CommonUtils.range = (start, end) => {
    const len = end-start+1;
    if(len < 0)
        return [];

    return [...Array(len).keys()].map((i) => i+start);
};

CommonUtils.rountTwoDecimal = (num) => {
    return Math.round(num * 100) / 100;
};

CommonUtils.diffMonths = (d1, d2) => {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    if(d1.getDate() > d2.getDate())
    months -= 1;
    return months <= 0 ? 0 : months;
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
