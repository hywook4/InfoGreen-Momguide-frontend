import React from 'react';
import './ContactUs.css';
// import '../loggedIn/LoggedIn.css';
import '../../../product/prodSpec/ProdSpec.css';
import {Comments} from '../../../product/prodSpec/CommentsSection';


export class ContactUs extends React.Component{
    render=()=>{
        return(
            <React.Fragment>

                <div>
                    <div className="req-cmnt">
                        <div className="cu-container">
                            <div className="cmnt-desp-container">
                                <div className="cmnt-desp-inr">
                                    <h2>오류 및 버그신고, 기능 개선요청, 제품 정보 수정요청, 이벤트/제휴/광고 문의, 기타 서비스 관련 문의를 하실 수 있습니다.</h2>
                                    <p>성분 분석을 원하시면 성분 분석 요청 기능을 이용해 주세요.</p>
                                    <p>관련 구체적인 제안서 및 기획서는 아래 메일로 남겨주세요.</p>
                                    <p>help@bubblein.kr</p>
                                    <p>해당 문의에 대한 답변은 이메일로도 드립니다.</p>
                                </div>
                                
                            </div>

                            <div className="form-container">
                                <form className="cu-form">
                                    <textarea className="cu-text" placeholder="내용을 입력해 주세요.">
                                    </textarea>
                                    <hr className="line"/>
                                    <input type="submit" value="제출하기" />
                                </form>
                            </div>
                        </div>
                    </div>
                    
                </div>    
            </React.Fragment>
        )
    }        
}