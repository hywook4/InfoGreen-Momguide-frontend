import React from 'react';
import './ReviewCard.css';
import { CommonUtil, TokenUtil } from '../../../../util';
import $ from 'jquery';
import greenCircle from '../../../../assets/images/common_icons/green_circle.png';
import greenLine from '../../../../assets/images/common_icons/green_line.png';
import grayCircle from '../../../../assets/images/common_icons/gray_circle.png';
import grayLine from '../../../../assets/images/common_icons/gray_line.png';
import inactiveHeart from '../../../../assets/images/heart_inactive.png';
import activeHeart from '../../../../assets/images/heart_active.png';
import reportIcon from '../../../../assets/images/report.png';
import { ReportModal } from '../../../common/ReportModal/ReportModal';
import axios from 'axios';

export class ReviewCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedImageIndex: 0,
            folded: true,
            like: null,
            isLogin: false,

            propsChangeCount: 0
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log(prevState.propsChangeCount, nextProps.propsChangeCount);
        console.log(prevState, nextProps);
        if(nextProps.propsChangeCount && prevState.propsChangeCount !== nextProps.propsChangeCount) {
            return {
                like: nextProps.data.like,
                propsChangeCount: nextProps.propsChangeCount
            };
        }
        return {};
    }

    handleImageClick = (index) => {
        this.setState({
            selectedImageIndex: index
        });
        $('#review-card-modal').modal('show');
    };

    onChange = (key, value) => {
        const newObj = {};
        newObj[key] = value;
        this.setState(newObj);
    };

    handleLike = async (like) => {
        const token = TokenUtil.getLoginToken();
        if(token === null)
            return;

        this.setState({
            like: like
        });
        try {
            await axios({
                method: like ? 'post' : 'delete',
                url: `${process.env.API_URL}/api/review/like`,
                headers: TokenUtil.getTokenRequestHeader(token),
                data: {
                    reviewId: this.props.data.review.index
                }
            });
        } catch(e) {}
    };

    handleReport = async (reviewIndex) => {
        $(`#review-card-modal-${reviewIndex}`).modal('show');
    };

    render() {
        console.log(this.state);
        const {data} = this.props;
        if (typeof data === 'undefined')
            return null;

        const modal = (data.images && data.images.length) ? (
            <div className="modal fade" id="review-card-modal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body review-card-modal-container">
                            <div className="review-card-modal-header">
                                <div>{this.state.selectedImageIndex+1}/{data.images.length}</div>
                                <div/>
                            </div>
                            <div className="review-card-modal-content">
                                <div onClick={()=>this.handleImageClick(this.state.selectedImageIndex-1)}>
                                    {this.state.selectedImageIndex !== 0 ? '<' : ' '}
                                </div>
                                <img src={data.images[this.state.selectedImageIndex].url} alt=""/>
                                <div onClick={()=>this.handleImageClick(this.state.selectedImageIndex+1)}>
                                    {this.state.selectedImageIndex !== data.images.length-1 ? '>' : ' '}
                                </div>
                            </div>
                            <div className="review-card-modal-footer">
                                {data.images.map((image, i) => (
                                    <img src={image.url} onClick={()=>this.handleImageClick(i)} alt="" key={i}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : null;

        const contentLimit = 500;
        const info = (
            <div className="review-card-info">
                <div className="review-card-profile">
                    <div>
                        <img src={data.reviewOwner.photoUrl} alt=""/>
                    </div>
                    <div className="review-card-profile-text">
                        <div>
                            {data.reviewOwner.name}
                        </div>
                        <div>
                            <span>{data.reviewOwner.gender === 'male' ? '남자' : '여자'}</span>
                            <span>{CommonUtil.getAge(data.reviewOwner.memberBirthYear) + '세'}</span>
                            <span>{`자녀 ${data.reviewOwner.childBirthYear !== 0 ? CommonUtil.getAge(data.reviewOwner.memberBirthYear) + '세' : '없음'}`}</span>
                        </div>
                    </div>
                </div>
                <div className="review-card-rate-container">
                    <i className={`prod-spec-star fa fa-star${(data.review.rating >= 1 ? ' selected' : '-o')}`}
                       aria-hidden="true"/>
                    <i className={`prod-spec-star fa fa-star${(data.review.rating >= 2 ? ' selected' : '-o')}`}
                       aria-hidden="true"/>
                    <i className={`prod-spec-star fa fa-star${(data.review.rating >= 3 ? ' selected' : '-o')}`}
                       aria-hidden="true"/>
                    <i className={`prod-spec-star fa fa-star${(data.review.rating >= 4 ? ' selected' : '-o')}`}
                       aria-hidden="true"/>
                    <i className={`prod-spec-star fa fa-star${(data.review.rating >= 5 ? ' selected' : '-o')}`}
                       aria-hidden="true"/>
                    <span>{data.review.rating}.0</span>
                </div>
                <div className="review-card-image-container">
                    {
                        data.images.map((image, i) => {
                            if(i >= 4)
                                return null;

                            return (<img key={i} src={image.url} onClick={()=>this.handleImageClick(i)} alt=""/>);
                        })
                    }
                    {
                        data.images.length >= 5 ?
                            <img onClick={()=>this.handleImageClick(4)} alt=""/> :
                            null
                    }
                    {
                        data.images.length >= 5 ?
                            (<div className="review-card-more-text" onClick={()=>this.handleImageClick(4)}>
                                <span onClick={()=>this.handleImageClick(4)}>{data.images.length - 4}</span> <br/>
                                <span onClick={()=>this.handleImageClick(4)}>더보기</span>
                            </div>) :
                            null
                    }
                    {modal}
                </div>
            </div>
        );
        const text = (
            <div className="review-card-text align-top">
                {data.review.content.length > contentLimit ? (
                        <React.Fragment>
                            {this.state.folded ?
                                (data.review.content.slice(0, contentLimit) + '...').split('\n').map((line, i) => {
                                    return <span key={i}>{line}<br/></span>
                                }) :
                                data.review.content.split('\n').map((line, i) => {
                                    return <span key={i}>{line}<br/></span>
                                })}
                            <br/>
                            <a href='/' onClick={(e) => {
                                e.preventDefault();
                                this.onChange('folded', !this.state.folded)
                            }}>{this.state.folded ? '열기' : '펴기'}</a>
                        </React.Fragment>) :
                    <React.Fragment>
                        {data.review.content.split('\n').map((line, i) => {
                            return <span key={i}>{line}<br/></span>
                        })}
                    </React.Fragment>
                }
            </div>
        );
        const option = (
            <div className="reivew-card-option">
                <div className="review-card-bar-guide">
                    <span>나쁨</span>
                    <span>보통</span>
                    <span>좋음</span>
                </div>
                <div className="review-card-detail-bar">
                    <span className="review-card-detail-bar-header">기능력</span>
                    <span>
                                <img src={greenCircle} className="review-card-detail-bar-circle selected" alt="bar-img" />
                        {data.review.functionality >= 2 ?
                            (<img src={greenLine} className="review-card-detail-bar-line selected" alt="bar-img" />) :
                            (<img src={grayLine} className="review-card-detail-bar-line" alt="bar-img" />)}
                        {data.review.functionality >= 2 ?
                            (<img src={greenCircle} className="review-card-detail-bar-circle selected" alt="bar-img" />) :
                            (<img src={grayCircle} className="review-card-detail-bar-circle" alt="bar-img" />)}
                        {data.review.functionality >= 3 ?
                            (<img src={greenLine} className="review-card-detail-bar-line selected" alt="bar-img" />) :
                            (<img src={grayLine} className="review-card-detail-bar-line" alt="bar-img" />)}
                        {data.review.functionality >= 3 ?
                            (<img src={greenCircle} className="review-card-detail-bar-circle selected" alt="bar-img" />) :
                            (<img src={grayCircle} className="review-card-detail-bar-circle" alt="bar-img" />)}
                            </span>
                </div>
                <div className="review-card-detail-bar">
                    <span className="review-card-detail-bar-header">무자극성</span>
                    <span>
                                <img src={greenCircle} className="review-card-detail-bar-circle selected" alt="bar-img" />
                        {data.review.nonIrritating >= 2 ?
                            (<img src={greenLine} className="review-card-detail-bar-line selected" alt="bar-img" />) :
                            (<img src={grayLine} className="review-card-detail-bar-line" alt="bar-img" />)}
                        {data.review.nonIrritating >= 2 ?
                            (<img src={greenCircle} className="review-card-detail-bar-circle selected" alt="bar-img" />) :
                            (<img src={grayCircle} className="review-card-detail-bar-circle" alt="bar-img" />)}
                        {data.review.nonIrritating >= 3 ?
                            (<img src={greenLine} className="review-card-detail-bar-line selected" alt="bar-img" />) :
                            (<img src={grayLine} className="review-card-detail-bar-line" alt="bar-img" />)}
                        {data.review.nonIrritating >= 3 ?
                            (<img src={greenCircle} className="review-card-detail-bar-circle selected" alt="bar-img" />) :
                            (<img src={grayCircle} className="review-card-detail-bar-circle" alt="bar-img" />)}
                            </span>
                </div>
                <div className="review-card-detail-bar">
                    <span className="review-card-detail-bar-header">기능력</span>
                    <span>
                                <img src={greenCircle} className="review-card-detail-bar-circle selected" alt="bar-img" />
                        {data.review.sent >= 2 ?
                            (<img src={greenLine} className="review-card-detail-bar-line selected" alt="bar-img" />) :
                            (<img src={grayLine} className="review-card-detail-bar-line" alt="bar-img" />)}
                        {data.review.sent >= 2 ?
                            (<img src={greenCircle} className="review-card-detail-bar-circle selected" alt="bar-img" />) :
                            (<img src={grayCircle} className="review-card-detail-bar-circle" alt="bar-img" />)}
                        {data.review.sent >= 3 ?
                            (<img src={greenLine} className="review-card-detail-bar-line selected" alt="bar-img" />) :
                            (<img src={grayLine} className="review-card-detail-bar-line" alt="bar-img" />)}
                        {data.review.sent >= 3 ?
                            (<img src={greenCircle} className="review-card-detail-bar-circle selected" alt="bar-img" />) :
                            (<img src={grayCircle} className="review-card-detail-bar-circle" alt="bar-img" />)}
                            </span>
                </div>
                <div className="review-card-detail-bar">
                    <span className="review-card-detail-bar-header">기능력</span>
                    <span>
                                <img src={greenCircle} className="review-card-detail-bar-circle selected" alt="bar-img" />
                        {data.review.costEffectiveness >= 2 ?
                            (<img src={greenLine} className="review-card-detail-bar-line selected" alt="bar-img" />) :
                            (<img src={grayLine} className="review-card-detail-bar-line" alt="bar-img" />)}
                        {data.review.costEffectiveness >= 2 ?
                            (<img src={greenCircle} className="review-card-detail-bar-circle selected" alt="bar-img" />) :
                            (<img src={grayCircle} className="review-card-detail-bar-circle" alt="bar-img" />)}
                        {data.review.costEffectiveness >= 3 ?
                            (<img src={greenLine} className="review-card-detail-bar-line selected" alt="bar-img" />) :
                            (<img src={grayLine} className="review-card-detail-bar-line" alt="bar-img" />)}
                        {data.review.costEffectiveness >= 3 ?
                            (<img src={greenCircle} className="review-card-detail-bar-circle selected" alt="bar-img" />) :
                            (<img src={grayCircle} className="review-card-detail-bar-circle" alt="bar-img" />)}
                            </span>
                </div>
            </div>
        );
        const addition = (
            <div className="review-card-addition align-top">
                {data.additionalReviews.map((item, i) => {
                    if(i >= 3)
                        return null;
                    const diffMonth = CommonUtil.diffMonths(new Date(data.review.baseDate), new Date());
                    return (
                        <div className={`review-card-additional-review-container ${!item.ended?'success':'fail'}`} key={i}>
                            <table>
                                <tbody>
                                <tr>
                                    <td className={`review-card-additional-review-duration ${!item.ended?'success':'fail'}`}>
                                        {(diffMonth >= 12 ? '1년이상 사용 ' : diffMonth+'개월째 사용 ') + (!item.ended?'':'중단')}
                                    </td>
                                    <td className="review-card-additional-review-detail">
                                        {item.content.split('\n').map((item, key) => {
                                            return (<span key={key}>{key !== 0 ? (<br />) : null}{item}</span>);
                                        })}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    );
                })}
                <div className="review-card-icon">
                    {this.props.isLogin ? (<img src={this.state.like ? activeHeart : inactiveHeart} onClick={()=>this.handleLike(!this.state.like)} alt="" />) : null }
                    <img src={reportIcon} onClick={()=>this.handleReport(data.review.index)} alt="" />
                </div>
            </div>
        );

        return (
            <div className="review-card-container">
                <div className="review-card-top">
                    {info}
                    {option}
                </div>
                <div className="review-card-bottom">
                    {text}
                    {addition}
                </div>
                <ReportModal reportModalId={`review-card-modal-${data.review.index}`} id={data.review.index} type={'review'} objUrl={'/api/review/report'}/>
            </div>
        );
    }
}