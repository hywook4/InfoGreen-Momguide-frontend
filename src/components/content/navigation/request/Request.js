import React from 'react';
import './Request.css';
import '../login/Login.css';
import {LoginSignupProfile} from '../login/LoginSignupProfile';
import {RequestTabs} from '../request/RequestTabs';


export class Request extends React.Component{
    render(){
        return(
            <div className="container">
           
                <div className="login-container">
                 
                    <LoginSignupProfile/>
                    <div className="request-setting">
                        <i className="fa fa-gear"></i>
                        <p>수정하기</p>
                    </div>
                 
                    <div>
                        <div className="login-btn request-user">
                            <h1>홍길동</h1>
                            
                        </div>
                        <div className="user-req-page">
                        <ul>
                            <li>
                                <p>남자</p>
                            </li>
                            <li><p>30대</p></li>
                            <li><p>자녀 3~5살</p></li>
                        </ul>
                    </div>
                    {/* tabs */}
                    <div className="comment-tabs">
                        
                        <nav>
                            <div className="nav nav-tabs nav-fill nav-user-fill" id="nav-tab" role="tablist">
                                <a className="nav-item nav-link nav-user-tabs active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">나의 관심</a>
                                <a className="nav-item nav-link nav-user-tabs" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">나의 활동</a>
                                
                            </div>
				        </nav>
                        <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                               <RequestTabs/>
                            </div>
                            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                <RequestTabs/>
                            </div>
                           
                        </div>

                        
                    </div>
                </div>
             </div>
            
             
            
         </div>
        )
    }
}