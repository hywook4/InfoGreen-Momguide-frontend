import React from 'react';
import '../login/Login.css';

export class Signup extends React.Component{
    render(){
        return(
            <div className="container">
               <div className="login-container">
                    <div>
                        <div className="login-btn">
                            <p>로그인이 필요한 페이지입니다.</p>
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">로그인</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}