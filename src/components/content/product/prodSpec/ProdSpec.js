import React from 'react';
import './ProdSpec.css';
import { RatingRow } from './Ratings';
import { LivingDoughNut, CosmeticDoughNut} from './DoughNut';
import { LivingIngredientModal, CosmeticIngredientModal } from './IngredientModal';
import { LivingIngredientRow, CosmeticIngredientRow } from './IngredientRow';
import config from '../../../../config';
import { CategoryUtil } from '../../../../util';

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
    x:'정보없음 (중간위험)',
    a:'매우 낮은 위험',
    b:'낮은 위험',
    c:'높은 위험',
    d:'높은 위험',
    f:'매우 높은 위험'
};

const cosmeticText = {
    x:'정보없음 (중간위험)',
    a:'낮은 위험',
    b:'중간 위험',
    c: '매우 높은 위험'
};

export class ProdSpec extends React.Component{

    state = {
        ingredientList: null,
        modalData:{},
        aboutTab: true,
        reviewTab: false,
        productData: null,
        ingredientRequestNum: 0
    };

    componentDidMount = async ()=> {
        const id = this.props.match.params.id;
        const category = CategoryUtil.korSubToEngMain(this.props.match.params.category);

        let res = await axios.get(`${process.env.API_URL}/api/product/details?category=${category}&productId=${id}`);
        this.setState({
            productData: res.data.product,
            ingredientList: res.data.ingredient
        });

        res = await axios.get(`${process.env.API_URL}/api/ask/countIngredOpen?productIndex=${res.data.product.index}`);
        this.setState({
            ingredientRequestNum: res.data.totalNum
        });
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
                    <img src={require('../../../../assets/images/product_spec_icons/detail.jpg')} style={{maxHeight:'20px', maxWidth:'20px', marginLeft: "10px"}} alt=""/>
                </div>  
                <div className="ingred-icon">
                    <img className="img-fluid"
                         src={require(`../../../../assets/images/product_spec_icons/etc1_${slsSles?'red':'grey'}.png`)}
                         style={{maxHeight:'55px',maxWidth:'55px'}} alt=""/>
                </div>
                <div className="ingred-icon">
                    <img className="img-fluid"
                         src={require(`../../../../assets/images/product_spec_icons/etc2_${ammonium?'red':'grey'}.png`)}
                         style={{maxHeight:'55px',maxWidth:'55px'}} alt=""/>
                </div>
                <div className="ingred-icon">
                    <img className="img-fluid"
                         src={require(`../../../../assets/images/product_spec_icons/etc3_${scent?'red':'grey'}.png`)}
                         style={{maxHeight:'55px',maxWidth:'55px'}} alt=""/>
                </div>
                <div className="ingred-icon">
                    <img className="img-fluid"
                         src={require(`../../../../assets/images/product_spec_icons/etc4_${color?'red':'grey'}.png`)}
                         style={{maxHeight:'55px',maxWidth:'55px'}} alt=""/>
                </div>
                <div className="ingred-icon">
                    <img className="img-fluid"
                         src={require(`../../../../assets/images/product_spec_icons/etc5_${humid?'red':'grey'}.png`)}
                         style={{maxHeight:'55px',maxWidth:'55px'}} alt=""/>
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
                    나쁜 성분
                    <img src={require('../../../../assets/images/product_spec_icons/detail.jpg')} style={{maxHeight:'20px', maxWidth:'20px', marginLeft: "10px"}} alt=""/>
                </div>
                <div className="ingred-icon">
                    <img className="img-fluid"
                         src={require(`../../../../assets/images/product_spec_icons/ingred_respitory${echaBreath?'_true':''}.png`)}
                         style={{maxHeight:'55px',maxWidth:'55px'}} alt=""/>
                    <div>호흡 독성</div>
                </div>
                <div className="ingred-icon">
                    <img className="img-fluid"
                         src={require(`../../../../assets/images/product_spec_icons/ingred_skin${echaSkin?'_true':''}.png`)}
                         style={{maxHeight:'55px',maxWidth:'55px'}} alt=""/>
                    <div>피부 자극</div>
                </div>
                <div className="ingred-icon">
                    <img className="img-fluid"
                         src={require(`../../../../assets/images/product_spec_icons/ingred_development${echaDev?'_true':''}.png`)}
                         style={{maxHeight:'55px',maxWidth:'55px'}} alt=""/>
                    <div>발달/생식 독성</div>
                </div>
                <div className="ingred-icon">
                    <img className="img-fluid"
                         src={require(`../../../../assets/images/product_spec_icons/ingred_cancer${echaCancer?'_true':''}.png`)}
                         style={{maxHeight:'55px',maxWidth:'55px'}} alt=""/>
                    <div>발암성</div>
                </div>
            </div>
        )
    };
    
    updateModalData=(item)=>this.setState({modalData:item});

    renderIngredients=(category)=>{
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
                                    korName={ingredient.name}
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

    render = () => {
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

        return (<React.Fragment>
            <div className="prod-spec"> {/* Outer box contains every componenets */}
                <div className="cate-header"> {/* Category header */}
                    카테고리 > {category==='living' ? '가정용 화학제품' : '유야용 화장품'} > <span style={{color: '#32b8a4', fontWeight: '600'}}>{productData.category}</span>
                </div>

                <div className="prod-info"> {/* image + info */}
                    <div className="color-box"></div>
                    <div className="prod-outer-img"> {/* product image */}
                        <img className="prod-img"
                             src={`${process.env.S3_URL}/product-images/${CategoryUtil.korSubToEngMain(productData.category)}-product-images/${productData.brand}/${productData.name}.jpg`}
                             alt=""/>
                    </div>
                    <div className="prod-texts"> {/* all text container */}
                        <div className="brand-name">{productData.brand}</div>
                        <div className="prod-name">
                            <h1>{productData.name}</h1>
                        </div>
                        <div className="rating-info"> {/* rating stars and score */}
                            <RatingRow config={{selected:Math.round(productData.rateSum/productData.rateCount*100)/100,hideSubHeading:true,size:'22px',alignStart:true,count:productData.rateCount}}/>
                            <div className="rating-score">{Math.round(productData.rateSum/productData.rateCount*100)/100}</div>
                        </div>

                        <hr style={{color: 'gray'}}/>

                        <div className="icons-list"> {/* icons list */}
                            <div className="icon">
                                <i className="fa fa-home" aria-hidden="true" />
                                <p style={{fontSize: '9px'}}>우리집 화학제품</p>
                            </div>
                            <div className="icon">
                                <i className="fa fa-heart" aria-hidden="true" />
                                <p style={{fontSize: '9px'}}>찜하기</p>
                            </div>
                            <div className="icon">
                                <a href={`${config.PRODUCT_CHECK_URL}${productData.name}`}>
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
                                            <button className="req-button">성분 공개 요청하기</button>
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
                       

                       <ul className="description-list">
                            <li>성분 정보는 제조 / 유통 업체에서 공개한 자료를 기반으로 제공되며, 함량에 관한 정보를 전달하지 않습니다.</li>
                            <li>위 정보들은 제품 자체의 위해성을 뜻하진 않으며, 해당성분의 노출경로나 함량 따라 유해 여부가 달라질 수는 있으니, 참고사항으로 봐주시기 바랍니다.</li>
                            <li>정보 업데이트 과정에서 크고 작은 오류가 발생할 수 있으니 문제를 발견하시면 문의하기 메뉴를 이용해주세요.</li>
                            <li>해당 정보를 허가 없이 상업적으로 이용하는 경우, 법적조치를 받을 수 있습니다.</li>
                       </ul>
                    </div>
                </div>

                <div className="ui top attached tabular menu tab-list"> {/* Tap menu bar */}
                    <a className={`tab-name ${this.state.aboutTab ? "active item" : "item"}`} data-tab="about" href="#about" 
                        onClick={(e) => {e.preventDefault(); this.toggleTap(true)}}>상세 정보</a>
                    <a className={`tab-name ${this.state.reviewTab ? "active item" : "item"}`} data-tab="review" href="#review" 
                        onClick={(e) => {e.preventDefault(); this.toggleTap(false)}}>리뷰(10개)</a>
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
                    Second
                </div>

               {/* <div className="prodspec_container">
                    <div className="prodspec_inner">
                        <div className="row">
                            <div className="col-lg-9 col-md-9 col-sm-12">
                                <div className="prod_heading">
                                    <div className="prod-name-detl">
                                        카테고리 > 가정용 화학제품 > {this.state.category}
                                    </div>
                                </div>
                                <div className="prod_detail">
                                    <div className="prod_upr_img">
                                        <div className="prod_img">
                                            <img className="img-responsive" src={`${config.CLIENT_SERVER}/chemical/item_img/${this.state.image}`} alt=""/>
                                        </div>
                                    </div>

                                    <div className="prod_desp">
                                        <div className="prod_name">
                                            <p>{this.state.brand}</p>
                                            <h1>{this.state.name}</h1>

                                        </div>
                                        <RatingRow config={{selected:Math.round(this.state.star),hideSubHeading:true,size:'22px',alignStart:true}}/>
                                        <div className="prod_icons">
                                            <div className="prod_icon_info">
                                                <i className="fa fa-home" aria-hidden="true"></i>
                                                {/* <img src={ require('../../../../assets/images/home.svg') } alt=""/>
                                                <p>저장</p>
                                            </div>
                                            <div className="prod_icon_info">
                                                <i className="fa fa-heart" aria-hidden="true"></i>
                                                {/* <img src={ require('../../../../assets/images/heart.svg') } alt=""/>
                                                <p>찜</p>
                                            </div>
                                            <div className="prod_icon_info prod-check-3rd-div">
                                                {/* <i className="fa fa-share-alt"></i> *
                                                <a href={`${config.PRODUCT_CHECK_URL}${this.state.name}`}>
                                                    <i className="fa fa-krw" aria-hidden="true"></i>
                                                </a>
                                                
                                                {/* <img src={ require('../../../../assets/images/checkPrice.svg') } alt=""/>
                                                <p className="check-para">가격정보</p>
                                            </div>
                                            <div className="prod_icon_info">
                                                <i className="fa fa-share-alt"></i>
                                                {/* <img src={ require('../../../../assets/images/share.svg') } alt=""/>
                                                <p>공유</p>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                                {/* finish product detail
                                
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12">
                                <div className="prod_right_div" style={{marginTop:'106px'}}>
                                    <div className="prod-rt_div_inr">
                                        <i className="fa fa-heart" aria-hidden="true"></i>
                                        <p>성분공개여부</p>
                                    </div>
                                    <div className="prod-rt_div_inr-1" style={{textAlign:'center'}}>
                                    <img className="img-fluid" style={{maxHeight:'50px',maxWidth:'50px'}} src={selectedEmoji} alt=""/>
                                        {/* <i className="fa fa-heart" aria-hidden="true"></i>
                                        <p>{selectedText}</p>
                                    </div>
                                    <div className="prod-rt_div_inr" style={{marginTop:'33px'}}>
                                        <i className="fa fa-heart" aria-hidden="true"></i>
                                        <p>성분공개요청</p>
                                    </div>
                                    <div className="prod-rt_div_inr-1" style={{textAlign:'center'}}>
                                    <img className="img-fluid" src={require('../../../../assets/images/icons/people-icon.png')} alt=""/>
                                        {/* <i className="fa fa-heart" aria-hidden="true"></i>
                                        <p>{this.state.open_request}명</p>
                                    </div>
                                </div>
                                {/* <div className="prod_addn">
                                    <div className="prod_addn_info prod-ingt-info">
                                    <i className="fa fa-heart" aria-hidden="true"></i>
                                    <h1>성분구성</h1>
                                    {/* <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                    </div>
                                {/* </div>
                            </div>
                        </div>
                    </div>
                {/* finish product detIL

                {/* PRODUCT specification
                { this.state.ingredient_list 
                     && this.state.ingredient_list.total.length>0 ? 
                     this.renderProductTable():
                        <h2 style={{textAlign:'center',color:'#b5b3b3',margin:'40px'}}>제품 정보가 없습니다!</h2>
                }
                {/* finish product specification
                </div>
                </div> */}
            {/* <div className="row">
                <SecondSection/>
                <ThirdSection/>
                <Comments/> */}
            </div>
            </React.Fragment>
        );
    };
}
