import React from 'react';
import './Comment.css';
import REPORT_ICON from '../../../assets/images/report.png';


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
            subcomment : props.data
        }
    }


    render() {
        const liked = { color: "#32b8a4"}
        const disliked = {color: "red"}

        const subcomment = this.state.subcomment;
            
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
                            this.state.user.index === subcomment.index ? 
                            <React.Fragment>
                                <b>&#10006;</b>
                                <i class="fa fa-pencil"/>
                            </React.Fragment> : null
                        }
                        
                    </div>
                    <div className="subcomment-middle">
                        <textarea defaultValue={subcomment.content} disabled/>
                    </div>
                    <div className="subcomment-bottom">
                        <div className="subcomment-bottom-icons">
                            <i className="fa fa-thumbs-o-up" style={subcomment.likePressed ? liked : null}/>
                            <p>{subcomment.likes}</p>
                            <i className="fa fa-thumbs-o-down" style={subcomment.dislikePressed ? disliked : null}/>
                            <p>{subcomment.dislikes}</p>
                            <img src={REPORT_ICON} alt="reportIcon"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}