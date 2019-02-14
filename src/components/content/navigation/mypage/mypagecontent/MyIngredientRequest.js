import React from 'react';
import './MyIngredientRequest.css';

import { MyIngredientCard } from './MyIngredientCard'

const maxListNum = 10;
const dummyListNum = 257; // dummy 제품 갯수 

export class MyIngredientRequest extends React.Component{

    state = ({
        deleteList: [ false, false, false, false, false, false, false, false, false, false ], 
        checkAll: false,
        currentPage: 1,
        numOfRequest: 0,
        maxPage: 0
    });


    componentDidMount=()=>{
        // TODO : 문의한 데이터 수 가져오기, 현재 페이지에 맞게 문의 데이터 가져오기
        
        let listNum = dummyListNum; // 가정제품 갯수 넣어줄곳 
        
        let pageNum = 0;  // 페이지 최대 수 

        if(listNum===0){
            pageNum = 1;
        } else if(listNum % maxListNum === 0){
            pageNum = Math.floor(listNum/maxListNum);
        } else{
            pageNum = Math.floor(listNum/maxListNum) + 1;
        }

        this.setState({
            maxPage: pageNum    // 최대 페이지 수 설정
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
    }

    deleteChecked = () => {
        //TODO : deleteList에 true 되어있는 제품들 삭제하기
        console.log("delete " + this.state.deleteList);
    }

    changePage = (e, page) => {
        this.setState({
            currentPage: page
        })
    }

    createPagination = () => {
        let pagination = []

        let currentPage = this.state.currentPage;
        let maxPage = this.state.maxPage;

        let start = Math.floor((currentPage-1)/7) * 7 + 1;
        let end = start + 6;
        if(maxPage < end){
            end = maxPage;
        }

        for(let i = start; i<= end ; i++){
            if(i === currentPage){
                pagination.push(<div className="pagination-button pagination-focused" onClick={(e)=> this.changePage(e, i)} value={i}>{i}</div>);
            } else{
                pagination.push(<div className="pagination-button" onClick={(e)=> this.changePage(e, i)}>{i}</div>);
            }
            
        }
        return pagination;
    }

    scrollPagination = (e, op) => {
        let currentPage = this.state.currentPage;
        if(currentPage + op > 0 && currentPage + op <= this.state.maxPage){
            currentPage += op;
        }

        this.setState({
            currentPage: currentPage
        })
    }
   
    render(){
        const dummy = [
            {
                date: "12-12-12",
                title: "이거슨 문의1",
                content: "내용내용ㅇㅁ니ㅏㅇ럼;ㅣ나얼asdfasdfasdfasdfasdfasdfsadfasdfasdf",
                answered: true
            },
            {
                date: "12-12-12",
                title: "이거슨 문의1",
                content: "내용내용ㅇㅁ니ㅏㅇ럼;ㅣ나얼",
                answered: false
            },
            {
                date: "12-12-12",
                title: "이거슨 문의1",
                content: "내용내용ㅇㅁ니ㅏㅇ럼;ㅣ나얼",
                answered: false
            },
            {
                date: "12-12-12",
                title: "이거슨 문의1",
                content: "내용내용ㅇㅁ니ㅏㅇ럼;ㅣ나얼",
                answered: true
            },
        ]


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
                        dummy.map((d, i) => <MyIngredientCard data={d} key={i} index={i} check={this.state.deleteList[i]} 
                        changeCardCheck={this.changeCardCheck}/>)
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


                <div class="modal fade" id="deleteCheckedModal" role="dialog">
                    <div class="modal-dialog modal-sm">
                        <div class="modal-content">
                            <div class="modal-body">
                                {/*<button type="button" class="close" data-dismiss="modal">&times;</button>*/}
                                <h6 class="myproduct-delete-confirm">삭제하시겠습니까?</h6>
                                <button type="button" class="cancel-btn btn-default" data-dismiss="modal">취소하기</button>
                                <button type="button" class="delete-btn btn-default" data-dismiss="modal" onClick={this.deleteChecked}>삭제하기</button>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}