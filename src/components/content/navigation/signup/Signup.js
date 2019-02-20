import React, { Component } from 'react';
import './Signup.css';
import USER_IMAGE from '../../../../assets/images/icons/user-icon.png'
import axios from 'axios';
import { RoadNameAddress } from '../../../common/RoadNameAddress/RoadNameAddress';
import $ from 'jquery';

function range(start, end) {
    const len = end-start+1;
    if(len < 0)
        return [];

    return [...Array(len).keys()].map((i) => i+start);
}

function lastDay(year, month) {
    return new Date(year, month, 0).getDate();
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
    var re = /^.{6,15}$/;
    var re2 = /^[A-Za-z]*$/;
    var re3 = /^[0-9]*$/;
    return !re2.test(password) && !re3.test(password) && re.test(password);
}

export class Signup extends Component {
    setDefaultImage = async () => {
        let response = await fetch(USER_IMAGE);
        let data = await response.blob();
        let metadata = {
            type: 'image/png'
        };
        let file = new File([data], "test.png", metadata);
        this.state.profileImage = file;
    };

    constructor(props) {
        super(props);

        this.setDefaultImage();

        this.state = {
            ageConfirm: false,
            serviceTermConfirm: false,
            privateInfoConfirm: false,
            advertisementConfirm: false,
            emailId: '',
            emailDomain: '',
            emailDomainDisable: false,
            emailDuplicateOk: false,
            emailDuplicateMessage: '',
            password: '',
            passwordConfirm: '',
            profileImage: null,
            profileImageUrl: USER_IMAGE,
            nickname: '',
            nicknameDuplicateOk: false,
            nicknameDuplicateMessage: '',
            gender: '',
            birthYear: '',
            birthMonth: '',
            birthDay: '',
            hasChild: '선택',
            childBirthYear: '',
            childBirthMonth: '',
            childBirthDay: '',
            name: '',
            phoneNumberFirst: '010',
            phoneNumberSecond: '',
            phoneNumberThird: '',
            zipCode: '',
            roadNameAddress: '',
            addressDetail: '',
            addressNote: '',
        };
    }

    setAddress = (zipCode, roadNameAddress) => {
        this.setState({
            zipCode: zipCode,
            roadNameAddress: roadNameAddress
        }, () => {
            $('#roadNameAddress').modal('toggle');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        });
    };

    handleRegister = () => {
        const state = this.state;
        if(!state.ageConfirm || !state.serviceTermConfirm || !state.privateInfoConfirm) {
            alert('약관 동의에 체크를 해주세요.');
            return;
        }
        if(!validateEmail(state.emailId + '@' + state.emailDomain)) {
            alert('이메일 형식을 확인해주세요.');
            return;
        }
        if(!state.emailDuplicateOk) {
            alert('이메일 중복검사를 해주세요.');
            return;
        }
        if(!validatePassword(state.password)) {
            alert('비밀번호는 6~15자의 영문, 숫자 조합으로 입력해주세요.');
            return;
        }
        if(state.password !== state.passwordConfirm) {
            alert('비밀번호를 다시 확인해주세요.');
            return;
        }
        const extension = state.profileImage.name.substring(state.profileImage.name.length - 3);
        if(!(extension === 'png' || extension === 'jpg' || extension === 'gif')) {
            alert('프로필 사진은 png, jpg, gif 파일 중 하나로 올려주세요.');
            return;
        }
        if(state.nickname.length > 6 || state.nickname.length === 0) {
            alert('닉네임을 6자 이내로 설정해 주세요.');
            return;
        }
        if(!state.nicknameDuplicateOk) {
            alert('닉네임 중복검사를 해주세요.');
            return;
        }
        if(state.gender === '') {
            alert('성별을 선택해 주세요.');
            return;
        }
        if(state.birthYear === '' || state.birthMonth === '' || state.birthDay === '') {
            alert('생년월일을 입력해 주세요.');
            return;
        }
        if(state.hasChild === '선택') {
            alert('자녀유무를 선택해주세요.');
            return;
        }
        if(state.hasChild === '있음' && (state.childBirthYear === '' || state.childBirthMonth === '' || state.childBirthDay === '')) {
            alert('자녀생년월일을 입력해주세요.');
            return;
        }

        const data = new FormData();
        data.append('mailed', this.state.advertisementConfirm);
        data.append('email', state.emailId + '@' + state.emailDomain);
        data.append('password', state.password);
        data.append('image', state.profileImage);
        data.append('nickName', state.nickname);
        data.append('gender', state.gender);
        data.append('memberBirthYear', state.birthYear);
        data.append('memberBirthMonth', state.birthMonth);
        data.append('memberBirthDay', state.birthDay);
        data.append('hasChild', state.hasChild === '있음');
        if(state.hasChild === '있음') {
            data.append('childBirthYear', state.childBirthYear);
            data.append('childBirthMonth', state.childBirthMonth);
            data.append('childBirthDay', state.childBirthDay);
        }
        if(state.name)
            data.append('name', state.name);
        if(state.phoneNumberFirst && state.phoneNumberSecond && state.phoneNumberThird)
            data.append('phoneNum', state.phoneNumberFirst + state.phoneNumberSecond + state.phoneNumberThird);
        if(state.zipCode) {
            data.append('postalCode', state.zipCode);
            data.append('addressRoad', state.roadNameAddress);
            data.append('addressSpec', state.addressDetail);
            data.append('addressEtc', state.addressNote);
        }

        axios({
            method: 'post',
            url: `${process.env.API_URL}/api/auth/register`,
            data: data,
            config: {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        }).then((res) => {
            if('error' in res.data) {
                alert('회원가입에 실패하였습니다. 관리자에게 문의해주세요.');
                return;
            }
            alert('회원가입 성공!');
        }).catch((res) => {
            alert('회원가입에 실패하였습니다. 관리자에게 문의해주세요.');
        });
    };

    onChange = (name, value, name2=null, value2=null, name3=null, value3=null) => {
        const newState = {};
        newState[name] = value;
        if(name2 !== null && value2 !== null)
            newState[name2] = value2;
        if(name3 !== null && value3 !== null)
            newState[name3] = value3;
        this.setState(newState);
    };

    profileImageChange = (event) => {
        if(this.state.profileImage !== USER_IMAGE)
            URL.revokeObjectURL(this.state.profileImageUrl);

        this.setState({
            profileImage: event.target.files[0],
            profileImageUrl: URL.createObjectURL(event.target.files[0])
        });
    };

    onEmailDomainSelectChange = (event) => {
        if(event.target.value === '직접 입력') {
            this.setState({
                emailDomain: '',
                emailDomainDisable: false,
                emailDuplicateOk: false,
                emailDuplicateMessage: ''
            });
        } else {
            this.setState({
                emailDomain: event.target.value,
                emailDomainDisable: true,
                emailDuplicateOk: false,
                emailDuplicateMessage: ''
            });
        }
    };

    emailDuplicateCheck = () => {
        axios.get(`${process.env.API_URL}/api/auth/register/checkEmail?email=${this.state.emailId+'@'+this.state.emailDomain}`)
            .then((res) => {
                const isDuplicated = res.data.isDuplicated;
                const validateOk = validateEmail(this.state.emailId+'@'+this.state.emailDomain);
                this.setState({
                    emailDuplicateOk: !isDuplicated && validateOk,
                    emailDuplicateMessage: validateOk ?
                        (isDuplicated ? '중복되는 이메일입니다.' : '사용 가능한 이메일입니다.') :
                        '올바른 이메일 형식이 아닙니다.'
                });
            });
    };

    passwordCompare = () => {
        const {password, passwordConfirm} = this.state;
        if(password !== '' && passwordConfirm !== '' && password !== passwordConfirm)
            return 'fail';
        if(password === '' || passwordConfirm === '')
            return '';
        return 'success';
    };

    nicknameDuplicateCheck = () => {
        axios.get(`${process.env.API_URL}/api/auth/register/checkNickName?nickName=${this.state.nickname}`)
            .then((res) => {
                const isDuplicated = res.data.isDuplicated;
                const validateOk = this.state.nickname.length > 0 && this.state.nickname.length <= 6;
                this.setState({
                    nicknameDuplicateOk: !isDuplicated && validateOk,
                    nicknameDuplicateMessage: validateOk ?
                        (isDuplicated ? '중복되는 닉네임입니다.' : '사용 가능한 닉네임입니다.') :
                        '올바른 닉네임 형식이 아닙니다.'
                });
            });
    };

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
                            <input type="checkbox" className="signup-agreement-age-box"
                                   onChange={(e)=>this.onChange('ageConfirm', e.target.checked)}
                                   checked={this.state.ageConfirm}
                            />
                        </span>
                    </div>
                    <div className="signup-agreement-license">
                        <span className="signup-agreement-license-text">
                            이용 약관 (필수)
                        </span>
                        <span>
                            <input type="checkbox" className="signup-agreement-license-box"
                                   onChange={(e) => this.onChange('serviceTermConfirm', e.target.checked)}
                                   checked={this.state.serviceTermConfirm}
                            />
                        </span>
                    </div>
                    <div className="signup-agreement-personal-info">
                        <span className="signup-agreement-personal-info-text">
                            개인정보취급방침 (필수)
                        </span>
                        <span>
                            <input type="checkbox" className="signup-agreement-personal-info-box"
                                   onChange={(e) => this.onChange('privateInfoConfirm', e.target.checked)}
                                   checked={this.state.privateInfoConfirm}
                            />
                        </span>
                    </div>
                    <div className="signup-agreement-marketing">
                        <span className="signup-agreement-marketing-text">
                            홍보 및 마케팅 사용(선택)
                        </span>
                        <span>
                            <input type="checkbox" className="signup-agreement-marketing-box"
                                   onChange={(e) => this.onChange('advertisementConfirm', e.target.checked)}
                                   checked={this.state.advertisementConfirm}
                            />
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
                                <input type="text" placeholder="정확하게 입력해주세요."
                                       onChange={(e) => this.onChange('emailId', e.target.value, 'emailDuplicateOk', false, 'emailDuplicateMessage', '')}
                                       value={this.state.emailId}
                                       className={this.state.emailDuplicateMessage ? (this.state.emailDuplicateOk ? 'signup-input-success' : 'signup-input-fail') : ''}
                                />
                            </span>
                            <span>
                                @
                            </span>
                            <span className="signup-login-info-email-url">
                                <input type="text"
                                       onChange={(e) => this.onChange('emailDomain', e.target.value, 'emailDuplicateOk', false, 'emailDuplicateMessage', '')}
                                       value={this.state.emailDomain}
                                       disabled={this.state.emailDomainDisable}
                                       className={this.state.emailDuplicateMessage ? (this.state.emailDuplicateOk ? 'signup-input-success' : 'signup-input-fail') : ''}
                                />
                            </span>
                            <span>
                                <select id="signup-login-info-email-url-options"
                                        onChange={this.onEmailDomainSelectChange}
                                >
                                    <option>직접 입력</option>
                                    <option>naver.com</option>
                                    <option>gmail.com</option>
                                    <option>daum.net</option>
                                    <option>hanmail.net</option>
                                </select>
                            </span>
                            <span>
                                <button type="button" className="signup-login-info-email-check" onClick={this.emailDuplicateCheck}>
                                    중복 확인
                                </button>
                            </span>
                        </div>
                        {
                            (this.state.emailDuplicateMessage!=='') ?
                                (<div className={`signup-message-container ${this.state.emailDuplicateOk ? 'success' : 'fail'}`}>
                                    {this.state.emailDuplicateMessage}
                                </div>) :
                                null
                        }
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
                            <input type="password"
                                   className={"signup-login-info-password-input " + this.passwordCompare()}
                                   onChange={(e) => this.onChange('password', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="signup-login-info-password-check">
                        <div className="signup-login-info-password-check-text">
                            비밀번호 확인
                        </div>
                        <div>
                            <input type="password"
                                   className={"signup-login-info-password-input " + this.passwordCompare()}
                                   onChange={(e) => this.onChange('passwordConfirm', e.target.value)}
                            />
                        </div>
                    </div>
                    {
                        (this.passwordCompare()!=='') ?
                            (<div className={`signup-message-container ${this.passwordCompare()}`}>
                                {this.passwordCompare() === 'success' ? '확인되었습니다.' : '비밀번호가 일치하지 않습니다.'}
                            </div>) :
                            null
                    }
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
                                <img src={this.state.profileImageUrl} alt="" id="profile" />
                            </span>
                            <span>
                                <input type="file" name="profile-image-input"  id="profile-image-input"
                                       onChange={this.profileImageChange} />
                                <label htmlFor="profile-image-input" className="signup-profile-change-picture">
                                    사진 변경
                                </label>
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
                                <input type="text" className={"signup-profile-nickname-input " +
                                    (this.state.nicknameDuplicateMessage ?
                                    (this.state.nicknameDuplicateOk ? 'signup-input-success' : 'signup-input-fail') : '')}
                                       onChange={(e) => this.onChange('nickname', e.target.value, 'nicknameDuplicateOk', false, 'nicknameDuplicateMessage', '')}
                                />
                            </span>
                            <span>
                                <button type="button" className="signup-profile-nickname-check"
                                        onClick={()=>this.nicknameDuplicateCheck()}
                                >
                                    중복 확인
                                </button>
                            </span>
                        </div>
                        {
                            (this.state.nicknameDuplicateMessage!=='') ?
                                (<div className={`signup-message-container ${this.state.nicknameDuplicateOk ? 'success' : 'fail'}`}>
                                    {this.state.nicknameDuplicateMessage}
                                </div>) :
                                null
                        }
                    </div>
                    <div className="signup-profile-gender">
                        <div className="signup-profile-gender-text">
                            성별
                        </div>
                        <div className="signup-profile-gender-buttons">
                            <span>
                                <button type="button" className={'signup-profile-gender-select-button'+(this.state.gender==='female'?' selected':'')}
                                        onClick={()=>this.onChange('gender', 'female')}
                                >
                                    여자
                                </button>
                            </span>
                            <span>
                                <button type="button" className={'signup-profile-gender-select-button'+(this.state.gender==='male'?' selected':'')}
                                        onClick={()=>this.onChange('gender', 'male')}
                                >
                                    남자
                                </button>
                            </span>
                        </div>
                    </div>
                    <div className="signup-profile-birth">
                        <div className="signup-profile-birth-text">
                            생년월일
                        </div>
                        <div className="signup-profile-birth-select">
                            <span>
                                <select id="year"
                                        onChange={(e)=>this.onChange('birthYear', e.target.value)}
                                        value={this.state.birthYear}
                                >
                                    <option></option>
                                    {
                                        range(1930, new Date().getFullYear()).map((num) => (
                                            <option key={num}>{num}</option>
                                        ))
                                    }
                                </select>
                                <select id="month"
                                        onChange={(e)=>this.onChange('birthMonth', e.target.value)}
                                        value={this.state.birthMonth}
                                >
                                    <option></option>
                                    {
                                        this.state.birthYear ?
                                        range(1, 12).map((num) => (
                                            <option key={num}>{num}</option>
                                        )) : null
                                    }
                                </select>
                                <select id="day"
                                        onChange={(e)=>this.onChange('birthDay', e.target.value)}
                                        value={this.state.birthDay}
                                >
                                    <option></option>
                                    {
                                        this.state.birthMonth ?
                                        range(1, lastDay(Number(this.state.birthYear), Number(this.state.birthMonth))).map((num) => (
                                            <option key={num}>{num}</option>
                                        )) : null
                                    }
                                </select>
                            </span>
                        </div>
                    </div>
                    <div className="signup-profile-kids">
                        <div className="signup-profile-kids-text">
                            자녀유무
                        </div>
                        <div className="signup-profile-kids-select">
                            <select id="kids"
                                    onChange={(e)=>this.onChange('hasChild', e.target.value)}
                            >
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
                                <select id="kids-birth-year"
                                        onChange={(e)=>this.onChange('childBirthYear', e.target.value)}
                                        value={this.state.childBirthYear}
                                >
                                    <option/>
                                    {
                                        this.state.hasChild === '있음' ?
                                        range(1990, new Date().getFullYear()).map((num) => (
                                            <option key={num}>{num}</option>
                                        )) :
                                            null
                                    }
                                </select>
                                <select id="kids-birth-month"
                                        onChange={(e)=>this.onChange('childBirthMonth', e.target.value)}
                                        value={this.state.childBirthMonth}
                                >
                                    <option/>
                                    {
                                        this.state.hasChild === '있음' && this.state.childBirthYear ?
                                            range(1, 12).map((num) => (
                                                <option key={num}>{num}</option>
                                            )) : null
                                    }
                                </select>
                                <select id="kids-birth-day"
                                        onChange={(e)=>this.onChange('childBirthDay', e.target.value)}
                                        value={this.state.childBirthDay}
                                >
                                    <option/>
                                    {
                                        this.state.hasChild === '있음' && this.state.childBirthMonth ?
                                            range(1, lastDay(Number(this.state.childBirthYear), Number(this.state.childBirthMonth))).map((num) => (
                                                <option key={num}>{num}</option>
                                            )) : null
                                    }
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
                            <input type="text"  className="signup-optional-info-name-input"
                                   onChange={(e)=>this.onChange('name', e.target.value)}
                                   value={this.state.name}
                            />
                        </div>
                    </div>
                    <div className="signup-optional-info-phone">
                        <div className="signup-optional-info-phone-text">
                            핸드폰 번호
                        </div>
                        <div className="signup-optional-info-phone-input">
                            <span>
                                <select id="phone"
                                        onChange={(e)=>this.onChange('phoneNumberFirst', e.target.value)}
                                        value={this.state.phoneNumberFirst}
                                >
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
                                <input type="text" className="signup-optional-info-phone-middle"
                                       onChange={(e)=>this.onChange('phoneNumberSecond', e.target.value)}
                                       value={this.state.phoneNumberSecond}
                                />
                            </span>
                            <span>
                                -
                            </span>
                            <span>
                            <input type="text" className="signup-optional-info-phone-last"
                                   onChange={(e)=>this.onChange('phoneNumberThird', e.target.value)}
                                   value={this.state.phoneNumberThird}
                            />
                            </span>
                        </div>
                    </div>
                    <div className="signup-optional-info-phone">
                        <div className="signup-optional-info-phone-text">
                            주소
                        </div>
                        <div className="signup-optional-info-address">
                            <button data-toggle="modal" data-target="#roadNameAddress" className="signup-button-remove-css">
                                <input placeholder={"우편번호"} disabled={true} value={this.state.zipCode} className="signup-address-zip-code"/>
                            </button>
                            {this.state.zipCode ? (<i onClick={() => {
                                this.setState({
                                    zipCode: '',
                                    roadNameAddress: ''
                                });
                            }} className="fas fa-times signup-address-remove-button"/>) : null}
                        </div>
                        <div className="signup-optional-info-address">
                            <button data-toggle="modal" data-target="#roadNameAddress" className="signup-button-remove-css">
                                <input placeholder={"도로명 주소 예) 서울특별시 마포구 성암로 301"} value={this.state.roadNameAddress} disabled={true} className="signup-address-detail1"/>
                            </button>
                        </div>
                        <div className="signup-optional-info-address">
                            <input placeholder={"상세 주소 예) 105동 203호"} className="signup-address-detail2"
                                   onChange={(e)=>this.onChange('addressDetail', e.target.value)}
                            />
                            <input placeholder={"참고 항목 예) (상암동)"} className="signup-address-detail2"
                                   onChange={(e)=>this.onChange('addressNote', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <RoadNameAddress modalID="roadNameAddress" setAddress={this.setAddress}/>
                <button className="signup-register-button" onClick={()=>this.handleRegister()}>
                    회원가입
                </button>
            </div>
        );
    }
}