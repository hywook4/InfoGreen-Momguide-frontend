const categoryObject = {
    'cosmetic': {
        'soap': '워시',
        'lotion': '로션',
        'cream': '크림',
        'oil': '오일',
        'powder': '파우더',
        'haircare': '헤어케어',
        'suncare': '선케어',
        'tissue': '물티슈',
        'lipcare': '립케어',
        'other': '기타화장품'
    },
    'living': {
        'laundry': '세탁세제',
        'fabric': '섬유유연제',
        'dishwashing': '주방세제',
        'odor': '탈취·방향제',
        'other': '기타세정제'
    }
};

const CategoryUtils = {};

CategoryUtils.korSubToEngMain = (korSub) => {
    const cosmeticObject = categoryObject['cosmetic'];
    const livingObject = categoryObject['living'];

    if(Object.values(cosmeticObject).indexOf(korSub) > -1)
        return 'cosmetic';
    else if(Object.values(livingObject).indexOf(korSub) > -1)
        return 'living';
    else
        return null;
};

export default CategoryUtils;