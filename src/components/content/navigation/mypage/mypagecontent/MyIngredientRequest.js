import React from 'react';
import axios from 'axios';
import './MyIngredientRequest.css';
import TokenUtils from '../../../../../util/TokenUtil';
import MyIngredientCard from './MyIngredientCard'

export class MyIngredientRequest extends React.Component{

    state = ({
        deleteList: [ false, false, false, false, false, false, false, false, false, false ], 
        checkAll: false,
        currentPage: 1,
        numOfRequest: 0,
        maxPage: 0,
        products: []
    });


    componentDidMount=()=>{
        const token = TokenUtils.getLoginToken();
        const query = '?page=1';
        axios({
            method: 'get',
            url: process.env.API_URL + '/api/ask/ingredAnal' + query,
            headers: TokenUtils.getTokenRequestHeader(token)
        })
        .then((res) => {
            this.setState({
                products: res.data.Data,
                maxPage: res.data.totalPages
            });
        })
        .catch((err) => {
            alert('알 수 없는 오류가 발생했습니다. 관리자에게 문의해주시기 바랍니다.');
        })
    };


    changeCheckAll = (e) => {
        let newList;
        if(this.state.checkAll){
            newList = [ false, false, false, false, false, false ];
            this.setState({
                checkAll: !this.state.checkAll,
                deleteList: newList
            })
        } else{
            newList = [ true, true, true, true, true, true ];
            this.setState({
                checkAll: !this.state.checkAll,
                deleteList: newList
            })
        }
    }

    changeCardCheck = (index) => {
        let newList = this.state.deleteList;
        newList[index] = !newList[index];
        this.setState({
            deleteList: newList
        })
        console.log(newList);
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
        // console.log(indexList)
        for(let i = 0; i < indexList.length; i++) {
            await axios({
                method: 'delete',
                url: process.env.API_URL + '/api/ask/cancelIngredAnal?index=' + indexList[i],
                headers: TokenUtils.getTokenRequestHeader(token)
            });
            console.log(this.state.currentPage);
            this.rerenderPage(this.state.currentPage);
        }
    }

    changePage = (e, page) => {
        console.log(this.state.currentPage);
        const token = TokenUtils.getLoginToken();
        let query = '?page=' + page;
        console.log(page);
        axios({
            method: 'get',
            url: process.env.API_URL + '/api/ask/ingredAnal' + query,
            headers: TokenUtils.getTokenRequestHeader(token)
        })
        .then((res) => {
            this.setState({
                currentPage: page,
                products: res.data.Data,
                deleteList: [ false, false, false, false, false, false, false, false, false, false ],
                checkAll: false
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

        query = `?page=${page}`;
        console.log(page);
        axios({
            method: 'get',
            url: process.env.API_URL + '/api/ask/ingredAnal' + query,
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
        let pagination = [];

        let currentPage = this.state.currentPage;
        let maxPage = this.state.maxPage;

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
        return(
            <div className="myingredient-container">
                <div className="myingredient-header">
                    <div className="myingredient-header-checkbox">
                        <input type="checkbox" onChange={this.changeCheckAll} checked={this.state.checkAll ? "checked" : ""}/>
                    </div>

                    <div className="myingredient-header-title">요청내용</div>
                    <div className="myingredient-header-answer">답변</div>
                    <div className="myingredient-header-delete">관리</div>
                </div>
                <div className="myingredient-card-box">
                    {
                        this.state.products.map((d, i) => <MyIngredientCard data={d} key={i} index={i} check={this.state.deleteList[i]} 
                        changeCardCheck={this.changeCardCheck} rerenderPage={this.rerenderPage} currentPage={this.state.currentPage}/>)
                    }
                        
                    
                    <div className="myingredient-bottom">
                        <div className="bottom-element">
                            &#10004; 선택요청을
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
                                {/*<button type="button" class="close" data-dismiss="modal">&times;</button>*/}
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