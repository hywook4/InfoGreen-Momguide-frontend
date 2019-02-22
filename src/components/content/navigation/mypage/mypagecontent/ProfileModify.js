import React from 'react';
import './ProfileModify.css';
import USER_IMAGE from '../../../../../assets/images/icons/user-icon.png'
import axios from 'axios';
import { RoadNameAddress } from '../../../../common/RoadNameAddress/RoadNameAddress';
import $ from 'jquery';
import history from '../../../../../history/history';
import { CommonUtil, TokenUtil } from '../../../../../util';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../actions';

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogin: (token) => {
            return dispatch(actions.login(token));
        }
    };
};

class ProfileModify extends React.Component{
    setDefaultImage = async () => {
        let response = await fetch(USER_IMAGE);
        let data = await response.blob();
        let metadata = {
            type: 'image/png'
        };
        let file = new File([data], "test.png", metadata);
        this.setState({
            profileImage: file,
            profileImageUrl: USER_IMAGE
        });
    };

    constructor(props) {
        super(props);

        this.state = {
            emailId: '',
            emailDomain: '',
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

            defaultNickname: ''
        };
    }

    init = async () => {
        const token = TokenUtil.getLoginToken();
        if(token === null) {
            alert("권한이 없습니다.");
            history.push('/');
        }
        const headers = TokenUtil.getTokenRequestHeader(token);

        try {
            const res = await axios({
                method: 'get',
                url: `${process.env.API_URL}/api/auth/info`,
                headers: headers,

            });
            const data = res.data;
            const emailArray = data.email.split('@');

            let phoneState = {};
            if(data.phoneNum) {
                phoneState = {
                    phoneNumberFirst: data.phoneNum.slice(0, 3),
                    phoneNumberSecond: data.phoneNum.slice(3, 7),
                    phoneNumberThird: data.phoneNum.slice(7, 11)
                };
            }

            const addressState = {};
            if(data.postalCode)
                addressState['zipCode'] = data.postalCode;
            if(data.addressRoad)
                addressState['roadNameAddress'] = data.addressRoad;
            if(data.addressSpec)
                addressState['addressDetail'] = data.addressSpec;
            if(data.addressEtd)
                addressState['addressNote'] = data.addressEtd;

            this.setState({
                ...phoneState,
                ...addressState,
                emailId: emailArray[0],
                emailDomain: emailArray[1],
                profileImageUrl: data.photoUrl,
                nickname: data.nickName,
                nicknameDuplicateOk: true,
                nicknameDuplicateMessage: '',
                gender: data.gender,
                birthYear: data.memberBirthYear,
                birthMonth: data.memberBirthMonth,
                birthDay: data.memberBirthDay,
                hasChild: data.hasChild ? '있음' : '없음',
                childBirthYear: data.childBirthYear,
                childBirthMonth: data.childBirthMonth,
                childBirthDay: data.childBirthDay,
                name: data.name,

                defaultNickname: data.nickName
            });
        } catch(error) {
            alert("에러가 발생하였습니다.");
        }
    };

    componentDidMount = () => {
        this.init();
    };

    handleRegister = () => {
        const state = this.state;
        if(state.profileImage) {
            const extension = state.profileImage.name.substring(state.profileImage.name.length - 3);
            if (!(extension === 'png' || extension === 'jpg' || extension === 'gif')) {
                alert('프로필 사진은 png, jpg, gif 파일 중 하나로 올려주세요.');
                return;
            }
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
        if(state.hasChild === '있음' && (state.childBirthYear === '' || state.childBirthMonth === '' || state.childBirthDay === '')) {
            alert('자녀생년월일을 입력해주세요.');
            return;
        }

        const token = TokenUtil.getLoginToken();
        if(token === null) {
            alert('정상적이지 않은 접근입니다.');
            return;
        }

        const headers = TokenUtil.getTokenRequestHeader(token);
        const data = new FormData();
        if(state.profileImage) {
            data.append('image', state.profileImage);
            data.append('isImageChanged', 'true');
        } else {
            data.append('isImageChanged', 'false');
        }
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
            method: 'put',
            url: `${process.env.API_URL}/api/auth/editProfile/edit`,
            data: data,
            headers: headers
        }).then((res) => {
            if('error' in res.data) {
                alert('정상적이지 않은 접근입니다.');
                return;
            }
            alert('정상적으로 수정되었습니다.');
            const token = res.data.token;
            this.props.handleLogin(token);
            if(localStorage.getItem('loginToken')) {
                localStorage.setItem('loginToken', token);
            } else {
                sessionStorage.setItem('loginToken', token);
            }
            this.init();
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }).catch((err) => {
            alert('정보 수정에 실패하였습니다. 관리자에게 문의해주세요.');
        });
    };

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

    onChange = (name, value, name2=null, value2=null, name3=null, value3=null) => {
        const newState = {};
        newState[name] = value;
        if(name2 !== null && value2 !== null)
            newState[name2] = value2;
        if(name3 !== null && value3 !== null)
            newState[name3] = value3;
        this.setState(newState);
    };

    onNicknameChange = (e) => {
        if(this.state.defaultNickname === e.target.value) {
            this.setState({
                nickname: e.target.value,
                nicknameDuplicateOk: true,
                nicknameCuplicateMessage: ''
            });
        } else {
            this.onChange('nickname', e.target.value, 'nicknameDuplicateOk', false, 'nicknameDuplicateMessage', '');
        }
    };

    profileImageChange = (event) => {
        if(this.state.profileImage !== USER_IMAGE)
            URL.revokeObjectURL(this.state.profileImageUrl);

        if(event.target.files.length === 0) {
            this.setDefaultImage();
        } else {
            this.setState({
                profileImage: event.target.files[0],
                profileImageUrl: URL.createObjectURL(event.target.files[0])
            });
        }
    };

    nicknameDuplicateCheck = () => {
        if(this.state.nickname === this.state.defaultNickname) {
            this.setState({
                nicknameDuplicateMessage: '현재 닉네임과 동일합니다.'
            });
            return;
        }

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
            <div className="profile-modify-container">
                <div className="profile-modify-login-info">
                    <div className="profile-modify-login-info-title">
                        1. 로그인 정보
                    </div>
                    <div className="profile-modify-login-info-email-part">
                        <div>
                            이메일
                        </div>
                        <div className="profile-modify-login-info-email-input">
                            <span className="profile-modify-login-info-email-id">
                                <input type="text" placeholder="정확하게 입력해주세요."
                                       value={this.state.emailId}
                                       disabled={true}
                                />
                            </span>
                            <span>
                                @
                            </span>
                            <span className="profile-modify-login-info-email-url">
                                <input type="text"
                                       value={this.state.emailDomain}
                                       disabled={true}
                                />
                            </span>
                        </div>
                    </div>
                    <div className="profile-modify-login-info-password">
                        <div className="profile-modify-login-info-password-text">
                            <span>
                                비밀번호&nbsp;&nbsp;&nbsp;
                            </span>
                            <span>
                                |&nbsp;&nbsp;&nbsp;6~15자의 영문, 숫자 조합으로 입력해 주세요.
                            </span>
                        </div>
                        <div>
                            {/* TODO: after merging password reset */}
                            <Link to="/">
                                <button className="profile-modify-password-change">
                                    비밀번호 변경
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="profile-modify-profile">
                    <div className="profile-modify-profile-title">
                        2. 프로필 정보
                    </div>
                    <div className="profile-modify-profile-picture">
                        <div className="profile-modify-profile-picture-text">
                            프로필 사진
                        </div>
                        <div>
                            <span>
                                <img src={this.state.profileImageUrl} alt="" id="profile-modify-profile" />
                            </span>
                            <span>
                                <input type="file" name="profile-image-input"  id="profile-image-input"
                                       onChange={this.profileImageChange} />
                                <label htmlFor="profile-image-input" className="profile-modify-profile-change-picture">
                                    사진 변경
                                </label>
                            </span>
                        </div>
                    </div>
                    <div className="profile-modify-profile-nickname">
                        <div className="profile-modify-profile-nickname-text">
                            <span>
                                닉네임&nbsp;&nbsp;&nbsp;
                            </span>
                            <span>
                                |&nbsp;&nbsp;&nbsp;6자 이내로 설정해 주세요.
                            </span>
                        </div>
                        <div>
                            <span>
                                <input type="text" className={"profile-modify-profile-nickname-input " +
                                    (this.state.nicknameDuplicateMessage ?
                                        (this.state.nicknameDuplicateOk ? 'profile-modify-input-success' : 'profile-modify-input-fail') : '')}
                                       onChange={this.onNicknameChange}
                                       value={this.state.nickname}
                                />
                            </span>
                            <span>
                                <button type="button" className="profile-modify-profile-nickname-check"
                                        onClick={()=>this.nicknameDuplicateCheck()}
                                >
                                    중복 확인
                                </button>
                            </span>
                        </div>
                        {
                            (this.state.nicknameDuplicateMessage!=='') ?
                                (<div className={`profile-modify-message-container ${this.state.nicknameDuplicateOk ? 'success' : 'fail'}`}>
                                    {this.state.nicknameDuplicateMessage}
                                </div>) :
                                null
                        }
                    </div>
                    <div className="profile-modify-profile-gender">
                        <div className="profile-modify-profile-gender-text">
                            성별
                        </div>
                        <div className="profile-modify-profile-gender-buttons">
                            <span>
                                <button type="button" className={'profile-modify-profile-gender-select-button'+(this.state.gender==='female'?' selected':'')}
                                        onClick={()=>this.onChange('gender', 'female')}
                                >
                                    여자
                                </button>
                            </span>
                            <span>
                                <button type="button" className={'profile-modify-profile-gender-select-button'+(this.state.gender==='male'?' selected':'')}
                                        onClick={()=>this.onChange('gender', 'male')}
                                >
                                    남자
                                </button>
                            </span>
                        </div>
                    </div>
                    <div className="profile-modify-profile-birth">
                        <div className="profile-modify-profile-birth-text">
                            생년월일
                        </div>
                        <div className="profile-modify-profile-birth-select">
                            <span>
                                <select id="year"
                                        onChange={(e)=>this.onChange('birthYear', e.target.value)}
                                        value={this.state.birthYear}
                                >
                                    <option/>
                                    {
                                        CommonUtil.range(1930, new Date().getFullYear()).map((num) => (
                                            <option key={num}>{num}</option>
                                        ))
                                    }
                                </select>
                                <select id="month"
                                        onChange={(e)=>this.onChange('birthMonth', e.target.value)}
                                        value={this.state.birthMonth}
                                >
                                    <option/>
                                    {
                                        this.state.birthYear ?
                                            CommonUtil.range(1, 12).map((num) => (
                                                <option key={num}>{num}</option>
                                            )) : null
                                    }
                                </select>
                                <select id="day"
                                        onChange={(e)=>this.onChange('birthDay', e.target.value)}
                                        value={this.state.birthDay}
                                >
                                    <option/>
                                    {
                                        this.state.birthMonth ?
                                            CommonUtil.range(1, CommonUtil.lastDay(Number(this.state.birthYear), Number(this.state.birthMonth))).map((num) => (
                                                <option key={num}>{num}</option>
                                            )) : null
                                    }
                                </select>
                            </span>
                        </div>
                    </div>
                    <div className="profile-modify-profile-kids">
                        <div className="profile-modify-profile-kids-text">
                            자녀유무
                        </div>
                        <div className="profile-modify-profile-kids-select">
                            <select id="kids"
                                    onChange={(e)=>this.onChange('hasChild', e.target.value)}
                                    value={this.state.hasChild}
                            >
                                <option>있음</option>
                                <option>없음</option>
                            </select>
                        </div>
                    </div>
                    <div className="profile-modify-profile-kids-birth">
                        <div className="profile-modify-profile-kids-birth-text">
                            자녀생년월일
                        </div>
                        <div className="profile-modify-profile-kids-birth-select">
                            <span>
                                <select id="kids-birth-year"
                                        onChange={(e)=>this.onChange('childBirthYear', e.target.value)}
                                        value={this.state.childBirthYear}
                                >
                                    <option/>
                                    {
                                        this.state.hasChild === '있음' ?
                                            CommonUtil.range(1990, new Date().getFullYear()).map((num) => (
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
                                            CommonUtil.range(1, 12).map((num) => (
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
                                            CommonUtil.range(1, CommonUtil.lastDay(Number(this.state.childBirthYear), Number(this.state.childBirthMonth))).map((num) => (
                                                <option key={num}>{num}</option>
                                            )) : null
                                    }
                                </select>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="profile-modify-optional-info">
                    <div className="profile-modify-optional-info-title">
                        3. 선택 수집정보
                    </div>
                    <div className="profile-modify-optional-info-name">
                        <div className="profile-modify-optional-info-name-text">
                            실명
                        </div>
                        <div>
                            <input type="text"  className="profile-modify-optional-info-name-input"
                                   onChange={(e)=>this.onChange('name', e.target.value)}
                                   value={this.state.name}
                            />
                        </div>
                    </div>
                    <div className="profile-modify-optional-info-phone">
                        <div className="profile-modify-optional-info-phone-text">
                            핸드폰 번호
                        </div>
                        <div className="profile-modify-optional-info-phone-input">
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
                                <input type="text" className="profile-modify-optional-info-phone-middle"
                                       onChange={(e)=>this.onChange('phoneNumberSecond', e.target.value)}
                                       value={this.state.phoneNumberSecond}
                                />
                            </span>
                            <span>
                                -
                            </span>
                            <span>
                            <input type="text" className="profile-modify-optional-info-phone-last"
                                   onChange={(e)=>this.onChange('phoneNumberThird', e.target.value)}
                                   value={this.state.phoneNumberThird}
                            />
                            </span>
                        </div>
                    </div>
                    <div className="profile-modify-optional-info-phone">
                        <div className="profile-modify-optional-info-phone-text">
                            주소
                        </div>
                        <div className="profile-modify-optional-info-address">
                            <button data-toggle="modal" data-target="#roadNameAddress" className="profile-modify-button-remove-css">
                                <input placeholder={"우편번호"} disabled={true} value={this.state.zipCode} className="profile-modify-address-zip-code"/>
                            </button>
                            {this.state.zipCode ? (<i onClick={() => {
                                this.setState({
                                    zipCode: '',
                                    roadNameAddress: ''
                                });
                            }} className="fas fa-times profile-modify-address-remove-button"/>) : null}
                        </div>
                        <div className="profile-modify-optional-info-address">
                            <button data-toggle="modal" data-target="#roadNameAddress" className="profile-modify-button-remove-css">
                                <input placeholder={"도로명 주소 예) 서울특별시 마포구 성암로 301"} value={this.state.roadNameAddress} disabled={true} className="profile-modify-address-detail1"/>
                            </button>
                        </div>
                        <div className="profile-modify-optional-info-address">
                            <input placeholder={"상세 주소 예) 105동 203호"} className="profile-modify-address-detail2"
                                   onChange={(e)=>this.onChange('addressDetail', e.target.value)}
                                   value={this.state.addressDetail}
                            />
                            <input placeholder={"참고 항목 예) (상암동)"} className="profile-modify-address-detail2"
                                   onChange={(e)=>this.onChange('addressNote', e.target.value)}
                                   value={this.state.addressNote}
                            />
                        </div>
                    </div>
                </div>
                <RoadNameAddress modalID="roadNameAddress" setAddress={this.setAddress}/>
                <button className="profile-modify-register-button" onClick={()=>this.handleRegister()}>
                    설정저장
                </button>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(ProfileModify);