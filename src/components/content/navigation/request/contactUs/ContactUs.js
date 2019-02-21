import React from 'react';
import './ContactUs.css';
import '../../../product/prodSpec/ProdSpec.css';
import { TokenUtil } from '../../../../../util';
import axios from 'axios';
import history from '../../../../../history/history';

export class ContactUs extends React.Component{

    state = {
        content: "",
        imageFile: null
    };

    submitRequest = async () => {
        const { content, imageFile} = this.state;

        if(content === '') {
            alert('내용을 입력해주세요.');
            return;
        }

        const token = TokenUtil.getLoginToken();
        if(token === null) {
            alert("로그인 한 사용자만 사용가능합니다.");
            return;
        }
        const headers = TokenUtil.getTokenRequestHeader(token);
        const formData = new FormData();
        formData.append('questionContent', content);

        if(imageFile !== null)
            formData.append('questionFile',  imageFile);

        try {
            await axios({
                method: 'post',
                url: `${process.env.API_URL}/api/ask/questionOneToOne`,
                headers: headers,
                data: formData
            });
            alert('정상적으로 요청되었습니다.');
            // TODO: 기획에 따라 이동할 페이지 설정
            history.push('/');
        } catch(err) {
            if(!err.response.data) {
                alert("알 수 없는 에러가 발생하였습니다. 관리자에게 문의 부탁드립니다.");
                return;
            }

            const message = err.response.data.error;

            if(message === 'invalid file(image only)') {
                alert("이미지 파일만 전송 가능합니다.");
            } else {
                alert("알 수 없는 에러가 발생하였습니다. 관리자에게 문의 부탁드립니다.");
            }
        }
    };

    onChange = (key, value) => {
        const newObj = {};
        newObj[key] = value;

        this.setState(newObj);
    };

    render=()=>{
        return(
            <div className="contactus-container">
                <div className="contactus-page">
                    <div className="banner"/>
                    <div className="contactus-description">
                        <h6>오류 및 버그신고, 기능 개선요청, 제품 정보 수정요청, 이벤트/제휴/광고 문의, 기타 서비스 관련 문의를 하실 수 있습니다.</h6>
                    </div>
                    <div className="contactus-subdescription">
                        <p>성분 분석을 원하시면 성분 분석 요청 기능을 이용해 주세요.</p>
                        <p>제휴 관련 구체적인 제안서 및 기획서는 아래 메일로 남겨주세요</p>
                        <p>help@momguide.co.kr</p>
                        <p>해당 문의에 대한 답변은 이메일로도 드립니다.</p>
                    </div>
                    
                    <div className="contactus-title">
                        <h4>1. 추가 문의 및 요청사항</h4>
                    </div>
                    <textarea className="contactus-content" placeholder="내용을 입력해 주세요." id="contact-content"
                              value={this.state.content} onChange={(e)=>this.onChange('content', e.target.value)}
                    />
                            

                    <div className="contactus-title">
                        <h4>2. 첨부파일</h4>
                    </div>

                    <div className="contactus-file-box">
                        <input className="contactus-file-invisible" type="file" name="contactus-image"
                               onChange={(e) => e.target.files.length === 0 ? this.onChange('imageFile', null) : this.onChange('imageFile', e.target.files[0])}
                               id="contactus-image-upload"
                        />
                        <label htmlFor="contactus-image-upload" className="contactus-upload-image-label">파일 선택</label>
                        <span>
                            {this.state.imageFile === null ? <span className="contactus-upload-text">선택한 파일 없음</span> : null}
                            {this.state.imageFile ?(
                                <span className="contactus-upload-text">
                                    {this.state.imageFile.name}
                                    <i className="fas fa-times contactus-upload-red-x" onClick={() => this.onChange('imageFile', null)} />
                                </span>) : null
                            }
                        </span>
                    </div>

                    <button type="button" className="contactus-button" onClick={() => this.submitRequest()}>문의하기</button>
                </div>
            </div>
        )
    }        
}