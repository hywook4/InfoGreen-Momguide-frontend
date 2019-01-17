import React from 'react';
import './LoggedIn.css';


export class LoggedIn extends React.Component{
    render=()=>{
    return(
        <React.Fragment>
        <br/><br/><br/><br/>
        <div className="loggedin" style={{paddingBottom: '150px'}}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="container">
                            <div className="log-inr-div">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="ingr-anly">
                                      
                                                <div className="inr-ingr">
                                                <a href="/request/request-comment" className="ingr-anchor">
                                                    <h2>성분 분석 요청하기</h2>
                                                    <p><small>검색해도 나오지 않는 제품이 있다면?</small></p>
                                                </a>
                                                </div>
                                            
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                    <div className="ingr-anly">
                                        
                                            <div className="inr-ingr">
                                            <a href="/request/request-comment" className="ingr-anchor">
                                                <h2>1:1 문의하기</h2>
                                                <p><small>문의사항이나 MomGuide에게 바라는 점이 있다면?</small></p>
                                            </a>    
                                            </div>
                                        
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
        </React.Fragment>
    )
}
}




