import React from 'react';
import './MyReview.css';
import MyReviewCard from './MyReviewCard';
import TokenUtils from '../../../../../util/TokenUtil';
import axios from 'axios';

export class MyReview extends React.Component {
    // TODO: api 요청에 따라 state 수정
    state = {
        deleteList: [ false, false, false, false, false, false, false, false, false, false ],
        category: 'living',
        checkAll: false,
        currentPage: 1,
        totalPages: 0,
        reviews: []
    };

    componentDidMount() {
        const token = TokenUtils.getLoginToken();
        const query = '?page=1&category=living';
        axios({
            method: 'get',
            url: process.env.API_URL + '/api/review/member/list' + query,
            headers: TokenUtils.getTokenRequestHeader(token)
        })
        .then((res) => {
            console.log(res.data);
            this.setState({
                reviews: res.data.reviews,
                totalPages: res.data.totalPages
            })
        })
        .catch((err) => {
            alert('알 수 없는 오류가 발생했습니다. 관리자에게 문의해 주시기 바랍니다.');
        })
    }

    changeCheckAll = (e) => {
        let newList = [];
        if(this.state.checkAll){
            for(let i = 0; i < this.state.reviews.length; i++) {
                newList.push(false);
            }
            this.setState({
                checkAll: !this.state.checkAll,
                deleteList: [...newList, ...this.state.deleteList.slice(this.state.reviews.length)]
            })
        } else{
            for(let i = 0; i < this.state.reviews.length; i++) {
                newList.push(true);
            }
            this.setState({
                checkAll: !this.state.checkAll,
                deleteList: [...newList, ...this.state.deleteList.slice(this.state.reviews.length)]
            })
        }
    }

    changeType = (e) => {
        const token = TokenUtils.getLoginToken();
        const category = e.target.value;
        let query = ''
        if(category === 'cosmetic') {
            query = '?page=1&category=cosmetic';
        } else if (category === 'living') {
            query = '?page=1&category=living';
        }
        axios({
            method: 'get',
            url: process.env.API_URL + '/api/review/member/list' + query,
            headers: TokenUtils.getTokenRequestHeader(token)
        })
        .then((res) => {
            console.log(res.data);
            this.setState({
                reviews: res.data.reviews,
                totalPages: res.data.totalPages,
                category: category
            })
        })
        .catch((err) => {
            alert('알 수 없는 오류가 발생했습니다. 관리자에게 문의해 주시기 바랍니다.');
        })
    }

    rerenderPage = (page) => {
        const token = TokenUtils.getLoginToken();
        let query = '';

        if(this.state.reviews.length === 1 ||
            this.state.reviews.length === this.state.deleteList.filter((item) => item === true).length) {
            page -= 1;
        }

        query = `?page=${page}&category=${this.state.category}`;
        console.log(page);
        axios({
            method: 'get',
            url: process.env.API_URL + '/api/review/member/list' + query,
            headers: TokenUtils.getTokenRequestHeader(token)
        })
        .then((res) => {
            this.setState({
                deleteList: [ false, false, false, false, false, false, false, false, false, false ],
                currentPage: page,
                reviews: res.data.reviews,
                totalPages: res.data.totalPages,
                checkAll: false
            })
        })
    }

    changePage = (e, page) => {
        console.log(this.state.currentPage);
        const token = TokenUtils.getLoginToken();
        let query = '?page=' + page + '&category=' + this.state.category;
        console.log(page);
        axios({
            method: 'get',
            url: process.env.API_URL + '/api/review/member/list' + query,
            headers: TokenUtils.getTokenRequestHeader(token)
        })
        .then((res) => {
            this.setState({
                currentPage: page,
                reviews: res.data.reviews,
                deleteList: [ false, false, false, false, false, false, false, false, false, false ],
                checkAll: false
            });
        })
    } 

    onChange = (key, value) => {
        const newObj = {};
        newObj[key] = value;

        this.setState(newObj);
    };

    changeCardCheck = (index) => {
        let newList = this.state.deleteList;
        newList[index] = !newList[index];
        this.setState({
            deleteList: newList
        })
    }
    
    deleteChecked = async () => {
        const indexList = [];
        const token = TokenUtils.getLoginToken();
        console.log(this.state.reviews);
        //TODO : deleteList에 true 되어있는 제품들 삭제하기
        for(let i = 0; i < this.state.reviews.length; i++) {
            if(this.state.deleteList[i] === true) {
                // console.log(this.state.products[i].index);
                indexList.push(this.state.reviews[i].review.index);
            }
        }
        
        // console.log(indexList)
        for(let i = 0; i < indexList.length; i++) {
            await axios({
                method: 'delete',
                url: process.env.API_URL + '/api/review',
                headers: TokenUtils.getTokenRequestHeader(token),
                data: {
                    "reviewId": indexList[i]
                }
            });
            console.log(this.state.currentPage);
            this.rerenderPage(this.state.currentPage);
        }
    }

    createPagination = () => {
        let pagination = []
        let currentPage = this.state.currentPage;
        console.log(currentPage + ' debug');
        let maxPage = this.state.totalPages;
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
        console.log(this.state.reviews);
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
                    { this.state.reviews.map((d, i) => <MyReviewCard data={d} key={i} index={i} mainCategory={this.state.category}
                                                        rerenderPage={this.rerenderPage} currentPage={this.state.currentPage} 
                                                        changeCardCheck={this.changeCardCheck} check={this.state.deleteList[i]}/>) }
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
            </div>
        );
    }
}