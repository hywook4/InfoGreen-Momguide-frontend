import React from 'react';
import './MyPage.css';
import axios from 'axios';

import { MyPageMenu } from './MyPageMenu';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

import { MyProfile } from './mypagecontent/MyProfile';
import { ProfileModify } from './mypagecontent/ProfileModify';
import { MyHouseProduct }  from './mypagecontent/MyHouseProduct'


export class MyPage extends React.Component{

    state = {
        currentPage: "내 프로필"
    };

   
    componentDidMount=()=>{
        
    };

    changeHeader = (head) => {
        this.setState({
            currentPage: head
        });
    }


    render(){

        return (
            <div className="mypage-container">
                <div className="mypage-page">
                    <div className="banner"></div>
                    <div className="mypage-box">
                        <MyPageMenu changeHeader={this.changeHeader}/>
                        
                        <div className="mypage-content">
                            <div className="content-header">
                                <h2>{this.state.currentPage}</h2>
                                <p>홈  >  마이페이지  >  {this.state.currentPage}</p>
                            </div>
                            <div className="content-body">
                                <Router>
                                    <Switch>
                                        <Route path="/mypage/my-profile" component={MyProfile} /> 
                                        <Route path="/mypage/profile-modify" component={ProfileModify} /> 
                                        <Route path="/mypage/my-house-products" component={MyHouseProduct} /> 
                                        <Route path="/mypage/dib-products" component={<h1>찝제</h1>} /> 
                                        <Route path="/mypage/my-review" component={<h1>리뷰</h1>} /> 
                                        <Route path="/mypage/ingredient-open-request" component={<h1>열어라</h1>} /> 
                                        <Route path="/mypage/ingredient-analysis-request" component={<h1>야 </h1>} /> 
                                        <Route path="/mypage/my-help" component={<h1>도와줘</h1>} /> 
                                    </Switch>
                                </Router>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}