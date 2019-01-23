import React from 'react';
import './LoggedIn.css';


export class LoggedIn extends React.Component{
    render=()=>{
    return(
        <React.Fragment>
        <div className="loggedin">
            <div className="help-row">
                <a href="/request/request-comment" className="ingr-anchor">
                    <div className="ingr-anly">
                        <div className="inr-ingr">
                            <h2>성분 분석 요청하기</h2>
                            <p><small>검색해도 나오지 않는 제품이 있다면?</small></p>
                        </div>
                    </div>
                </a>
                <a href="/request/contact-us" className="ingr-anchor">
                    <div className="ingr-anly">
                        <div className="inr-ingr">                           
                            <h2>1:1 문의하기</h2>
                            <p><small>문의사항이나 MomGuide에게 바라는 점이 있다면?</small></p>                         
                        </div>
                    </div>
                </a> 
            </div>
        </div>
        </React.Fragment>
    )
}
}




