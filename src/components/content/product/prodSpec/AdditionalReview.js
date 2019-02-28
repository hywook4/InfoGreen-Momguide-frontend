import React from 'react';
import './AdditionalReview.css';
import axios from 'axios';
import { CategoryUtil, CommonUtil, TokenUtil } from '../../../../util';
import history from '../../../../history/history';

export class AdditionalReview extends React.Component {
    state = {
        selected: null,
        allFinish: false,

        product: null,
        review: null,

        text: ''
    };

    componentDidMount = async () => {
        const product = await axios.get(`${process.env.API_URL}/api/review/product?reviewId=${this.props.match.params.id}`);
        const review = await axios.get(`${process.env.API_URL}/api/review?id=${this.props.match.params.id}`);
        this.setState({
            product: product.data,
            review: review.data.review
        });
    };

    onChange = (key, value) => {
        if(key === 'selected') {
            this.setState({
                text: ''
            });
        }

        this.setState({
            [key]: value
        });
    };

    onSubmit = async () => {
        if(this.state.text.length === 0) {
            alert('텍스트를 입력해주세요.');
            return;
        }

        const token = TokenUtil.getLoginToken();
        if(token === null)
            return;

        try {
            await axios({
                method: 'post',
                url: `${process.env.API_URL}/api/review/addition`,
                headers: TokenUtil.getTokenRequestHeader(token),
                data: {
                    reviewId: Number(this.props.match.params.id),
                    content: this.state.text,
                    ended: !this.state.selected
                }
            });

            alert('등록이 완료되었습니다.');
            history.push('/');
        } catch(e) {
        }

        /*this.setState({
            allFinish: true
        });*/
    };

    render() {
        if(this.state.product === null || this.state.review === null) {
            return null;
        }
        /*if(this.state.allFinish) {
            return (
                <div className="additional-review-container">
                    <h6 className="additional-review-all-finish-button">리뷰가 등록되었습니다!</h6>
                    <button className="additional-review-all-finish-button" onClick={()=>history.push('/')}>확인</button>
                </div>
            );
        }*/

        const category = CategoryUtil.korSubToEngMain(this.state.product.category);

        let title = null;
        const content = (
            <div className="additional-review-content">
                <div>
                    <div className="additional-review-image">
                        <img src={`${process.env.S3_URL}/product-images/${category}-product-images/${this.state.product.brand}/${this.state.product.name}.jpg`} alt=""/>
                    </div>
                    <div className="additional-review-product-info">
                        <div>
                            {this.state.product.brand}
                        </div>
                        <div>
                            {this.state.product.name}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="additional-review-card-rate">
                        <i className={`additional-review-star fa fa-star${(this.state.review.rating >= 1 ? ' selected' : '-o')}`}
                           aria-hidden="true"/>
                        <i className={`additional-review-star fa fa-star${(this.state.review.rating >= 2 ? ' selected' : '-o')}`}
                           aria-hidden="true"/>
                        <i className={`additional-review-star fa fa-star${(this.state.review.rating >= 3 ? ' selected' : '-o')}`}
                           aria-hidden="true"/>
                        <i className={`additional-review-star fa fa-star${(this.state.review.rating >= 4 ? ' selected' : '-o')}`}
                           aria-hidden="true"/>
                        <i className={`additional-review-star fa fa-star${(this.state.review.rating >= 5 ? ' selected' : '-o')}`}
                           aria-hidden="true"/>
                        <span>{this.state.review.rating}.0</span>
                    </div>
                </div>
            </div>
        );
        let submit = null;

        if(this.state.selected === null) {
            title = (
                <div className="additional-review-title">
                    <div>첫 리뷰 후 <span>{CommonUtil.diffMonths(new Date(this.state.review.baseDate), new Date())}개월</span></div>
                    <div>이 제품을 사용하고 계신가요?</div>
                </div>
            );
            submit = (
                <div className="additional-review-submit">
                    <button onClick={()=>this.onChange('selected', true)}>네</button>
                    <button onClick={()=>this.onChange('selected', false)}>아니오</button>
                </div>
            );
        } else if(this.state.selected) {
            title = (
                <div className="additional-review-title-second">
                    <i className="fas fa-chevron-left additional-review-pre-button" onClick={()=>this.onChange('selected', null)}/>
                    <div>이 제품을 사용하는 이유가 무엇인가요?</div>
                </div>
            );
            submit = (
                <React.Fragment>
                    <div className="additional-review-text">
                        <textarea value={this.state.text} onChange={(e) => this.onChange('text', e.target.value.slice(0, 100))}
                                  placeholder="내용을 입력해주세요."
                        />
                        <div>{this.state.text.length}/100</div>
                    </div>
                    <div className="additional-review-submit">
                        <button onClick={()=>this.onSubmit()}>완료</button>
                    </div>
                </React.Fragment>
            );
        } else {
            title = (
                <div className="additional-review-title-second">
                    <i className="fas fa-chevron-left additional-review-pre-button" onClick={()=>this.onChange('selected', null)}/>
                    <div>이 제품을 사용하는 않는 이유가 무엇인가요?</div>
                </div>
            );
            submit = (
                <div className="additional-review-submit">
                    <div className="additional-review-text">
                        <textarea value={this.state.text} onChange={(e) => this.onChange('text', e.target.value.slice(0, 100))}
                                  placeholder="내용을 입력해주세요."
                        />
                        <div>{this.state.text.length}/100</div>
                    </div>
                    <div className="additional-review-submit">
                        <button onClick={()=>this.onSubmit()}>완료</button>
                    </div>
                </div>
            );
        }

        return (
            <div className={"additional-review-container" + (this.state.selected ? " success" : (this.state.selected === false ? " fail" : ""))}>
                {title}
                {content}
                {submit}
            </div>
        );
    }
}