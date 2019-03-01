import React from 'react';
import './OpenRequest.css';
import TokenUtils from '../../../../../util/TokenUtil';
import axios from 'axios';
import { OpenRequestCard } from './OpenRequestCard'

export class OpenRequest extends React.Component{

    state = ({
        currentPage: 1,
        maxPage: 0,
        products: []
    });


    componentDidMount=()=>{
        const token = TokenUtils.getLoginToken();
        const query = `?page=${this.state.currentPage}`;
        axios({
            method: 'get',
            url: process.env.API_URL + '/api/ask/ingredOpen' + query,
            headers: TokenUtils.getTokenRequestHeader(token)
        })
        .then((res) => {
            this.setState({
                products: res.data.Data,
                maxPage: res.data.totalPages
            });
        })
        .catch((err) => {
            alert('알 수 없는 오류가 발생했습니다. 관리자에게 문의해 주시기 바랍니다.');
        })
    };

    changePage = (e, page) => {
        const token = TokenUtils.getLoginToken();
        const query = `?page=${page}`;
        axios({
            method: 'get',
            url: process.env.API_URL + '/api/ask/ingredOpen' + query,
            headers: TokenUtils.getTokenRequestHeader(token)
        })
        .then((res) => {
            this.setState({
                products: res.data.Data,
                currentPage: page
            });
        })
        .catch((err) => {
            alert('알 수 없는 오류가 발생했습니다. 관리자에게 문의해주시기 바랍니다.');
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

        return(
            <div className="openrequest-container">
                <div className="openrequest-header">
                    <div className="openrequest-header-name">제품명</div>
                    <div className="openrequest-header-info">주요&nbsp;정보</div>
                </div>
                <div className="openrequest-card-box">
                    {
                        // TODO : 현재 카테고리에 따라 알맞는 배열을 map 시키기
                        this.state.products.map((d, i)=> <OpenRequestCard data={d} key={i} />)
                        
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