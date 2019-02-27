import React from 'react';
import './TipDetail.css';
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

export class TipDetail extends React.Component {
    constructor(props) {
        super(props);

        // TODO
        this.state = {
            user: user,
            tip: {
                image: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                title: '뿌요뿌요',
                subtitle: '뿌요는 재미있다',
                contents: 'e스포츠',
                date: '2019.02.28',
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
                commentIndex: 1,
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
                commentIndex: 2,
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
                commentIndex: 3,
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
                commentIndex: 4,
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
            <div className="tip-detail-container">
                <div className="tip-detail-header">
                    <div className="tip-detail-header-left">
                        <h5>{this.state.tip.date}</h5>
                        <h1>{this.state.tip.title}</h1>
                        <h6>{this.state.tip.subtitle}</h6>
                    </div>
                </div>
                <div className="tip-detail-content">
                
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
                </div>
            </div>
        )
    }
}