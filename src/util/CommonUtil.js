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

export default CommonUtils;
