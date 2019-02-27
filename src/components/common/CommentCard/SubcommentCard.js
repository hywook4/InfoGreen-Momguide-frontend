import React from 'react';
import './Comment.css';
import REPORT_ICON from '../../../assets/images/report.png';

import { ReportModal }  from '../ReportModal/ReportModal';

const user = {
    index: 1,
    imageUrl: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
    name: '테스트',
    sex: '남자',
    age: '23',
    childAge: '1',
}
export class SubcommentCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: user,
            subcomment : props.data,
            editable: false,
            reportModalId: "report" + props.data.commentIndex + props.data.index
        }
    }

    onEdit = () => {
        if(this.state.editable){ // TODO : 수정한 경우에 수정 요청 보내기 
            console.log("대댓글 수정하기 : " + this.state.subcomment.content);
        }

        this.setState({
            editable: !this.state.editable
        })
    }

    onDelete = () => {
        console.log("delete 대댓글 : " + this.state.subcomment.content);
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
                        <p>{subcomment.name}</p>
                        <div>{subcomment.sex}</div>
                        <div>{subcomment.age}세</div>
                        <div>자녀{subcomment.childAge}세</div>
                        <span>{subcomment.date}</span>
                        
                        {
                            this.state.user.index === subcomment.index ? editButton : null
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