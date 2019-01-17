import React from 'react';
import './Request.css';
// import { Card, Image, Rating } from 'semantic-ui-react';

export class RequestTabs extends React.Component{
    render(){
        return(
            <div className="comment-tabs req-inr-tab-1">
                <nav>
                    <div className="nav nav-tabs nav-fill nav-inner-tabs" id="nav-tab" role="tablist">
                        <a className="nav-item nav-link nav-inner-request-tab active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">
                            <p>우리집 화학제품</p>
                            <p><b>27</b></p>
                        </a>
                        <a className="nav-item nav-link nav-inner-request-tab" style={{borderLeft:'1px solid gray',borderRight:'1px solid gray'}} id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">
                            <p>찜한 제품</p>
                            <p><b>12</b></p>
                        </a>
                        <a className="nav-item nav-link nav-inner-request-tab" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">
                            <p>관심 사용자</p>
                            <p><b>14</b></p>
                        </a>
                                
                    </div>
			    </nav>

                <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                            </div>
                            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                            </div>
                           
                </div>
            </div>    
        )
    }
}