import React from 'react';
import './ProdSpec.css';
import { RatingRow } from './Ratings';
import { LivingDoughNut, CosmeticDoughNut} from './DoughNut';
import { LivingIngredientModal, CosmeticIngredientModal } from './IngredientModal';
import { LivingIngredientRow, CosmeticIngredientRow } from './IngredientRow';
import config from '../../../../config';
import { CategoryUtil, TokenUtil, CommonUtil } from '../../../../util';
import greenCircle from '../../../../assets/images/common_icons/green_circle.png';
import greenLine from '../../../../assets/images/common_icons/green_line.png';
import grayCircle from '../../../../assets/images/common_icons/gray_circle.png';
import grayLine from '../../../../assets/images/common_icons/gray_line.png';
import { ProdSpecReviewSummary } from './ProdSpecReviewSummary';
import { ReviewCard } from './ReviewCard';
import history from '../../../../history/history';
import $ from 'jquery';
import dangerIcon1 from '../../../../assets/images/icons/danger-icon2.png';
import dangerIcon2 from '../../../../assets/images/icons/skin-irritant-true.png';
import dangerIcon3 from '../../../../assets/images/icons/danger-icon3.png';
import dangerIcon4 from '../../../../assets/images/icons/cancer-true.png';

import interestIcon1 from '../../../../assets/images/icons/etc1_red.png';
import interestIcon2 from '../../../../assets/images/icons/etc2_red.png';
import interestIcon3 from '../../../../assets/images/icons/etc3_red.png';
import interestIcon4 from '../../../../assets/images/icons/etc4_red.png';
import interestIcon5 from '../../../../assets/images/icons/etc5_red.png';

import axios from 'axios';

const emoji={
    // should be replaced by actual Asset urls to avoid memory overlaods.
    bad:require('../../../../assets/images/product_spec_icons/opened_bad.png'),
    good:require('../../../../assets/images/product_spec_icons/opened_good.png'),
    great:require('../../../../assets/images/product_spec_icons/opened_great.png')
};

const openness={
    bad:'성분 공개가\n되어있지 않습니다',
    good:'성분 공개가\n되어 있습니다',
    great: '성분 공개가\n잘되어 있어요!'
};

const livingText={
    x:'정보없음',
    a:'매우 낮은 위험',
    b:'낮은 위험',
    c:'높은 위험',
    d:'높은 위험',
    f:'매우 높은 위험'
};

const cosmeticText = {
    x:'정보없음',
    a:'낮은 위험',
    b:'중간 위험',
    c: '높은 위험'
};

export class ProdSpec extends React.Component{

    state = {
        ingredientList: null,
        modalData:{},
        aboutTab: true,
        reviewTab: false,
        productData: null,
        ingredientRequestNum: 0,

        login: false,
        nickname: null,
        gender: null,
        birthYear: null,
        childBirthYear: null,
        imageUrl: null,
        reviewUploaded: false,

        myHouseSelected: false,
        myCosmeticSelected: false,
        likeSelected: false,
        ingredientRequest: false,

        reviewApiLoaded: false,
        reviewCount: 0,
        rating: 1,
        useMonth: 1,
        functionality: 1,
        nonIrritating: 1,
        sent: 1,
        costEffectiveness: 1,
        reviewText: '',
        imageFiles: [],

        bestReview: null,
        sorting: 'late',
        reviews: [],
        reviewPage: 1,
        reviewTotalPages: 0,
        nextPageExist: false,

        reviewListChangeCount: 1,
        selectedIngredients: []
    };

    onChange = (key, value) => {
        const newObj = {};
        newObj[key] = value;
        this.setState(newObj);
    };

    componentDidMount = async () => {
        const id = this.props.match.params.id;
        const category = CategoryUtil.korSubToEngMain(this.props.match.params.category);

        let res = await axios.get(`${process.env.API_URL}/api/product/details?category=${category}&productId=${id}`);
        
        let rateAverage = 0;
       
        if(res.data.product.rateCount === 0){
            rateAverage = 0
        } else{
            rateAverage = Math.round(res.data.product.rateSum/res.data.product.rateCount*100)/100;
        }

        console.log(res.data.ingredient);
        this.setState({
            productData: res.data.product,
            ingredientList: res.data.ingredient,
            rateAverage: rateAverage
        });

        res = await axios.get(`${process.env.API_URL}/api/ask/countIngredOpen?productIndex=${res.data.product.index}`);
        this.setState({
            ingredientRequestNum: res.data.totalNum
        });

        const token = TokenUtil.getLoginToken();
        if(token !== null) {
            const headers = TokenUtil.getTokenRequestHeader(token);

            try {
                res = await axios.get(`${process.env.API_URL}/api/auth/info`, {headers: TokenUtil.getTokenRequestHeader(token)});
                let newStateObj = {
                    gender: res.data.gender,
                    nickname: res.data.nickName,
                    birthYear: res.data.memberBirthYear,
                    childBirthYear: res.data.childBirthYear,
                    imageUrl: res.data.photoUrl,
                    login: true
                };

                this.setState(newStateObj);

                res = await axios.get(`${process.env.API_URL}/api/auth/checkHomeLike?productIndex=${id}&isCosmetic=${category === 'cosmetic' ? 'true' : 'false'}`, {
                    headers: headers
                });
                if (category === 'living') {
                    this.setState({
                        myHouseSelected: res.data.home,
                        likeSelected: res.data.like
                    });
                } else {
                    this.setState({
                        myCosmeticSelected: res.data.home,
                        likeSelected: res.data.like
                    });
                }

                res = await axios.get(`${process.env.API_URL}/api/ask/checkIngredOpen?productIndex=${id}`, {
                    headers: headers
                });

                this.setState({
                    ingredientRequest: res.data.check
                });

                res = await axios.get(`${process.env.API_URL}/api/review/product/list/count?category=${category}&id=${id}`);

                this.setState({
                    reviewCount: res.data.count
                });

                res = await axios.get(`${process.env.API_URL}/api/review/status?category=${category}&id=${id}`, {headers: TokenUtil.getTokenRequestHeader(token)});
                newStateObj = {
                    reviewUploaded: res.data.exist,
                    reviewApiLoaded: true
                };
                this.setState(newStateObj);

                res = await axios.get(`${process.env.API_URL}/api/review/best?category=${category}&id=${id}`, {
                    headers: TokenUtil.getTokenRequestHeader(token)
                });
                this.setState({
                    bestReview: res.data
                });

                await this.handleLoadReview(1);
            } catch (e) {
            }
        } else {
            res = await axios.get(`${process.env.API_URL}/api/review/best?category=${category}&id=${id}`);
            this.setState({
                bestReview: res.data
            });
            this.setState({
                reviewApiLoaded: true
            });
        }
    };

    handleLoadReview = async (page) => {
        const id = this.props.match.params.id;
        const category = CategoryUtil.korSubToEngMain(this.props.match.params.category);
        const token = TokenUtil.getLoginToken();
        if(token === null)
            return;
        const headers = TokenUtil.getTokenRequestHeader(token);

        const res = await axios.get(`${process.env.API_URL}/api/review/product/list?category=${category}&id=${id}&page=${page}`, {
            headers: headers
        });
        this.setState({
            reviews: this.state.reviews.concat(res.data.reviews),
            reviewPage: page,
            nextPageExist: res.data.nextPageExist,
            reviewTotalPages: res.data.totalPages,

            reviewListChangeCount: this.state.reviewListChangeCount + 1
        });
    };

    houseAndLikeToggle = async (category, id) => {
        const token = TokenUtil.getLoginToken();
        if(token === null)
            return;
        const headers = TokenUtil.getTokenRequestHeader(token);

        if(category === 'living') {
            const selected = this.state.myHouseSelected;

            if(!selected) {
                try {
                    await axios({
                        method: 'post',
                        url: `${process.env.API_URL}/api/auth/addHomeLiving`,
                        headers: headers,
                        data: {
                            productIndex: id
                        }
                    });

                    this.setState({myHouseSelected: !selected});
                } catch(e) {}
            } else {
                try {
                    await axios({
                        method: 'delete',
                        url: `${process.env.API_URL}/api/auth/cancelHomeLiving`,
                        headers: headers,
                        data: {
                            productIndex: id
                        }
                    });

                    this.setState({myHouseSelected: !selected});
                } catch(e) {}
            }
        } else if(category === 'cosmetic') {
            const selected = this.state.myCosmeticSelected;

            if(!selected) {
                try {
                    await axios({
                        method: 'post',
                        url: `${process.env.API_URL}/api/auth/addHomeCosmetic`,
                        headers: headers,
                        data: {
                            productIndex: id
                        }
                    });

                    this.setState({myCosmeticSelected: !selected});
                } catch(e) {}
            } else {
                try {
                    await axios({
                        method: 'delete',
                        url: `${process.env.API_URL}/api/auth/cancelHomeCosmetic`,
                        headers: headers,
                        data: {
                            productIndex: id
                        }
                    });

                    this.setState({myCosmeticSelected: !selected});
                } catch(e) {}
            }
        } else if(category === 'like') {
            const selected = this.state.likeSelected;
            const objectCategory = CategoryUtil.korSubToEngMain(this.props.match.params.category);

            if(!selected) {
                try {
                    await axios({
                        method: 'post',
                        url: `${process.env.API_URL}/api/auth/addLike${objectCategory==='living'?'Living':'Cosmetic'}`,
                        headers: headers,
                        data: {
                            productIndex: id
                        }
                    });

                    this.setState({likeSelected: !selected});
                } catch(e) {}
            } else {
                try {
                    await axios({
                        method: 'delete',
                        url: `${process.env.API_URL}/api/auth/cancelLike${objectCategory==='living'?'Living':'Cosmetic'}`,
                        headers: headers,
                        data: {
                            productIndex: id
                        }
                    });

                    this.setState({likeSelected: !selected});
                } catch(e) {}
            }
        }
    };

    toggleTap = (isAboutTab) => {
        this.setState({
            aboutTab: isAboutTab,
            reviewTab: !isAboutTab
        });
    };

    renderSpecialIcons=()=>{
        const slsSles = this.state.ingredientList.filter((item) => item.slsSles).length > 0;
        const ammonium = this.state.ingredientList.filter((item) => item.ammonium).length > 0;
        const scent = this.state.ingredientList.filter((item) => item.scent).length > 0;
        const color = this.state.ingredientList.filter((item) => item.color).length > 0;
        const humid = this.state.ingredientList.filter((item) => item.humid).length > 0;

        return (
            <div className="ingred-icons">
                <div style={{fontSize: "13px", color: "black", fontWeight: "900", marginTop: "10px", marginBottom: "10px"}}>
                    관심 성분
                    <img src={require('../../../../assets/images/product_spec_icons/detail.jpg')} style={{maxHeight:'20px', maxWidth:'20px', marginLeft: "10px"}} alt=""
                         onClick={()=>$('#interest-ingredient-modal').modal('show')}
                    />
                </div>
                <div className="ingred-icon">
                    <img className="img-fluid"
                         src={require(`../../../../assets/images/product_spec_icons/etc1_${slsSles?'red':'grey'}.png`)}
                         style={{maxHeight:'55px',maxWidth:'55px'}} alt=""
                         onClick={()=>this.handleIngredientSelect('slsSles')}
                    />
                </div>
                <div className="ingred-icon">
                    <img className="img-fluid"
                         src={require(`../../../../assets/images/product_spec_icons/etc2_${ammonium?'red':'grey'}.png`)}
                         style={{maxHeight:'55px',maxWidth:'55px'}} alt=""
                         onClick={()=>this.handleIngredientSelect('ammonium')}
                    />
                </div>
                <div className="ingred-icon">
                    <img className="img-fluid"
                         src={require(`../../../../assets/images/product_spec_icons/etc3_${scent?'red':'grey'}.png`)}
                         style={{maxHeight:'55px',maxWidth:'55px'}} alt=""
                         onClick={()=>this.handleIngredientSelect('scent')}
                    />
                </div>
                <div className="ingred-icon">
                    <img className="img-fluid"
                         src={require(`../../../../assets/images/product_spec_icons/etc4_${color?'red':'grey'}.png`)}
                         style={{maxHeight:'55px',maxWidth:'55px'}} alt=""
                         onClick={()=>this.handleIngredientSelect('color')}
                    />
                </div>
                <div className="ingred-icon">
                    <img className="img-fluid"
                         src={require(`../../../../assets/images/product_spec_icons/etc5_${humid?'red':'grey'}.png`)}
                         style={{maxHeight:'55px',maxWidth:'55px'}} alt=""
                         onClick={()=>this.handleIngredientSelect('humid')}
                    />
                </div>
            </div>
        )
    };

    renderBadIcons=()=>{
        const echaBreath = this.state.ingredientList.filter((item) => item.echaBreath !== '').length > 0;
        const echaSkin = this.state.ingredientList.filter((item) => item.echaSkin !== '').length > 0;
        const echaDev = this.state.ingredientList.filter((item) => item.echaDev !== '').length > 0;
        const echaCancer = this.state.ingredientList.filter((item) => item.echaCancer !== '').length > 0;
        return (
            <div className="ingred-icons">
                <div style={{fontSize: "13px", color: "black", fontWeight: "900", marginTop: "10px", marginBottom: "10px"}}>
                    성분 독성 정보
                    <img src={require('../../../../assets/images/product_spec_icons/detail.jpg')} style={{maxHeight:'20px', maxWidth:'20px', marginLeft: "10px"}} alt=""
                         onClick={()=>$('#toxic-ingredient-modal').modal('show')}
                    />
                </div>
                <div className="ingred-icon">
                    <img className="img-fluid"
                         src={require(`../../../../assets/images/product_spec_icons/ingred_respitory${echaBreath?'_true':''}.png`)}
                         style={{maxHeight:'55px',maxWidth:'55px'}} alt=""
                         onClick={()=>this.handleIngredientSelect('echaBreath')}
                    />
                    <div>호흡기 과민성</div>
                </div>
                <div className="ingred-icon">
                    <img className="img-fluid"
                         src={require(`../../../../assets/images/product_spec_icons/ingred_skin${echaSkin?'_true':''}.png`)}
                         style={{maxHeight:'55px',maxWidth:'55px'}} alt=""
                         onClick={()=>this.handleIngredientSelect('echaSkin')}
                    />
                    <div>피부 과민성</div>
                </div>
                <div className="ingred-icon">
                    <img className="img-fluid"
                         src={require(`../../../../assets/images/product_spec_icons/ingred_development${echaDev?'_true':''}.png`)}
                         style={{maxHeight:'55px',maxWidth:'55px'}} alt=""
                         onClick={()=>this.handleIngredientSelect('echaDev')}
                    />
                    <div>발달/생식 독성</div>
                </div>
                <div className="ingred-icon">
                    <img className="img-fluid"
                         src={require(`../../../../assets/images/product_spec_icons/ingred_cancer${echaCancer?'_true':''}.png`)}
                         style={{maxHeight:'55px',maxWidth:'55px'}} alt=""
                         onClick={()=>this.handleIngredientSelect('echaCancer')}
                    />
                    <div>발암성</div>
                </div>
            </div>
        )
    };

    updateModalData=(item)=>this.setState({modalData:item});

    renderIngredients = (category) => {
        const text = (category==='living') ? livingText : cosmeticText;
        return (
            <div className="ingred-table">
                <div className="ingred-table-name">
                    <span style={{color: 'black', fontSize: '13px', fontWeight: '900'}}>전체 성분 </span>
                    <span style={{color: 'gray', fontSize: '10px', marginLeft: '10px', marginRight: '10px'}}>|</span>
                    <span style={{color: 'gray', fontSize: '10px'}}>성분을 클릭하시면 상세 정보를 보실 수 있습니다.</span>
                </div>
                <table style={{width: "100%"}}>
                    <thead>
                    <tr className="ingred-table-head">
                        <th style={{textAlign:'center'}}>성분</th>
                        <th>성분명</th>
                        <th style={{textAlign:'center'}}>주의성분여부</th>
                        {category === 'living' ? (<th style={{textAlign:'center'}}>유해성분여부</th>) : null}
                    </tr>
                    {(this.state.ingredientList).map(ingredient => {
                        return category === 'living' ? (
                            <LivingIngredientRow
                                key={ingredient.index}
                                data={ingredient}
                                letter={ingredient.ewg}
                                korName={ingredient.korName}
                                engName={ingredient.engName}
                                handleClick={this.updateModalData}
                            />) : (
                            <CosmeticIngredientRow
                                key={ingredient.index}
                                data={ingredient}
                                letter={ingredient.ewg}
                                korName={ingredient.korName}
                                engName={ingredient.engName}
                                handleClick={this.updateModalData}
                            />);
                    })}
                    </thead>
                </table>
                {
                    category === 'living' ?
                        (<LivingIngredientModal texts={text} data={this.state.modalData}/>) :
                        (<CosmeticIngredientModal texts={text} data={this.state.modalData}/>)
                }
            </div>
        )
    };

    renderDoughnut = (category) => {
        const text = (category==='living') ? livingText : cosmeticText;
        return (
            <React.Fragment>
                <div style={{color: 'black', fontSize: '13px', fontWeight: '900'}}>성분 비율</div>
                {
                    category==='living' ?
                        (<LivingDoughNut texts={text} data={{...this.state}}/>) :
                        (<CosmeticDoughNut texts={text} data={{...this.state}}/>)
                }
            </React.Fragment>
        )
    };

    handleIngredientRequest = async () => {
        if(!window.confirm('성분 공개 요청을 하시겠습니까?'))
            return;

        const token = TokenUtil.getLoginToken();
        if(token === null)
            return;
        const headers = TokenUtil.getTokenRequestHeader(token);

        try {
            await axios({
                method: 'post',
                url: `${process.env.API_URL}/api/ask/requestIngredOpen`,
                headers: headers,
                data: {
                    productIndex: this.props.match.params.id
                }
            });

            alert('요청이 정상적으로 처리되었습니다.');
            this.setState({
                ingredientRequestNum: this.state.ingredientRequestNum + 1,
                ingredientRequest: true
            });
        } catch(e) {
            alert('에러가 발생하였습니다. 관리자에게 문의해주세요.');
        }
    };

    deleteImageFile = (fileName) => {
        this.setState({
            imageFiles: this.state.imageFiles.filter((item) => item.name !== fileName)
        });
    };

    handleReviewAdd = async () => {
        const token = TokenUtil.getLoginToken();
        if(token === null) {
            alert("올바르지 않은 접근입니다.");
            return;
        }
        if(this.state.imageFiles.length > 10) {
            alert('첨부파일은 최대 10장까지 업로드 가능합니다.');
            return;
        }
        const headers = TokenUtil.getTokenRequestHeader(token);

        const category = CategoryUtil.korSubToEngMain(this.props.match.params.category);
        const productId = this.props.match.params.id;
        const { rating, useMonth, functionality, nonIrritating, sent, costEffectiveness } = this.state;
        const content = this.state.reviewText;

        if(!content) {
            alert('리뷰 내용을 입력해주세요.');
            return;
        }

        const formData = new FormData();
        formData.append('category', category);
        formData.append('productId', productId);
        formData.append('rating', rating);
        formData.append('useMonth', useMonth);
        formData.append('content', content);
        formData.append('functionality', functionality);
        formData.append('nonIrritating', nonIrritating);
        formData.append('sent', sent);
        formData.append('costEffectiveness', costEffectiveness);
        for(const i in this.state.imageFiles)
            formData.append('images', this.state.imageFiles[i]);

        try {
            await axios({
                method: 'post',
                url: `${process.env.API_URL}/api/review`,
                headers: {
                    ...headers,
                    'Content-Type': 'multipart/form-data'
                },
                data: formData
            });
            alert('리뷰가 추가되었습니다.');
            this.setState({
                reviewUploaded: true
            });
            window.location.reload();
        } catch(e) {
            alert('에러가 발생하였습니다.');
        }
    };

    handleReviewSorting = async (sorting) => {
        const id = this.props.match.params.id;
        const category = CategoryUtil.korSubToEngMain(this.props.match.params.category);
        const token = TokenUtil.getLoginToken();
        if(token === null)
            return;
        const headers = TokenUtil.getTokenRequestHeader(token);

        const res = await axios.get(`${process.env.API_URL}/api/review/product/list?category=${category}&id=${id}&page=${1}&sorting=${sorting}`, {
            headers: headers
        });
        this.setState({
            reviews: res.data.reviews,
            reviewPage: 1,
            nextPageExist: res.data.nextPageExist,
            reviewTotalPages: res.data.totalPages,
            sorting: sorting,
            reviewListChangeCount: this.state.reviewListChangeCount + 1
        });
    };

    handleIngredientSelect = async (category) => {
        let list = [];

        const productCategory = CategoryUtil.korSubToEngMain(this.props.match.params.category);
        if(category === 'echaBreath') {
            list = this.state.ingredientList.filter((item) => (item.echaBreath !== '')).map((item) => {
                if(item.ewg === '')
                    item.ewg = 'X';
                const letter = item.ewgCode ? item.ewgCode : 'X';
                let imgSrc = 'cosmetic_gray.png';
                if(letter === 'AA')
                    imgSrc = 'cosmetic_green_3.png';
                else if(letter === 'AB')
                    imgSrc = 'cosmetic_green_2.png';
                else if(letter === 'AC')
                    imgSrc = 'cosmetic_green_1.png';
                else if(letter === 'BA')
                    imgSrc = 'cosmetic_yellow_3.png';
                else if(letter === 'BB')
                    imgSrc = 'cosmetic_yellow_2.png';
                else if(letter === 'BC')
                    imgSrc = 'cosmetic_yellow_1.png';
                else if(letter === 'CA')
                    imgSrc = 'cosmetic_red_3.png';
                else if(letter === 'CB')
                    imgSrc = 'cosmetic_red_2.png';
                else if(letter === 'CC')
                    imgSrc = 'cosmetic_red_1.png';

                const imgUrl = productCategory === 'living' ?
                    require(`../../../../assets/images/product_spec_icons/living_grade_${item.ewg}.png`) :
                    require(`../../../../assets/images/product_spec_icons/${imgSrc}`);
                return {
                    imgUrl: imgUrl,
                    korName: item.korName,
                    engName: item.engName
                };
            });
        } else if(category === 'echaSkin') {
            list = this.state.ingredientList.filter((item) => (item.echaSkin !== '')).map((item) => {
                if(item.ewg === '')
                    item.ewg = 'X';
                const letter = item.ewgCode ? item.ewgCode : 'X';
                let imgSrc = 'cosmetic_gray.png';
                if(letter === 'AA')
                    imgSrc = 'cosmetic_green_3.png';
                else if(letter === 'AB')
                    imgSrc = 'cosmetic_green_2.png';
                else if(letter === 'AC')
                    imgSrc = 'cosmetic_green_1.png';
                else if(letter === 'BA')
                    imgSrc = 'cosmetic_yellow_3.png';
                else if(letter === 'BB')
                    imgSrc = 'cosmetic_yellow_2.png';
                else if(letter === 'BC')
                    imgSrc = 'cosmetic_yellow_1.png';
                else if(letter === 'CA')
                    imgSrc = 'cosmetic_red_3.png';
                else if(letter === 'CB')
                    imgSrc = 'cosmetic_red_2.png';
                else if(letter === 'CC')
                    imgSrc = 'cosmetic_red_1.png';

                const imgUrl = productCategory === 'living' ?
                    require(`../../../../assets/images/product_spec_icons/living_grade_${item.ewg}.png`) :
                    require(`../../../../assets/images/product_spec_icons/${imgSrc}`);
                return {
                    imgUrl: imgUrl,
                    korName: item.korName,
                    engName: item.engName
                };
            });
        } else if(category === 'echaDev') {
            list = this.state.ingredientList.filter((item) => (item.echaDev !== '')).map((item) => {
                if(item.ewg === '')
                    item.ewg = 'X';
                const letter = item.ewgCode ? item.ewgCode : 'X';
                let imgSrc = 'cosmetic_gray.png';
                if(letter === 'AA')
                    imgSrc = 'cosmetic_green_3.png';
                else if(letter === 'AB')
                    imgSrc = 'cosmetic_green_2.png';
                else if(letter === 'AC')
                    imgSrc = 'cosmetic_green_1.png';
                else if(letter === 'BA')
                    imgSrc = 'cosmetic_yellow_3.png';
                else if(letter === 'BB')
                    imgSrc = 'cosmetic_yellow_2.png';
                else if(letter === 'BC')
                    imgSrc = 'cosmetic_yellow_1.png';
                else if(letter === 'CA')
                    imgSrc = 'cosmetic_red_3.png';
                else if(letter === 'CB')
                    imgSrc = 'cosmetic_red_2.png';
                else if(letter === 'CC')
                    imgSrc = 'cosmetic_red_1.png';

                const imgUrl = productCategory === 'living' ?
                    require(`../../../../assets/images/product_spec_icons/living_grade_${item.ewg}.png`) :
                    require(`../../../../assets/images/product_spec_icons/${imgSrc}`);
                return {
                    imgUrl: imgUrl,
                    korName: item.korName,
                    engName: item.engName
                };
            });
        } else if(category === 'echaCancer') {
            list = this.state.ingredientList.filter((item) => (item.echaCancer !== '')).map((item) => {
                if(item.ewg === '')
                    item.ewg = 'X';
                const letter = item.ewgCode ? item.ewgCode : 'X';
                let imgSrc = 'cosmetic_gray.png';
                if(letter === 'AA')
                    imgSrc = 'cosmetic_green_3.png';
                else if(letter === 'AB')
                    imgSrc = 'cosmetic_green_2.png';
                else if(letter === 'AC')
                    imgSrc = 'cosmetic_green_1.png';
                else if(letter === 'BA')
                    imgSrc = 'cosmetic_yellow_3.png';
                else if(letter === 'BB')
                    imgSrc = 'cosmetic_yellow_2.png';
                else if(letter === 'BC')
                    imgSrc = 'cosmetic_yellow_1.png';
                else if(letter === 'CA')
                    imgSrc = 'cosmetic_red_3.png';
                else if(letter === 'CB')
                    imgSrc = 'cosmetic_red_2.png';
                else if(letter === 'CC')
                    imgSrc = 'cosmetic_red_1.png';

                const imgUrl = productCategory === 'living' ?
                    require(`../../../../assets/images/product_spec_icons/living_grade_${item.ewg}.png`) :
                    require(`../../../../assets/images/product_spec_icons/${imgSrc}`);
                return {
                    imgUrl: imgUrl,
                    korName: item.korName,
                    engName: item.engName
                };
            });
        } else if(category === 'slsSles') {
            list = this.state.ingredientList.filter((item) => (item.slsSles)).map((item) => {
                if(item.ewg === '')
                    item.ewg = 'X';
                const letter = item.ewgCode ? item.ewgCode : 'X';
                let imgSrc = 'cosmetic_gray.png';
                if(letter === 'AA')
                    imgSrc = 'cosmetic_green_3.png';
                else if(letter === 'AB')
                    imgSrc = 'cosmetic_green_2.png';
                else if(letter === 'AC')
                    imgSrc = 'cosmetic_green_1.png';
                else if(letter === 'BA')
                    imgSrc = 'cosmetic_yellow_3.png';
                else if(letter === 'BB')
                    imgSrc = 'cosmetic_yellow_2.png';
                else if(letter === 'BC')
                    imgSrc = 'cosmetic_yellow_1.png';
                else if(letter === 'CA')
                    imgSrc = 'cosmetic_red_3.png';
                else if(letter === 'CB')
                    imgSrc = 'cosmetic_red_2.png';
                else if(letter === 'CC')
                    imgSrc = 'cosmetic_red_1.png';

                const imgUrl = productCategory === 'living' ?
                    require(`../../../../assets/images/product_spec_icons/living_grade_${item.ewg}.png`) :
                    require(`../../../../assets/images/product_spec_icons/${imgSrc}`);
                return {
                    imgUrl: imgUrl,
                    korName: item.korName,
                    engName: item.engName
                };
            });
        } else if(category === 'ammonium') {
            list = this.state.ingredientList.filter((item) => (item.ammonium)).map((item) => {
                if(item.ewg === '')
                    item.ewg = 'X';
                const letter = item.ewgCode ? item.ewgCode : 'X';
                let imgSrc = 'cosmetic_gray.png';
                if(letter === 'AA')
                    imgSrc = 'cosmetic_green_3.png';
                else if(letter === 'AB')
                    imgSrc = 'cosmetic_green_2.png';
                else if(letter === 'AC')
                    imgSrc = 'cosmetic_green_1.png';
                else if(letter === 'BA')
                    imgSrc = 'cosmetic_yellow_3.png';
                else if(letter === 'BB')
                    imgSrc = 'cosmetic_yellow_2.png';
                else if(letter === 'BC')
                    imgSrc = 'cosmetic_yellow_1.png';
                else if(letter === 'CA')
                    imgSrc = 'cosmetic_red_3.png';
                else if(letter === 'CB')
                    imgSrc = 'cosmetic_red_2.png';
                else if(letter === 'CC')
                    imgSrc = 'cosmetic_red_1.png';

                const imgUrl = productCategory === 'living' ?
                    require(`../../../../assets/images/product_spec_icons/living_grade_${item.ewg}.png`) :
                    require(`../../../../assets/images/product_spec_icons/${imgSrc}`);
                return {
                    imgUrl: imgUrl,
                    korName: item.korName,
                    engName: item.engName
                };
            });
        } else if(category === 'scent') {
            list = this.state.ingredientList.filter((item) => (item.scent)).map((item) => {
                if(item.ewg === '')
                    item.ewg = 'X';
                const letter = item.ewgCode ? item.ewgCode : 'X';
                let imgSrc = 'cosmetic_gray.png';
                if(letter === 'AA')
                    imgSrc = 'cosmetic_green_3.png';
                else if(letter === 'AB')
                    imgSrc = 'cosmetic_green_2.png';
                else if(letter === 'AC')
                    imgSrc = 'cosmetic_green_1.png';
                else if(letter === 'BA')
                    imgSrc = 'cosmetic_yellow_3.png';
                else if(letter === 'BB')
                    imgSrc = 'cosmetic_yellow_2.png';
                else if(letter === 'BC')
                    imgSrc = 'cosmetic_yellow_1.png';
                else if(letter === 'CA')
                    imgSrc = 'cosmetic_red_3.png';
                else if(letter === 'CB')
                    imgSrc = 'cosmetic_red_2.png';
                else if(letter === 'CC')
                    imgSrc = 'cosmetic_red_1.png';

                const imgUrl = productCategory === 'living' ?
                    require(`../../../../assets/images/product_spec_icons/living_grade_${item.ewg}.png`) :
                    require(`../../../../assets/images/product_spec_icons/${imgSrc}`);
                return {
                    imgUrl: imgUrl,
                    korName: item.korName,
                    engName: item.engName
                };
            });
        } else if(category === 'color') {
            list = this.state.ingredientList.filter((item) => (item.color)).map((item) => {
                if(item.ewg === '')
                    item.ewg = 'X';
                const letter = item.ewgCode ? item.ewgCode : 'X';
                let imgSrc = 'cosmetic_gray.png';
                if(letter === 'AA')
                    imgSrc = 'cosmetic_green_3.png';
                else if(letter === 'AB')
                    imgSrc = 'cosmetic_green_2.png';
                else if(letter === 'AC')
                    imgSrc = 'cosmetic_green_1.png';
                else if(letter === 'BA')
                    imgSrc = 'cosmetic_yellow_3.png';
                else if(letter === 'BB')
                    imgSrc = 'cosmetic_yellow_2.png';
                else if(letter === 'BC')
                    imgSrc = 'cosmetic_yellow_1.png';
                else if(letter === 'CA')
                    imgSrc = 'cosmetic_red_3.png';
                else if(letter === 'CB')
                    imgSrc = 'cosmetic_red_2.png';
                else if(letter === 'CC')
                    imgSrc = 'cosmetic_red_1.png';

                const imgUrl = productCategory === 'living' ?
                    require(`../../../../assets/images/product_spec_icons/living_grade_${item.ewg}.png`) :
                    require(`../../../../assets/images/product_spec_icons/${imgSrc}`);
                return {
                    imgUrl: imgUrl,
                    korName: item.korName,
                    engName: item.engName
                };
            });
        } else if(category === 'humid') {
            list = this.state.ingredientList.filter((item) => (item.humid)).map((item) => {
                if(item.ewg === '')
                    item.ewg = 'X';
                const letter = item.ewgCode ? item.ewgCode : 'X';
                let imgSrc = 'cosmetic_gray.png';
                if(letter === 'AA')
                    imgSrc = 'cosmetic_green_3.png';
                else if(letter === 'AB')
                    imgSrc = 'cosmetic_green_2.png';
                else if(letter === 'AC')
                    imgSrc = 'cosmetic_green_1.png';
                else if(letter === 'BA')
                    imgSrc = 'cosmetic_yellow_3.png';
                else if(letter === 'BB')
                    imgSrc = 'cosmetic_yellow_2.png';
                else if(letter === 'BC')
                    imgSrc = 'cosmetic_yellow_1.png';
                else if(letter === 'CA')
                    imgSrc = 'cosmetic_red_3.png';
                else if(letter === 'CB')
                    imgSrc = 'cosmetic_red_2.png';
                else if(letter === 'CC')
                    imgSrc = 'cosmetic_red_1.png';

                const imgUrl = productCategory === 'living' ?
                    require(`../../../../assets/images/product_spec_icons/living_grade_${item.ewg}.png`) :
                    require(`../../../../assets/images/product_spec_icons/${imgSrc}`);
                return {
                    imgUrl: imgUrl,
                    korName: item.korName,
                    engName: item.engName
                };
            });
        }

        this.setState({
            selectedIngredients: list
        }, () => {$('#selected-ingredient-modal').modal('show')});
    };

    brandSearch = () =>{
        history.push(`/category?search=${this.state.productData.brand}&mainCategory=&subCategory=`); 
    }

    render = () => {
        const id = this.props.match.params.id;
        const productData = this.state.productData;
        if(productData === null) {
            return (<div><br/><br/></div>);
        }

        const category = CategoryUtil.korSubToEngMain(this.props.match.params.category);

        let selectedEmoji = null;
        let selectedText = null;

        if(productData.ingredient ==='X'){
            selectedEmoji = emoji.bad;
            selectedText = openness.bad;
        } else if(productData.ingredient ==='△'){
            selectedEmoji = emoji.good;
            selectedText = openness.good;
        } else if(productData.ingredient ==='O'){
            selectedEmoji = emoji.great;
            selectedText = openness.great;
        }

        const loginContainer = (message, floatLeft) => (
            <div className={`prod-spec-login-container ${floatLeft ? "float-left" : ""}`}>
                <div>{message}</div>
                <button onClick={()=>{
                    history.push('/login');
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                }}>로그인</button>
            </div>
        );

        const reviewAdditionTab = (
            this.state.login && !this.state.reviewUploaded ?
                (<div className="prod-spec-review-container">
                    <div className="prod-spec-review-write-container">
                        <div className="prod-spec-review-write-info">
                            <div className="prod-spec-profile-image">
                                <img src={this.state.imageUrl} alt=""/>
                            </div>
                            <div className="prod-spec-member-info-container">
                                <div>
                                    {this.state.nickname}
                                </div>
                                <div>
                                    <span>{this.state.gender === 'male' ? '남자' : '여자'}</span>
                                    <span>{CommonUtil.getAge(this.state.birthYear)+'세'}</span>
                                    <span>자녀 {this.state.childBirthYear === 0 ? '없음' : CommonUtil.getAge(this.state.childBirthYear) + '세'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="prod-spec-review-write-table">
                            <div className="prod-spec-row">
                                <div className="prod-spec-cell">
                                    <div className="prod-spec-detail-container">
                                        <span className="prod-spec-star-text">별점</span>
                                        <div className="prod-spec-detail-content prod-spec-star-container">
                                            <i className={`prod-spec-star fa fa-star${(this.state.rating >= 1 ? ' selected' : '-o')}`} aria-hidden="true" onClick={()=>this.onChange('rating', 1)}/>
                                            <i className={`prod-spec-star fa fa-star${(this.state.rating >= 2 ? ' selected' : '-o')}`} aria-hidden="true" onClick={()=>this.onChange('rating', 2)} />
                                            <i className={`prod-spec-star fa fa-star${(this.state.rating >= 3 ? ' selected' : '-o')}`} aria-hidden="true" onClick={()=>this.onChange('rating', 3)} />
                                            <i className={`prod-spec-star fa fa-star${(this.state.rating >= 4 ? ' selected' : '-o')}`} aria-hidden="true" onClick={()=>this.onChange('rating', 4)} />
                                            <i className={`prod-spec-star fa fa-star${(this.state.rating >= 5 ? ' selected' : '-o')}`} aria-hidden="true" onClick={()=>this.onChange('rating', 5)} />
                                        </div>
                                    </div>
                                    <div className="prod-spec-detail-container">
                                        <span className="prod-spec-star-text">사용기간</span>
                                        <select
                                            className="prod-spec-use-period-select"
                                            value={this.state.useMonth < 12 ? this.state.useMonth+'개월' : '1년 이상'}
                                            onChange={(e)=>this.onChange('useMonth', e.target.value === '1년 이상' ? 12 : Number(e.target.value.slice(0, e.target.value.length-2)))}
                                        >
                                            {CommonUtil.range(1, 12).map((item, i) => (
                                                <option key={i}>{item<12 ? item+'개월' : '1년 이상'}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="prod-spec-detail-container">
                                        <span className="prod-spec-star-text">세부 항목</span>
                                        <div className="prod-spec-detail-content prod-spec-border">
                                            <div className="prod-spec-bar-guide">
                                                <span>나쁨</span>
                                                <span>보통</span>
                                                <span>좋음</span>
                                            </div>
                                            <div className="prod-spec-detail-bar">
                                                <span className="prod-spec-detail-bar-header">기능력</span>
                                                <span>
                                                <img src={greenCircle} className="prod-spec-detail-bar-circle selected" alt="bar-img" onClick={()=>this.onChange('functionality', 1)}/>
                                                    {this.state.functionality >= 2 ?
                                                        (<img src={greenLine} className="prod-spec-detail-bar-line selected" alt="bar-img" />) :
                                                        (<img src={grayLine} className="prod-spec-detail-bar-line" alt="bar-img" />)}
                                                    {this.state.functionality >= 2 ?
                                                        (<img src={greenCircle} className="prod-spec-detail-bar-circle selected" alt="bar-img" onClick={()=>this.onChange('functionality', 2)} />) :
                                                        (<img src={grayCircle} className="prod-spec-detail-bar-circle" alt="bar-img" onClick={()=>this.onChange('functionality', 2)} />)}
                                                    {this.state.functionality >= 3 ?
                                                        (<img src={greenLine} className="prod-spec-detail-bar-line selected" alt="bar-img" />) :
                                                        (<img src={grayLine} className="prod-spec-detail-bar-line" alt="bar-img" />)}
                                                    {this.state.functionality >= 3 ?
                                                        (<img src={greenCircle} className="prod-spec-detail-bar-circle selected" alt="bar-img" onClick={()=>this.onChange('functionality', 3)} />) :
                                                        (<img src={grayCircle} className="prod-spec-detail-bar-circle" alt="bar-img" onClick={()=>this.onChange('functionality', 3)} />)}
                                            </span>
                                            </div>
                                            <div className="prod-spec-detail-bar">
                                                <span className="prod-spec-detail-bar-header">저자극성</span>
                                                <span>
                                                <img src={greenCircle} className="prod-spec-detail-bar-circle selected" alt="bar-img" onClick={()=>this.onChange('nonIrritating', 1)}/>
                                                    {this.state.nonIrritating >= 2 ?
                                                        (<img src={greenLine} className="prod-spec-detail-bar-line selected" alt="bar-img" />) :
                                                        (<img src={grayLine} className="prod-spec-detail-bar-line" alt="bar-img" />)}
                                                    {this.state.nonIrritating >= 2 ?
                                                        (<img src={greenCircle} className="prod-spec-detail-bar-circle selected" alt="bar-img" onClick={()=>this.onChange('nonIrritating', 2)} />) :
                                                        (<img src={grayCircle} className="prod-spec-detail-bar-circle" alt="bar-img" onClick={()=>this.onChange('nonIrritating', 2)} />)}
                                                    {this.state.nonIrritating >= 3 ?
                                                        (<img src={greenLine} className="prod-spec-detail-bar-line selected" alt="bar-img" />) :
                                                        (<img src={grayLine} className="prod-spec-detail-bar-line" alt="bar-img" />)}
                                                    {this.state.nonIrritating >= 3 ?
                                                        (<img src={greenCircle} className="prod-spec-detail-bar-circle selected" alt="bar-img" onClick={()=>this.onChange('nonIrritating', 3)} />) :
                                                        (<img src={grayCircle} className="prod-spec-detail-bar-circle" alt="bar-img" onClick={()=>this.onChange('nonIrritating', 3)} />)}
                                            </span>
                                            </div>
                                            <div className="prod-spec-detail-bar">
                                                <span className="prod-spec-detail-bar-header">제품향</span>
                                                <span>
                                                <img src={greenCircle} className="prod-spec-detail-bar-circle selected" alt="bar-img" onClick={()=>this.onChange('sent', 1)}/>
                                                    {this.state.sent >= 2 ?
                                                        (<img src={greenLine} className="prod-spec-detail-bar-line selected" alt="bar-img" />) :
                                                        (<img src={grayLine} className="prod-spec-detail-bar-line" alt="bar-img" />)}
                                                    {this.state.sent >= 2 ?
                                                        (<img src={greenCircle} className="prod-spec-detail-bar-circle selected" alt="bar-img" onClick={()=>this.onChange('sent', 2)} />) :
                                                        (<img src={grayCircle} className="prod-spec-detail-bar-circle" alt="bar-img" onClick={()=>this.onChange('sent', 2)} />)}
                                                    {this.state.sent >= 3 ?
                                                        (<img src={greenLine} className="prod-spec-detail-bar-line selected" alt="bar-img" />) :
                                                        (<img src={grayLine} className="prod-spec-detail-bar-line" alt="bar-img" />)}
                                                    {this.state.sent >= 3 ?
                                                        (<img src={greenCircle} className="prod-spec-detail-bar-circle selected" alt="bar-img" onClick={()=>this.onChange('sent', 3)} />) :
                                                        (<img src={grayCircle} className="prod-spec-detail-bar-circle" alt="bar-img" onClick={()=>this.onChange('sent', 3)} />)}
                                            </span>
                                            </div>
                                            <div className="prod-spec-detail-bar">
                                                <span className="prod-spec-detail-bar-header">가성비</span>
                                                <span>
                                                <img src={greenCircle} className="prod-spec-detail-bar-circle selected" alt="bar-img" onClick={()=>this.onChange('costEffectiveness', 1)}/>
                                                    {this.state.costEffectiveness >= 2 ?
                                                        (<img src={greenLine} className="prod-spec-detail-bar-line selected" alt="bar-img" />) :
                                                        (<img src={grayLine} className="prod-spec-detail-bar-line" alt="bar-img" />)}
                                                    {this.state.costEffectiveness >= 2 ?
                                                        (<img src={greenCircle} className="prod-spec-detail-bar-circle selected" alt="bar-img" onClick={()=>this.onChange('costEffectiveness', 2)} />) :
                                                        (<img src={grayCircle} className="prod-spec-detail-bar-circle" alt="bar-img" onClick={()=>this.onChange('costEffectiveness', 2)} />)}
                                                    {this.state.costEffectiveness >= 3 ?
                                                        (<img src={greenLine} className="prod-spec-detail-bar-line selected" alt="bar-img" />) :
                                                        (<img src={grayLine} className="prod-spec-detail-bar-line" alt="bar-img" />)}
                                                    {this.state.costEffectiveness >= 3 ?
                                                        (<img src={greenCircle} className="prod-spec-detail-bar-circle selected" alt="bar-img" onClick={()=>this.onChange('costEffectiveness', 3)} />) :
                                                        (<img src={grayCircle} className="prod-spec-detail-bar-circle" alt="bar-img" onClick={()=>this.onChange('costEffectiveness', 3)} />)}
                                            </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="prod-spec-cell">
                                    <div className="prod-spec-detail-container">
                                        <div className="prod-spec-detail-container">
                                            <div className="prod-spec-detail-header">
                                                <h3 className="prod-spec-detail-header-inline">리뷰</h3>
                                                <div className="prod-spec-detail-header-boundary">
                                                    <h6>
                                                        리뷰를 솔직하고 자세히 적어주세요.
                                                    </h6>
                                                    <h6>
                                                        광고성, 대가성 리뷰나 욕설 및 무조건적인 비방이 포함된 리뷰 등
                                                    </h6>
                                                    <h6>
                                                        이용약관에 위배되는 리뷰는 임의로 삭제될 수 있습니다.
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="prod-spec-detail-content prod-spec-width-full">
                                                <textarea className="prod-spec-textarea"
                                                          value={this.state.reviewText}
                                                          onChange={(e)=>{this.onChange('reviewText', e.target.value.slice(0, 1000))}} />
                                            </div>
                                            <span className="prod-spec-review-content-count">
                                                {this.state.reviewText.length}/1000
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="prod-spec-row">
                                <div className="prod-spec-cell">
                                    <div className="prod-spec-detail-container">
                                        <div className="prod-spec-detail-header">
                                            <span>첨부파일</span>
                                            <span className="prod-spec-detail-header-boundary">|</span>
                                            <h6 className="prod-spec-detail-header-inline">
                                                최대 10장까지 업로드 가능합니다.
                                            </h6>
                                        </div>
                                        <div className="prod-spec-detail-content">
                                            <input className="prod-spec-file-invisible" type="file" name="review-images" multiple="multiple"
                                                   onChange={(e) => this.onChange('imageFiles', Object.keys(e.target.files).map((key) => e.target.files[key]))}
                                                   id="image-upload"
                                            />
                                            <label htmlFor="image-upload" className="prod-spec-upload-image-label">파일 선택</label>
                                            <span>
                                                {this.state.imageFiles.length === 0 ? <span className="prod-spec-upload-text">선택한 파일 없음</span> : null}
                                                {this.state.imageFiles.map(image => {
                                                    return (
                                                        <span key={image.name} className="prod-spec-upload-text">
                                                            {image.name}
                                                            <i className="fas fa-times prod-spec-upload-red-x" onClick={() => this.deleteImageFile(image.name)} />
                                                        </span>
                                                    );
                                                })}
                                            </span>
                                        </div>
                                    </div>

                                </div>
                                <div className="prod-spec-cell">
                                    <button className="prod-spec-review-enroll-button"
                                            onClick={(e) => this.handleReviewAdd()}
                                    >
                                        등록
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>) : (!this.state.login && this.state.reviewApiLoaded ?
                (loginContainer('리뷰 작성은 로그인 후 이용하실 수 있습니다.')) : null));

        const toxicIngredientModal = (
            <div className="modal fade prod-spec-ingredient-modal" id="toxic-ingredient-modal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">성분 독성 정보</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <img alt="" src={dangerIcon1} />
                                <div>호흡기 과민성</div>
                                <div>흡입시 알레르기성 반응, 천식 또는 호흡곤란 등을 일으킬 수 있는 성분입니다.</div>
                            </div>
                            <div>
                                <img alt="" src={dangerIcon2} />
                                <div>피부 과민성</div>
                                <div>알레르기성 피부 반응을 일으킬 수 있는 성분입니다.</div>
                            </div>
                            <div>
                                <img alt="" src={dangerIcon3} />
                                <div>발달/생식 독성</div>
                                <div>생식기능, 생식능력 또는 태아의 발생, 발육에 유해한 영향을 주거나 그것이 의심되는 성분입니다. 특정한 노출 경로 및 환경에 따라 나타나므로 해당 성분이 포함되어 있다고 해서 생식 독성을 일으키는 제품이라고 단정할 순 없습니다.</div>
                            </div>
                            <div>
                                <img alt="" src={dangerIcon4} />
                                <div>발암성</div>
                                <div>인체에 암을 일으키거나 그러한 가능성이 있는 성분입니다. 특정한 노출 경로 및 환경에 따라 나타나므로 해당 성분이 포함되어 있다고 해서 암을 일으키는 제품이라고 단정할 순 없습니다.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        const interestIngredientModal = (
            <div className="modal fade prod-spec-interest-modal" id="interest-ingredient-modal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle2">관심 성분</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <img alt="" src={interestIcon1} />
                                <div>소듐라우릴설페이트(SLS), 소듐라우레스설페이트(SLES)는 유해성 논란으로 소비자들의 관심이 큰 성분이며, 여기에는 소듐코코설페이트, 암모늄라우릴설페이트 등 유사성분도 포함됩니다.</div>
                            </div>
                            <div>
                                <img alt="" src={interestIcon2} />
                                <div>양이온 계면활성제나 살균제에 주로 쓰이는 4급 암모늄염은 독성 논란이 있어 소비자들의 관심이 큰 성분이며, 여기에는 4급 암모늄 계열의 모든 성분이 포함됩니다.</div>
                            </div>
                            <div>
                                <img alt="" src={interestIcon3} />
                                <div>"향료"라고 성분을 표기한 경우로, 구체적인 성분을 알 수 없습니다.</div>
                            </div>
                            <div>
                                <img alt="" src={interestIcon4} />
                                <div>"색소"라고 성분을 표기한 경우, 색소 성분명이 불분명한 경우, 각종 콜타르염료(Coal Tar Dyes)가 사용된 경우가 포함됩니다. 또한 "형광증백제"라는 성분표시의 경우와 형광증백제 기능을 하는 성분이 포함됩니다.</div>
                            </div>
                            <div>
                                <img alt="" src={interestIcon5} />
                                <div>전 국민이 관심을 갖는 가습기 살균제 성분으로 MIT / CMIT / PHMG / PGH가 포함됩니다.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        const selectedIngredientModal = (
            <div className="modal fade prod-spec-selected-modal" id="selected-ingredient-modal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div>
                                {
                                    this.state.selectedIngredients.map((item, i) =>
                                        (<div key={i}>
                                            <img alt="" src={item.imgUrl} style={{width:'auto', height:'100%'}}/>
                                            <div>
                                                <div>{item.korName}</div>
                                                <div>{item.engName}</div>
                                            </div>
                                        </div>)
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        return (<React.Fragment>
                {toxicIngredientModal}
                {interestIngredientModal}
                {selectedIngredientModal}
                <div className="prod-spec"> {/* Outer box contains every componenets */}
                    <div className="cate-header"> {/* Category header */}
                        카테고리 > {category==='living' ? '가정용 화학제품' : '유야용 화장품'} > <span style={{color: '#32b8a4', fontWeight: '600'}}>{productData.category}</span>
                    </div>

                    <div className="prod-info"> {/* image + info */}
                        <div className="color-box" />
                        <div className="prod-outer-img"> {/* product image */}
                            <img className="prod-img"
                                 src={`${process.env.S3_URL}/product-images/${CategoryUtil.korSubToEngMain(productData.category)}-product-images/${productData.brand}/${productData.name}.jpg`}
                                 alt="" />
                        </div>
                        <div className="prod-texts"> {/* all text container */}
                            <div className="brand-name" onClick={this.brandSearch}>{productData.brand}</div>
                            <div className="prod-name">
                                <h1>{productData.name}</h1>
                            </div>
                            <div className="rating-info"> {/* rating stars and score */}
                                <RatingRow config={{selected:this.state.rateAverage ,hideSubHeading:true,size:'22px',alignStart:true,count:productData.rateCount}}/>
                                <div className="rating-score">{this.state.rateAverage}</div>
                            </div>

                            <hr style={{color: 'gray'}}/>

                            <div className="icons-list"> {/* icons list */}
                                {this.state.login ?
                                    (<div className="icon">
                                        <i className={`fa fa-home prod-icon ${((category==='living' && this.state.myHouseSelected) ||
                                            (category!=='living' && this.state.myCosmeticSelected)) ? 'prod-icon-selected' : ''}`}
                                           onClick={()=>this.houseAndLikeToggle(category, id)}
                                           aria-hidden="true"
                                        />
                                        <p style={{fontSize: '9px'}}>우리집 {category==='living' ? '화학제품' : '화장품'}</p>
                                    </div>) :
                                    null}
                                {this.state.login ?
                                    (<div className="icon">
                                        <i className={`fa fa-heart prod-icon ${this.state.likeSelected ? 'prod-icon-selected' : ''}`}
                                           aria-hidden="true"
                                           onClick={()=>this.houseAndLikeToggle('like', id)}
                                        />
                                        <p style={{fontSize: '9px'}}>찜하기</p>
                                    </div>) :
                                    null}
                                <div className="icon">
                                    <a href={`${config.PRODUCT_CHECK_URL}${productData.name}`} target="_blank" rel="noopener noreferrer">
                                        <i className="fa fa-krw" aria-hidden="true" />
                                    </a>
                                    <p className="check-para" style={{fontSize: '9px'}}>가격정보</p>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-share-alt" />
                                    <p style={{fontSize: '9px'}}>링크공유</p>
                                </div>
                            </div>

                            {category === 'living' ?
                                (<table className="prod-table">
                                    <tbody>
                                    <tr style={{height: '60px', borderBottom: '1px solid rgba(100, 100, 100, 0.2)'}}>
                                        <td style={{width: '110px', borderRight: '1px solid rgba(100, 100, 100, 0.2)'}}>성분
                                            공개 여부
                                        </td>
                                        <td>
                                            <div className="img-in-table">
                                                <img className="img-fluid" style={{maxHeight: '30px', maxWidth: '30px'}}
                                                     src={selectedEmoji} alt=""/>
                                            </div>
                                            <div className="text-in-table" style={{height: '60px'}}>{selectedText}</div>
                                        </td>
                                    </tr>
                                    <tr style={{height: '60px', borderBottom: '1px solid rgba(100, 100, 100, 0.2)'}}>
                                        <td style={{width: '110px', borderRight: '1px solid rgba(100, 100, 100, 0.2)'}}>성분
                                            공개 요청
                                        </td>
                                        <td>
                                            <div className="img-in-table">
                                                <img className="img-fluid" style={{maxHeight: '30px', maxWidth: '30px'}}
                                                     src={require('../../../../assets/images/product_spec_icons/request_people.png')}
                                                     alt=""/>
                                            </div>
                                            <div className="text-in-table" style={{height: '60px'}}>{this.state.ingredientRequestNum}명</div>
                                            {(productData.ingredient !== 'O' && this.state.ingredientRequest === false && this.state.login) ?
                                                (<button className="req-button" onClick={()=>this.handleIngredientRequest()}>
                                                    성분 공개 요청하기
                                                </button>) : null}
                                        </td>
                                    </tr>
                                    <tr style={{height: '100px'}}>
                                        <td style={{
                                            width: '110px',
                                            borderRight: '1px solid rgba(100, 100, 100, 0.2)'
                                        }}>인증정보
                                        </td>
                                        <td style={{width: '370px'}}>
                                            <div className="sub-sell" style={{
                                                height: '60px',
                                                borderBottom: '1px solid rgba(100, 100, 100, 0.2)'
                                            }}>
                                                <div className="img-in-table">
                                                    {
                                                        productData.eco ?
                                                            (<img className="img-fluid"
                                                                  style={{maxHeight: '30px', maxWidth: '30px'}}
                                                                  src={require('../../../../assets/images/product_spec_icons/eco_friendly.png')}
                                                                  alt=""/>) :
                                                            null
                                                    }
                                                </div>
                                                <div className="text-in-table"
                                                     style={{height: '60px'}}>{productData.eco}</div>
                                            </div>
                                            <div className="sub-sell" style={{height: '40px'}}>
                                                <div className="img-in-table"
                                                     style={{color: 'gray', fontSize: '11px'}}>자가검사번호 :
                                                </div>
                                                <div className="text-in-table">{productData.testNum}</div>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>) :
                                null
                            }

                            {category === 'living' ?
                                (<ul className="description-list">
                                    <li>생활화학제품 성분정보는 제조 / 유통 업체에서 공개한 자료를 기반으로 제공되며, 함량 정보는 포함하지 않습니다.</li>
                                    <li>아래 정보들은 제품 자체의 위해성을 뜻하진 않으며, 해당성분의 노출경로나 함량 따라 유해 여부가 달라질 수 있으니, 참고사항으로 봐주시기
                                        바랍니다.
                                    </li>
                                    <li>정보 업데이트 과정에서 크고 작은 오류가 발생할 수 있으니 문제를 발견하시면 문의하기 메뉴를 이용해주세요.</li>
                                    <li>해당 정보를 허가 없이 상업적으로 이용하는 경우, 법적조치를 받을 수 있습니다.</li>
                                </ul>) :
                                (<ul className="description-list">
                                    <li>화장품 전성분 정보는 제조 / 유통 업체에서 공개한 자료를 기반으로 제공되며, 함량이 높은 순으로 기재됩니다.</li>
                                    <li>아래 정보들은 제품 자체의 위해성을 뜻하진 않으며, 해당성분의 노출경로나 함량 따라 유해 여부가 달라질 수 있으니, 참고사항으로 봐주시기
                                        바랍니다.
                                    </li>
                                    <li>정보 업데이트 과정에서 크고 작은 오류가 발생할 수 있으니 문제를 발견하시면 문의하기 메뉴를 이용해주세요.</li>
                                    <li>해당 정보를 허가 없이 상업적으로 이용하는 경우, 법적조치를 받을 수 있습니다.</li>
                                </ul>)
                            }
                        </div>
                    </div>

                    <div className="ui top attached tabular menu tab-list"> {/* Tap menu bar */}
                        <a className={`tab-name ${this.state.aboutTab ? "active item" : "item"}`} data-tab="about" href="#about"
                           onClick={(e) => {e.preventDefault(); this.toggleTap(true)}}>상세 정보</a>
                        <a className={`tab-name ${this.state.reviewTab ? "active item" : "item"}`} data-tab="review" href="#review"
                           onClick={(e) => {e.preventDefault(); this.toggleTap(false)}}>리뷰({this.state.reviewCount}개)</a>
                    </div>
                    {/* tap menu contents */}
                    <div className={`ui bottom attached tab segment tab-content ${this.state.aboutTab ? "active" : ""}`} data-tab="about" id="about">
                        <div className="ingred-bad-special">
                            {this.renderBadIcons()} {/* Bad icons */}
                            {this.renderSpecialIcons()} {/* Special icons */}
                        </div>
                        {this.renderIngredients(category)} {/* Ingredient table */}
                        <div className="doughnut-container"> {/* Ingredient Doughnut */}
                            {this.renderDoughnut(category)}
                        </div>
                    </div>
                    <div className={`ui bottom attached tab segment tab-content ${this.state.reviewTab ? "active" : ""}`} data-tab="review" id="review">
                        {reviewAdditionTab}
                        <ProdSpecReviewSummary category={category} id={id}/>
                        <div className="prod-spec-review-container">
                            <div className="prod-spec-review-title">베스트 리뷰</div>
                            {(this.state.bestReview && !(Object.keys(this.state.bestReview).length === 0 && this.state.bestReview.constructor === Object)) ?
                                <ReviewCard data={this.state.bestReview} isLogin={this.state.login} propsChangeCount={1}/> :
                                null}
                        </div>
                        <div className="prod-spec-review-container">
                            <div className="prod-spec-review-title">
                                리뷰 전체 보기
                            </div>
                            <div className="prod-spec-sorting-menu">
                                <span className={this.state.sorting==='late' ? 'selected' : ''} onClick={()=>this.handleReviewSorting('late')}>
                                    최신순
                                </span>
                                <span className={this.state.sorting==='like' ? 'selected' : ''} onClick={()=>this.handleReviewSorting('like')}>
                                    호감수
                                </span>
                                <span className={this.state.sorting==='rating' ? 'selected' : ''} onClick={()=>this.handleReviewSorting('rating')}>
                                    평점수
                                </span>
                            </div>
                            {this.state.reviews.map((review, i) => (
                                <ReviewCard data={review} key={i} isLogin={this.state.login} propsChangeCount={this.state.reviewListChangeCount}/>
                            ))}
                        </div>
                        {!this.state.login ? loginContainer('로그인 후 이용하실 수 있습니다.', true) : null}
                    </div>
                </div>
            </React.Fragment>
        );
    };
}