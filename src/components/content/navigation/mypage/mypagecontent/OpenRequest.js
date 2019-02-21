import React from 'react';
import './OpenRequest.css';
import config from '../../../../../config';

import { OpenRequestCard } from './OpenRequestCard'

const maxProductNum = config.MAX_LIST_NUM;
const dummyProductNum = 100; // dummy 제품 갯수 

export class OpenRequest extends React.Component{

    state = ({
        currentPage: 1,
        numOfProduct: 0,
        maxPage: 0
    });


    componentDidMount=()=>{
        // TODO : 성분 공개 요청 제품의 데이터를 해당 페이지에 맞게 가져오기, 총 가정제품의 수 가져오기 , maxPAge 수 계산해서 넣어주기 

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
            <div className="openrequest-container">
                <div className="openrequest-header">
                    <div className="openrequest-header-name">제품명</div>
                    <div className="openrequest-header-info">주요&nbsp;정보</div>
                </div>
                <div className="openrequest-card-box">
                    {
                        // TODO : 현재 카테고리에 따라 알맞는 배열을 map 시키기
                        dummyData.map((d, i)=> <OpenRequestCard data={d} key={i} />)
                        
                    }

                    <div className="myproduct-pagination-box">
                        <div className="myproduct-pagination">
                            <div className="pagination-scroll-button" onClick={(e)=> this.scrollPagination(e, -1)}>&lt;</div>
                            {this.createPagination()}
                            <div className="pagination-scroll-button" onClick={(e)=> this.scrollPagination(e, +1)}>&gt;</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}