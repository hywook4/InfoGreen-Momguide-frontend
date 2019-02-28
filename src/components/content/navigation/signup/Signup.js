import React, { Component } from 'react';
import './Signup.css';
import USER_IMAGE from '../../../../assets/images/icons/user-icon.png'
import axios from 'axios';
import { RoadNameAddress } from '../../../common/RoadNameAddress/RoadNameAddress';
import $ from 'jquery';
import history from '../../../../history/history';
import { CommonUtil } from '../../../../util';

export class Signup extends Component {
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

        this.setDefaultImage();

        this.state = {
            ageConfirm: false,
            serviceTermConfirm: false,
            serviceTermOpen: false,
            privateInfoConfirm: false,
            privateInfoOpen: false,
            advertisementConfirm: false,
            advertisementOpen: false,
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
        if(!CommonUtil.validateEmail(state.emailId + '@' + state.emailDomain)) {
            alert('이메일 형식을 확인해주세요.');
            return;
        }
        if(!state.emailDuplicateOk) {
            alert('이메일 중복검사를 해주세요.');
            return;
        }
        if(!CommonUtil.validatePassword(state.password)) {
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
            history.push({
                pathname: '/signup-ok',
                state: {
                    email: state.emailId + '@' + state.emailDomain
                }
            });
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

        if(event.target.files.length === 0) {
            this.setDefaultImage();
        } else {
            this.setState({
                profileImage: event.target.files[0],
                profileImageUrl: URL.createObjectURL(event.target.files[0])
            });
        }
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
                const validateOk = CommonUtil.validateEmail(this.state.emailId+'@'+this.state.emailDomain);
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
        const licenseTerm = "맘가이드 이용약관\n" +
            "\n" +
            "본 약관은 2019년 1월 2일부터 적용됩니다. \n" +
            "\n" +
            "제 1조 목적\n" +
            "\n" +
            " 이 약관은 ㈜인포그린(이하 “회사”)이 운영하는 “맘가이드”에서 제공하는 서비스(이하 “서비스”)를 이용함에 있어, 회사와 서비스 이용자의 권리, 의무 및 책임사항, 기타 필요 사항을 규정함을 목적으로 합니다.\n" +
            "\n" +
            "제 2조 정의\n" +
            "\n" +
            "① “맘가이드”란 회사가 서비스를 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 서비스를 이용할 수 있도록 설정한 가상의 영업장을 말합니다.\n" +
            "② “서비스”라 함은 구현되는 단말기(PC, 태블릿, 휴대용 단말기 등의 각 종 유무선 장치)와 상관없이 회사가 제공하는 맘가이드와 관련된 제반 서비스를 말합니다.\n" +
            "③ “이용자”라 함은 맘가이드에 접속하여 이 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.\n" +
            "④ “회원”이라 함은 맘가이드에 회원등록을 한 자로서, 계속적으로 회사가 제공하는 서비스를 이용할 수 있는 자를 말합니다.\n" +
            "⑤ “비회원”이라 함은 회원에 가입하지 않고 회사가 제공하는 서비스를 이용하는 자를 말합니다.\n" +
            "⑥ “이메일(e-mail)”라 함은 회원의 식별 및 서비스 이용을 위하여 회원이 선정한 본인의 이메일 주소를 의미합니다. \n" +
            "⑦ “비밀번호(password)라 함은 회원의 개인 정보 및 확인을 위해서 회원이 정한 문자 또는 숫자의 조합을 의미합니다. \n" +
            "⑧ “게시물”이라 함은 회원이 서비스를 이용함에 있어 회원이 서비스에 게시한 텍스트, 문서, 그림, 동영상, 링크, 파일 혹은 이들의 조합으로 이루어진 정보 등 모든 정보나 자료를 의미합니다.\n" +
            "⑨ \"이벤트\"라 함은 회사가 제휴를 통하여 회원에게 일정 상품 및 경품을 내걸고 진행하는 서비스를 의미합니다.\n" +
            "\n" +
            "제 3조 약관 등의 명시와 설명 및 개정\n" +
            "\n" +
            "1) 회사는 서비스의 가입 과정 및 서비스 화면에 본 약관을 게시합니다. \n" +
            "2) 회사는 관련법에 위배되지 않는 범위에서 이 약관을 개정할 수 있습니다. 개정약관, 적용일자 및 개정사유는 사이트 내 게시 및 이메일 통보로 회원에게 명확하게 공지하도록 합니다. \n" +
            "3) 회원은 회사가 전항에 따라 변경하는 약관에 동의하지 않을 권리가 있으며, 이 경우 회원은 회사에서 제공하는 서비스에 대해 탈퇴 의사를 표시하고 서비스 이용 종료를 요청할 수 있습니다. 다만, 회사가 회원에게 변경된 약관의 내용 및 적용 방식을 명확하게 통지하였음에도 불구하고, 7일 이내에 회원탈퇴 및 거부의사를 표명하지 않은 회원은 개정 약관에 동의한 것으로 간주합니다. \n" +
            "4) 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 관련법 또는 상관례에 따릅니다.\n" +
            "\n" +
            "제 4조 서비스의 제공 및 변경\n" +
            "\n" +
            "1) 회사는 회원에게 다음과 같은 서비스를 제공합니다.   \n" +
            "① 생활화학제품 성분 정보 제공 : 생활화학제품은 전성분 공개 의무가 없으나, 전성분이 공개된 제품의 성분 정보를 제공하며 업체에 대한 성분공개 요청 대행\n" +
            "② 화장품, 의약외품, 동물용 의약외품의 성분 정보 제공 : 공개된 성분 정보를 바탕으로 소비자가 쉽게 성분 정보를 확인할 수 있도록 검색기반 솔루션 제공  \n" +
            "③ 화학 성분 정보 제공 : 공신력 있는 기관에서 발표한 성분 등급, 주의 성분 및 유해 성분과 독성 정보 \n" +
            "④ 제품에 관한 전체적인 정보 제공 : 제품 성분을 비롯한 제조사, 친환경 인증 여부, 소비자 평가 및 리뷰 등 제품 선택에 있어 필요한 제반 정보\n" +
            "⑤ 기타 회사가 추가 개발하거나 다른 회사와의 제휴계약 등을 통해 제공하는 일체의 서비스\n" +
            "2) 회사가 회원과 별도의 서면 계약을 통해 “맘가이드\" 서비스의 브랜드 특성을 이용할 수 있는 명시적인 권리를 회원에게 부여하지 아니하는 한, 회원은 회사 또는 서비스에 관한 로고, 상호, 상표 등 독특한 브랜드 특성을 이용할 수 있는 권리를 부여하지 않습니다. \n" +
            "3) 회사는 서비스의 기능 및 디자인 등에 관하여, 앞으로 체결되는 계약에 의해 서비스의 내용을 변경할 수 있습니다. \n" +
            "\n" +
            "제 5조 서비스의 일시 중단\n" +
            "\n" +
            " 회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다. 이 경우 회사는 회원에게 서비스 내 공지사항 게시판 및 사이트에 게시하여 통지합니다.  \n" +
            "\n" +
            "제 6조 이용계약의 성립\n" +
            "\n" +
            "1) 서비스 이용계약은 회원이 본 이용약관 및 개인정보취급방침에 동의한 후, 가입 절차에 따라 이용 신청을 하고 신청한 내용에 대해서 회사가 승낙함으로써 체결됩니다. \n" +
            "2) 회원가입 신청시에는 다음 사항을 기재해야 합니다. \n" +
            "ㄱ.필수항목\n" +
            "① 회원의 “아이디”와 “비밀번호”\n" +
            "② 이메일 주소\n" +
            "③ 본인 나이 및 자녀 유무, 자녀 나이\n" +
            "ㄴ.선택항목\n" +
            "① 성명\n" +
            "② 휴대폰 번호\n" +
            "③ 거주지 주소\n" +
            "3) 회사는 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원 등록을 승낙합니다. 다만, 설비 및 기술상 지장이 있는 경우 가입승인을 유보할 수 있습니다.\n" +
            "① 가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우, 다만 회원자격 상실 후 3년이 경과한 자로서 회사의 회원 재가입 승낙을 얻은 경우에는 예외로 한다.\n" +
            "② 등록 내용에 허위, 기재누락, 오기가 있는 경우\n" +
            "③ 불순한 의도(저작권 침해, 특정제품 홍보, 경쟁사 비방 등)로 서비스를 이용하고자 하는 경우\n" +
            "④ 제 3자의 전자우편 주소 및 개인정보를 도용한 경우\n" +
            "⑤ 기타 회원으로 등록하는 것이 회사의 기술상 현저히 지장이 있다고 판단되는 경우\n" +
            "4) 이용계약의 성립 시기는 회사의 승낙이 회원에게 도달한 시점으로 합니다.\n" +
            "5) 회원은 회원가입 시 등록한 사항에 변경이 있는 경우, 상당한 기간 이내에 회사에 대하여 회원정보 수정 등의 방법으로 그 변경사항을 알려야 합니다. 변경 통보의 지체로 인한 회원의 손해에 대해 회사는 책임지지 않습니다.\n" +
            "\n" +
            "제 7조 회원 탈퇴 및 자격상실\n" +
            "\n" +
            "1) 회원은 본인이 희망할 경우 언제든지 회사에 회원 탈퇴나 서비스 이용중지를 요청할 수 있으며, 회사는 이와 같은 요청을 받았을 경우, 전자우편의 발송 등 회사가 지정한 절차에 따라 신속하게 처리합니다. 이때 회원의 개인정보는 영구적으로 파기됩니다.\n" +
            "2) 회사는 회원이 본 약관 제13조의 이용자의 의무를 위반한 경우 및 서비스의 정상적인 운영을 방해한 경우에는 사전 통보 후 회원 자격을 상실시키거나 기간을 정하여 서비스의 이용을 제한할 수 있습니다. \n" +
            "3) 회원은 제 2항에 따른 이용제한 및 자격 상실 등에 대해 회사가 정한 절차에 따라 이의신청을 할 수 있습니다. 회사가 회원의 이의신청이 정당하다고 인정하는 경우, 회사는 회원의 서비스 이용을 재개합니다. \n" +
            "\n" +
            "제 8조 광고의 게재\n" +
            "\n" +
            "1) 회사는 서비스 운영 상 필요한 경우, 서비스 내에 광고를 게재할 수 있습니다.\n" +
            "2) 회사는 서비스 상에 게재되어 있는 광고를 통한 광고주의 판촉활동에 회원이 참여하여 거래함으로써 발생하는 손해에 대해서는 책임을 지지 않습니다. \n" +
            "\n" +
            "제 9조 정보의 제공\n" +
            "\n" +
            "1) 회사는 회원이 서비스 이용에 필요하다고 인정되는 정보의 경우, 회원이 제공한 전자우편 주소로 제공할 수 있습니다. \n" +
            "\n" +
            "2) 회사는 회원의 수신 여부 선택에 따라 광고성, 홍보성 전자우편을 발송할 수 있습니다. 다만 다음 각 호에 해당하는 경우, 회원의 동의와 관계없이 전자우편을 발송할 수 있습니다.\n" +
            "① 이용 신청 시 입력한 전자우편 주소에 대한 본인 여부를 확인하기 위해서 인증메일을 발송하는 경우 \n" +
            "② 회원 정보의 변경을 확인하기 위해서 인증메일을 발송하는 경우 \n" +
            "③ 기타 서비스를 이용함에 있어 회원이 반드시 알아야 하는 중요한 정보라고 판단되는 경우 \n" +
            "\n" +
            "제 10조 개인정보보호\n" +
            "\n" +
            "1) 회사는 정보통신망법 등 관계 법령이 정하는 바에 따라 회원의 개인정보를 보호하기 위해 노력합니다. 개인정보의 보호 및 사용에 대해서는 관련법 및 회사의 개인정보취급방침이 정한 바에 의합니다.\n" +
            "2) 회사는 회원의 개인정보 수집 시 서비스제공을 위하여 필요한 범위에서 최소한의 개인정보를 수집합니다. \n" +
            "3) 회사는 회원 대상의 이벤트 및 배송 등의 목적으로 회원의 동의 하에 관계 법령에서 정하는 바에 따라 추가적인 개인정보를 수집할 수 있습니다. \n" +
            "4) 회사는 전기통신사업법, 통신비밀보호법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 법률에 특별한 규정이 있는 경우를 제외하고는 회원의 동의 없이 회원 개인정보를 제3자에게 제공하지 아니합니다. \n" +
            "5) 회사는 회원의 귀책사유로 인한 개인정보 유출에 대해서는 책임을 지지 않습니다.\n" +
            "\n" +
            "제 11조 회사의 의무\n" +
            "\n" +
            "1) 회사는 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며 이 약관이 정하는 바에 따라 지속적이고, 안정적으로 서비스를 제공하는데 최선을 다하여야 합니다.\n" +
            "2) 회사는 이용자가 안전하게 인터넷 서비스를 이용할 수 있도록 이용자의 개인정보 보호를 위한 보안 시스템을 갖추어야 합니다.\n" +
            "3) 회사는 이용자가 원하지 않는 영리목적의 광고성 전자우편을 발송하지 않습니다.\n" +
            "4) 회사는 외부의 압력이나 사적인 요청에 따라, 제품정보를 객관적 기준에서 벗어나 임의로 수정하여 게시하지 않습니다. \n" +
            "\n" +
            "제 12조 회원의 ID 및 비밀번호에 대한 의무\n" +
            "\n" +
            "1) 제10조의 경우를 제외한 ID와 비밀번호에 관한 관리책임은 회원에게 있습니다.\n" +
            "2) 회원은 자신의 ID 및 비밀번호를 제3자에게 이용하게 해서는 안 됩니다.\n" +
            "3) 회원이 자신의 ID 및 비밀번호를 도난당하거나 제3자가 사용하고 있음을 인지한 경우에는 바로 회사에 통보하고 회사의 안내가 있는 경우에는 그에 따라야 합니다.\n" +
            "\n" +
            "제 14조 회원의 의무 \n" +
            "\n" +
            "회원은 다음 행위를 하여서는 안 됩니다.\n" +
            "① 신청 또는 변경 시 허위 내용의 등록\n" +
            "② 타인의 정보 도용\n" +
            "③ 서비스에 게시된 정보의 변경\n" +
            "④ 회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시\n" +
            "⑤ 회사, 기타 제3자의 저작권 등 지적재산권에 대한 침해\n" +
            "⑥ 회사, 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위\n" +
            "⑦ 외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 맘가이드에 공개 또는 게시하는 행위\n" +
            "⑧ 다른 회원의 개인정보를 그 동의 없이 수집, 저장, 공개하는 행위\n" +
            "\n" +
            "제 15조 회원의 게시물 관리\n" +
            "\n" +
            "1) 회원의 게시물이 정보통신망법 및 저작권법 등 관련법에 위반되는 내용을 포함하는 경우, 게시물의 권리자는 관련법이 정한 절차에 따라 해당 게시물의 게시중단 및 삭제 등을 요청할 수 있으며, 회사는 관련법에 따라 조치를 취하여야 합니다. \n" +
            "2) 회사는 전항에 따른 권리자의 요청이 없는 경우라도 권리침해가 인정될 만한 사유가 있거나 본 약관, 기타 서비스 정책 및 관련법에 위반되는 다음 각 호의 게시물의 경우, 게시물에 대해 별도 통지 없이 임시조치 등을 취할 수 있습니다. \n" +
            "① 다른 회원 또는 제3자를 비방하는 등 명예를 훼손시키는 경우\n" +
            "② 음란물 게시 등 공공질서 및 미풍양속에 위반되는 경우\n" +
            "③ 회사 또는 제3자의 저작권 등 기타권리를 침해하거나 침해할 우려가 있는 경우\n" +
            "④ 서비스의 정상적이고 원활한 운영에 방해가 되는 경우\n" +
            "⑤ 광고성 게시물이나 서비스의 성격 및 목적에 맞지 않는 게시물의 경우\n" +
            "⑥ 회사의 규정 및 기타 관계 법령에 위배되는 경우\n" +
            "\n" +
            "제 16조 저작권의 귀속 및 이용제한\n" +
            "\n" +
            "1) 회사가 작성한 게시물 혹은 저작물에 대한 저작권, 기타 지적재산권은 회사에 귀속합니다.\n" +
            "2) 회원은 서비스를 이용함으로써 얻은 정보 중 회사에게 지적재산권이 귀속된 정보를 회사의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안 됩니다.\n" +
            "3) 회원이 서비스 내에서 작성한 게시물에 대한 책임 및 권리는 게시물을 등록한 회원에게 있습니다.\n" +
            "4) 회원은 게시한 콘텐츠의 저작권 및 기타 산업재산권을 갖고 있음을 명확히 합니다. 다만 회원은 본 서비스에 콘텐츠를 게시함으로써 회사가 서비스 및 사업과 관련하여 해당 콘텐츠(및 그 2차적 저작물)의 일부 또는 전부를 전세계적으로 비독점적으로 무상으로 사용할 권리(이용, 공개, 반포, 광고, 출판, 복제, 공연, 공중송신, 전시, 배포, 대여, 2차저작물작성, 자동/수동 번역제공)를 허락하며 이를 양도할 수 있음에 동의한 것으로 간주합니다. 또한 회사에 대해 저작인격권을 행사하지 않을 것에 동의한 것으로 간주합니다. \n" +
            "\n" +
            "제 17조 분쟁해결\n" +
            "\n" +
            "1) 회사는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치·운영합니다.\n" +
            "2) 회사는 이용자로부터 제출되는 불만사항 및 의견은 우선적으로 그 사항을 처리합니다. 다만, 신속한 처리가 곤란한 경우에는 이용자에게 그 사유와 처리일정을 즉시 통보합니다.\n" +
            "\n" +
            "제 18조 면책\n" +
            "\n" +
            "1) 회사는 다음 사유로 서비스 제공이 중지되거나 장애가 발생한 경우, 이로 인하여 회원에게 발생한 손해에 대해서는 책임을 부담하지 않습니다.\n" +
            "① 천재지변 또는 해결이 곤란한 기술적 결함 등 기타 불가항력의 상태가 있는 경우\n" +
            "② 기간통신사업자의 통신서비스 중지 혹은 회사와 서비스 제휴계약을 체결한 제3자의 고의적인 서비스 방해가 있는 경우 \n" +
            "③ 기기 및 디바이스 환경 등 회원의 귀책사유로 서비스 이용에 장애가 있는 경우 \n" +
            "④ 기타 회사의 고의, 과실이 없는 사유로 인한 경우\n" +
            "2) 회사는 회원 상호 간 또는 회원과 제3자 간에 서비스를 매개로 한 거래 등에 분쟁이 발생한 경우 책임을 지지 않습니다.\n" +
            "3) 회사는 광고 및 이벤트 제휴업체나, 타 업체가 제공한 제품, 회원이 서비스를 통하여 게재한 정보 및 자료의 신뢰도, 정확성 등의 내용에 관하여는 보증하지 않습니다. \n" +
            "4) 회원정보의 부정확한 기재, 비밀번호 관리의 소홀 등 회원의 귀책사유로 인해 손해가 발생한 경우 회사는 책임을 지지 않습니다. \n" +
            "5) 회사가 제공하는 정보는 생활화학제품 및 성분에 대해 사실만을 그대로 보여주는 참고자료이며, 이를 통한 최종적인 판단과 선택은 이용자에게 달려 있습니다.\n" +
            "6) 회사는 제품 성분 정보에 대하여 제조 및 유통업체에서 공개한 자료를 기반으로 하므로, 해당 업체 측에서 등재하지 않은 성분에 대한 정보는 제공하지 못합니다.  \n" +
            "\n" +
            "제 19조 재판권 및 준거법\n" +
            "\n" +
            "1) 회사와 회원 간 제기된 소송에는 대한민국법을 적용합니다. \n" +
            "2) 회사와 회원 간 발생한 분쟁에 관한 소송은 민사소송법 상의 관할법원에 제기합니다.\n";
        const personalInfoTerm = "㈜인포그린 개인정보 처리방침\n" +
            "\n" +
            "㈜인포그린(이하 '회사')은 개인정보보호법 제30조에 따라 이용자의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다.\n" +
            "“개인정보 처리방침”이란 이용자의 소중한 개인정보를 보호함으로써 이용자가 안심하고 서비스를 이용할 수 있도록 회사가 준수해야 할 지침을 의미합니다.\n" +
            "회사는 개인정보처리방침을 개정하는 경우 웹사이트 공지사항(또는 개별공지)을 통하여 공지할 것입니다.\n" +
            "\n" +
            "○ 본 방침은 2019년 3월 1일부터 시행됩니다.\n" +
            "\n" +
            "\n" +
            "1. 개인정보의 처리 목적 \n" +
            " 회사는 개인정보를 다음의 목적을 위해 개인정보를 처리합니다. 처리한 개인정보는 다음의 목적이외의 용도로는 사용되지 않으며 이용 목적이 변경될 시에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.\n" +
            "\n" +
            "① 홈페이지 회원가입 및 관리\n" +
            "회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지, 관리, 제한적 본인확인제 시행에 따른 본인확인, 서비스 부정이용 방지, 만14세 미만 아동 개인정보 수집 시 법정대리인 동의 여부 확인, 각종 고지·통지, 고충처리, 분쟁 조정을 위한 기록 보존 등을 목적으로 개인정보를 처리합니다.\n" +
            "\n" +
            "② 재화 또는 서비스 제공\n" +
            "물품배송, 콘텐츠 제공, 계약서, 청구서 발송, 맞춤 서비스 제공, 본인인증, 연령인증, 요금결제, 정산, 채권추심 등을 목적으로 개인정보를 처리합니다.\n" +
            "\n" +
            "③ 마케팅 및 광고에의 활용\n" +
            "신규 서비스(제품) 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공, 인구통계학적 특성에 따른 서비스 제공 및 광고 게재, 서비스의 유효성 확인, 접속빈도 파악 또는 회원의 서비스 이용에 대한 통계 등을 목적으로 개인정보를 처리합니다.\n" +
            "\n" +
            "④ 고충처리 \n" +
            "민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락, 통지, 처리결과 통보 등의 목적으로 개인정보를 처리합니다. \n" +
            "\n" +
            "\n" +
            "2. 처리하는 개인정보의 항목\n" +
            "\n" +
            "① 회원 가입\n" +
            "- 개인정보 항목 \n" +
            "  ○필수항목 : 이메일, 비밀번호, 닉네임, 성별, 나이, 자녀유무, 자녀나이\n" +
            "  ○선택항목 : 프로필사진\n" +
            "- 수집방법 : 홈페이지 및 모바일 어플리케이션, 협력회사로부터의 제공\n" +
            "\n" +
            "② 경품행사(이벤트 경품 배송)\n" +
            " - 개인정보 항목 \n" +
            "○선택항목 : 휴대전화번호, 자택주소, 이름\n" +
            " - 수집방법 : 이벤트 응모\n" +
            "\n" +
            "③ 서비스 이용\n" +
            "- 개인정보 항목 : 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보,\n" +
            "- 수집방법 : 웹사이트, 모바일 어플리케이션\n" +
            "\n" +
            "\n" +
            "3. 정보주체의 권리, 의무 및 그 행사방법 \n" +
            " 이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다.\n" +
            "\n" +
            "① 정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.\n" +
            "가. 개인정보 열람요구\n" +
            "나. 오류 등이 있을 경우 정정 요구\n" +
            "다. 삭제요구\n" +
            "라. 처리정지 요구\n" +
            "\n" +
            "② 제1항에 따른 권리 행사는 회사에 대해 개인정보 보호법 시행규칙 별지 제8호 서식에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체 없이 조치하겠습니다.\n" +
            "\n" +
            "③ 정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 회사는 정정 또는 삭제를 완료할 때까지 당해 개인정보를 이용하거나 제공하지 않습니다.\n" +
            "\n" +
            "④ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 개인정보 보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.\n" +
            "⑤ 개인정보 열람 및 처리정지 요구는 개인정보보호법 제 35조 제 5항, 제 37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.\n" +
            "\n" +
            "⑥ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.\n" +
            "\n" +
            "⑦ 회사는 정보주체 권리에 따른 열람의 요구, 정정 혹은 삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.\n" +
            "\n" +
            "\n" +
            "\n" +
            "4.  개인정보 파일의 보유 및 이용기간\n" +
            " 이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기합니다. 단, 전자상거래 등에서의 소비자보호에 관한 법률 등 관계법령의 규정 및 회사 내부 방침에 의하여 보존할 필요가 있는 경우 회사는 아래와 같이 명시한 기간 동안 개인정보 파일을 보유합니다.\n" +
            "\n" +
            "① 계약 또는 청약철회, 대금결제 및 재화 등의 공급에 관한 기록 \n" +
            "보유 근거 : 전자상거래 등에서의 소비자보호에 관한 법률 \n" +
            "보유 기간  : 5년\n" +
            "\n" +
            "② 소비자의 불만 또는 분쟁처리에 관한 기록 \n" +
            "보유 근거 : 전자상거래 등에서의 소비자보호에 관한 법률 \n" +
            "보유 기간 : 3년\n" +
            "\n" +
            "③ 표시/광고에 관한 기록 \n" +
            "보유 근거 : 전자상거래 등에서의 소비자보호에 관한 법률\n" +
            "보유 기간 : 6개월\n" +
            "\n" +
            "④ 컴퓨터통신, 인터넷 로그기록자료, 접속치 추적자료\n" +
            "보유 근거 : 통신비밀보호법 제 41조\n" +
            "보유 기간 : 3개월\n" +
            "\n" +
            "⑤ 부정이용기록 \n" +
            "보유 근거 : 부정 이용 방지를 위한 회사 내부 방침  \n" +
            "보유 기간 : 1년\n" +
            "\n" +
            "\n" +
            "5. 개인정보의 파기\n" +
            " 회사는 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체없이 해당 개인정보를 파기합니다. 파기의 절차, 기한 및 방법은 다음과 같습니다.\n" +
            "\n" +
            "① 파기절차\n" +
            "이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의 경우 별도의 서류) 내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다. 이 때, DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고는 다른 목적으로 이용되지 않습니다.\n" +
            "\n" +
            "② 파기기한\n" +
            "이용자의 개인정보는 개인정보의 보유기간이 경과된 경우에는 보유기간의 종료일로부터 5일 이내에, 개인정보의 처리 목적 달성, 해당 서비스의 폐지, 사업의 종료 등 그 개인정보가 불필요하게 되었을 때에는 개인정보의 처리가 불필요한 것으로 인정되는 날로부터 5일 이내에 그 개인정보를 파기합니다.\n" +
            "\n" +
            "③ 파기방법\n" +
            "전자적 파일 형태의 정보는 기록을 재생할 수 없는 로우레벨포맷(Low Level Format)등의 기술적 방법을 사용합니다. \n" +
            "종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.\n" +
            "\n" +
            "\n" +
            "6. 개인정보의 안전성 확보 조치 \n" +
            " 회사는 인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.\n" +
            "\n" +
            "① 개인정보 취급 직원의 최소화 및 교육\n" +
            "개인정보를 취급하는 담당자를 최소화하여 개인정보를 관리하는 대책을 시행하고 있습니다. 또한, 내부 관리계획을 수립하여 시행하며, 정기적으로 취급 직원을 교육하고 있습니다.\n" +
            "\n" +
            "② 개인정보의 암호화\n" +
            "이용자의 개인정보는 비밀번호는 암호화되어 저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송 데이터를 암호화하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고 있습니다.\n" +
            "\n" +
            "③ 접속기록의 보관 및 위·변조 방지\n" +
            "개인정보처리시스템에 접속한 기록을 최소 6개월 이상 보관, 관리하고 있으며, 접속 기록이 위·변조 및 도난, 분실되지 않도록 보안기능 사용하고 있습니다.\n" +
            "\n" +
            "④ 개인정보에 대한 접근 제한\n" +
            "개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여, 변경, 말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.\n" +
            "\n" +
            "⑤ 문서보안을 위한 잠금장치 사용\n" +
            "개인정보가 포함된 서류, 보조저장매체 등을 잠금장치가 있는 안전한 장소에 보관하고 있습니다.\n" +
            "\n" +
            "⑥ 비인가자에 대한 출입 통제\n" +
            "개인정보를 보관하고 있는 물리적 보관 장소를 별도로 두고 이에 대해 출입통제 절차를 수립, 운영하고 있습니다.\n" +
            "\n" +
            "\n" +
            "7. 개인정보 자동 수집 장치의 설치∙운영 및 거부에 관한 사항 \n" +
            "\n" +
            "① 회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.\n" +
            "\n" +
            "② 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다.\n" +
            "가. 쿠키의 사용목적: 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부 등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다.\n" +
            "나. 쿠키의 설치∙운영 및 거부: 웹 브라우저 상단의 도구>인터넷 옵션>개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부할 수 있습니다.\n" +
            "다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.\n" +
            "\n" +
            "\n" +
            "8. 개인정보 보호책임자 \n" +
            "\n" +
            "① 회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.\n" +
            "\n" +
            "▶ 개인정보 보호책임자 \n" +
            "성명: 정현욱\n" +
            "직책: CTO\n" +
            "연락처: 070-5056-2592 / momguide@momguide.co.kr \n" +
            "※ 개인정보 보호 담당부서로 연결됩니다.\n" +
            "\n" +
            "② 정보주체께서는 맘가이드 서비스를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. 회사는 정보주체의 문의에 대해 신속하게 처리할 것입니다. \n" +
            "\n" +
            "\n" +
            "8. 개인정보 처리방침 변경\n" +
            " 이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.\n" +
            "\n" +
            "① 이 개인정보 처리방침은 2019년 3월 1일부터 적용됩니다.\n" +
            "\n" +
            "② 이전의 개인정보 처리방침은 아래에서 확인하실 수 있습니다. \n";
        const advertisementTerm = "마케팅 정보 활용 동의\n" +
            "\n" +
            "\n" +
            "㈜인포그린은 개인정보보호법 및 정보통신망이용촉진및정보보호등에관한법률 등 관계법령에 따라 맘가이드 서비스의 광고성 정보를 활용, 전송하기 위해 수신자의 사전 동의를 받고 있으며, 광고성 정보 수신자의 활용 동의 여부를 정기적으로 확인합니다. 위와 같이 동의를 받아 수집한 귀하의 개인정보는 보유∙이용기간 동안에만 활용됩니다.\n" +
            "\n" +
            "\n" +
            "활용 방법\n" +
            "마케팅 정보는 귀하의 전화, DM, SMS(휴대폰 문자메시지), MMS, LMS, 이메일, 우편 등을 통하여 발송됩니다. 이는 관련 법의 규정을 준수하여 발송됩니다\n" +
            "\n" +
            "활용 내용\n" +
            "발송되는 마케팅 정보는 수신자에게 맘가이드 뉴스레터, 제품정보, 경연대회, 판촉, 설문조사, 사이트 기능 관리, 안부 문자, 행사 안내 등 영리목적의 광고성 정보입니다. 또한 영업 및 마케팅 목적으로 접속 빈도 파악 혹은 본 서비스 이용과 관련된 통계 자료로 활용될 수 있습니다. 귀하는 위와 같은 마케팅 목적 개인정보 수집 및 이용을 거부할 수 있으나, 이 경우 행사 안내를 받지 못하거나 회사가 제공하는 유용한 정보를 받지 못할 수 있습니다. 고객은 이에 동의하지 아니할 권리가 있으며, 동의하지 않는 경우에도 회원 가입이 가능합니다.\n" +
            "결제안내 등 의무적으로 안내되어야 하는 정보성 내용은 수신동의 여부와 무관하게 제공합니다.\n" +
            "\n" +
            "활용 동의 여부 변경\n" +
            "귀하는 수신 동의 이후에도 의사에 따라 동의를 철회할 수 있으며, 가입 시 수신 동의를 하지 않았을 경우에도 추후에 동의할 수 있습니다. 마케팅 활용 동의 여부를 변경하고자 하는 분은 맘가이드 웹사이트의 1대1 문의하기 혹은 맘가이드 메일 help@momguide.co.kr 로 관련 내용을 보내주시면 처리가 가능합니다.";

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
                        <i className={`fas fa-chevron-${this.state.serviceTermOpen ? 'up' : 'down'} signup-drop-down`}
                           onClick={()=>this.onChange('serviceTermOpen', !this.state.serviceTermOpen)}
                        />
                        <span>
                            <input type="checkbox" className="signup-agreement-license-box"
                                   onChange={(e) => this.onChange('serviceTermConfirm', e.target.checked)}
                                   checked={this.state.serviceTermConfirm}
                            />
                        </span>
                        {this.state.serviceTermOpen ?
                            (<div className="signup-agreement-text">
                                {licenseTerm.split('\n').map((line, i) => {
                                    return <span key={i}>{line}<br/></span>;
                                })}
                            </div>) : null}
                    </div>
                    <div className="signup-agreement-personal-info">
                        <span className="signup-agreement-personal-info-text">
                            개인정보취급방침 (필수)
                        </span>
                        <i className={`fas fa-chevron-${this.state.privateInfoOpen ? 'up' : 'down'} signup-drop-down`}
                           onClick={()=>this.onChange('privateInfoOpen', !this.state.privateInfoOpen)}
                        />
                        <span>
                            <input type="checkbox" className="signup-agreement-personal-info-box"
                                   onChange={(e) => this.onChange('privateInfoConfirm', e.target.checked)}
                                   checked={this.state.privateInfoConfirm}
                            />
                        </span>
                        {this.state.privateInfoOpen ?
                            (<div className="signup-agreement-text">
                                {personalInfoTerm.split('\n').map((line, i) => {
                                    return <span key={i}>{line}<br/></span>;
                                })}
                            </div>) : null}
                    </div>
                    <div className="signup-agreement-marketing">
                        <span className="signup-agreement-marketing-text">
                            홍보 및 마케팅 사용(선택)
                        </span>
                        <i className={`fas fa-chevron-${this.state.advertisementOpen ? 'up' : 'down'} signup-drop-down`}
                           onClick={()=>this.onChange('advertisementOpen', !this.state.advertisementOpen)}
                        />
                        <span>
                            <input type="checkbox" className="signup-agreement-marketing-box"
                                   onChange={(e) => this.onChange('advertisementConfirm', e.target.checked)}
                                   checked={this.state.advertisementConfirm}
                            />
                        </span>
                        {this.state.advertisementOpen ?
                            (<div className="signup-agreement-text">
                                {advertisementTerm.split('\n').map((line, i) => {
                                    return <span key={i}>{line}<br/></span>;
                                })}
                                <table className="signup-advertisement-table">
                                    <tr>
                                        <td>이용하는 개인정보 항목</td>
                                        <td>보유 이용 목적</td>
                                    </tr>
                                    <tr>
                                        <td>휴대전화 번호, 이메일 주소, 자택 주소</td>
                                        <td>혜택 정보, 각종 이벤트 정보 등 광고성 정보 제공</td>
                                    </tr>
                                </table>
                            </div>) : null}
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
                                <img src={this.state.profileImageUrl} alt="" id="signup-profile" />
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
                                       value={this.state.nickname}
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
                                        CommonUtil.range(1930, new Date().getFullYear()).map((num) => (
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
                                        CommonUtil.range(1, 12).map((num) => (
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
                                        CommonUtil.range(1, CommonUtil.lastDay(Number(this.state.birthYear), Number(this.state.birthMonth))).map((num) => (
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
                                    value={this.state.hasChild}
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
                                   value={this.state.addressDetail}
                            />
                            <input placeholder={"참고 항목 예) (상암동)"} className="signup-address-detail2"
                                   onChange={(e)=>this.onChange('addressNote', e.target.value)}
                                   value={this.state.addressNote}
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