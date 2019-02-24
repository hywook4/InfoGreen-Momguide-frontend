import React from 'react';
import './MyProducts.css';
import config from '../../../../../config';
import axios from 'axios';
import { MyProductCard } from './MyProductCard'
import TokenUtils from '../../../../../util/TokenUtil';

export class MyHouseProduct extends React.Component{

    state = ({
        type: "house",
        mainCategory: "living",
        deleteList: [ false, false, false, false, false, false, false, false, false, false ], 
        checkAll: false,
        currentPage: 1,
        maxPage: 0,
        products: []
    });

    componentDidMount=()=>{
        const token = TokenUtils.getLoginToken();
        const query = `?isCosmetic=false&page=${this.state.currentPage}`;
        axios({
            method: 'get',
            url: process.env.API_URL + '/api/auth/homeProduct' + query,
            headers: TokenUtils.getTokenRequestHeader(token)
        }).then((res) => {
            this.setState({
                mainCategory: "living",
                products: res.data.Data,
                maxPage: res.data.totalPages
            });
        }).catch((err) => {
            alert('알 수 없는 오류입니다. 관리자에게 문의해주시기 바랍니다.');
        });
    };

    changeType = (e) => {
        const token = TokenUtils.getLoginToken();
        const category = e.target.value;
        let query = '';
        if(category === 'cosmetic') {
            query = `?isCosmetic=true&page=1`;
        } else if(category === 'living') {
            query = `?isCosmetic=false&page=1`;
        }

        axios({
            method: 'get',
            url: process.env.API_URL + '/api/auth/homeProduct' + query,
            headers: TokenUtils.getTokenRequestHeader(token)
        })
        .then((res) => {
            this.setState({
                currentPage: 1,
                mainCategory: category,
                products: res.data.Data,
                maxPage: res.data.totalPages,
                deleteList: [ false, false, false, false, false, false, false, false, false, false ]
            })
        })
        .catch((err) => {
            alert('알 수 없는 오류입니다. 관리자에게 문의해주시기 바랍니다.');
        })
    }

    changeCheckAll = (e) => {
        let newList = [];
        if(this.state.checkAll){
            for(let i = 0; i < this.state.products.length; i++) {
                newList.push(false);
            }
            this.setState({
                checkAll: !this.state.checkAll,
                deleteList: [...newList, ...this.state.deleteList.slice(this.state.products.length)]
            })
        } else{
            for(let i = 0; i < this.state.products.length; i++) {
                newList.push(true);
            }
            this.setState({
                checkAll: !this.state.checkAll,
                deleteList: [...newList, ...this.state.deleteList.slice(this.state.products.length)]
            })
        }
    }

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
        //TODO : deleteList에 true 되어있는 제품들 삭제하기
        for(let i = 0; i < this.state.products.length; i++) {
            if(this.state.deleteList[i] === true) {
                // console.log(this.state.products[i].index);
                indexList.push(this.state.products[i].index);
            }
        }
        for(let i = 0; i < indexList.length; i++) {
            if(this.state.mainCategory === 'cosmetic') {
                await axios({
                    method: 'delete',
                    url: process.env.API_URL + '/api/auth/cancelHomeCosmetic',
                    headers: TokenUtils.getTokenRequestHeader(token),
                    data: {
                        productIndex: indexList[i]
                    }
                });
            } else if(this.state.mainCategory === 'living') {
                await axios({
                    method: 'delete',
                    url: process.env.API_URL + '/api/auth/cancelHomeLiving',
                    headers: TokenUtils.getTokenRequestHeader(token),
                    data: {
                        productIndex: indexList[i]
                    }
                });
            }
            this.rerenderPage(this.state.currentPage);
        }
    }

    changePage = (e, page) => {
        console.log(this.state.currentPage);
        const token = TokenUtils.getLoginToken();
        let query = '';
        if(this.state.mainCategory === 'cosmetic') {
            query = `?isCosmetic=true&page=${page}`;
        } else if(this.state.mainCategory === 'living') {
            query = `?isCosmetic=false&page=${page}`;
        }
        axios({
            method: 'get',
            url: process.env.API_URL + '/api/auth/homeProduct' + query,
            headers: TokenUtils.getTokenRequestHeader(token)
        })
        .then((res) => {
            this.setState({
                currentPage: page,
                products: res.data.Data
            });
        })
    }

    rerenderPage = (page) => {
        const token = TokenUtils.getLoginToken();
        let query = '';

        if(this.state.products.length === 1 ||
            this.state.products.length === this.state.deleteList.filter((item) => item === true).length) {
            page -= 1;
        }
        if(this.state.mainCategory === 'cosmetic') {
            query = `?isCosmetic=true&page=${page}`;
        } else if(this.state.mainCategory === 'living') {
            query = `?isCosmetic=false&page=${page}`;
        }
        axios({
            method: 'get',
            url: process.env.API_URL + '/api/auth/homeProduct' + query,
            headers: TokenUtils.getTokenRequestHeader(token)
        })
        .then((res) => {
            this.setState({
                deleteList: [ false, false, false, false, false, false, false, false, false, false ],
                currentPage: page,
                products: res.data.Data,
                maxPage: res.data.totalPages
            })
        })
    }

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
   
    render(){
        console.log(this.state.deleteList);
        return(
            <div className="myproduct-container">
                <div className="myproduct-header">
                    <div className="myproduct-header-checkbox">
                        <input type="checkbox" onChange={this.changeCheckAll} checked={this.state.checkAll ? "checked" : ""}/>
                    </div>
                    <div className="myproduct-header-type">
                        <select onChange={this.changeType}>
                            <option value="living">가정용 화학제품</option>
                            <option value="cosmetic">유아용 화장품</option>
                        </select>
                    </div>   
                    <div className="myproduct-header-name">제품명</div>
                    <div className="myproduct-header-info">주요 정보</div>
                    <div className="myproduct-header-delete">관리</div>
                </div>
                <div className="myproduct-card-box">
                    {
                        // TODO : 현재 카테고리에 따라 알맞는 배열을 map 시키기
                        this.state.products.map((d, i)=> <MyProductCard mainCategory={this.state.mainCategory} data={d} key={i} 
                        index={i} check={this.state.deleteList[i]} changeCardCheck={this.changeCardCheck} currentPage={this.state.currentPage}
                        reRenderPage={this.rerenderPage} type={this.state.type}/>)
                        
                    }
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
        )
    }
}