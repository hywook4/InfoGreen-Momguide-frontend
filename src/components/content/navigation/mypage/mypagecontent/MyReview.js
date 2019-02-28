import React from 'react';
import './MyReview.css';
import MyReviewCard from './MyReviewCard';

export class MyReview extends React.Component {
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

    createPagination = () => {
        let pagination = []
        let currentPage = this.state.currentPage;
        console.log(currentPage + ' debug');
        let maxPage = this.state.maxPage;
        console.log(maxPage);
        let start = Math.floor((currentPage-1)/7) * 7 + 1;
        let end = start + 6;
        if(maxPage < end){
            end = maxPage;
        }

        for(let i = start; i<= end ; i++){
            if(i === currentPage){
                pagination.push(<div className="pagination-button pagination-focused" onClick={(e)=> this.changePage(e, i)} key={i}>{i}</div>);
            } else{
                pagination.push(<div className="pagination-button" onClick={(e)=> this.changePage(e, i)} key={i}>{i}</div>);
            }
            
        }
        return pagination;
    }

    scrollPagination = (e, op) => {
        let currentPage = this.state.currentPage;
        if(currentPage + op > 0 && currentPage + op <= this.state.maxPage){
            currentPage += op;
        }
        this.changePage(e, currentPage);
        this.setState({
            currentPage: currentPage
        })
    }
   

    render() {
        if(this.state.brand === '')
            return null;

        return (
            <div className="my-review-container">
                <div className="my-review-header">
                    <div className="my-review-header-checkbox">
                        <input type="checkbox" onChange={this.changeCheckAll} checked={this.state.checkAll ? "checked" : ""}/>
                    </div>
                    <div className="my-review-header-type">
                        <select onChange={this.changeType}>
                            <option value="living">가정용 화학제품</option>
                            <option value="cosmetic">유아용 화장품</option>
                        </select>
                    </div>   
                    <div className="my-review-header-name">제품명</div>
                    <div className="my-review-header-rate">평점</div>
                    <div className="my-review-header-delete">관리</div>
                </div>
                <div className="my-review-card-box">
                    <MyReviewCard />
                    <div className="myproduct-bottom">
                        <div className="bottom-element">
                            &#10004; 선택상품을
                        </div>
                        <div className="all-delete">
                            <div className="cancel-button" data-toggle="modal" data-target="#deleteCheckedModal">삭제하기</div>
                        </div>
                    </div>

                    <div className="myproduct-pagination-box">
                        <div className="myproduct-pagination">
                            <div className="pagination-scroll-button" onClick={(e)=> this.scrollPagination(e, -1)}>&lt;</div>
                            {this.createPagination()}
                            <div className="pagination-scroll-button" onClick={(e)=> this.scrollPagination(e, +1)}>&gt;</div>
                        </div>
                    </div>
                </div>


                <div className="modal fade" id="deleteCheckedModal" role="dialog">
                    <div className="modal-dialog modal-sm">
                        <div className="modal-content">
                            <div className="modal-body">
                                {/*<button type="button" className="close" data-dismiss="modal">&times;</button>*/}
                                <h6 className="myproduct-delete-confirm">삭제하시겠습니까?</h6>
                                <button type="button" className="cancel-btn btn-default" data-dismiss="modal">취소하기</button>
                                <button type="button" className="delete-btn btn-default" data-dismiss="modal" onClick={this.deleteChecked}>삭제하기</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="my-review-detail-container">
                    <div className="my-review-detail-header">
                        <h3>1. 별점</h3>
                    </div>
                    <div className="my-review-detail-content">
                        <i className={`my-review-star fa fa-star${(this.state.rating >= 1 ? ' selected' : '-o')}`} aria-hidden="true"/>
                        <i className={`my-review-star fa fa-star${(this.state.rating >= 2 ? ' selected' : '-o')}`} aria-hidden="true"/>
                        <i className={`my-review-star fa fa-star${(this.state.rating >= 3 ? ' selected' : '-o')}`} aria-hidden="true" />
                        <i className={`my-review-star fa fa-star${(this.state.rating >= 4 ? ' selected' : '-o')}`} aria-hidden="true" />
                        <i className={`my-review-star fa fa-star${(this.state.rating >= 5 ? ' selected' : '-o')}`} aria-hidden="true" />
                    </div>
                </div>
                <div className="my-review-detail-container">
                    <button className="my-review-correct-button btn">수정 저장</button>
                </div>
            </div>
        );
    }
}