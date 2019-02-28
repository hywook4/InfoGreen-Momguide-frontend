import React, { Component } from 'react';
import * as utils from '../../../../../util';
import axios from 'axios';
import './MyReview.css';
import { Link } from 'react-router-dom';
import { cpus } from 'os';
class MyReviewCard extends Component {

    constructor(props) {
        super(props);

        this.state = ({
            mainCategory: this.props.mainCategory,
            check: false,
            index: 0
        })
    }

    componentDidMount = () => {
        this.setState({
            check: this.props.check,
            index: this.props.index
        })
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.check !== prevState.check){
            return { check: nextProps.check };
        }
        return null;
    }

    changeCheck = (e) => {
        console.log(this.state.index);
        this.props.changeCardCheck(this.state.index);
    }

    deleteList = () => {
        const token = utils.TokenUtil.getLoginToken();
        axios({
            method: 'delete',
            url: process.env.API_URL + '/api/review',
            headers: utils.TokenUtil.getTokenRequestHeader(token),
            data: {
                "reviewId": this.props.data.review.index
            }
        })
        .then(() => {
            this.props.rerenderPage(this.props.currentPage);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    parseDate = (date) => {
        const yyyy = date.slice(0, 4);
        const mm = date.slice(5, 7);
        const dd = date.slice(8, 10);
        return yyyy + '-' + mm + '-' + dd;
    }

    render() {
        const data = this.props.data;
        const date = this.parseDate(data.review.created_at);
        const rating = data.review.rating;
        const content = data.review.content;
        const brand= data.product.brand;
        const product = data.product.name;
        const index = data.review.index;

        console.log(data);
        const recentDate = new Date(data.recentDate);
        console.log(data.review.created_at);
        const now = new Date();
        console.log(now);
        const diff = utils.CommonUtil.diffMonths(recentDate, now);
        console.log(index);
        return (
            <div className="my-review-card">
                <div className="my-review-card-checkbox">
                    <input type="checkbox" onChange={this.changeCheck} checked={this.state.check}/>
                </div>
                <div className="my-review-card-image">
                    <div className="my-review-img">
                        <img src={`${process.env.S3_URL}/product-images/${this.props.mainCategory}-product-images/${brand}/${product}.jpg`} alt="" className="my-review-img-preview" />
                    </div>
                </div>
                <div className="my-review-card-title">
                    <p>{date}</p>
                    <h6>{brand}</h6>
                    <h5>{product}</h5>
                </div>
                <div className="my-review-card-rate">
                    <i className={`my-review-star fa fa-star${(rating >= 1 ? ' selected' : '-o')}`} aria-hidden="true"/>
                    <i className={`my-review-star fa fa-star${(rating >= 2 ? ' selected' : '-o')}`} aria-hidden="true"/>
                    <i className={`my-review-star fa fa-star${(rating >= 3 ? ' selected' : '-o')}`} aria-hidden="true" />
                    <i className={`my-review-star fa fa-star${(rating >= 4 ? ' selected' : '-o')}`} aria-hidden="true" />
                    <i className={`my-review-star fa fa-star${(rating >= 5 ? ' selected' : '-o')}`} aria-hidden="true" />
                </div>
                <div className="my-review-manage-buttons">
                    <Link to={"/mypage/my-review/modify/" + index }>
                        <div className="my-review-button modify" onClick={this.modifyRequest}>수정하기</div>
                    </Link>
                    <div className="my-review-button delete"  data-toggle="modal" data-target={"#deletemodal" + index}>삭제하기</div>
                    {
                        diff > 0 ? 
                        <Link to={"/additional-review/" + index}>
                            <div className="my-review-button add available">추가하기</div>
                        </Link>
                        :
                        <div className="my-review-button add" onClick={this.modifyRequest} disabled="true">추가하기</div>
                    }
                    
                </div>
                <div className="my-review-content">
                    {content}
                </div>
                <div className="modal fade" id={"deletemodal" + index} role="dialog">
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
        );
    }
}

export default MyReviewCard;