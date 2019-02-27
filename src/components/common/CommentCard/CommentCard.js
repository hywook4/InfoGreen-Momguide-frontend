import React from 'react';
import './Comment.css';
import REPORT_ICON from '../../../assets/images/report.png';

import { SubcommentCard } from './SubcommentCard';
import { ReportModal }  from '../ReportModal/ReportModal';


const user = {
    index: 1,
    imageUrl: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
    name: '테스트',
    sex: '남자',
    age: '23',
    childAge: '1',
}
export class CommentCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: user,
            comment: props.data,
            subcomments : [
                {
                    index: 1,
                    commentIndex: 1,
                    imageUrl: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                    name: '테스트',
                    sex: '남자',
                    age: '23',
                    childAge: '1',      
                    date: '2018.02.03 12:00',
                    content: '와 에 정지네요',
                    likes: 5,
                    dislikes: 5,
                    likePressed: true,
                    dislikePressed: false
                },
                {
                    index: 2,
                    commentIndex: 2,
                    imageUrl: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                    name: '부부',
                    sex: '남자',
                    age: '23',
                    childAge: '53',
                    date: '2018.02.03 12:00',
                    content: '와',
                    likes: 10,
                    dislikes: 5,
                    likePressed: true,
                    dislikePressed: true
                },
                {
                    index: 3,
                    commentIndex: 3,
                    imageUrl: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                    name: '234부',
                    sex: '남자',
                    age: '23',
                    childAge: '53',
                    date: '2018.02.03 12:00',
                    content: '와네요',
                    likes: 10,
                    dislikes: 5,
                    likePressed: false,
                    dislikePressed: false
                },
                {
                    index: 4,
                    commentIndex: 4,
                    imageUrl: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                    name: '162153',
                    sex: '남자',
                    age: '23',
                    childAge: '53',
                    date: '2018.02.03 12:00',
                    content: '와정말 멋지네요',
                    likes: 10,
                    dislikes: 5,
                    likePressed: true,
                    dislikePressed: true
                },
                {
                    index: 1,
                    commentIndex: 5,
                    imageUrl: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                    name: '테스트',
                    sex: '남자',
                    age: '23',
                    childAge: '1',
                    date: '2018.02.03 12:00',
                    content: '하.....',
                    likes: 5,
                    dislikes: 5,
                    likePressed: true,
                    dislikePressed: false
                },
            ],
            totalSubcommentPage: 5,
            subcommentPage: 1,
            subcommentOpen: false,
            mySubcomment: "",
            editable: false,
            reportModalId: "report" + props.data.index
        } 
    }


    foldSubcomment = () => {
        this.setState({
            subcommentOpen: !this.state.subcommentOpen
        })
    }

    loadPage = () => { 
        this.setState({
            subcommentPage: this.state.subcommentPage + 1
        })
    }

    changeSubcomment = (e) => {
        this.setState({
            mySubcomment: e.target.value
        })
    }

    subcommentSubmit = () => {
        //TODO 해당하는 리뷰에 댓글 달기 요청 및 재
        console.log(this.state.mySubcomment);

    }

    commentChange = (e) => {
        let data = this.state.comment;
        data.content = e.target.value;
        this.setState({
            comment: data
        })
    }

    onEdit = () => {
        if(this.state.editable){ // TODO : 수정을 한 경우 수정 요청을 보냄
            console.log("댓글 수정하기 : " + this.state.comment.content);
        }
        this.setState({
            editable: !this.state.editable
        })
    }

    onDelete = () => {
        console.log("delete this comment " + this.state.comment.content);
    }

    onLike = () => {
        let data = this.state.comment;

        if(data.likePressed){
            data.likePressed = !data.likePressed;
            data.likes = data.likes - 1;
        } else{
            data.likePressed = !data.likePressed;
            data.likes = data.likes + 1;
        }

        this.setState({
            comment: data
        })
    }

    onDislike = () => {
        let data = this.state.comment;

        if(data.dislikePressed){
            data.dislikePressed = !data.dislikePressed;
            data.dislikes = data.dislikes - 1;
        } else{
            data.dislikePressed = !data.dislikePressed;
            data.dislikes = data.dislikes + 1;
        }

        this.setState({
            comment: data
        })
    }

    render() {
        const comment = this.state.comment;

        const moreButton = (
            <button className="subcomment-more-button" onClick={this.loadPage}>
                더보기 <i className="fa fa-angle-down"/>
            </button>
        )
        
        const liked = { color: "#32b8a4"}
        const disliked = {color: "red"}

        const cards = (
            this.state.subcomments.map((data, index)=>{
                return (
                    <SubcommentCard data={data} key={index}/>
                )
            })
        )
            
        const editButton = (
            this.state.editable ? 
            <i className="fa fa-pencil" onClick={this.onEdit}/> :
            <React.Fragment>
                <span onClick={this.onDelete}>&#10006;</span>
                <i className="fa fa-pencil" onClick={this.onEdit}/>
            </React.Fragment>
        )

        return (
            <div className="comment-card">
                <div className="comment-profile-img">
                    <img src={comment.imageUrl} alt="profile-pic"/>
                </div>
                <div className="comment-content">
                    <div className="comment-user-profile">
                        <p>{comment.name}</p>
                        <div>{comment.sex}</div>
                        <div>{comment.age}세</div>
                        <div>자녀{comment.childAge}세</div>
                        <span>{comment.date}</span>
                    </div>
                    <textarea className={this.state.editable ? "comment-text comment-text-on" : "comment-text"} maxLength="300" defaultValue={comment.content} 
                    disabled={this.state.editable ? "" : "disabled"} onChange={this.commentChange}/>
                    {
                        this.state.subcommentOpen ? 
                        <p className="comment-subcomment-fold" onClick={this.foldSubcomment}>댓글 접기</p> :
                        <p className="comment-subcomment-fold" onClick={this.foldSubcomment}>댓글 열기</p>
                    }
                    
                </div>
                <div className="comment-icon-buttons">
                    <div className="comment-modify-erase">
                        {
                            this.state.user.index === comment.index ? editButton : null
                        }
                    </div>
                    <i className="fa fa-thumbs-o-up" style={comment.likePressed ? liked : null} onClick={this.onLike}/>
                    <p>{comment.likes}</p>
                    <i className="fa fa-thumbs-o-down" style={comment.dislikePressed ? disliked : null} onClick={this.onDislike}/>
                    <p>{comment.dislikes}</p>
                    <img src={REPORT_ICON} alt="reportIcon" data-toggle="modal" data-target={`#${this.state.reportModalId}`}/>
                </div>
                
                <div className="subcomment-card-box">
                    {
                        this.state.subcommentOpen ? 
                        cards : ""
                    }
                    {
                        this.state.subcommentOpen ?
                        (this.state.subcommentPage < this.state.totalSubcommentPage ? moreButton : null) : 
                        null
                    }
                    {
                        this.state.subcommentOpen ?
                        <div className="subcomment-write-box">
                            <div className="subcomment-write">
                                {/*TODO: 로그인 여부에 따라 placeholder 바꾸기 및 버튼 활성화*/}
                                <textarea className="subcomment-write-content" onChange={this.changeSubcomment} placeholder="댓글을 입력하세요. (최대 300자)"/>
                                <button className="subcomment-write-submit" onClick={this.subcommentSubmit}>등록</button>
                            </div>
                        </div> :
                        null
                    }
                    {
                        this.state.subcommentOpen ?
                        <button className="subcomment-close-button" onClick={this.foldSubcomment}>답글접기<i className="fa fa-angle-up"/></button> : null
                    }
                    
                </div>
                <ReportModal reportContent={this.state.comment} reportModalId={this.state.reportModalId}/>
            </div>
        )
    }
}