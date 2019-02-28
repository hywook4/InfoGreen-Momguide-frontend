import React from 'react';
import './Comment.css';
import axios from 'axios';
import {TokenUtil} from '../../../util';
import REPORT_ICON from '../../../assets/images/report.png';

import { SubcommentCard } from './SubcommentCard';
import { ReportModal }  from '../ReportModal/ReportModal';

export class CommentCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comment: props.data,
            postType: props.postType,   // postType.type : 'event or tip'  postType.index : index
            subcomments : [],
            totalSubcommentPage: 0,
            subcommentPage: 1,
            subcommentOpen: false,
            mySubcomment: "",
            editable: false,
            reportModalId: "report" + props.data.index,
            deleted: false,
        } 
    }

    componentDidMount = async () => {
        const data = await axios.get(`${process.env.API_URL}/api/${this.state.postType.type}/childComment?index=${this.state.comment.index}&page=${this.state.subcommentPage}`);
        
        const subcomments = data.data.childComments;
        const totalPage = data.data.totalPages;

        this.setState({
            subcomments: subcomments,
            totalSubcommentPage: totalPage,
        })
    }

    foldSubcomment = () => {
        this.setState({
            subcommentOpen: !this.state.subcommentOpen
        })
    }

    loadPage = async () => { 
        const nextPage = this.state.subcommentPage + 1;
        let data = await axios.get(`${process.env.API_URL}/api/${this.state.postType.type}/childComment?index=${this.state.comment.index}&page=${nextPage}`);
        console.log(data);
        let subcomments = this.state.subcomments;
        subcomments = subcomments.concat(data.data.childComments);

        this.setState({
            subcommentPage: nextPage,
            totalSubcommentPage: data.data.totalPages,
            subcomments: subcomments
        })
    }

    changeSubcomment = (e) => {
        this.setState({
            mySubcomment: e.target.value
        })
    }

    subcommentSubmit = async () => {
        const token = TokenUtil.getLoginToken();
        if(token === null) {
            alert("권한이 없습니다.");
            return;
        }
        const headers = TokenUtil.getTokenRequestHeader(token);

        try {
            await axios({
                method: 'post',
                url: `${process.env.API_URL}/api/tip/childComment`,
                headers: headers,
                data: {
                    content: this.state.mySubcomment,
                    commentIndex: this.state.comment.index
                }
            });

        } catch(error) {
            alert("대댓글 작성에 실패하였습니다.");
        }
        
        let subcomments = [];
        let data;

        for(let a = 1; a <= this.state.subcommentPage; a++){
            data = await axios.get(`${process.env.API_URL}/api/${this.state.postType.type}/childComment?index=${this.state.comment.index}&page=${a}`);
            subcomments = subcomments.concat(data.data.childComments)
        }

        const totalPage = data.data.totalPages;

        this.setState({
            mySubcomment: "",
            subcomments: subcomments,
            totalSubcommentPage: totalPage,
        })

    }

    commentChange = (e) => {
        let data = this.state.comment;
        data.content = e.target.value;
        this.setState({
            comment: data
        })
    }

    onEdit = async () => {
        if(this.state.editable){ // TODO : 수정을 한 경우 수정 요청을 보냄
            const token = TokenUtil.getLoginToken();
            if(token === null) {
                alert("권한이 없습니다.");
                return;
            }
            const headers = TokenUtil.getTokenRequestHeader(token);

            try{
                await axios({
                    method: 'put',
                    url: `${process.env.API_URL}/api/${this.state.postType.type}/comment`,
                    headers: headers,
                    data: {
                        content: this.state.comment.content,
                        index: this.state.comment.index,
                        tipIndex: this.state.postType.index
                    }
                })
            } catch(error){
                alert("댓글 수정에 실패하였습니다.")
            }
        }
        this.setState({
            editable: !this.state.editable
        })
    }

    delete = async () => {
        const token = TokenUtil.getLoginToken();
        if(token === null) {
            alert("권한이 없습니다.");
            return;
        }
        const headers = TokenUtil.getTokenRequestHeader(token);

        try {
            await axios({
                method: 'delete',
                url: `${process.env.API_URL}/api/${this.state.postType.type}/comment`,
                headers: headers,
                data: {
                    index: this.state.comment.index,
                    tipIndex: this.state.postType.index
                }
            });
        } catch(error) {
            alert("댓글 삭제에 실패하였습니다.");
        }
    }

    onDelete = async () => {
        await this.delete();
        
        this.props.getComment();
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

    commentProfile = () => {
        if(this.state.deleted || this.state.comment.creator.index === undefined){
            return (
                <div className="comment-user-profile">
        
                </div>
            )
        } else{
            return (
                <div className="comment-user-profile">
                    <p>{this.state.comment.creator.nickName}</p>
                    <div>{this.state.comment.creator.gender}</div>
                    <div>{this.state.comment.creator.memberBirthYear}세</div>
                    <div>자녀{this.state.comment.creator.childBirthYear}세</div>
                    <span>{this.state.comment.created_at}</span>
                </div>
            )
        }
    }

    getSubcomments = async () => {
        let subcomments = [];
        let data;
        
        for(let a = 1; a <= this.state.subcommentPage; a++){
            data = await axios.get(`${process.env.API_URL}/api/${this.state.postType.type}/childComment?index=${this.state.comment.index}&page=${a}`);
            console.log(data);
            subcomments = subcomments.concat(data.data.childComments);
        }

        // react doesn't recoginze same num of object array ..... shit
        this.setState({
            subcomments: []
        })
    
        this.setState({
            subcomments: subcomments,
            totalSubcommentPage: data.data.totalPages
        });
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
                    <SubcommentCard data={data} key={index} postType={this.state.postType} user={this.props.user} getSubcomments={this.getSubcomments}/>
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
                    {
                        comment.creator.photoUrl === undefined ? null :
                        <img src={comment.creator.photoUrl} alt="profile-pic"/>
                    }
                    
                </div>
                <div className="comment-content">
                    {
                        this.commentProfile()
                    }
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
                            this.props.user.index === comment.creator.index ? editButton : null
                        }
                    </div>
                    <i className="fa fa-thumbs-o-up" style={this.state.liked ? liked : null} onClick={this.onLike}/>
                    <p>{comment.likeNum}</p>
                    <i className="fa fa-thumbs-o-down" style={this.state.disliked ? disliked : null} onClick={this.onDislike}/>
                    <p>{comment.hateNum}</p>
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
                                <textarea className="subcomment-write-content" onChange={this.changeSubcomment} placeholder="댓글을 입력하세요. (최대 300자)"
                                value={this.state.mySubcomment}/>
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