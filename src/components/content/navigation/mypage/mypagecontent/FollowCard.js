import React from 'react';
import './MyProfile.css';

export class FollowCard extends React.Component{

    state = ({
    
    })


    componentDidMount=()=>{
        this.setState({
            tab: this.props.tab
        })
    };

    cancelFollow = () => {
        console.log(this.props.data.nickName + " 의 팔로윙이 취소됩니다");
    }
   
    userInfo = () => {
        console.log(this.props.data.nickName +" 의 정보를 보러 갑니다");
    }

    render(){
        const data = this.props.data;

        return(
            <div className="follow-card">
                <div className="follow-img-box"><div className="follow-img"></div></div>
                <div className="follow-nickname"><div onClick={this.userInfo}>{data.nickName}</div></div>
                <div className="follow-info-box">
                    <div className="follow-info">{data.age}</div>
                    <div className="follow-info">{data.sex}</div>
                    <div className="follow-info">자녀{data.childAge}세 {this.state.tab}</div>
                </div>
                <div className="follow-cancel"> 
                        <div className="cancel-button" onClick={this.cancelFollow}>취소하기</div>
                </div>
            </div>
        )
        
    }
}