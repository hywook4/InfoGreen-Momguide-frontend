import React from 'react';
import './Login.css';

export class LoginSignupProfile extends React.Component{
    render(){
        return(
            <div className="login-inner-container">
                <div className="user-icon">
                    <img className="img-fluid" src={require('../../../../assets/images/icons/user-icon.png')} alt=""/>
                </div>
                        
            </div>
        )
    }
}