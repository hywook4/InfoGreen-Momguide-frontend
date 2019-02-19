import React from 'react';
import './MyPage.css';

import { MyPageMenu } from './MyPageMenu';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

import { MyProfile } from './mypagecontent/MyProfile';
import { ProfileModify } from './mypagecontent/ProfileModify';
import { MyHouseProduct }  from './mypagecontent/MyHouseProduct';
import { MyDibProduct } from './mypagecontent/MyDibProduct';
import { OpenRequest } from './mypagecontent/OpenRequest';
import { MyHelpRequest } from './mypagecontent/MyHelpRequest';
import { MyIngredientRequest } from './mypagecontent/MyIngredientRequest';
import { MyReview } from './mypagecontent/MyReview';


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
                                    <Route exact path="/mypage" component={MyProfile} />
                                    <Route path="/mypage/my-profile" component={MyProfile} /> 
                                    <Route path="/mypage/profile-modify" component={ProfileModify} /> 
                                    <Route path="/mypage/my-house-products" component={MyHouseProduct} /> 
                                    <Route path="/mypage/dib-products" component={MyDibProduct} />
                                    <Route exact path="/mypage/my-review" component={MyReview} />
                                    <Route path="/mypage/ingredient-open-request" component={OpenRequest} />
                                    <Route path="/mypage/ingredient-analysis-request" component={MyIngredientRequest} /> 
                                    <Route path="/mypage/my-help" component={MyHelpRequest} /> 
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}