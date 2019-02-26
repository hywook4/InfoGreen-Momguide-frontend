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

export default CommonUtils;
