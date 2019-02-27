import React from 'react';
import './EventDetail.css';
import history from '../../../../history/history';
import axios from 'axios';
import dateFormat from 'dateformat';
import moment from 'moment';
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

const defaultEvent = {
    index: 1,
    title: "1",
    subtitle: "1",
    content: "1",
    titleImageUrl: "https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg",
    contentImageUrl: "https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg",
    expirationDate: "2019-01-01 00:00:00",
    created_at: "2019-01-01 00:00:00",
    updated_at: "2019-01-01 00:00:00"
}

export class EventDetail extends React.Component {
    constructor(props) {
        super(props);

        const firstPage = 1;
        // TODO
        this.state = {
            user: user,
            eventIndex: props.match.params.id,
            event: defaultEvent,
            comments: [],
            loggedIn: true,
            commentPage: firstPage,
            totalCommentPage: 1,
            myComment: "",
            sortBy : "최신순"
        };
    }

    componentDidMount = async () => {
        let data = await axios.get(`${process.env.API_URL}/api/event/post?index=${this.state.eventIndex}`);
        let event = data.data.event;
        let comments = data.data.comments;

        console.log(event);

        this.setState({
            event: event,
            comments: comments
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

    getDate = (d) => {
        let date = new Date(d);

        return (dateFormat(date, "yyyy-mm-dd"))
    }

    getDDay = (d) => {
        let date = new Date(d);
        let today = new Date();

        today.setHours(0, 0, 0, 0);

        return moment(date).diff(today, 'days');
    }
    
    render() {
        const moreButton = (
            <button className="comment-more-button" onClick={() => {this.loadNextPage()}}>
                더보기
            </button>
        );

        const event = this.state.event;

        return (
            <div className="event-detail-container">
                <div className="event-detail-header">
                    <div className="event-detail-header-left">
                        <h5>{this.getDate(event.created_at)} ~ {this.getDate(event.expirationDate)}</h5>
                        <h1>{event.title}</h1>
                        <h6>{event.subtitle}</h6>
                    </div>
                    <div className="event-detail-header-right">
                        { 
                            this.getDDay(event.expirationDate) < 0 ? <div className="event-detail-day">끝</div> :
                            <div className="event-detail-day">D-{this.getDDay(event.expirationDate)}</div>
                        }
                    </div>
                </div>
                <div className="event-detail-content">
                    <img src={event.contentImageUrl} alt="event-content"/>
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
                                <div className="modal-header">
                                    <h4 className="modal-title">이벤트 신청</h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
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
                                <div className="modal-header">
                                    <h4 className="modal-title event-apply-header">이벤트 신청</h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
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