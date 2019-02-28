import React from 'react';
import './EventDetail.css';
import history from '../../../../history/history';
import axios from 'axios';
import dateFormat from 'dateformat';
import { connect } from 'react-redux';
import { TokenUtil } from '../../../../util';
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

class EventDetail extends React.Component {
    constructor(props) {
        super(props);

        const firstPage = 1;
        let loggedIn = false;

        const token = TokenUtil.getLoginToken();
        if(token === null){
        } else{
            loggedIn = true;
        }
        // TODO
        this.state = {
            user: user,
            eventIndex: props.match.params.id,
            event: defaultEvent,
            comments: [],
            loggedIn: loggedIn,
            commentPage: firstPage,
            totalCommentPage: 1,
            myComment: "",
            order : "latest" //latest or recommend
        };
    }

    componentDidMount = async () => {
        let data = await axios.get(`${process.env.API_URL}/api/event/post?index=${this.state.eventIndex}&order=${this.state.order}&page=${this.state.commentPage}`);
        let event = data.data.event;
        let comments = data.data.comments;


        console.log(data.data);

        this.setState({
            event: event,
            comments: comments,
            totalCommentPage: data.data.totalPages
        })
    }
    
    changeComment = (e) => {
        this.setState({
            myComment: e.target.value
        })
    }

    init = async () => {
        const token = TokenUtil.getLoginToken();
        if(token === null) {
            alert("권한이 없습니다.");
            return;
        }
        const headers = TokenUtil.getTokenRequestHeader(token);

        try {
            await axios({
                method: 'post',
                url: `${process.env.API_URL}/api/event/comment`,
                headers: headers,
                data: {
                    content: this.state.myComment,
                    eventIndex: this.state.eventIndex
                }
            });

        } catch(error) {
            alert("댓글 작성에 실패하였습니다.");
        }
    };


    submitComment = async () => {
        await this.init();

        let comments = [];
        let data;

        for(let a = 1; a <= this.state.commentPage ; a++){
            data = await axios.get(`${process.env.API_URL}/api/event/post?index=${this.state.eventIndex}&order=${this.state.order}&page=${a}`);
            comments = comments.concat(data.data.comments);
        }

        this.setState({
            comments: [],
        })

        this.setState({
            myComment: "",
            totalCommentPage: data.data.totalPages,
            comments: comments
        }, console.log(this.state.myComment))
    }

    loadNextPage = () => {
        console.log("more page");
        this.setState({
            commentPage: this.state.commentPage + 1
        })
        //TODO : 기존 리스트에 새로받은 값들 추가해주기
    };

    changeSort = async (sort) => {
        let comments = [];
        let data;
        
        for(let a = 1; a <= this.state.commentPage; a++){
            data = await axios.get(`${process.env.API_URL}/api/event/post?index=${this.state.eventIndex}&order=${sort}&page=${a}`);
            comments = comments.concat(data.data.comments);
        }

        this.setState({
            comments: []
        })

        this.setState({
            order: sort,
            comments: comments,
            totalCommentPage: data.data.totalPages
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

    toLogIn = () => {
        history.push(`/login`);
    }

    getComment = async () => {
        let comments = [];
        let data;
        
        for(let a = 1; a <= this.state.commentPage; a++){
            data = await axios.get(`${process.env.API_URL}/api/event/post?index=${this.state.eventIndex}&order=${this.state.order}&page=${a}`);
            comments = comments.concat(data.data.comments);
        }

        // react doesn't recoginze same num of object array ..... shit
        this.setState({
            comments: []
        })

        this.setState({
            comments: comments,
            totalCommentPage: data.data.totalPages
        });
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
                        <button type="button" className="event-detail-button" onClick={this.toLogIn}>로그인</button>
                    }
                </div>
                <div className="comments-container">
                    { this.state.loggedIn ? 
                        <div className="comment-write-box">
                            <div className="comment-writer-profile">
                                <img src={this.props.user.photo} alt="profile-pic"/>
                                <p>{this.props.user.nickName}</p>
                                <div>{this.props.user.gender}</div>
                                <div>{this.props.user.birth}세</div>
                                <div>자녀{this.props.user.childBirth}세</div>
                            </div>
                            <textarea className="comment-write" placeholder="댓글을 입력하세요. (최대 300자)" maxLength="300" onChange={this.changeComment}
                            value={this.state.myComment}/>
                            <button type="button" className="comment-write-button" onClick={this.submitComment}>등록</button>
                        </div> : null
                    }
                    
                    <div className="comment-list-header">
                        <div className="comment-number">
                            댓글&nbsp;&nbsp;<span></span>
                        </div>
                        <div className={this.state.order ==="latest" ? "comment-sort" : "comment-sort-selected"} onClick={()=>{this.changeSort("recommend")}}>추천수</div>
                        <div className={this.state.order ==="latest" ? "comment-sort-selected" : "comment-sort"} onClick={()=>{this.changeSort("latest")}} style={{marginRight: '20px'}}>최신순</div>
                    </div>

                    <div className="comment-list-box">
                        {
                            this.state.comments.map((data, index)=>{
                                return (
                                    <CommentCard data={data} key={index} user={this.props.user} getComment={this.getComment}
                                    postType={{index: this.state.eventIndex, type: "event"}}/>
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


const mapStateToProps = (state) => {
    return ({
        user: {
            index: state.auth.userIndex,
            nickName: state.auth.userNickName,
            photo: state.auth.userPhoto,
            gender: state.auth.userGender,
            birth: state.auth.userBirthYear,
            childBirth: state.auth.childBirthYear
        }
    });
};

const mapDispatchToProps = null;


export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);