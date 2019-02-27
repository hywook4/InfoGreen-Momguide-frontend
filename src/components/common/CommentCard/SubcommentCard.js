import React from 'react';
import './Comment.css';
import REPORT_ICON from '../../../assets/images/report.png';
import axios from 'axios';
import {TokenUtil} from '../../../util';
import { ReportModal }  from '../ReportModal/ReportModal';


export class SubcommentCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: props.user,
            postType: props.postType,
            subcomment : props.data,
            editable: false,
            reportModalId: "report" + props.data.index
        }
    }

    onEdit = async () => {
        if(this.state.editable){ // TODO : 수정한 경우에 수정 요청 보내기 
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
                        content: this.state.subcomment.content,
                        index: this.state.subcomment.index,
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

    onDelete = async () => {
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
                    index: this.state.subcomment.index,
                    tipIndex: this.state.postType.index
                }
            });
        } catch(error) {
            alert("댓글 삭제에 실패하였습니다.");
        }
        

        this.props.getSubcomments();
    }

    subcommentChange = (e) => {
        let subcomment = this.state.subcomment;
        subcomment.content = e.target.value;
        this.setState({
            subcomment: subcomment
        })
    }

    onLike = () => {
        let data = this.state.subcomment;

        if(data.likePressed){
            data.likePressed = !data.likePressed;
            data.likes = data.likes - 1;
        } else{
            data.likePressed = !data.likePressed;
            data.likes = data.likes + 1;
        }

        this.setState({
            subcomment: data
        })
    }

    onDislike = () => {
        let data = this.state.subcomment;

        if(data.dislikePressed){
            data.dislikePressed = !data.dislikePressed;
            data.dislikes = data.dislikes - 1;
        } else{
            data.dislikePressed = !data.dislikePressed;
            data.dislikes = data.dislikes + 1;
        }

        this.setState({
            subcomment: data
        })
    }

    subcommentProfile = () => {
        if(this.state.subcomment.creator.index === undefined){
            return (
                null
            )
        } else{
            return (
                <React.Fragment>
                    <p>{this.state.subcomment.creator.nickName}</p>
                    <div>{this.state.subcomment.creator.gender}</div>
                    <div>{this.state.subcomment.creator.memberBirthYear}세</div>
                    <div>자녀{this.state.subcomment.creator.childBirthYear}세</div>
                    <span>{this.state.subcomment.created_at}</span>
                </React.Fragment>
            )
        }
    }

    render() {
        const liked = { color: "#32b8a4"}
        const disliked = {color: "red"}

        const subcomment = this.state.subcomment;

        const editButton = (
            this.state.editable ? 
            <i className="fa fa-pencil" onClick={this.onEdit}/> :
            <React.Fragment>
                <b onClick={this.onDelete}>&#10006;</b>
                <i className="fa fa-pencil" onClick={this.onEdit}/>
            </React.Fragment>
        )
            
        return (
            <div className="subcomment-card">
                <div className="subcomment-content">
                    <div className="subcomment-top">
                        {
                            this.subcommentProfile()
                        }

                        {
                            this.state.user.index === subcomment.creator.index ? editButton : null
                        }
                        
                    </div>
                    <div className="subcomment-middle">
                        <textarea defaultValue={subcomment.content} 
                        disabled={this.state.editable ? "" : "disabled"} onChange={this.subcommentChange}/>
                    </div>
                    <div className="subcomment-bottom">
                        <div className="subcomment-bottom-icons">
                            <i className="fa fa-thumbs-o-up" style={subcomment.likePressed ? liked : null} onClick={this.onLike}/>
                            <p>{subcomment.likes}</p>
                            <i className="fa fa-thumbs-o-down" style={subcomment.dislikePressed ? disliked : null} onClick={this.onDislike}/>
                            <p>{subcomment.dislikes}</p>
                            <img src={REPORT_ICON} alt="reportIcon" data-toggle="modal" data-target={`#${this.state.reportModalId}`}/>
                        </div>
                    </div>
                </div>

                <ReportModal reportContent={this.state.subcomment} reportModalId={this.state.reportModalId}/>
            </div>
        )
    }
}