import React from 'react';
import './MyHelpDetail.css';


export class MyHelpDetail extends React.Component{

    state = {
        content: "야이거 분석해",
        answer: ""

    }


    componentDidMount=()=>{
        //TODO 해당 index를 가지는 문의를 가져오기 + 이 문의에 대한 권한 확인하기
    };

    contentChange = (e) => {
        this.setState({
            content: e.target.value
        })
    }

    modifyHelp = () => {
        let content = document.getElementById("contact-content").value;
        let file = document.getElementById("contact-file").value;

        console.log(content, file);
    }

    //TODO : 받은 object의 값에 따라서 답변의 유무, 수정의 가능 유무를 정해서 일부 컴포넌트 렌더링 여부 정하기 

    render=()=>{
        return(

                <div className="myhelp-detail-container">
                    <div className="myhelp-detail-description">
                        <h6>오류 및 버그신고, 기능 개선요청, 제품 정보 수정요청, 이벤트/제휴/광고 문의, 기타 서비스 관련 문의를 하실 수 있습니다.</h6>
                    </div>
                    <div className="myhelp-detail-subdescription">
                        <p>성분 분석을 원하시면 성분 분석 요청 기능을 이용해 주세요.</p>
                        <p>제휴 관련 구체적인 제안서 및 기획서는 아래 메일로 남겨주세요</p>
                        <p>help@momguide.co.kr</p>
                        <p>해당 문의에 대한 답변은 이메일로도 드립니다.</p>
                    </div>
                    
                    <div className="myhelp-detail-title">
                        <h4>1. 추가 문의 및 요청사항</h4>
                    </div>
                    <textarea className="myhelp-detail-content" id="contact-content" defaultValue={this.state.content}
                    disabled={this.state.answer==="" ? "" : "disabled"} onClick={this.contentChange}/>
                            

                    <div className="myhelp-detail-title">
                        <h4>2. 첨부파일</h4>
                    </div>

                    <div className="myhelp-detail-file-box">
                        <input className="myhelp-detail-file" type="file" id="contact-file"/>
                    </div>

                    

                    {
                        this.state.answer === "" ? 
                        <button type="button" className="myhelp-detail-button" onClick={this.modifyHelp}>수정하기</button> :
                        <React.Fragment>
                            <div className="myhelp-detail-title">
                                <h4>3. 답변</h4>
                            </div>
                            <textarea className="myhelp-detail-answer" value={this.state.answer} readOnly/>
                        </React.Fragment>
                    }
                    
                
                </div>
        )
    }        
}