import React, { Component } from 'react';
import './MyReview.css';
class MyReviewCard extends Component {
    state = {
        rating: 3
    }
    render() {
        return (
            <div className="my-review-card">
                <div className="my-review-card-checkbox">
                    <input type="checkbox" />
                </div>
                <div className="my-review-card-image">
                    <div className="my-review-img">
                        <img src="~/Desktop/images.jpeg" alt="" className="my-review-img-preview" />
                    </div>
                </div>
                <div className="my-review-card-title">
                    <p>19-02-26</p>
                    <h6>브랜드</h6>
                    <h5>에부부-에부부</h5>
                </div>
                <div className="my-review-card-rate">
                    <i className={`my-review-star fa fa-star${(this.state.rating >= 1 ? ' selected' : '-o')}`} aria-hidden="true"/>
                    <i className={`my-review-star fa fa-star${(this.state.rating >= 2 ? ' selected' : '-o')}`} aria-hidden="true"/>
                    <i className={`my-review-star fa fa-star${(this.state.rating >= 3 ? ' selected' : '-o')}`} aria-hidden="true" />
                    <i className={`my-review-star fa fa-star${(this.state.rating >= 4 ? ' selected' : '-o')}`} aria-hidden="true" />
                    <i className={`my-review-star fa fa-star${(this.state.rating >= 5 ? ' selected' : '-o')}`} aria-hidden="true" />
                </div>
                <div className="my-review-manage-buttons">
                    <div className="my-review-button modify" onClick={this.modifyRequest}>수정하기</div>
                    <div className="my-review-button delete"  data-toggle="modal" data-target="#deletemodal">삭제하기</div>
                    <div className="my-review-button add" onClick={this.modifyRequest}>추가하기</div>
                </div>
                <div className="my-review-content">
                    에부부에부부
                </div>
                <div className="modal fade" id="deletemodal" role="dialog">
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