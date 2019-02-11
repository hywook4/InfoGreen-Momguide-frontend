import React from 'react';
import './MyPage.css';
import axios from 'axios';

import { MyPageMenu } from './MyPageMenu';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"


export class MyPage extends React.Component{

    state = {
        
    };

    

    componentDidMount=()=>{
        
    };


    render(){

        return (
            <div className="mypage-container">
                <div className="mypage-page">
                    <div className="banner"></div>
                    <div className="mypage-box">
                        <MyPageMenu/>
                        
                        <div className="mypage-content">
                            <div className="content-header">
                                <h2>여긴 뭐가 들어갈까.?....</h2>
                                <p>마이페이지  >  아 일하기 싫다  >  에부부</p>
                            </div>
                            <div className="content-body">
                                <Router>
                                    <Switch>
                                        
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