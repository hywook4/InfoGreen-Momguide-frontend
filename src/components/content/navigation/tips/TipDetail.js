import React from 'react';
import './TipDetail.css';
import history from '../../../../history/history'
import axios from 'axios';
import dateFormat from 'dateformat';
import { connect } from 'react-redux';
import { TokenUtil } from '../../../../util';
import {CommentCard} from '../../../common/CommentCard/CommentCard';


const user = {
    index: 1,
    photo: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
    nickName: '테스트',
    gender: 'male',
    birth: '23',
    childBirth: '1',
}

const defaultTip = {
    index: 0,
    title: "1",
    subtitle: "1",
    content: "1",
    created_at: "2019-01-01 00:00:00"
}

class TipDetail extends React.Component {
    
    constructor(props) {
        super(props);

        let firstPage = 1;

        this.state = {
            user: user,
            tipIndex: props.match.params.id,
            tip: defaultTip,
            comments: [],
            loggedIn: true,
            commentPage: firstPage,
            totalCommentPage: 1,
            myComment: "",
            sortBy : "최신순"
        };
    }

    componentDidMount = async () => {
        let data = await axios.get(`${process.env.API_URL}/api/tip/post?index=${this.state.tipIndex}&page=${this.state.commentPage}`);
        let tip = data.data.tip;
        let comments = data.data.comments;

        this.setState({
            tip: tip,
            comments: comments,
            totalCommentPage: data.data.totalPages
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
                url: `${process.env.API_URL}/api/tip/comment`,
                headers: headers,
                data: {
                    content: this.state.myComment,
                    tipIndex: this.state.tipIndex
                }
            });

        } catch(error) {
            alert("에러가 발생하였습니다.");
        }
    };


    
    changeComment = (e) => {
        this.setState({
            myComment: e.target.value
        })
    }

    submitComment = async () => {
        await this.init();

        let comments = [];
        let data;

        for(let a = 1; a <= this.state.commentPage ; a++){
            data = await axios.get(`${process.env.API_URL}/api/tip/post?index=${this.state.tipIndex}&page=${a}`);
            comments = comments.concat(data.data.comments);
        } 
        
        this.setState({
            myComment: "",
            totalCommentPage: data.data.totalPages,
            comments: comments
        })
    }

    loadNextPage = async () => {
        const nextPage = this.state.commentPage + 1;
        let data = await axios.get(`${process.env.API_URL}/api/tip/post?index=${this.state.tipIndex}&page=${nextPage}`);

        let comments = this.state.comments;
        comments = comments.concat(data.data.comments);

        this.setState({
            commentPage: nextPage,
            totalCommentPage: data.data.totalPages,
            comments: comments
        })
    };

    changeSort = (sort) => {
        this.setState({
            sortBy: sort
        })
    }

    toProfileModify = () => {
        history.push(`/mypage/profile-modify`);
    }


    getComment = async () => {
        let comments = [];
        let data;
        
        for(let a = 1; a <= this.state.commentPage; a++){
            data = await axios.get(`${process.env.API_URL}/api/tip/post?index=${this.state.tipIndex}&page=${a}`);
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

    currentUser = () => {
        if(this.props.user === undefined){
            return(
                <div className="comment-writer-profile">
                    <img src={this.state.user.photo} alt="profile-pic"/>
                    <p>{this.state.user.nickName}</p>
                    <div>{this.state.user.gender}</div>
                    <div>{this.state.user.birth}세</div>
                    <div>자녀{this.state.user.childBirth}세</div>
                </div>
            )
        } else{
            return(
                <div className="comment-writer-profile">
                    <img src={this.props.user.photo} alt="profile-pic"/>
                    <p>{this.props.user.nickName}</p>
                    <div>{this.props.user.gender}</div>
                    <div>{this.props.user.birth}세</div>
                    <div>자녀{this.props.user.childBirth}세</div>
                </div>
            )
        }
    }

    render() {
        const moreButton = (
            <button className="comment-more-button" onClick={() => {this.loadNextPage()}}>
                더보기
            </button>
        );

        return (
            <div className="tip-detail-container">
                <div className="tip-detail-header">
                    <div className="tip-detail-header-left">
                        <h5>{this.getDate(this.state.tip.created_at)}</h5>
                        <h1>{this.state.tip.title}</h1>
                        <h6>{this.state.tip.subtitle}</h6>
                    </div>
                </div>
                <div className="tip-detail-content">
                    <img src={this.state.tip.contentImageUrl} alt="tip-content"></img>
                </div>

                <div className="tip-detail-bottom">
                    <div className="tip-detail-icon-inactive">
                        <i className="fa fa-share-alt"/>
                        <p>공유하기</p>
                    </div>
                    <div className="tip-detail-icon-active" style={{marginRight: '15px'}}>
                        <i className="fa fa-heart"/>
                        <p>좋아요</p>
                    </div>
                </div>
                <div className="tip-detail-button-box">
                    {
                        this.state.loggedIn ? 
                        null :
                        <button type="button" className="tip-detail-button" >로그인</button>
                    }
                </div>
                <div className="comments-container">
                    {/*TODO 로그인 안했을 시에 댓글 쓰는 창 지우기*/}
                    <div className="comment-write-box">
                        <div className="comment-writer-profile">
                            <img src={this.props.user.photo} alt="profile-pic"/>
                            <p>{this.props.user.nickName}</p>
                            <div>{this.props.user.gender}</div>
                            <div>{this.props.user.birth}세</div>
                            <div>자녀{this.props.user.childBirth}세</div>
                        </div>
                        <textarea className="comment-write" placeholder="댓글을 입력하세요. (최대 300자)" maxLength="300" 
                        onChange={this.changeComment} value={this.state.myComment}/>
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
                                    <CommentCard data={data} key={index} user={this.props.user} getComment={this.getComment}
                                    postType={{index: this.state.tipIndex, type: "tip"}}/>
                                )
                            })
                        }
                        {this.state.commentPage < this.state.totalCommentPage ? moreButton : null}
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


export default connect(mapStateToProps, mapDispatchToProps)(TipDetail);