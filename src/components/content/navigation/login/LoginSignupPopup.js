import React from 'react';
import './Login.css';
import CoreData from '../../../../stores';

export class LoginSignupPopup extends React.Component{
    constructor(){
        super();
        // all local events and their callbacks at one place.
        this.events=[
            {name:'LOGIN',callBack:this.handleLogin},
            {name:'REGISTER',callBack:this.handleRegister},
            {name:'ERROR',callBack:this.handleError},
        ]
    }
    state = {
        showLoginForm : true,
        showSignupForm : false,
        showChildrenAgeDropdown : false,
        loginForm:{}
      }

      
    componentWillMount=()=>{
        // check if the user is already logged in too, if yes then redirect
        this.events.forEach((evnt)=>CoreData.on(evnt.name,evnt.callBack))
    }
    componentWillUnmount=()=>{
        // save the state of the user authentication to the store.
        this.events.forEach((evnt)=>CoreData.removeListener(evnt.name,evnt.callBack))
    }
    

    handleError=(theError)=>window.swal(theError.title, theError.message,"error")

    handleLogin=(resp)=>CoreData.saveUserData(resp);

    // API CALL TO REGISTER
    handleRegister=(resp)=>{

    }

    requestRegister=()=>{

    }
    
    loginFormValChange=(e)=>{
        var value = e.target.value;
        var key = e.target.getAttribute('type');
        var payload = {...this.state.loginForm};
        payload[key] = value;
        this.setState({loginForm:payload});
    }

    onChangeHaveChildren=(event)=>{
        var showChildrenAgeDropdown = event.target && event.target.value === 1;
        this.setState({showChildrenAgeDropdown : showChildrenAgeDropdown});
    }

    doLogin=(e)=>{
         e.preventDefault() 
         CoreData.requestLogin(this.state.loginForm)
    }
    
    render(){
        return(
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered popup-modal" role="document">
                    <div className="modal-content popup-content">
                    <div className="modal-header popup-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">{this.state.showLoginForm ? "로그인" : "회원가입"}</h5>
                        {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button> */}
                    </div>
                    <div className="modal-body">
                        {
                            this.state.showLoginForm &&
                            <div>
                                <form action="#">
                                <div className="form-group">
                                    <input onChange={this.loginFormValChange} type="email" className="form-control form-input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="아이디를 입력하세요" />
                                    <input onChange={this.loginFormValChange} type="password" className="form-control form-input" id="exampleInputPassword1" placeholder="비밀번호를 입력하세요"></input>
                                </div>
                                <div className="popup-chkbox">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                    <label className="form-check-label" htmlFor="exampleCheck1">로그인 상태 유지</label>
                                    
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck2"/>
                                    <label className="form-check-label" htmlFor="exampleCheck2">아이디 저장</label>
                                </div>
                                </div>
                                
                                <button onClick={this.doLogin} className="btn btn-primary popup-btn">로그인</button>
                                <div className="forget-pwd">
                                    <p>아이디 찾기 | 비밀번호 찾기</p>
                                    <p className="right">
                                        <span style={{color:'#32b8a4',cursor:'pointer'}} onClick={() => this.setState({showLoginForm: false, showSignupForm: true, showChildrenAgeDropdown: false})}>
                                         회원가입
                                        </span>
                                    </p>
                                </div>
                        </form>
                                <hr className="hr"/>
                            </div>
                            
                        
                        }

                        {
                            this.state.showSignupForm &&

                            <form className="signup-form" action="">
                                <div className="form-group">
                                    <input type="email" className="form-control form-input" id="signupInputEmail" aria-describedby="emailHelp" placeholder="이메일" />
                                    <input type="text" className="form-control form-input" id="signupInputUsername" placeholder="닉네임"></input>
                                    <input type="password" className="form-control form-input" id="signupInputPassword" placeholder="비밀번호"></input>
                                    <select className="form-control form-select">
                                        <option defaultValue>성별</option>
                                        <option>남자</option>
                                        <option>여자</option>
                                    </select>
                                    <select className="form-control form-select">
                                        <option defaultValue>나이</option>
                                        <option>10대</option>
                                        <option>20대</option>
                                        <option>30대</option>
                                        <option>40대</option>
                                        <option>50대 이상</option>
                                    </select>
                                    <select className="form-control form-select" onChange={this.onChangeHaveChildren}>
                                        <option defaultValue>자녀유무</option>
                                        <option value="0">없음</option>
                                        <option value="1">있음</option>
                                    </select>
                                    {
                                        this.state.showChildrenAgeDropdown && 
                                        <select className="form-control form-select">
                                            <option defaultValue>자녀 나이</option>
                                            <option>1세 미만</option>
                                            <option>1-3세</option>
                                            <option>3-5세</option>
                                            <option>5세 이상</option>
                                        </select>
                                    }
                                    
                                </div>
                                
                                <button type="submit" className="btn btn-primary popup-btn">회원가입</button>
                                <div className="forget-pwd">
                                    <p>아이디 찾기 | 비밀번호 찾기</p>
                                    <p className="right">
                                        <span style={{color:'#32b8a4',cursor:'pointer'}} onClick={this.doLogin}>
                                         로그인
                                        </span>
                                    </p>
                                </div>
                        </form>
                        }

                        
                        
                    </div>
                    {
                        this.state.showLoginForm &&
                        <div className="modal-footer popup-footer">
                        {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button> */}
                        <form action="">
                            <div className="popup-social-icons">
                                    <a href="facebook.com">
                                        <div className="icon-img">
                                        
                                            <img className="img-fluid" src={require('../../../../assets/images/facebook.svg')} alt="네이버 아이디로 로그인 아이콘"/>
                                        </div>
                                        <div className="icon-name">
                                            <p>네이버 아이디로 로그인</p>
                                        </div>
                                    </a>
                            </div>
                            <div className="popup-social-icons">
                                    <a href="facebook.com">
                                        <div className="icon-img">
                                        
                                            <img className="img-fluid" src={require('../../../../assets/images/naver.svg')} alt="페이스북 아이디로 로그인 아이콘"/>
                                        </div>
                                        <div className="icon-name">
                                            <p>페이스북 아이디로 로그인</p>
                                        </div>
                                    </a>
                            </div>
                            <div className="popup-social-icons">
                                    <a href="facebook.com">
                                        <div className="icon-img">
                                        
                                            <img className="img-fluid" src={require('../../../../assets/images/kakao.svg')} alt="카카오톡 아이디로 로그인 아이콘"/>
                                        </div>
                                        <div className="icon-name">
                                            <p>카카오톡 아이디로 로그인</p>
                                        </div>
                                    </a>
                            </div>
                            {/* <div className="col-auto">
                                    <label className="sr-only" htmlFor="inlineFormInputGroup">Username</label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">@</div>
                                        </div>
                                        <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="Username" />
                                    </div>
                                </div> */}
                            <div className="popup-social-icons">
                       
                                
                                {/* <div className="icon-email"> */}
                                <button type="button" className="btn btn-primary popup-btn"
                                onClick={() => this.setState({showLoginForm: !this.state.showLoginForm, showSignupForm: !this.state.showSignupForm, showChildrenAgeDropdown: false})}
                                >{this.state.showLoginForm ? "이메일로 회원가입" : "Login by email"}</button>
                                    {/* <p>Signup</p> */}
                                {/* </div> */}
                           
                       </div>
                        </form>
                    </div>
                    }
                   
                    </div>
                </div>
            </div>
        )
    }
}