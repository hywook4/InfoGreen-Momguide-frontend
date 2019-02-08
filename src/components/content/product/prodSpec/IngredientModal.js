import React from 'react';

export class IngredientModal extends React.Component{
    evaluateHeaderIconWithETC=()=>{
        let img = '';
        img = this.props.data.slsSles?<img src={require('../../../../assets/images/product_spec_icons/etc1_red.png')} alt=""/>:img;
        img = this.props.data.ammonium?<img src={require('../../../../assets/images/product_spec_icons/etc2_red.png')} alt=""/>:img;
        img = this.props.data.scent?<img src={require('../../../../assets/images/product_spec_icons/etc3_red.png')} alt=""/>:img;
        img = this.props.data.color?<img src={require('../../../../assets/images/product_spec_icons/etc4_red.png')} alt=""/>:img;
        img = this.props.data.humid?<img src={require('../../../../assets/images/product_spec_icons/etc5_red.png')} alt=""/>:img;
        return img;
    };

    render=()=>{
        const props = this.props.data;
        console.log('IGMODAL-',props);
        console.log(this.props);
        const letter = props.ewg ? props.ewg : 'X';
        const letterSubHeading = this.props.texts[letter.toLowerCase()];
        return(
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div style={{minWidth:'330px'}} className="modal-custom modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-custom-header modal-header">
                        {this.evaluateHeaderIconWithETC()}
                        <h5 className="modal-title" id="exampleModalLongTitle">{props.korName}</h5>
                        <p style={{width:'100%'}}>{props.engName}</p>
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
                            {props.misc && props.misc!=='-1\n' && props.misc} {/* 사용량/사용법에 따라 C-D 등급 */}
                            </p> {/* NEEDS TO BE CONFIRMED */}
                        </div>
                        <p className="modal-para">주의성분</p>
                        <div className="popup-icon-level">
                            {props.epa && props.epa!=='G' && <img style={{width:'27px'}} className="img-responsive icon_img" src={require('../../../../assets/images/product_spec_icons/caution_usa.png')} alt=""/>}
                            {props.dsl && <img style={{width:'27px',marginLeft:'5px'}} className="img-responsive icon_img" src={require('../../../../assets/images/product_spec_icons/caution_canada.png')} alt=""/>} &nbsp;
                            {((props.epa && props.epa!=='G')||props.dsl)?'미 환경보호 (EPA): 유해성 논란 성분':' '}
                        </div>
                        <div className="popup-category">
                            <p className="modal-para">유해성분</p>
                        </div>
                        {
                            props.national_harmful?
                               <div className="popup-icon-level">
                                    <img style={{width:'27px'}} className="img-responsive icon_img" src={require('../../../../assets/images/common_icons/warning.png')} alt=""/>
                                    <p>국내 유해화학물질: 유독물질</p>
                               </div>
                            :<div>&nbsp;</div>
                        }
                        <div className="popup-category">
                            <p className="modal-para">배합용도</p>
                        </div>
                        <div className="popup-result">
                            <p>{props.ing_usage}</p>
                        </div>
                    </div>
                    {/* <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div> */}
                    </div>
                </div>
            </div>
        )
    };
}