import React, { Component } from 'react';
import './Signup.css';
import USER_IMAGE from '../../../../assets/images/icons/user-icon.png'

export class Signup extends Component {
    render() {
        return (
            <div className="signup-container">
                <div className="signup-banner">
                    <div className="signup-banner-text">
                        회원가입
                    </div>
                </div>
                
                <div className="signup-agreement">
                    <div className="signup-agreement-title">
                        1. 약관 동의
                    </div>
                    <div className="signup-agreement-age">
                        <span className="signup-agreement-age-text">
                            만 14세 이상입니다.
                        </span>
                        <span>
                            <input type="checkbox" className="signup-agreement-age-box"/>
                        </span>
                    </div>
                    <div className="signup-agreement-license">
                        <span className="signup-agreement-license-text">
                            이용 약관 (필수)
                        </span>
                        <span>
                            <input type="checkbox" className="signup-agreement-license-box"/>
                        </span>
                    </div>
                    <div className="signup-agreement-personal-info">
                        <span className="signup-agreement-personal-info-text">
                            개인정보취급방침 (필수)
                        </span>
                        <span>
                            <input type="checkbox" className="signup-agreement-personal-info-box"/>
                        </span>
                    </div>
                    <div className="signup-agreement-marketing">
                        <span className="signup-agreement-marketing-text">
                            홍보 및 마케팅 사용(선택)
                        </span>
                        <span>
                            <input type="checkbox" className="signup-agreement-marketing-box"/>
                        </span>
                    </div>
                </div>
                
                <div className="signup-login-info">
                    <div className="signup-login-info-title">
                        2. 로그인 정보입력 (필수입력)
                    </div>
                    <div className="signup-login-info-email-part">
                        <div>
                            이메일
                        </div>
                        <div className="signup-login-info-email-input">
                            <span className="signup-login-info-email-id">
                                <input type="text" placeholder="    정확하게 입력해주세요."/>
                            </span>
                            <span>
                                @
                            </span>
                            <span className="signup-login-info-email-url">
                                <input type="text" />
                            </span>
                            <span>
                                <select id="signup-login-info-email-url-options">
                                    <option>직접 입력</option>
                                    <option>naver.com</option>
                                    <option>gmail.com</option>
                                    <option>daum.net</option>
                                    <option>hanmail.net</option>
                                </select>
                            </span>
                            <span>
                                <button type="button" className="signup-login-info-email-check">중복 확인</button>
                            </span>
                        </div>
                    </div>
                    <div className="signup-login-info-password">
                        <div className="signup-login-info-password-text">
                            <span>
                                비밀번호&nbsp;&nbsp;&nbsp;
                            </span>
                            <span>
                                |&nbsp;&nbsp;&nbsp;6~15자의 영문, 숫자 조합으로 입력해 주세요.
                            </span>
                        </div>
                        <div>
                            <input type="password" className="signup-login-info-password-input"/>
                        </div>
                    </div>
                    <div className="signup-login-info-password-check">
                        <div className="signup-login-info-password-check-text">
                            비밀번호 확인
                        </div>
                        <div>
                            <input type="password" className="signup-login-info-password-check-input"/>
                        </div>
                    </div>

                </div>
                <div className="signup-profile">
                    <div className="signup-profile-title">
                        3. 프로필 입력 (필수입력)
                    </div>
                    <div className="signup-profile-picture">
                        <div className="signup-profile-picture-text">
                            프로필 사진
                        </div>
                        <div>
                            <span>
                                <img src={USER_IMAGE} alt="" id="profile" />
                            </span>
                            <span>
                                <button type="button" className="signup-profile-change-picture">사진 변경</button>
                            </span>
                        </div>
                    </div>
                    <div className="signup-profile-nickname">
                        <div className="signup-profile-nickname-text">
                            <span>
                                닉네임&nbsp;&nbsp;&nbsp;
                            </span>
                            <span>
                                |&nbsp;&nbsp;&nbsp;6자 이내로 설정해 주세요.
                            </span>
                        </div>
                        <div>
                            <span>
                                <input type="text" className="signup-profile-nickname-input" />
                            </span>
                            <span>
                                <button type="button" className="signup-profile-nickname-check">중복 확인</button>
                            </span>
                        </div>
                    </div>
                    <div className="signup-profile-gender">
                        <div className="signup-profile-gender-text">
                            성별
                        </div>
                        <div className="signup-profile-gender-buttons">
                            <span>
                                <button type="button" className="signup-profile-gender-women">여자</button>
                            </span>
                            <span>
                                <button type="button" className="signup-profile-gender-men">남자</button>
                            </span>
                        </div>
                    </div>
                    <div className="signup-profile-birth">
                        <div className="signup-profile-birth-text">
                            생년월일
                        </div>
                        <div className="signup-profile-birth-select">
                            <span>
                                <select id="year">
                                    <option></option>
                                    <option>2010</option>
                                    <option>2011</option>
                                    <option>2012</option>
                                    <option>2013</option>
                                    <option>2014</option>
                                    <option>2015</option>
                                    <option>2016</option>
                                    <option>2017</option>
                                    <option>2018</option>
                                    <option>2019</option>
                                </select>
                                <select id="month">
                                    <option></option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>                            
                                </select>
                                <select id="day">
                                    <option></option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                    <option>13</option>
                                    <option>14</option>
                                    <option>15</option>
                                    <option>16</option>
                                    <option>17</option>
                                    <option>18</option>
                                    <option>19</option>
                                    <option>20</option>
                                    <option>21</option>
                                    <option>22</option>
                                    <option>23</option>
                                    <option>24</option>
                                    <option>25</option>
                                    <option>26</option>
                                    <option>27</option>
                                    <option>28</option>
                                    <option>29</option>
                                    <option>30</option>
                                    <option>31</option>
                                </select>
                            </span>
                        </div>
                    </div>
                    <div className="signup-profile-kids">
                        <div className="signup-profile-kids-text">
                            자녀유무
                        </div>
                        <div className="signup-profile-kids-select">
                            <select id="kids">
                                <option>선택</option>
                                <option>있음</option>
                                <option>없음</option>
                            </select>
                        </div>
                    </div>
                    <div className="signup-profile-kids-birth">
                        <div className="signup-profile-kids-birth-text">
                            자녀생년월일
                        </div>
                        <div className="signup-profile-kids-birth-select">
                            <span>
                                <select id="kids-birth-year">
                                    <option></option>
                                    <option>2010</option>
                                    <option>2011</option>
                                    <option>2012</option>
                                    <option>2013</option>
                                    <option>2014</option>
                                    <option>2015</option>
                                    <option>2016</option>
                                    <option>2017</option>
                                    <option>2018</option>
                                    <option>2019</option>
                                </select>
                                <select id="kids-birth-month">
                                    <option></option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>                            
                                </select>
                                <select id="kids-birth-day">
                                    <option></option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                    <option>13</option>
                                    <option>14</option>
                                    <option>15</option>
                                    <option>16</option>
                                    <option>17</option>
                                    <option>18</option>
                                    <option>19</option>
                                    <option>20</option>
                                    <option>21</option>
                                    <option>22</option>
                                    <option>23</option>
                                    <option>24</option>
                                    <option>25</option>
                                    <option>26</option>
                                    <option>27</option>
                                    <option>28</option>
                                    <option>29</option>
                                    <option>30</option>
                                    <option>31</option>
                                </select>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="signup-optional-info">
                    <div className="signup-optional-info-title">
                        3-2. 수집정보 (선택입력)
                    </div>
                    <div className="signup-optional-info-name">
                        <div className="signup-optional-info-name-text">
                            실명
                        </div>
                        <div>
                            <input type="text"  className="signup-optional-info-name-input" />
                        </div>
                    </div>
                    <div className="signup-optional-info-phone">
                        <div className="signup-optional-info-phone-text">
                            핸드폰 번호
                        </div>
                        <div className="signup-optional-info-phone-input">
                            <span>
                                <select id="phone">
                                    <option>010</option>
                                    <option>011</option>
                                    <option>017</option>
                                    <option>018</option>
                                    <option>019</option>
                                </select>
                            </span>
                            <span>
                                -
                            </span>
                            <span>
                                <input type="text" className="signup-optional-info-phone-middle" />
                            </span>
                            <span>
                                -
                            </span>
                            <span>
                            <input type="text" className="signup-optional-info-phone-last" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}