import React from 'react';
import {Link} from 'react-router-dom';
import './MyIngredientRequest.css';
import TokenUtils from '../../../../../util/TokenUtil';
import axios from 'axios';


export default class MyIngredientCard extends React.Component{
    
    constructor(props) {
        super(props);

        this.state = ({
            check: this.props.check,
            index: this.props.index,
            category: this.props.data.isCosmetic,
            name: this.props.data.title,
            content: this.props.data.requestContent
        });
    }

    deleteList = () => {
        const token = TokenUtils.getLoginToken();
        const query = `?index=${this.props.data.index}`;
        axios({
            method: 'delete',
            url: process.env.API_URL + '/api/ask/cancelIngredAnal' + query,
            headers: TokenUtils.getTokenRequestHeader(token)
        })
        .then(() => {
            this.props.rerenderPage(this.props.currentPage);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    changeCheck = (e) => {
        this.props.changeCardCheck(this.state.index);
    }

    render(){
        const data = this.props.data;
        const date = data.created_at.slice(2,10);
        const category = data.isCosmetic ? '유아용 화장품' : '가정용 화학제품';
        const productName = data.title;
        const requestContent = data.requestContent;
        const responseContent = data.responseContent;
        console.log(responseContent);
        return(
            <div className="myingredient-card">
                <div className="myingredient-card-checkbox">
                    <input type="checkbox" onChange={this.changeCheck} checked={this.state.check ? "checked" : ""}/>
                </div>
                <div className="myingredient-card-image">
                    <div className="myingredient-img">
                        <img src={data.requestFileUrl} alt=""/>
                    </div>
                </div>
                <div className="myingredient-card-title">
                    <p>{date}</p>
                    <h6>{category}</h6>
                    <h5>{productName}</h5>
                </div>
                <div className="myingredient-card-answer">
                    {
                        responseContent !== null ? 
                        <Link to={`ingredient-analysis-request/${this.props.data.index}`}>
                            <button type="button" className="myhelp-answer-on">답변&nbsp;보기</button>
                        </Link> : // TODO : 누르면 상세 링크연결
                        <button type="button" className="myhelp-answer-off">답변&nbsp;중</button>
                    }
                </div>
                <div className="myingredient-card-delete">
                    {
                        responseContent !== null ? 
                        "" :
                        <Link to={`ingredient-analysis-request/${this.props.data.index}`}>
                            <div className="modify-button" onClick={this.modifyRequest}>수정하기</div>
                        </Link>
                    }
                    
                    <div className="cancel-button" data-toggle="modal" data-target={"#deleteModal" + this.state.index}>삭제하기</div>
                </div>

                <div className="myingredient-card-content">
                    <h6>{requestContent}</h6>
                </div>

                <div className="modal fade" id={"deleteModal" + this.state.index} role="dialog">
                    <div className="modal-dialog modal-sm">
                        <div className="modal-content">
                            <div className="modal-body">
                                {/*<button type="button" class="close" data-dismiss="modal">&times;</button>*/}
                                <h6 className="myproduct-delete-confirm">삭제하시겠습니까?</h6>
                                <button type="button" className="cancel-btn btn-default" data-dismiss="modal">취소하기</button>
                                <button type="button" className="delete-btn btn-default" data-dismiss="modal"  onClick={this.deleteList}>삭제하기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
        
    }
}