import React from 'react';
import {Link} from 'react-router-dom';


export class MyPageMenu extends React.Component{


    state = {
        currentPage: "내 프로필"
    };

    

    componentDidMount=()=>{
        let path = window.location.href.split("/");
        path = path.pop();
        
        let currentPage = this.getCurrentPage(path);
        console.log(currentPage);
        this.setState({
            currentPage: currentPage
        })
        this.props.changeHeader(currentPage);
    };

    changePage = (page) => {
        this.setState({
            currentPage: page
        })
        this.props.changeHeader(page);
    }

    getCurrentPage = (path) => {
        let currentPage;
        switch(path){
            case 'my-profile':
                currentPage = '내 프로필';
                break;
            case 'profile-modify':
                currentPage = '프로필 수정';
                break;
            case 'my-house-products':
                currentPage = '우리집 화학제품';
                break;
            case 'dib-products':
                currentPage = '찜한 제품';
                break;
            case 'my-review':
                currentPage = '리뷰';
                break;
            case 'ingredient-open-request':
                currentPage = '성분 공개 요청';
                break;
            case 'ingredient-analysis-request':
                currentPage = '성분 분석 요청';
                break;
            case 'my-help':
                currentPage = '1:1 문의하기';
                break;
            default:
                break;
        }
        return currentPage;
    }

    render(){
        const myAccount = [
            {
                path:'/my-profile',
                menu:'내 프로필'
            },
            {
                path:'/profile-modify-password-check',
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