import React from 'react';
import './IngredientModal.css'

export class LivingIngredientModal extends React.Component{
    evaluateHeaderIconWithETC=()=>{
        let img = '';
        img = this.props.data.slsSles?<img className="modal-header-image" src={require('../../../../assets/images/product_spec_icons/etc1_red.png')} alt=""/>:img;
        img = this.props.data.ammonium?<img className="modal-header-image" src={require('../../../../assets/images/product_spec_icons/etc2_red.png')} alt=""/>:img;
        img = this.props.data.scent?<img className="modal-header-image" src={require('../../../../assets/images/product_spec_icons/etc3_red.png')} alt=""/>:img;
        img = this.props.data.color?<img className="modal-header-image" src={require('../../../../assets/images/product_spec_icons/etc4_red.png')} alt=""/>:img;
        img = this.props.data.humid?<img className="modal-header-image" src={require('../../../../assets/images/product_spec_icons/etc5_red.png')} alt=""/>:img;
        return img;
    };

    render=()=>{
        const props = this.props.data;
        const letter = props.ewg ? props.ewg : 'X';
        const letterSubHeading = this.props.texts[letter.toLowerCase()];
        return(
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div style={{minWidth:'330px'}} className="modal-custom modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-box">
                        <div className="modal-custom-header modal-header">
                            {this.evaluateHeaderIconWithETC()}
                            <div className="modal-header-title">
                                <h5 className="modal-title" id="exampleModalLongTitle">{props.korName}</h5>
                                <p style={{width:'100%'}}>{props.engName}</p>
                            </div>
                            <button type="button" className="close btn" data-dismiss="modal" aria-label="Close">
                                &times;
                            </button>
                        </div>
                        <div className="modal-custom-body modal-body">
                            <p className="modal-para">EWG 등급</p>
                            <div className="popup-icon-detail">
                                <img src={require(`../../../../assets/images/product_spec_icons/living_grade_${letter}.png`)} alt=""/>
                                <p>{letterSubHeading}</p>
                                <p className="popup-ingr-para">
                                    {props.remark}
                                </p> {/* NEEDS TO BE CONFIRMED */}
                            </div>
                            <p className="modal-para">주의성분</p>
                            <div className="modal-caution-container">
                                {(props.epa === 'Y') ?
                                    (<div className="popup-icon-level">
                                        <img className="img-responsive icon_img"
                                             src={require('../../../../assets/images/product_spec_icons/caution_usa.png')}
                                             alt=""/>
                                        <div>
                                            <h6>미 환경보호 (EPA)</h6>:&nbsp;&nbsp;유해성 논란 성분
                                        </div>
                                    </div>) : null
                                }
                                {props.dsl ?
                                    (<div className="popup-icon-level">
                                        <img className="img-responsive icon_img"
                                             src={require('../../../../assets/images/product_spec_icons/caution_canada.png')}
                                             alt=""/>
                                        <div>
                                            <h6>캐나다 환경부 (DSL)</h6>:&nbsp;&nbsp;인간 노출에 대한 잠재성이 있거나 독성이 있을 수 있음
                                        </div>
                                    </div>) : null
                                }
                            </div>
                            <p className="modal-para">유해성분</p>
                            <div className="modal-caution-container">
                                {props.harmness?
                                   <div className="popup-icon-level">
                                       <img className="img-responsive icon_img" src={require('../../../../assets/images/common_icons/warning.png')} alt=""/>
                                       <h6>국내 유해화학물질</h6>:&nbsp;&nbsp;유독물질
                                   </div>
                                : null}
                            </div>
                            <p className="modal-para">나쁜 성분</p>
                            <div className="modal-caution-container">
                                {props.echaBreath?
                                    <div className="popup-icon-level">
                                        <img className="img-responsive icon_img" src={require('../../../../assets/images/product_spec_icons/ingred_respitory_true.png')} alt=""/>
                                        <h6>호흡 독성</h6>
                                    </div>
                                    : null}
                                {props.echaSkin?
                                    <div className="popup-icon-level">
                                        <img className="img-responsive icon_img" src={require('../../../../assets/images/product_spec_icons/ingred_skin_true.png')} alt=""/>
                                        <h6>피부 자극</h6>
                                    </div>
                                    : null}
                                {props.echaDev?
                                    <div className="popup-icon-level">
                                        <img className="img-responsive icon_img" src={require('../../../../assets/images/product_spec_icons/ingred_development_true.png')} alt=""/>
                                        <h6>발달/생식 독성</h6>
                                    </div>
                                    : null}
                                {props.echaCancer?
                                    <div className="popup-icon-level">
                                        <img className="img-responsive icon_img" src={require('../../../../assets/images/product_spec_icons/ingred_cancer_true.png')} alt=""/>
                                        <h6>발암성</h6>
                                    </div>
                                    : null}
                            </div>
                            <p className="modal-para">배합용도</p>
                            <div className="modal-caution-container end">
                                <h5>{props.use}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

export class CosmeticIngredientModal extends React.Component{
    evaluateHeaderIconWithETC=()=>{
        let img = '';
        img = this.props.data.slsSles?<img className="modal-header-image" src={require('../../../../assets/images/product_spec_icons/etc1_red.png')} alt=""/>:img;
        img = this.props.data.ammonium?<img className="modal-header-image" src={require('../../../../assets/images/product_spec_icons/etc2_red.png')} alt=""/>:img;
        img = this.props.data.scent?<img className="modal-header-image" src={require('../../../../assets/images/product_spec_icons/etc3_red.png')} alt=""/>:img;
        img = this.props.data.color?<img className="modal-header-image" src={require('../../../../assets/images/product_spec_icons/etc4_red.png')} alt=""/>:img;
        img = this.props.data.humid?<img className="modal-header-image" src={require('../../../../assets/images/product_spec_icons/etc5_red.png')} alt=""/>:img;
        return img;
    };

    render=()=>{
        const props = this.props.data;
        console.log('IGMODAL-',props);
        let letter = props.ewg ? props.ewg : 'X';
        const letterSubHeading = this.props.texts[letter.toLowerCase()];

        letter = props.ewgCode ? props.ewgCode : 'X';
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
        return(
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div style={{minWidth:'330px'}} className="modal-custom modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-box">
                        <div className="modal-custom-header modal-header">
                            {this.evaluateHeaderIconWithETC()}
                            <div className="modal-header-title">
                                <h5 className="modal-title" id="exampleModalLongTitle">{props.name}</h5>
                                <p style={{width:'100%'}}>{props.engName}</p>
                            </div>
                            <button type="button" className="close btn" data-dismiss="modal" aria-label="Close">
                                &times;
                            </button>
                        </div>
                        <div className="modal-custom-body modal-body">
                            <p className="modal-para">EWG 등급</p>
                            <div className="popup-icon-detail">
                                <img className="cosmetic-grade-icon" src={require(`../../../../assets/images/product_spec_icons/${imgSrc}`)} alt=""/>
                                <p>{letterSubHeading}</p>
                                <p className="popup-ingr-para">
                                    {props.remark}
                                </p> {/* NEEDS TO BE CONFIRMED */}
                            </div>
                            <p className="modal-para">주의성분</p>
                            <div className="modal-caution-container">
                                {(props.allergic === 'R') ?
                                    (<div className="popup-icon-level">
                                        <img className="img-responsive icon_img"
                                             src={require('../../../../assets/images/Asset 144.png')}
                                             alt=""/>
                                        <div>
                                            <h6>유럽연합위원회(EC)</h6>:&nbsp;&nbsp;적은 양으로도 사람에 따라 알러지 반응을 일으킬 가능성이 상당히 높음
                                        </div>
                                    </div>) : null
                                }
                                {(props.allegric === 'S') ?
                                    (<div className="popup-icon-level">
                                        <img className="img-responsive icon_img"
                                             src={require('../../../../assets/images/Asset 143.png')}
                                             alt=""/>
                                        <div>
                                            <h6>유럽연합위원회(EC)</h6>:&nbsp;&nbsp;적은 양으로도 사람에 따라 알러지 반응을 일으킬 가능성이 존재함
                                        </div>
                                    </div>) : null
                                }
                            </div>
                            <p className="modal-para">나쁜 성분</p>
                            <div className="modal-caution-container">
                                {props.echaBreath?
                                    <div className="popup-icon-level">
                                        <img className="img-responsive icon_img" src={require('../../../../assets/images/product_spec_icons/ingred_respitory_true.png')} alt=""/>
                                        <h6>호흡 독성</h6>
                                    </div>
                                    : null}
                                {props.echaSkin?
                                    <div className="popup-icon-level">
                                        <img className="img-responsive icon_img" src={require('../../../../assets/images/product_spec_icons/ingred_skin_true.png')} alt=""/>
                                        <h6>피부 자극</h6>
                                    </div>
                                    : null}
                                {props.echaDev?
                                    <div className="popup-icon-level">
                                        <img className="img-responsive icon_img" src={require('../../../../assets/images/product_spec_icons/ingred_development_true.png')} alt=""/>
                                        <h6>발달/생식 독성</h6>
                                    </div>
                                    : null}
                                {props.echaCancer?
                                    <div className="popup-icon-level">
                                        <img className="img-responsive icon_img" src={require('../../../../assets/images/product_spec_icons/ingred_cancer_true.png')} alt=""/>
                                        <h6>발암성</h6>
                                    </div>
                                    : null}
                            </div>
                            <p className="modal-para">배합용도</p>
                            <div className="modal-caution-container">
                                <h5>{props.use}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}
