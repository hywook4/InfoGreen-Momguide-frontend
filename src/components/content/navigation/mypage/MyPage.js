import React from 'react';
import './MyPage.css';

import { MyPageMenu } from './MyPageMenu';
import {Route, Switch} from "react-router-dom"

import ProfileModify from './mypagecontent/ProfileModify';
import MyProfile from './mypagecontent/MyProfile';

import { MyHouseProduct }  from './mypagecontent/MyHouseProduct'
import { MyDibProduct } from './mypagecontent/MyDibProduct'
import { OpenRequest } from './mypagecontent/OpenRequest'
import { MyHelpRequest } from './mypagecontent/MyHelpRequest'
import { MyIngredientRequest } from './mypagecontent/MyIngredientRequest'
import { MyHelpDetail } from './mypagecontent/MyHelpDetail'
import MyIngredientDetail from './mypagecontent/MyIngredientDetail'
import { MyReview } from './mypagecontent/MyReview';
import { ProfileModifyPasswordCheck } from './mypagecontent/ProfileModifyPasswordCheck';
import { MyReviewDetail } from './mypagecontent/MyReviewDetail';
export class MyPage extends React.Component{

    state = {
        currentPage: "내 프로필"
    };

    changeHeader = (head) => {
        this.setState({
            currentPage: head
        });
    };

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
                                <Switch>
                                    <Route path="/mypage/my-profile" component={MyProfile} /> 
                                    <Route path="/mypage/profile-modify" component={ProfileModify} />
                                    <Route path="/mypage/profile-modify-password-check" component={ProfileModifyPasswordCheck} />
                                    <Route path="/mypage/my-house-products" component={MyHouseProduct} />
                                    <Route path="/mypage/dib-products" component={MyDibProduct} /> 
                                    <Route exact path="/mypage/my-review" component={MyReview} />
                                    <Route path="/mypage/my-review/modify" component={MyReviewDetail} />
                                    <Route path="/mypage/ingredient-open-request" component={OpenRequest} /> 
                                    <Route exact path="/mypage/ingredient-analysis-request" component={MyIngredientRequest} /> 
                                    <Route path="/mypage/ingredient-analysis-request" component={MyIngredientDetail} /> 
                                    <Route exact path="/mypage/my-help" component={MyHelpRequest} /> 
                                    <Route path="/mypage/my-help" component={MyHelpDetail} /> 
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}