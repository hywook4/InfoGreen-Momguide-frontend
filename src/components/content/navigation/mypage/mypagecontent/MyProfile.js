import React from 'react';
import './MyProfile.css';
import { connect } from 'react-redux';
import * as actions from '../../../../../actions';
import {FollowCard} from './FollowCard'
import history from '../../../../../history/history';

class MyProfile extends React.Component{

    constructor(props) {
        super(props);

        this.state = ({
            tab: "팔로워"
        })
    }



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

    calculateAge = (year) => {
        const d = new Date();
        const yyyy = d.getFullYear();
        if(year === undefined) {
            return ('');
        }
        return yyyy - year + 1;
    }

    translateGender = (gender) => {
        if(gender === 'male') {
            return '남자';
        } else if(gender === 'female') {
            return '여자';
        }
    };

    calculateChildAge = (year) => {
        const childAge = this.calculateAge(year);
        if(year === 0) {
            return ('자녀 없음');
        } else {
            if(year === undefined) {
                return ('');
            }
            return ('자녀 ' + childAge + '세');
        }
    }

    handleLogout = (e) => {
        const { handleLogout } = this.props;
        handleLogout();
        history.push('/');
    }
    render(){

        return(
            <React.Fragment>
                <div className="profile-card">
                    <div className="profile-img"><img src={this.props.userPhoto} alt="" id="user-profile-img"></img></div>
                    <div className="profile-info-box">
                        <div className="profile-nickname">{this.props.userNickName}</div>
                        <div className="profile-info">{this.calculateAge(this.props.memberBirthYear)}</div>
                        <div className="profile-info">{this.translateGender(this.props.userGender)}</div>
                        <div className="profile-info">{this.calculateChildAge(this.props.childBirthYear)}</div>
                    </div>
                </div>
                {/* <div className="follow-container">
                    <div className="follow-tab-box">
                        <div className="follow-tabs">
                            <div className={`tab ${this.state.tab === "팔로워" ? "tab-selected":""}`} onClick={()=> this.changeTab("팔로워")}>
                                <h1>24</h1>
                                <p>팔로워</p>
                            </div>
                            <div className={`tab ${this.state.tab === "팔로잉" ? "tab-selected":""}`} onClick={()=> this.changeTab("팔로잉")}>
                                <h1>30</h1>
                                <p>팔로잉</p>
                            </div>
                        </div>
                    </div>
                    <div className="follow-card-box">
                        { this.state.tab === "팔로워" ? 
                            dummyFollower.map((d, i) => <FollowCard data={d} tab={this.state.tab} key={i} /> ) :
                            dummyFollowee.map((d, i) => <FollowCard data={d} tab={this.state.tab} key={i} /> )
                        }

                        <div className="more-follow-card" onClick={this.addCards}>더보기</div>
                    </div>
                </div> */}
                <div className="myprofile-logout">
                    <button type="button" id="logout-button" onClick={this.handleLogout}>로그아웃</button>
                </div>
            </React.Fragment>
            
        )
        
    }
}

const mapStateToProps = (state) => {
    return ({
        userNickName: state.auth.userNickName,
        userPhoto: state.auth.userPhoto,
        memberBirthYear: state.auth.memberBirthYear,
        userGender: state.auth.userGender,
        childBirthYear: state.auth.childBirthYear
    });
};

const mapDispatchToProps = (dispatch) => {
    return ({
        handleLogout: () => {
            return dispatch(actions.logout());
        }
    })
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);