import React from 'react';
import { Link } from 'react-router-dom';
import './EventDetail.css';

export class EventDetail extends React.Component {
    constructor(props) {
        super(props);

        // TODO
        this.state = {
            event: {
                image: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                title: '뿌요뿌요',
                contents: 'e스포츠',
                startDate: '2018-09-11',
                endDate: '2018-10-12',
                end: false
            },
            comments: [

            ],
            likes: 10,
            loggedIn: true
        };
    }


    
    render() {

        return (
            <div className="event-detail-container">
                <div className="event-detail-header">
                    <div className="event-detail-header-left">
                        <h5>2019.01.01 ~ 2019.02.02</h5>
                        <h1>에부부의 탄생일</h1>
                        <h6>에부부가 탄생하였따!</h6>
                    </div>
                    <div className="event-detail-header-right">
                        <div className="event-detail-day">D-14</div>
                    </div>
                </div>
                <div className="event-detail-content">
                
                </div>

                <div className="event-detail-bottom">
                    <div className="event-detail-icon-inactive">
                        <i className="fa fa-share-alt"/>
                        <p>공유하기</p>
                    </div>
                    <div className="event-detail-icon-active" style={{marginRight: '15px'}}>
                        <i className="fa fa-heart"/>
                        <p>좋아요</p>
                    </div>
                </div>
                <div className="event-detail-button-box">
                    {
                        this.state.loggedIn ? <button type="button" className="event-detail-button" >신청하기</button> :
                        <button type="button" className="event-detail-button" >로그인</button>
                    }
                </div>
                <div className="comments-container">
                    <div className="comment-write-box">
                        <div className="comment-writer-profile">
                            <img src='https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg' alt="profile-pic"/>
                            <p>닉네임</p>
                            <div>여자</div>
                            <div>25세</div>
                            <div>자녀 7세</div>
                        </div>
                        <textarea className="comment-write" placeholder="댓글을 입력하세요. (최대 300자)" maxLength="300"/>
                        <button type="button" className="comment-write-button">등록</button>
                    </div>
                    <div className="comment-list-header">
                        <div className="comment-number">
                            댓글&nbsp;&nbsp;<span>100</span>개
                        </div>
                        <div className="comment-sort">추천수</div>
                        <div className="comment-sort-selected" style={{marginRight: '20px'}}>최신순</div>
                    </div>
                    <div className="comment-list-box">

                    </div>
                
                </div>
            </div>
        )
    }
}