import React from 'react';

export class IngredientModal extends React.Component{
    evaluateHeaderIconWithETC=()=>{
        let img = '';
        img = this.props.data.etc_1?<img src={require('../../../../assets/images/etc1_red.png')} alt=""/>:img;
        img = this.props.data.etc_2?<img src={require('../../../../assets/images/etc2_red.png')} alt=""/>:img;
        img = this.props.data.etc_3?<img src={require('../../../../assets/images/etc3_red.png')} alt=""/>:img;
        img = this.props.data.etc_4?<img src={require('../../../../assets/images/etc4_red.png')} alt=""/>:img;
        img = this.props.data.etc_5?<img src={require('../../../../assets/images/etc5_red.png')} alt=""/>:img;
        return img;
    }
    render=()=>{
        var props = this.props.data;
        console.log('IGMODAL-',props);
        const letter = props.ewg_rank ? props.ewg_rank : 'X';
        const letterSubHeading = this.props.texts[letter.toLowerCase()];
        return(
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div style={{minWidth:'330px'}} className="modal-custom modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-custom-header modal-header">
                        {this.evaluateHeaderIconWithETC()}
                        <h5 className="modal-title" id="exampleModalLongTitle">{props.name}</h5>
                        <p style={{width:'100%'}}>{props.name_eng}</p>
                        <button type="button" className="close btn" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-custom-body modal-body">
                        <p className="modal-para">EWG 등급</p>
                        <div className="popup-icon-detail">
                            <br/>
                            <img src={require(`../../../../assets/images/icons/icon${letter}.png`)} alt=""/>
                            <p>{letterSubHeading}</p>
                            <p className="popup-ingr-para">
                            {props.misc && props.misc!=='-1\n' && props.misc} {/* 사용량/사용법에 따라 C-D 등급 */}
                            </p> {/* NEEDS TO BE CONFIRMED */}
                        </div>
                        <p className="modal-para">주의성분</p>
                            <div className="popup-icon-level">
                                {props.epa && props.epa!=='G' && <img style={{width:'27px'}} className="img-responsive icon_img" src={require('../../../../assets/images/icons/epa-usa.png')} alt=""/>}
                                {props.dsl && <img style={{width:'27px',marginLeft:'5px'}} className="img-responsive icon_img" src={require('../../../../assets/images/dsl.png')} alt=""/>} &nbsp;
                                {((props.epa && props.epa!=='G')||props.dsl)?'미 환경보호 (EPA): 유해성 논란 성분':' '}
                            </div>
                        <div className="popup-category">
                            <p className="modal-para">유해성분</p>
                        </div>
                        {
                            props.national_harmful?
                               <div className="popup-icon-level">
                                    <img style={{width:'27px'}} className="img-responsive icon_img" src={require('../../../../assets/images/warning.png')} alt=""/>
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
    }
}