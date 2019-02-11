import React from 'react';
import './MyProfile.css';
import {FollowCard} from './FollowCard'

export class MyProfile extends React.Component{

    state = ({
        tab: "팔로워"
    })


    componentDidMount=()=>{
        
    };

    changeTab = (tab) => {
        console.log(tab);
        this.setState({
            tab: tab
        })
    }

    cancelFollow = () =>{
        console.log("cancel follow");
    }

    addCards = () => { 
        console.log("request for more follower or followee infos");
    }
   
    render(){

        const dummyFollower = [
            {
                nickName: "팔로워1",
                age: 123,
                sex: "남자",
                childAge: 5
            },
            {
                nickName: "팔로워2",
                age: 23,
                sex: "남자",
                childAge: 3
            },
            {
                nickName: "팔로워3",
                age: 13,
                sex: "여자",
                childAge: 5
            },
            {
                nickName: "팔로워4",
                age: 123,
                sex: "남자",
                childAge: 5
            },
        ]

        const dummyFollowee = [
            {
                nickName: "팔로잉1",
                age: 123,
                sex: "남자",
                childAge: 5
            },
            {
                nickName: "팔로잉2",
                age: 23,
                sex: "남자",
                childAge: 3
            },
            {
                nickName: "팔로잉3",
                age: 13,
                sex: "여자",
                childAge: 5
            },
            {
                nickName: "팔로잉4",
                age: 123,
                sex: "남자",
                childAge: 5
            },
            {
                nickName: "팔로잉5",
                age: 123,
                sex: "남자",
                childAge: 5
            },
            {
                nickName: "팔로잉6",
                age: 123,
                sex: "남자",
                childAge: 5
            },
            {
                nickName: "팔로잉1",
                age: 123,
                sex: "남자",
                childAge: 5
            },
            {
                nickName: "팔로잉2",
                age: 23,
                sex: "남자",
                childAge: 3
            },
            {
                nickName: "팔로잉3",
                age: 13,
                sex: "여자",
                childAge: 5
            },
            {
                nickName: "팔로잉4",
                age: 123,
                sex: "남자",
                childAge: 5
            },
            {
                nickName: "팔로잉5",
                age: 123,
                sex: "남자",
                childAge: 5
            },
            {
                nickName: "팔로잉6",
                age: 123,
                sex: "남자",
                childAge: 5
            },
        ]


        
        return(
            <React.Fragment>
                <div className="profile-card">
                    <div className="profile-img"><img>{/*here goes profile pic*/}</img></div>
                    <div className="profile-info-box">
                        <div className="profile-nickname">NickName</div>
                        <div className="profile-info">Year</div>
                        <div className="profile-info">Sex</div>
                        <div className="profile-info">ChildAge</div>
                    </div>
                </div>
                <div className="follow-container">
                    <div className="follow-tab-box">
                        <div className="follow-tabs">
                            <a onClick={()=> this.changeTab("팔로워")}>
                                <div className={`tab ${this.state.tab === "팔로워" ? "tab-selected":""}`}>
                                    <h1>24</h1>
                                    <p>팔로워</p>
                                </div>
                            </a>
                            <a onClick={() => this.changeTab("팔로윙")}>
                                <div className={`tab ${this.state.tab === "팔로윙" ? "tab-selected":""}`}>
                                    <h1>30</h1>
                                    <p>팔로잉</p>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="follow-card-box">
                        { this.state.tab === "팔로워" ? 
                            dummyFollower.map((d, i) => <FollowCard data={d} key={i} /> ) :
                            dummyFollowee.map((d, i) => <FollowCard data={d} key={i} /> )
                        }

                        <a onClick={this.addCards}><div className="more-follow-card">더보기</div></a>
                    </div>
                </div>
            </React.Fragment>
            
        )
        
    }
}