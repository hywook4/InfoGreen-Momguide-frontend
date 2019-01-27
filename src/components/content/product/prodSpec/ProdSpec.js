import React from 'react';
import './ProdSpec.css';
import {RatingRow} from './Ratings';
import {SecondSection} from './SecondSection';
import {ThirdSection} from './ThirdSection';
import {Comments} from './CommentsSection';
import {DoughNut} from './DoughNut';
import {IngredientModal} from './IngredientModal';
import {IngredientRow} from './IngredientRow';
import config from '../../../../config';

import axios from 'axios';

const emoji={
    // should be replaced by actual Asset urls to avoid memory overlaods.
    angry:require('../../../../assets/images/opened-0.png'),
    okay:require('../../../../assets/images/opened-1.png'),
    happy:require('../../../../assets/images/opened-2.png')
}

const openness={
    bad:'성분 공개가\n되어있지 않습니다',
    good:'성분 공개가\n되어 있습니다',
    great: '성분 공개가\n잘되어 있어요!'
}

const abcdText={
    x:'정보없음 (중간위험)',
    a:'매우 낮은 위험',
    b:'낮은 위험',
    c:'높은 위험',
    d:'높은 위험',
    e:'',
    f:'매우 높은 위험'
}

export class ProdSpec extends React.Component{

    state = {ingredient_list: null,modalData:{}}
    updateItemInfo = (itemInfo)=>this.setState({...itemInfo.data});

    componentWillMount=async ()=> {
        const name = this.props.match.params.name;

        var params = new URLSearchParams();
        params.append('name', `${name}`);
        var itemInfo = await axios.post(`${config.CLIENT_SERVER}/chemical/item_info.php`, params);
        this.updateItemInfo(itemInfo);

        params = new URLSearchParams();
        params.append("name", itemInfo.data.name);
        var res = await axios.post(`${config.CLIENT_SERVER}/chemical/ingredient_list.php`, params);
        this.setState({ingredient_list: res.data});
        console.log('ingredient_list',res.data);
    }
    
    renderRatings=(cnfg)=><RatingRow config={cnfg} />

    renderEtcSection=()=>{
        return (
        <div className="danger-icons-inr">
            <div className="danger-icon-head">
                <i className="fa fa-heart" aria-hidden="true"></i>
                <h1>관심성분</h1>
            </div>   
            <div className="icons-all">
                <div className="dngr-icon-inr-div">
                        <img className="img-fluid" src={require(`../../../../assets/images/etc1_${this.state.etc_1===0?'grey':'red'}.png`)} alt=""/>
                        {/* <p>Danger</p> */}
                    </div>
                <div className="dngr-icon-inr-div">
                <img className="img-fluid" src={require(`../../../../assets/images/etc2_${this.state.etc_2===0?'grey':'red'}.png`)} alt=""/>
                        {/* <p>Danger</p> */}
                    </div>
                <div className="dngr-icon-inr-div">
                <img className="img-fluid" src={require(`../../../../assets/images/etc3_${this.state.etc_3===0?'grey':'red'}.png`)} alt=""/>
                        {/* <p>Danger</p> */}
                    </div>
                <div className="dngr-icon-inr-div">
                <img className="img-fluid" src={require(`../../../../assets/images/etc4_${this.state.etc_4===0?'grey':'red'}.png`)} alt=""/>
                        {/* <p>Danger</p> */}
                    </div>
                <div className="dngr-icon-inr-div">
                <img className="img-fluid" src={require(`../../../../assets/images/etc5_${this.state.etc_5===0?'grey':'red'}.png`)} alt=""/>
                    {/* <p>Danger</p> */}
                </div>
            </div>
        </div>
     )
    }

    renderDangerIcons=()=>{
        return(
            <div className="icons-all">
                <div className="dngr-icon-inr-div">
                    <img className="img-fluid" src={require('../../../../assets/images/icons/skin-irritation.svg')} alt=""/>
                    {/* <p>Danger</p> */}
                    {/* <span className="tooltiptext">
                        <div>
                            <img src={require('../../../../assets/images/icons/iconB.png')} alt=""/>
                        </div>
                        <div>
                            <h2><b>Ingredient(C8-16)</b></h2>
                            <p>Alkyl polyglucoside(C8-16)</p>
                        </div>
                    
                    </span> */}
                </div>
                <div className="dngr-icon-inr-div">
                    <img className="img-fluid" src={require('../../../../assets/images/icons/respiration-toxic.svg')} alt=""/>
                    {/* <p>Danger</p> */}
                </div>
                <div className="dngr-icon-inr-div">
                    <img className="img-fluid" src={require('../../../../assets/images/icons/development-toxic.svg')} alt=""/>
                    {/* <p>Danger</p> */}
                </div>
                <div className="dngr-icon-inr-div">
                    <img className="img-fluid" src={require('../../../../assets/images/icons/cancer.svg')} alt=""/>
                    {/* <p>Danger</p> */}
                </div>
                <div className="dngr-icon-inr-div">
                <img className="img-fluid" src={require('../../../../assets/images/icons/eye-irritation.svg')} alt=""/>
                {/* <p>Danger</p> */}
            </div>
        </div>
        )
    }
    
    updateModalData=(item)=>this.setState({modalData:item})

    renderIngredients=()=>{
        return (
            <div className="ingr-table">
            <div className="container">
                  <div className="prod-ingr-ctn">
                    <div className="prod-ingr-upr-div">
                        <div className="prod-ingr-tbl-name">
                            <i className="fa fa-heart" aria-hidden="true"></i>
                            <h1>전체성분</h1>
                        </div>
                        <div className="prod-ingr-tbl">
                            <table className="table">
                            <thead>
                                <tr>
                                    <th>성분등급</th>
                                    <th>성분명</th>
                                    <th style={{textAlign:'center'}}>주의성분여부</th>
                                    <th style={{textAlign:'center'}}>유해성분여부</th>
                                </tr>
                                    {Object.keys(this.state.ingredient_list.total).map(key => 
                                        <IngredientRow
                                            key={key}
                                            data={this.state.ingredient_list.total[key]}
                                            letter={this.state.ingredient_list.total[key].ewg_rank}
                                            korName={this.state.ingredient_list.total[key].name}
                                            engName={this.state.ingredient_list.total[key].name_eng}
                                            handleClick={this.updateModalData}
                                        />
                                    )}
                            </thead>
                            </table>
                            <IngredientModal texts={abcdText} data={this.state.modalData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    }

    renderDougnutAndWarning=()=>{
        return (
            <React.Fragment>
                <DoughNut texts={abcdText} data={{...this.state}}/>
                {/* desp in green */}
                <div className="desp-green">
                    <div className="desp-greenery">
                        <i className="fa fa-heart" aria-hidden="true"></i>
                        <h1>인증번호</h1>
                        <p style={{display:'block'}}>{this.state.code?this.state.code:'자가검사번호'}</p>
                    </div>
                    {
                        (this.state.auth_2?
                            <React.Fragment>
                                <div className="desp-greenery-img">
                                    <img src={require('../../../../assets/images/nature-friendly.png')} alt=""/>
                                </div>
                                <div className="desp-greenery-rslt">
                                    <h1>{this.state.auth_2}</h1>
                                </div>
                            </React.Fragment>:''
                        )
                    }
                </div>
            </React.Fragment>
        )
    }

    renderProductTable=()=>{
        return (
            <div className="product_table">
                    <div className="prod-table-container">
                        <div className="row">
                            <div className="col-lg-9 col-md-9 col-sm-12">
                            <div className="prod_addn">
                                    <div className="prod_addn_info">
                                        <p>*해당되는 성분의 포함 여부만 알려드려요. 제품 자체의 유해성과는 거리가 있습니다.</p>
                                    </div>
                            </div>

                            {/* danger icons */}
                            <div className="danger-icons">
                                <div className="danger-icons-inr">
                                    <div className="danger-icon-head">
                                        <i className="fa fa-heart" aria-hidden="true"></i>
                                        <h1>나쁜 성분</h1>
                                        {/* <p data-tip="dfghj" data-html={true}>Tooltip</p>
                                        <ReactTooltip html={true} /> */}
                                    </div>
                                    {this.renderDangerIcons()}
                                </div>
                                {this.renderEtcSection()}
                                
                            </div>
                            {/* danger icons div finish */}
                            {/* ingredients icons */}
                                {this.renderIngredients()}
                            {/* finish ingredients icons */}
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12">
                                {this.renderDougnutAndWarning()}
                            </div>
                        </div>
                    </div>
                </div>
        )
    }

    render=()=>{
     
        let selectedEmoji = null;
        let selectedText = null;

        if(this.state.opened ==='0'){
            selectedEmoji = emoji.angry;
            selectedText = openness.bad;
        }else if(this.state.opened ==='1'){
            selectedEmoji = emoji.okay;
            selectedText = openness.good;
        }else if(this.state.opened ==='2'){
            selectedEmoji = emoji.happy;
            selectedText = openness.great;
        }

        console.log('SELECTED EMOJI',emoji.angry,this.state.opened,selectedEmoji);

        return this.state.ingredient_list ?
        ( 
            <React.Fragment>
            <div className="prod-spec"> {/* Outer box contains every componenets */}

                <div className="cate-header"> {/* Category header */}
                    카테고리 > 가정용 화학제품 > <span style={{color: '#32b8a4', fontWeight: '600'}}>{this.state.category}</span>
                </div>

                <div className="prod-info"> {/* image + info */}
                    <div className="color-box"></div>
                    <div className="prod-outer-img"> {/* product image */}
                        <img className="prod-img" src={`${config.CLIENT_SERVER}/chemical/item_img/${this.state.image}`} alt=""/>
                    </div>
                    <div className="prod-texts"> {/* all text container */}
                        <div className="brand-name">{this.state.brand}</div>
                        <div className="prod-name">
                            <h1>{this.state.name}</h1>
                        </div>
                        <div className="rating-info"> {/* rating stars and score */}
                            <RatingRow config={{selected:Math.round(this.state.star),hideSubHeading:true,size:'22px',alignStart:true}}/>
                            <div className="rating-score">4.0</div>
                        </div>

                        <hr style={{color: 'gray'}}/>

                        <div className="icons-list"> {/* icons list */}
                            <div className="icon">
                                <i className="fa fa-home" aria-hidden="true"></i>
                                <p style={{fontSize: '9px'}}>우리집 화학제품</p>
                            </div>
                            <div className="icon">
                                <i className="fa fa-heart" aria-hidden="true"></i>
                                <p style={{fontSize: '9px'}}>찜하기</p>
                            </div>
                            <div className="icon">
                                <a href={`${config.PRODUCT_CHECK_URL}${this.state.name}`}>
                                    <i className="fa fa-krw" aria-hidden="true"></i>
                                </a>
                                <p className="check-para" style={{fontSize: '9px'}}>가격정보</p>
                            </div>
                            <div className="icon">
                                <i className="fa fa-share-alt"></i>
                                <p style={{fontSize: '9px'}}>링크공유</p>
                            </div>
                        </div>

                        
                        <table className="prod-table">
                            <tr style={{height: '60px', borderBottom: '1px solid rgba(100, 100, 100, 0.2)'}}>
                                <td style={{width: '110px', borderRight: '1px solid rgba(100, 100, 100, 0.2)'}}>성분 공개 여부</td>
                                <td>
                                    <div className="img-in-table">
                                        <img className="img-fluid" style={{maxHeight:'30px',maxWidth:'30px'}} src={selectedEmoji} alt=""/>
                                    </div>
                                    <div className="text-in-table" style={{height: '60px'}}>{selectedText}</div>
                                </td>
                            </tr>
                            <tr style={{height: '60px', borderBottom: '1px solid rgba(100, 100, 100, 0.2)'}}>
                                <td style={{width: '110px', borderRight: '1px solid rgba(100, 100, 100, 0.2)'}}>성분 공개 요청</td>
                                <td>
                                    <div className="img-in-table">
                                        <img className="img-fluid" style={{maxHeight:'30px',maxWidth:'30px'}} src={require('../../../../assets/images/icons/people-icon.png')} alt=""/>
                                    </div>
                                    <div className="text-in-table" style={{height: '60px'}}>{this.state.open_request}명</div>
                                    <button className="req-button">성분 공개 요청하기</button>
                                </td>
                            </tr>
                            <tr style={{height: '100px'}}>
                                <td style={{width: '110px', borderRight: '1px solid rgba(100, 100, 100, 0.2)'}}>인증정보</td>
                                <td style={{width: '370px'}}>
                                    <div className="sub-sell" style={{height: '60px', borderBottom: '1px solid rgba(100, 100, 100, 0.2)'}}>
                                        <div className="img-in-table">
                                            <img className="img-fluid" style={{maxHeight:'30px',maxWidth:'30px'}} src={selectedEmoji} alt=""/>
                                        </div>
                                        <div className="text-in-table" style={{height: '60px'}}>유해 물질 감소, 오염 물질 저감</div>
                                    </div>
                                    <div className="sub-sell" style={{height: '40px'}}>
                                        <div className="img-in-table" style={{color: 'gray', fontSize: '11px'}}>자가검사번호 :</div>
                                        <div className="text-in-table" style={{height: '60px'}}>0-0000-0000000-0000</div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                       

                       <ul className="description-list">
                            <li>성분 정보는 제조 / 유통 업체에서 공개한 자료를 기반으로 제공되며, 함량에 관한 정보를 전달하지 않습니다.</li>
                            <li>위 정보들은 제품 자체의 위해성을 뜻하진 않으며, 해당성분의 노출경로나 함량 따라 유해 여부가 달라질 수는 있으니, 참고사항으로 봐주시기 바랍니다.</li>
                            <li>정보 업데이트 과정에서 크고 작은 오류가 발생할 수 있으니 문제를 발견하시면 문의하기 메뉴를 이용해주세요.</li>
                            <li>해당 정보를 허가 없이 상업적으로 이용하는 경우, 법적조치를 받을 수 있습니다.</li>
                       </ul>
                    </div>
                </div>

                <div className="outer-tap"></div>

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
        ) : (<div><br/><br/></div>);
    };
}
