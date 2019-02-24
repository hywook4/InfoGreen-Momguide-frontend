import React from 'react';
import { Link } from 'react-router-dom';
import './EventDetail.css';
import history from '../../../../history/history'
import {CommentCard} from '../../../common/CommentCard/CommentCard';


const user = {
    index: 1,
    imageUrl: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
    name: '테스트',
    sex: '남자',
    age: '23',
    childAge: '1',
    additionalProfile: true
}

export class EventDetail extends React.Component {
    constructor(props) {
        super(props);

        // TODO
        this.state = {
            user: user,
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
            loggedIn: true,
            commentPage: 1,
            totalCommentPage: 2,
            myComment: "",
            sortBy : "최신순"
        };
    }

    componentDidMount = () => {
        const dummy = [
            {
                index: 1,
                imageUrl: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                name: '테스트',
                sex: '남자',
                age: '23',
                childAge: '1',
                date: '2018.02.03 12:00',
                content: 'ㅇㄻㄴㅇㄹ',
                likes: 10,
                dislikes: 10,
                likePressed: true,
                dislikePressed: false
            },
            {
                index: 2,
                imageUrl: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                name: '송재우',
                sex: '여자',
                age: '23',
                childAge: '12',
                date: '2018.02.03 12:00',
                content: '20cm',
                likes: 20,
                dislikes: 20,
                likePressed: false,
                dislikePressed: true
            },
            {
                index: 3,
                imageUrl: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                name: '에부부',
                sex: '남자',
                age: '23',
                childAge: '53',
                date: '2018.02.03 12:00',
                content: '와 에부부 정말 멋지네요',
                likes: 10,
                dislikes: 5,
                likePressed: false,
                dislikePressed: false
            },
            {
                index: 4,
                imageUrl: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                name: '에부부',
                sex: '남자',
                age: '23',
                childAge: '53',
                date: '2018.02.03 12:00',
                content: '와 에부부 정말 멋지네요',
                likes: 10,
                dislikes: 5,
                likePressed: true,
                dislikePressed: true
            }
        ]
        
        this.setState({
            comments: dummy
        })
    }
    
    changeComment = (e) => {
        this.setState({
            myComment: e.target.value
        })
    }

    submitComment = () => {
        //TODO : 나의 댓글 추가 요청하기
        console.log(this.state.myComment);
    }

    loadNextPage = () => {
        console.log("more page");
        this.setState({
            commentPage: this.state.commentPage + 1
        })
        //TODO : 기존 리스트에 새로받은 값들 추가해주기
    };

    changeSort = (sort) => {
        this.setState({
            sortBy: sort
        })
    }

    toProfileModify = () => {
        history.push(`/mypage/profile-modify`);
    }

    onApply = () => {
        //정보 수집이 안되어있는경우는 신청하지 않기 
        if(this.state.user.additionalProfile){
            console.log("이벤트 신청 성공");
        } else{
            console.log("추가 정보 수집하고와라");
        }

    }
    
    render() {
        const moreButton = (
            <button className="comment-more-button" onClick={() => {this.loadNextPage()}}>
                더보기
            </button>
        );

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
                        this.state.loggedIn ? 
                        <button type="button" className="event-detail-button" data-toggle="modal" 
                        data-target={this.state.user.additionalProfile ? "#applyEvent" : "#additionalData"} onClick={this.onApply}>신청하기</button> :
                        <button type="button" className="event-detail-button" >로그인</button>
                    }
                </div>
                <div className="comments-container">
                    {/*TODO 로그인 안했을 시에 댓글 쓰는 창 지우기*/}
                    <div className="comment-write-box">
                        <div className="comment-writer-profile">
                            <img src='https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg' alt="profile-pic"/>
                            <p>{this.state.user.name}</p>
                            <div>{this.state.user.sex}</div>
                            <div>{this.state.user.age}세</div>
                            <div>자녀{this.state.user.childAge}세</div>
                        </div>
                        <textarea className="comment-write" placeholder="댓글을 입력하세요. (최대 300자)" maxLength="300" onChange={this.changeComment}/>
                        <button type="button" className="comment-write-button" onClick={this.submitComment}>등록</button>
                    </div>
                    <div className="comment-list-header">
                        <div className="comment-number">
                            댓글&nbsp;&nbsp;<span>100</span>개
                        </div>
                        <div className={this.state.sortBy ==="최신순" ? "comment-sort" : "comment-sort-selected"} onClick={()=>{this.changeSort("추천수")}}>추천수</div>
                        <div className={this.state.sortBy ==="최신순" ? "comment-sort-selected" : "comment-sort"} onClick={()=>{this.changeSort("최신순")}} style={{marginRight: '20px'}}>최신순</div>
                    </div>

                    <div className="comment-list-box">
                        {
                            this.state.comments.map((data, index)=>{
                                return (
                                    <CommentCard data={data} key={index}/>
                                )
                            })
                        }
                        {this.state.commentPage < this.state.totalCommentPage ? moreButton : null}
                    </div>

                    <div className="modal fade" id="applyEvent" role="dialog">
                        <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">이벤트 신청</h4>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div className="modal-body">
                                    <h6 className="event-apply-confirm">성공적으로 신청되었습니다!</h6>
                                    <div className="modal-button-center">
                                        <button type="button" className="event-confirm-button btn-default" data-dismiss="modal">확인</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade" id="additionalData" role="dialog">
                        <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title event-apply-header">이벤트 신청</h4>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div className="modal-body">
                                    <p className="event-apply-need">수집정보가 입력되어있지 않습니다. 
                                    이벤트 참여를 위해서는 수집정보가 필요합니다.</p>
                                    <div className="modal-button-center">
                                        <button type="button" className="event-confirm-button btn-default" data-dismiss="modal"
                                        onClick={this.toProfileModify}>수집정보 입력하기</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}