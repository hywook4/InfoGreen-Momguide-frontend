import React from 'react';
import './Comment.css';
import REPORT_ICON from '../../../assets/images/report.png';

export class CommentCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {

        return (
            <div className="comment-card">
                <div className="comment-profile-img">
                    <img src='https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg' alt="profile-pic"/>
                </div>
                <div className="comment-content">
                    <div className="comment-user-profile">
                        <p>닉네임들어감</p>
                        <div>성별</div>
                        <div>20대</div>
                        <div>자녀5~7세</div>
                        <span>2018.02.03 12:00</span>
                    </div>
                    <textarea className="comment-text" maxLength="300" value="sadkfj;salkjdf;lsakjdf;lsfsadkfj;salkjdf;lsakjdf;lsfsadkfj;salkjdf;lsakjdf;lsfsadkfj;salkjdf;lsakjdf;lsfsadkfj;salkjdf;lsakjdf;lsfsadkfj;salkjdf;lsakjdf;lsf"/>
                    <p className="comment-subcomment-fold">댓글 접기</p>
                </div>
                <div className="comment-icon-buttons">
                    <i className="fa fa-thumbs-o-up"/>
                    <p>1</p>
                    <i className="fa fa-thumbs-o-down"/>
                    <p>5</p>
                    <img src={REPORT_ICON} alt="reportIcon"/>
                </div>
                
                <div className="subcomment-card-box">
                    <div className="subcomment-card">
                        <div className="subcomment-content">
                            <div className="subcomment-top">
                                <p>닉네임들어감</p>
                                <div>성별</div>
                                <div>20대</div>
                                <div>자녀5~7세</div>
                                <span>2018.02.03 12:00</span>
                            </div>
                            <div className="subcomment-middle">
                                <textarea value="asdfasdf"/>
                            </div>
                            <div className="subcomment-bottom">
                                <div className="subcomment-bottom-icons">
                                    <i className="fa fa-thumbs-o-up"/>
                                    <p>1</p>
                                    <i className="fa fa-thumbs-o-down"/>
                                    <p>5</p>
                                    <img src={REPORT_ICON} alt="reportIcon"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}