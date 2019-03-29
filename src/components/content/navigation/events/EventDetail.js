import React from 'react';
import './EventDetail.css';
import history from '../../../../history/history';
import axios from 'axios';
import dateFormat from 'dateformat';
import { connect } from 'react-redux';
import { TokenUtil } from '../../../../util';
import moment from 'moment';
import {CommentCard} from '../../../common/CommentCard/CommentCard';
import CommonUtils from '../../../../util/CommonUtil'


const user = {
    index: 1,
    imageUrl: null,
    name: 'noUser',
    sex: '남자',
    age: '23',
    childAge: '1',
    additionalProfile: true
}

const defaultEvent = {
    index: 1,
    title: "",
    subtitle: "",
    content: "",
    titleImageUrl: null,
    contentImageUrl: null,
    expirationDate: "2019-01-01 00:00:00",
    created_at: "2019-01-01 00:00:00",
    updated_at: "2019-01-01 00:00:00"
}

class EventDetail extends React.Component {
    constructor(props) {
        super(props);

        const firstPage = 1;
        let loggedIn = false;

        let headers = null;

        const token = TokenUtil.getLoginToken();
        if(token === null){
        } else{
            loggedIn = true;
            headers = TokenUtil.getTokenRequestHeader(token);
        }
        console.log(props.user);
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
            order : "latest", //latest or recommend
            additionalProfile : false,
            likePressed: false, 
            token: token,
            headers: headers
        };
    }

    getPostAndComment = async (page) => {
        let data;

        if(this.state.token === null){
            data = await axios.get(`${process.env.API_URL}/api/event/post?index=${this.state.eventIndex}&order=${this.state.order}&page=${page}`);
        } else{
            data = await axios({
                method: 'get',
                url: `${process.env.API_URL}/api/event/post?index=${this.state.eventIndex}&order=${this.state.order}&page=${page}`,
                headers: this.state.headers
            })
        }
        
        return data;
    }

    componentDidMount = async () => {
        let data = await this.getPostAndComment(this.state.commentPage);
        let event = data.data.event;
        let comments = data.data.comments;

        let likePressed = false;

        this.getAdditionalProfile();

        const token = TokenUtil.getLoginToken();
        if(token === null) {
            let logData = {
                nickName: 'noUser',
                eventId: event.index,
                title: event.title
            }
            
            axios({
                method:'post',
                url: `${process.env.API_URL}/api/log/event`,
                data: logData
            });
        } else{
            const headers = TokenUtil.getTokenRequestHeader(token);

            let res = await axios.get(`${process.env.API_URL}/api/auth/info`, {headers: TokenUtil.getTokenRequestHeader(token)});
            this.setState({
                user: res.data
            })

            let logData = {
                nickName: res.data.nickName,
                eventId: event.index,
                title: event.title
            }
            
            axios({
                method:'post',
                url: `${process.env.API_URL}/api/log/event`,
                data: logData
            });


            try {
                let data = await axios({
                    method: 'get',
                    url: `${process.env.API_URL}/api/event/post/like?index=${this.state.eventIndex}`,
                    headers: headers,
                });

                likePressed = data.data.like;

            } catch(error) {
                alert("좋아요 정보 가져오기 실패");
            }
        }
        

        this.setState({
            event: event,
            comments: comments,
            totalCommentPage: data.data.totalPages,
            likePressed: likePressed
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
            data = await this.getPostAndComment(a);
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

    loadNextPage = async () => {
        const nextPage = this.state.commentPage + 1;
        let data = await this.getPostAndComment(nextPage);

        let comments = this.state.comments;
        comments = comments.concat(data.data.comments);

        this.setState({
            commentPage: nextPage,
            totalCommentPage: data.data.totalPages,
            comments: comments
        })
    };

    changeSort = async (sort) => {
        let comments = [];
        let data;
        
        for(let a = 1; a <= this.state.commentPage; a++){
            data = await this.getPostAndComment(a);
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
        history.push(`/mypage/profile-modify-password-check`);
    }

    onApply = async () => {
        //정보 수집이 안되어있는경우는 신청하지 않기 
        if(this.state.additionalProfile){
            const token = TokenUtil.getLoginToken();
            if(token === null) {
                alert("권한이 없습니다.");
                return;
            }
            const headers = TokenUtil.getTokenRequestHeader(token);

            try {
                await axios({
                    method: 'post',
                    url: `${process.env.API_URL}/api/event/application`,
                    headers: headers,
                    data: {
                        eventIndex: this.state.eventIndex
                    }
                });

            } catch(error) {
                alert("이벤트 신청에 실패하였습니다.");
            }
            
        } else{
            alert("이벤트 신청에 실패하였습니다.");
        }
    }

    toLogIn = () => {
        history.push(`/login`);
    }

    getComment = async () => {
        let comments = [];
        let data;
        
        for(let a = 1; a <= this.state.commentPage; a++){
            data = await this.getPostAndComment(a);
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
    
    getAdditionalProfile = async () =>{
        const token = TokenUtil.getLoginToken();
        const headers = TokenUtil.getTokenRequestHeader(token);
        
        let data;

        try {
            data = await axios({
                method: 'get',
                url: `${process.env.API_URL}/api/auth/info`,
                headers: headers,
            });

            if(data.data.addressRoad === null || data.data.addressSpec === null || data.data.phoneNum === null || data.data.postalCode === null || data.data.name === null){
                this.setState({
                    additionalProfile: false
                })
            } else{
                this.setState({
                    additionalProfile: true
                })
            }

        } catch(error) {
            console.log("not loginned");
        }
    }

    likePress = async () => {
        const token = TokenUtil.getLoginToken();
        if(token === null) {
        
        } else{
            const headers = TokenUtil.getTokenRequestHeader(token);

            if(this.state.likePressed){
                try {
                    await axios({
                        method: 'delete',
                        url: `${process.env.API_URL}/api/like/eventLike`,
                        headers: headers,
                        data: {
                            eventIndex: this.state.eventIndex
                        }
                    });
    
                } catch(error) {
                    console.log("좋아요 취소 실패");
                }

                this.setState({
                    likePressed: false
                })
            } else{
                try {
                    await axios({
                        method: 'post',
                        url: `${process.env.API_URL}/api/like/eventLike`,
                        headers: headers,
                        data: {
                            eventIndex: this.state.eventIndex
                        }
                    });
    
                } catch(error) {
                    console.log("좋아요 실패");
                }
    
                this.setState({
                    likePressed: true
                })
            }
        }
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
                        {
                            event.expirationDate === null ? 
                            <h5>{this.getDate(event.created_at)}</h5> :
                            <h5>{this.getDate(event.created_at)} ~ {this.getDate(event.expirationDate)}</h5>
                        }
                        <h1>{event.title}</h1>
                        <h6>{event.subtitle}</h6>
                    </div>
                    <div className="event-detail-header-right">
                        { 
                            event.expirationDate === null ? null :
                            (this.getDDay(event.expirationDate) < 0 ? <div className="event-detail-day">끝</div> :
                            <div className="event-detail-day">D-{this.getDDay(event.expirationDate)}</div>)
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
                    <div className={this.state.likePressed ? "event-detail-icon-active" : "event-detail-icon-inactive"} style={{marginRight: '15px'}}>
                        <i className="fa fa-heart" onClick={this.likePress}/>
                        <p>좋아요</p>
                    </div>
                </div>
                <div className="event-detail-button-box">
                    {
                        this.state.loggedIn ? ((event.expirationDate === null || this.getDDay(event.expirationDate) < 0 ) ? null :
                        <button type="button" className="event-detail-button" data-toggle="modal" 
                        data-target={ this.state.additionalProfile ? "#applyEvent" : "#additionalData"} onClick={this.onApply}>신청하기</button> )
                        :
                        <button type="button" className="event-detail-button" onClick={this.toLogIn}>로그인</button>
                    }
                </div>
                <div className="comments-container">
                    { this.state.loggedIn ? 
                        <div className="comment-write-box">
                            <div className="comment-writer-profile">
                                <img src={this.props.user.photo} alt="profile-pic"/>
                                <p>{this.props.user.nickName}</p>
                                <div>{CommonUtils.getGender(this.props.user.gender)}</div>
                                <div>{CommonUtils.getAge(this.props.user.birth)}세</div>
                                {
                                    this.props.user.hasChild ? 
                                    <div>자녀{CommonUtils.getAge(this.props.user.childBirth)}세</div> : 
                                    <div>자녀없음</div>
                                }
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