import React from 'react';
import './Comment.css';
import REPORT_ICON from '../../../assets/images/report.png';

export class CommentCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: props.data,
            subcomments : [
                {
                    imageUrl: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                    name: 'ㅇㄹㅇ',
                    sex: '남자',
                    age: '23',
                    childAge: '53',
                    date: '2018.02.03 12:00',
                    content: '와 에 정지네요',
                    likes: 5,
                    dislikes: 5
                },
                {
                    imageUrl: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                    name: '부부',
                    sex: '남자',
                    age: '23',
                    childAge: '53',
                    date: '2018.02.03 12:00',
                    content: '와',
                    likes: 10,
                    dislikes: 5
                },
                {
                    imageUrl: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                    name: '234부',
                    sex: '남자',
                    age: '23',
                    childAge: '53',
                    date: '2018.02.03 12:00',
                    content: '와네요',
                    likes: 10,
                    dislikes: 5
                },
                {
                    imageUrl: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                    name: '162153',
                    sex: '남자',
                    age: '23',
                    childAge: '53',
                    date: '2018.02.03 12:00',
                    content: '와정말 멋지네요',
                    likes: 10,
                    dislikes: 5
                },
            ],
            totalSubcommentPage: 5,
            subcommentPage: 1,
            subcommentOpen: false,
            mySubcomment: ""
        }
    }


    foldSubcomment = () => {
        console.log("asdf");
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

    render() {
        const profile = this.state.profile;

        const moreButton = (
            <button className="subcomment-more-button" onClick={this.loadPage}>
                더보기 <i className="fa fa-angle-down"/>
            </button>
        )

        const cards = (
            this.state.subcomments.map((data, index)=>{
                return (
                    <div className="subcomment-card" key={index}>
                        <div className="subcomment-content">
                            <div className="subcomment-top">
                                <p>{data.name}</p>
                                <div>{data.sex}</div>
                                <div>{data.age}세</div>
                                <div>자녀{data.childAge}세</div>
                                <span>{data.date}</span>
                            </div>
                            <div className="subcomment-middle">
                                <textarea defaultValue={data.content} disabled/>
                            </div>
                            <div className="subcomment-bottom">
                                <div className="subcomment-bottom-icons">
                                    <i className="fa fa-thumbs-o-up"/>
                                    <p>{data.likes}</p>
                                    <i className="fa fa-thumbs-o-down"/>
                                    <p>{data.dislikes}</p>
                                    <img src={REPORT_ICON} alt="reportIcon"/>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        )
            
        return (
            <div className="comment-card">
                <div className="comment-profile-img">
                    <img src={profile.imageUrl} alt="profile-pic"/>
                </div>
                <div className="comment-content">
                    <div className="comment-user-profile">
                        <p>{profile.name}</p>
                        <div>{profile.sex}</div>
                        <div>{profile.age}세</div>
                        <div>자녀{profile.childAge}세</div>
                        <span>{profile.date}</span>
                    </div>
                    <textarea className="comment-text" maxLength="300" defaultValue={profile.content} disabled/>
                    {
                        this.state.subcommentOpen ? 
                        <p className="comment-subcomment-fold" onClick={this.foldSubcomment}>댓글 접기</p> :
                        <p className="comment-subcomment-fold" onClick={this.foldSubcomment}>댓글 열기</p>
                    }
                    
                </div>
                <div className="comment-icon-buttons">
                    <i className="fa fa-thumbs-o-up"/>
                    <p>{profile.likes}</p>
                    <i className="fa fa-thumbs-o-down"/>
                    <p>{profile.dislikes}</p>
                    <img src={REPORT_ICON} alt="reportIcon"/>
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
            </div>
        )
    }
}