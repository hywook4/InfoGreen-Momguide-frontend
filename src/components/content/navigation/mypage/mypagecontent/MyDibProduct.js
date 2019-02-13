import React from 'react';
import './MyProducts.css';

import { MyProductCard } from './MyProductCard'


const maxProductNum = 10;
const dummyProductNum = 257; // dummy 제품 갯수 

export class MyDibProduct extends React.Component{

    state = ({
        mainCategory: "living",
        deleteList: [ false, false, false, false, false, false, false, false, false, false ], 
        checkAll: false,
        currentPage: 1,
        numOfProduct: 0,
        maxPage: 0
    });


    componentDidMount=()=>{
        // TODO : 찜한 제품의 데이터를 해당 페이지에 맞게 가져오기, 총 가정제품의 수 가져오기 , maxPAge 수 계산해서 넣어주기 

        let productNum = dummyProductNum; // 가정제품 갯수 넣어줄곳 
        
        let pageNum = 0;  // 페이지 최대 수 

        if(productNum===0){
            pageNum = 1;
        } else if(productNum % maxProductNum === 0){
            pageNum = Math.floor(productNum/maxProductNum);
        } else{
            pageNum = Math.floor(productNum/maxProductNum) + 1;
        }

        this.setState({
            maxPage: pageNum    // 최대 페이지 수 설정
        })
    };

    changeType = (e) => {
        this.setState({
            mainCategory: e.target.value
        });

        // TODO : 다시 api 요청을 보내서 값을 받고 리렌더링 (큰 카테고리 변경)
    }

    changeCheckAll = (e) => {
        let newList;
        if(this.state.checkAll){
            newList = [ false, false, false, false, false, false, false, false, false, false ];
            this.setState({
                checkAll: !this.state.checkAll,
                deleteList: newList
            })
        } else{
            newList = [ true, true, true, true, true, true, true, true, true, true ];
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

        const dummyData = [
            {
                index: 38,
                name: '무첨가EM가루비누',
                brand: '강청',
                madeBy: '(주)강청',
                category: '세탁세제',
                ingredient: 'O',
                testNum: '',
                permit: '',
                eco: 'df',
                foreignCertificate: '',
                viewNum: 46,
                rateCount: 56,
                rateSum: 200,
                includeDanger: false,
                includeToxic: true,
                includeCare: true,
            },
            {
                index: 33,
                name: '강청 산소계 표백제',
                brand: '강청',
                madeBy: '(주)강청',
                category: '세탁세제',
                ingredient: 'O',
                testNum: 'F-A03B-O001001-A160',
                permit: '',
                eco: '',
                foreignCertificate: '',
                viewNum: 24,
                rateCount: 34,
                rateSum: 130,
                includeDanger: false,
                includeToxic: false,
                includeCare: false,
            },
            {
                index: 34,
                name: '강청 순천연 가루비누',
                brand: '강청',
                madeBy: '(주)강청',
                category: '세탁세제',
                ingredient: 'O',
                testNum: '',
                permit: '',
                eco: '',
                foreignCertificate: '',
                viewNum: 28,
                rateCount: 5,
                rateSum: 20,
                includeDanger: false,
                includeToxic: false,
                includeCare: false,
            }
        ]


        return(
            <div className="myproduct-container">
                <div className="myproduct-header">
                    <div className="header-checkbox">
                        <input type="checkbox" onChange={this.changeCheckAll} checked={this.state.checkAll ? "checked" : ""}/>
                    </div>
                    <div className="header-type">
                        <select onChange={this.changeType}>
                            <option value="living">가정용 화학제품</option>
                            <option value="cosmetic">유아용 화장품</option>
                        </select>
                    </div>   
                    <div className="header-name">제품명</div>
                    <div className="header-info">주요 정보</div>
                    <div className="header-delete">관리</div>
                </div>
                <div className="myproduct-card-box">
                    {
                        // TODO : 현재 카테고리에 따라 알맞는 배열을 map 시키기
                        dummyData.map((d, i)=> <MyProductCard mainCategory={this.state.mainCategory} data={d} key={i} 
                        index={i} check={this.state.deleteList[i]} changeCardCheck={this.changeCardCheck}/>)
                        
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