import React from 'react';
import './ProdSpecReviewSummary.css';
import axios from 'axios';
import { CommonUtil } from '../../../../util';
import $ from 'jquery';

const ProgressBar = (props) => {
    let array = props.array;
    let sum = 0;
    array.forEach((num) => {sum += num;});
    array = array.map(num => num/sum);
    array[0] = Math.round(array[0]*100);
    array[1] = Math.round(array[1]*100);
    if(array[0] + array[1] > 100)
        array[1] = 100 - array[0];
    array[2] = 100 - array[0] - array[1];
    return (
        <div className="prod-spce-review-summary-progress">
            <div>
                • {props.text}
            </div>
            <div>
                <div className="progress">
                    <div className="progress-bar bg-danger" role="progressbar" style={{width: `${array[0]}%`}}>
                    </div>
                    <div className="progress-bar bg-warning" role="progressbar" style={{width: `${array[1]}%`}}>
                    </div>
                    <div className="progress-bar bg-success" role="progressbar" style={{width: `${array[2]}%`}}>
                    </div>
                </div>
            </div>
        </div>
    );
};

export class ProdSpecReviewSummary extends React.Component {
    state = {
        loading: false,

        rating: 0,
        functionalityCount: [],
        nonIrritatingCount: [],
        sentCount: [],
        costEffectivenessCount: [],
        images: [],
        selectedImageIndex: 0
    };

    async componentDidMount() {
        let data = (await axios({
            method: 'get',
            url: `${process.env.API_URL}/api/review/summary?category=${this.props.category}&id=${this.props.id}`
        })).data;

        this.setState({
            loading: true,

            rating: CommonUtil.rountTwoDecimal(data.rating),
            functionalityCount: data.functionalityCount,
            nonIrritatingCount: data.nonIrritatingCount,
            sentCount: data.sentCount,
            costEffectivenessCount: data.costEffectivenessCount,
            images: data.images
        });
    }

    handleImageClick = (index) => {
        this.setState({
            selectedImageIndex: index
        });
        $('#prod-spec-review-summary-modal').modal('show');
    };

    render() {
        if(!this.state.loading) {
            return null;
        }

        const modal = (
            <div className="modal fade" id="prod-spec-review-summary-modal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body prod-spec-review-summary-modal-container">
                            <div className="prod-spec-review-summary-modal-header">
                                <div>{this.state.selectedImageIndex+1}/{this.state.images.length}</div>
                                <div>&times;</div>
                            </div>
                            <div className="prod-spec-review-summary-modal-content">
                                {this.state.selectedImageIndex !== 0 ?
                                    (<div onClick={()=>this.handleImageClick(this.state.selectedImageIndex-1)}>{'<'}</div>) :
                                    null}
                                <img src={this.state.images[this.state.selectedImageIndex].url} />
                                {this.state.selectedImageIndex !== this.state.images.length-1 ?
                                    (<div onClick={()=>this.handleImageClick(this.state.selectedImageIndex+1)}>{'>'}</div>) :
                                    null}
                            </div>
                            <div className="prod-spec-review-summary-modal-footer">
                                {this.state.images.map((image, i) => (
                                    <img src={image.url} onClick={()=>this.handleImageClick(i)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        return (
            <div className="prod-spec-review-summary-container">
                <span>평점</span>
                <div className="prod-spec-review-summary-first">
                    <div className="prod-spec-review-summary-left">
                        {this.state.rating}
                        <i className={`prod-spec-star prod-spec-review-summary-star-first fa fa-star${(this.state.rating >= 1 ? ' selected' : '-o')}`} aria-hidden="true" />
                        <i className={`prod-spec-star fa fa-star${(this.state.rating >= 2 ? ' selected' : '-o')}`} aria-hidden="true" />
                        <i className={`prod-spec-star fa fa-star${(this.state.rating >= 3 ? ' selected' : '-o')}`} aria-hidden="true" />
                        <i className={`prod-spec-star fa fa-star${(this.state.rating >= 4 ? ' selected' : '-o')}`} aria-hidden="true" />
                        <i className={`prod-spec-star fa fa-star${(this.state.rating >= 5 ? ' selected' : '-o')}`} aria-hidden="true" />
                    </div>
                    <div className="prod-spec-review-summary-right">
                    </div>
                </div>
                <div className="prod-spec-review-summary-second">
                    <div className="prod-spec-review-summary-left">
                        <ProgressBar array={this.state.functionalityCount} text="기능력"/>
                        <ProgressBar array={this.state.nonIrritatingCount} text="무자극성"/>
                        <ProgressBar array={this.state.sentCount} text="제품 향"/>
                        <ProgressBar array={this.state.costEffectivenessCount} text="가성비"/>
                        <div className="prod-spec-review-summary-legend">
                            <span className="float-right">
                                <div/>
                                좋음
                            </span>
                            <span className="float-right">
                                <div/>
                                보통
                            </span>
                            <span className="float-right">
                                <div/>
                                나쁨
                            </span>
                        </div>
                    </div>
                    <div className="prod-spec-review-summary-right prod-spec-review-summary-image-container">
                        {
                            this.state.images.map((image, i) => {
                                if(i >= 4)
                                    return null;

                                return (<img key={i} src={image.url} onClick={()=>this.handleImageClick(i)}/>);
                            })
                        }
                        {
                            this.state.images.length >= 5 ?
                                <img onClick={()=>this.handleImageClick(4)}/> :
                                null
                        }
                        {
                            this.state.images.length >= 5 ?
                                (<div className="prod-spec-review-summary-more-text" onClick={()=>this.handleImageClick(4)}>
                                    <span onClick={()=>this.handleImageClick(4)}>{this.state.images.length - 4}</span> <br/>
                                    <span onClick={()=>this.handleImageClick(4)}>더보기</span>
                                </div>) :
                                null
                        }
                        {this.state.images.length ? modal : null}
                    </div>
                </div>
            </div>
        )
    }
}
