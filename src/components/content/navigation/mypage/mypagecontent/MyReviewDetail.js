import React from 'react';
import './MyReview.css';
import greenCircle from '../../../../../assets/images/common_icons/green_circle.png';
import greenLine from '../../../../../assets/images/common_icons/green_line.png';
import grayCircle from '../../../../../assets/images/common_icons/gray_circle.png';
import grayLine from '../../../../../assets/images/common_icons/gray_line.png';

export class MyReviewDetail extends React.Component {
    // TODO: api 요청에 따라 state 수정
    state = {
        brand: '강청',
        name: '강청 산소계 표백제',
        category: 'living',
        rating: 4,
        usePeriod: 2,
        functionality: 2,
        nonIrritating: 2,
        sent: 1,
        costEffectiveness: 3,
        reviewText: '동해물과 백두산이 마르고 닳도록\n' +
            '하느님이 보우하사 우리나라 만세\n' +
            '무궁화 삼천리 화려강산\n' +
            '대한 사람 대한으로 길이 보전하세\n',
        imageFiles: [],
        additionalReviewList: [{
            id: 1,
            duration: 2,
            text: '가성비 좋아요\n재우돼지\n재우돼지\n재우돼지',
            success: true
        }, {
            id: 2,
            duration: 4,
            text: '향이 좋지는 않지만\n가성비가 너무 좋아요!',
            success: true
        }, {
            id: 3,
            duration: 7,
            text: '향 때문에 다른거 씁니다.',
            success: false
        }]
    };

    onChange = (key, value) => {
        const newObj = {};
        newObj[key] = value;

        this.setState(newObj);
    };

    deleteImageFile = (fileName) => {
        this.setState({
            imageFiles: this.state.imageFiles.filter((item) => item.name !== fileName)
        });
    };

    render() {
        if(this.state.brand === '')
            return null;

        return (
            <div className="my-review-container">
                <div className="my-review-title">
                    <span>
                        <img alt="물건 사진" src={`${process.env.S3_URL}/product-images/${this.state.category}-product-images/${this.state.brand}/${this.state.name}.jpg`} />
                    </span>
                    <span>
                        <h6>{this.state.brand}</h6>
                        <h4>{this.state.name}</h4>
                    </span>
                </div>
                <div className="my-review-detail-container">
                    <div className="my-review-detail-header">
                        <h3>1. 별점</h3>
                    </div>
                    <div className="my-review-detail-content">
                        <i className={`my-review-star fa fa-star${(this.state.rating >= 1 ? ' selected' : '-o')}`} aria-hidden="true" onClick={()=>this.onChange('rating', 1)}/>
                        <i className={`my-review-star fa fa-star${(this.state.rating >= 2 ? ' selected' : '-o')}`} aria-hidden="true" onClick={()=>this.onChange('rating', 2)} />
                        <i className={`my-review-star fa fa-star${(this.state.rating >= 3 ? ' selected' : '-o')}`} aria-hidden="true" onClick={()=>this.onChange('rating', 3)} />
                        <i className={`my-review-star fa fa-star${(this.state.rating >= 4 ? ' selected' : '-o')}`} aria-hidden="true" onClick={()=>this.onChange('rating', 4)} />
                        <i className={`my-review-star fa fa-star${(this.state.rating >= 5 ? ' selected' : '-o')}`} aria-hidden="true" onClick={()=>this.onChange('rating', 5)} />
                    </div>
                </div>
                <div className="my-review-detail-container">
                    <div className="my-review-detail-header">
                        <h3>2. 사용기간</h3>
                    </div>
                    <div className="my-review-detail-content">
                        <select className="my-review-use-period-select"
                                value={this.state.usePeriod + '개월'}
                                onChange={(e)=>this.onChange('usePeriod', e.target.value.slice(0, e.target.value.length-2))}
                                disabled={true}
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => {
                                return (<option key={i}>{i}개월</option>);
                            })}
                        </select>
                    </div>
                </div>
                <div className="my-review-detail-container">
                    <div className="my-review-detail-header">
                        <h3>3. 세부 항목</h3>
                    </div>
                    <div className="my-review-detail-content">
                        <div className="my-review-detail-bar">
                            <span className="my-review-detail-bar-header">기능력</span>
                            <span>
                                <img src={greenCircle} className="my-review-detail-bar-circle selected" alt="bar-img" onClick={()=>this.onChange('functionality', 1)}/>
                                {this.state.functionality >= 2 ?
                                    (<img src={greenLine} className="my-review-detail-bar-line selected" alt="bar-img" />) :
                                    (<img src={grayLine} className="my-review-detail-bar-line" alt="bar-img" />)}
                                {this.state.functionality >= 2 ?
                                    (<img src={greenCircle} className="my-review-detail-bar-circle selected" alt="bar-img" onClick={()=>this.onChange('functionality', 2)} />) :
                                    (<img src={grayCircle} className="my-review-detail-bar-circle" alt="bar-img" onClick={()=>this.onChange('functionality', 2)} />)}
                                {this.state.functionality >= 3 ?
                                    (<img src={greenLine} className="my-review-detail-bar-line selected" alt="bar-img" />) :
                                    (<img src={grayLine} className="my-review-detail-bar-line" alt="bar-img" />)}
                                {this.state.functionality >= 3 ?
                                    (<img src={greenCircle} className="my-review-detail-bar-circle selected" alt="bar-img" onClick={()=>this.onChange('functionality', 3)} />) :
                                    (<img src={grayCircle} className="my-review-detail-bar-circle" alt="bar-img" onClick={()=>this.onChange('functionality', 3)} />)}
                            </span>
                        </div>
                        <div className="my-review-detail-bar">
                            <span className="my-review-detail-bar-header">저자극성</span>
                            <span>
                                <img src={greenCircle} className="my-review-detail-bar-circle selected" alt="bar-img" onClick={()=>this.onChange('nonIrritating', 1)}/>
                                {this.state.nonIrritating >= 2 ?
                                    (<img src={greenLine} className="my-review-detail-bar-line selected" alt="bar-img" />) :
                                    (<img src={grayLine} className="my-review-detail-bar-line" alt="bar-img" />)}
                                {this.state.nonIrritating >= 2 ?
                                    (<img src={greenCircle} className="my-review-detail-bar-circle selected" alt="bar-img" onClick={()=>this.onChange('nonIrritating', 2)} />) :
                                    (<img src={grayCircle} className="my-review-detail-bar-circle" alt="bar-img" onClick={()=>this.onChange('nonIrritating', 2)} />)}
                                {this.state.nonIrritating >= 3 ?
                                    (<img src={greenLine} className="my-review-detail-bar-line selected" alt="bar-img" />) :
                                    (<img src={grayLine} className="my-review-detail-bar-line" alt="bar-img" />)}
                                {this.state.nonIrritating >= 3 ?
                                    (<img src={greenCircle} className="my-review-detail-bar-circle selected" alt="bar-img" onClick={()=>this.onChange('nonIrritating', 3)} />) :
                                    (<img src={grayCircle} className="my-review-detail-bar-circle" alt="bar-img" onClick={()=>this.onChange('nonIrritating', 3)} />)}
                            </span>
                        </div>
                        <div className="my-review-detail-bar">
                            <span className="my-review-detail-bar-header">제품향</span>
                            <span>
                                <img src={greenCircle} className="my-review-detail-bar-circle selected" alt="bar-img" onClick={()=>this.onChange('sent', 1)}/>
                                {this.state.sent >= 2 ?
                                    (<img src={greenLine} className="my-review-detail-bar-line selected" alt="bar-img" />) :
                                    (<img src={grayLine} className="my-review-detail-bar-line" alt="bar-img" />)}
                                {this.state.sent >= 2 ?
                                    (<img src={greenCircle} className="my-review-detail-bar-circle selected" alt="bar-img" onClick={()=>this.onChange('sent', 2)} />) :
                                    (<img src={grayCircle} className="my-review-detail-bar-circle" alt="bar-img" onClick={()=>this.onChange('sent', 2)} />)}
                                {this.state.sent >= 3 ?
                                    (<img src={greenLine} className="my-review-detail-bar-line selected" alt="bar-img" />) :
                                    (<img src={grayLine} className="my-review-detail-bar-line" alt="bar-img" />)}
                                {this.state.sent >= 3 ?
                                    (<img src={greenCircle} className="my-review-detail-bar-circle selected" alt="bar-img" onClick={()=>this.onChange('sent', 3)} />) :
                                    (<img src={grayCircle} className="my-review-detail-bar-circle" alt="bar-img" onClick={()=>this.onChange('sent', 3)} />)}
                            </span>
                        </div>
                        <div className="my-review-detail-bar">
                            <span className="my-review-detail-bar-header">가성비</span>
                            <span>
                                <img src={greenCircle} className="my-review-detail-bar-circle selected" alt="bar-img" onClick={()=>this.onChange('costEffectiveness', 1)}/>
                                {this.state.costEffectiveness >= 2 ?
                                    (<img src={greenLine} className="my-review-detail-bar-line selected" alt="bar-img" />) :
                                    (<img src={grayLine} className="my-review-detail-bar-line" alt="bar-img" />)}
                                {this.state.costEffectiveness >= 2 ?
                                    (<img src={greenCircle} className="my-review-detail-bar-circle selected" alt="bar-img" onClick={()=>this.onChange('costEffectiveness', 2)} />) :
                                    (<img src={grayCircle} className="my-review-detail-bar-circle" alt="bar-img" onClick={()=>this.onChange('costEffectiveness', 2)} />)}
                                {this.state.costEffectiveness >= 3 ?
                                    (<img src={greenLine} className="my-review-detail-bar-line selected" alt="bar-img" />) :
                                    (<img src={grayLine} className="my-review-detail-bar-line" alt="bar-img" />)}
                                {this.state.costEffectiveness >= 3 ?
                                    (<img src={greenCircle} className="my-review-detail-bar-circle selected" alt="bar-img" onClick={()=>this.onChange('costEffectiveness', 3)} />) :
                                    (<img src={grayCircle} className="my-review-detail-bar-circle" alt="bar-img" onClick={()=>this.onChange('costEffectiveness', 3)} />)}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="my-review-detail-container">
                    <div className="my-review-detail-header">
                        <h3 className="my-review-detail-header-inline">4. 리뷰</h3>
                        <span className="my-review-detail-header-boundary">|</span>
                        <span>
                            <h6 className="my-review-detail-header-inline">
                                리뷰를 솔직하고 자세히 적어주세요.
                            </h6>
                            <br />
                            <h6 className="my-review-detail-header-inline second-line">
                                광고성, 대가성 리뷰나 욕설 및 무조건적인 비방이 포함된 리뷰 등 이용약관에 위배되는 리뷰는 임의로 삭제될 수 있습니다.
                            </h6>
                        </span>
                    </div>
                    <div className="my-review-detail-content">
                        <textarea className="my-review-textarea" value={this.state.reviewText} onChange={(e)=>{this.onChange('reviewText', e.target.value)}} />
                    </div>
                </div>
                <div className="my-review-detail-container">
                    <div className="my-review-detail-header">
                        <h3 className="my-review-detail-header-inline">5. 첨부파일</h3>
                        <span className="my-review-detail-header-boundary">|</span>
                        <h6 className="my-review-detail-header-inline">
                            최대 10장까지 업로드 가능합니다.
                        </h6>
                    </div>
                    <div className="my-review-detail-content">
                        <input className="my-review-file-invisible" type="file" name="review-images" multiple="multiple"
                               onChange={(e) => this.onChange('imageFiles', Object.keys(e.target.files).map((key) => e.target.files[key]))}
                               id="image-upload"
                        />
                        <label htmlFor="image-upload" className="my-review-upload-image-label">파일 선택</label>
                        <span>
                            {this.state.imageFiles.length === 0 ? <span className="my-review-upload-text">선택한 파일 없음</span> : null}
                            {this.state.imageFiles.map(image => {
                                return (
                                    <span key={image.name} className="my-review-upload-text">
                                        {image.name}
                                        <i className="fas fa-times my-review-upload-red-x" onClick={() => this.deleteImageFile(image.name)} />
                                    </span>
                                );
                            })}
                        </span>
                    </div>
                </div>
                <div className="my-review-detail-container">
                    <div className="my-review-detail-header">
                        <h3>6. 추가 리뷰</h3>
                    </div>
                        {this.state.additionalReviewList.map((item, i) => {
                            return (
                                <div className={`my-review-additional-review-container ${item.success?'success':'fail'}`} key={i}>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className={`my-review-additional-review-duration ${item.success?'success':'fail'}`}>
                                                    {item.duration}개월째 사용 {item.success?'':'중단'}
                                                </td>
                                                <td className="my-review-additional-review-detail">
                                                    {item.text.split('\n').map((item, key) => {
                                                        return (<span key={key}>{key !== 0 ? (<br />) : null}{item}</span>);
                                                    })}
                                                </td>
                                                <td className="my-review-additional-review-item my-review-additional-review-icon">
                                                    <i className="fas fa-pen" />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            );
                        })}
                </div>
                <div className="my-review-detail-container">
                    <button className="my-review-correct-button btn">수정 저장</button>
                </div>
            </div>
        );
    }
}