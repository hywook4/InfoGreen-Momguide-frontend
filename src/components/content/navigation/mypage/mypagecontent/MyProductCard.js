import React from 'react';
import './MyProducts.css';
import axios from 'axios';
import TokenUtils from '../../../../../util/TokenUtil';

const appendText={
    ingredient:{icon:require('../../../../../assets/images/ingredient_open.png'),text:'성분 공개'},
    eco:{icon:require('../../../../../assets/images/nature-friendly.png'),text:'친환경 인증'},
    includeCare:{icon:require('../../../../../assets/images/yellow_baby.png'),text:'주의 성분'},
    includeToxic:{icon:require('../../../../../assets/images/common_icons/warning.png'),text:'유해 성분'}
}

export class MyProductCard extends React.Component{

    constructor(props) {
        super(props);
        this.state = ({
            mainCategory: this.props.mainCategory,
            check: false,
            index: this.props.index + 1
        });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.check !== prevState.check){
            return { check: nextProps.check };
        }
        return null;
    }

    deleteLivingProduct = () => {
        const token = TokenUtils.getLoginToken();
        axios({
            method: 'delete',
            url: process.env.API_URL + '/api/auth/cancelHomeLiving',
            headers: TokenUtils.getTokenRequestHeader(token),
            data: {
                productIndex: this.props.data.index
            }
        }).then(() => {
            this.props.reRenderPage(this.props.currentPage);
        })
    }

    deleteCosmeticProduct = () => {
        const token = TokenUtils.getLoginToken();
        
        axios({
            method: 'delete',
            url: process.env.API_URL + '/api/auth/cancelHomeCosmetic',
            headers: TokenUtils.getTokenRequestHeader(token),
            data: {
                productIndex: this.props.data.index
            }
        }).then(() => {
            this.props.reRenderPage(this.props.currentPage);
        })
    }

    deleteProduct = () => {
        if(this.props.mainCategory === 'cosmetic') {
            console.log('cosmetic delete');
            this.deleteCosmeticProduct();
        } else if(this.props.mainCategory === 'living') {
            this.deleteLivingProduct();
        }
    }

    changeCheck = (e) => {
        this.props.changeCardCheck(this.state.index);
    }

    render(){
        const data = this.props.data;
        console.log(data);
        // console.log(this.state.index);
        return(
            <div className="myproduct-card">
                <div className="myproduct-card-checkbox">
                    <input type="checkbox" onChange={this.changeCheck} />
                </div>
                <div className="myproduct-card-image">
                    <div className="myproduct-img">
                        <img src={`${process.env.S3_URL}/product-images/${this.props.mainCategory}-product-images/${data.brand}/${data.name}.jpg`} alt=""/>
                    </div>
                </div>
                <div className="myproduct-card-name">
                    <p>{data.brand}</p>
                    <h5>{data.name}</h5>
                </div>
                <div className="myproduct-card-info">
                    {Object.keys(appendText).map((key,i)=>{
                        let toReturn = '';
                        let iconFlag = false;
                        switch(key){
                            case 'ingredient':
                                if(data.ingredient === "O") iconFlag = true;
                                break;

                            case 'eco':
                                if(data.eco !== "" && data.eco !== undefined) iconFlag = true;
                                break;

                            case 'includeCare':
                                if(data.includeCare) iconFlag = true;
                                break;

                            case 'includeToxic':   
                                if(data.includeToxic) iconFlag = true;
                                break;
                            
                            default:
                                break;
                        }
                        if(iconFlag){
                            return (
                                <div key={i} className="myproduct-card-info-icon">
                                    <img src={appendText[key].icon} alt="" />
                                </div> 
                            )
                        }
                        else {
                            return toReturn;
                        }
                    })}
                </div>
                <div className="myproduct-card-delete">
                    <div className="cancel-button" data-toggle="modal" data-target={"#deletemodal" + this.state.index}>삭제하기</div>
                </div>
                <div className="modal fade" id={"deletemodal" + this.state.index} role="dialog">
                    <div className="modal-dialog modal-sm">
                        <div className="modal-content">
                            <div className="modal-body">
                                {/*<button type="button" class="close" data-dismiss="modal">&times;</button>*/}
                                <h6 className="myproduct-delete-confirm">삭제하시겠습니까?</h6>
                                <button type="button" className="cancel-btn btn-default" data-dismiss="modal">취소하기</button>
                                <button type="button" className="delete-btn btn-default" data-dismiss="modal"  onClick={this.deleteProduct}>삭제하기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
        
    }
}