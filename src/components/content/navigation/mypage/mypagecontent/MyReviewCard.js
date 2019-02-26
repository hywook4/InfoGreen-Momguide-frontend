import React, { Component } from 'react';

class MyReviewCard extends Component {
    state = {
        rating: 4
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
                
            </div>
        );
    }
}

export default MyReviewCard;