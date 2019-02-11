import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export class MyPageMenu extends React.Component{


    state = {
        currentPage: "내 프로필"
    };

    

    componentDidMount=()=>{
        
    };

    changePage = (page) => {
        this.setState({
            currentPage: page
        })
        this.props.changeHeader(page);
    }


    render(){
        const myAccount = [
            {
                path:'/my-profile',
                menu:'내 프로필'
            },
            {
                path:'/profile-modify',
                menu:'프로필 수정'
            }
        ]

        const myInterest = [
            {
                path:'/my-house-products',
                menu:'우리집 화학제품'
            },
            {
                path:'/dib-products',
                menu:'찜한 제품'
            }
        ]

        const myActivity = [
            {
                path:'/my-review',
                menu:'리뷰'
            },
            {
                path:'/ingredient-open-request',
                menu:'성분 공개 요청'
            },
            {
                path:'/ingredient-analysis-request',
                menu:'성분 분석 요청'
            },
            {
                path:'/my-help',
                menu:'1:1 문의하기'
            }
        ]
           
        return (
            <div className="mypage-menu">
                <ul className="mypage-category">
                    <li className="mypage-category-box">
                        <p>나의 계정</p>
                        <ul className="mypage-category-list">
                            {myAccount.map((d,i)=><li key={i}><Link to={'/mypage' + d.path} 
                            onClick={(e) => this.changePage(d.menu)}>{d.menu}</Link></li>)}
                        </ul>
                    </li>
                    <li className="mypage-category-box">
                        <p>나의 관심</p>
                        <ul className="mypage-category-list">
                            {myInterest.map((d,i)=><li key={i}><Link to={'/mypage' + d.path}
                            onClick={(e) => this.changePage(d.menu)}>{d.menu}</Link></li>)}
                        </ul>
                    </li>
                    <li className="mypage-category-box">
                        <p>나의 활동</p>
                        <ul className="mypage-category-list">
                            {myActivity.map((d,i)=><li key={i}><Link to={'/mypage' + d.path}
                            onClick={(e) => this.changePage(d.menu)}>{d.menu}</Link></li>)}
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}