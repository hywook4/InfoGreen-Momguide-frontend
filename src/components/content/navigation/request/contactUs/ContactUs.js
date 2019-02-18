import React from 'react';
import './ContactUs.css';
import '../../../product/prodSpec/ProdSpec.css';

export class ContactUs extends React.Component{

    state = {
        content: "contact-content",
        file: "contact-file"
    }


    submitRequest = (e) => {
        let content = document.getElementById(this.state.content).value;
        let file = document.getElementById(this.state.file).value; //TODO: 파일을 받는건지 확인
        //TODO : 유효성 검사 및 파일, 내용 전송하기, 유저의 정보도 같이 포함 
        console.log(content);
        console.log(file);
    }

    render=()=>{
        return(
            <div className="contactus-container">
                <div className="contactus-page">
                    <div className="banner"></div>
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
                    <textarea className="contactus-content" placeholder="내용을 입력해 주세요." id="contact-content"/>
                            

                    <div className="contactus-title">
                        <h4>2. 첨부파일</h4>
                    </div>

                    <div className="contactus-file-box">
                        <input className="contactus-file" type="file" id="contact-file"/>
                    </div>

                    <button type="button" className="contactus-button" onClick={this.submitRequest}>문의하기</button>
                    
                
                </div>
            </div>
        )
    }        
}