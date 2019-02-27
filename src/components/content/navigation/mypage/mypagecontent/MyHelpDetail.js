import React from 'react';
import './MyHelpDetail.css';
import TokenUtils from '../../../../../util/TokenUtil';
import axios from 'axios';
import { TextArea } from 'semantic-ui-react';

export class MyHelpDetail extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            index: null,
            content: '',
            contentFile: '',
            answer: '',
            answerFile: '',
            modifyFile: null
        }
    }


    componentDidMount=()=>{
        const index = this.props.location.pathname.split('/')[3];
        const token = TokenUtils.getLoginToken();
        const query = '?index=' + index;
        axios({
            method: 'get',
            url: process.env.API_URL + '/api/ask/oneToOnePost' + query,
            headers: TokenUtils.getTokenRequestHeader(token)
        })
        .then((res) => {
            this.setState({
                index: res.data.index,
                content: res.data.questionContent,
                contentFile: res.data.questionFileUrl,
                answer: res.data.answerContent,
                answerFile: res.data.answerFileUrl
            });
        })
        .catch((err) => {
            if(err.response.status === 424) {
                alert('존재하지 않는 성분 분석 요청입니다.');
            } else {
                alert('알 수 없는 오류가 발생했습니다. 관리자에게 문의해주시기 바랍니다.');
            }
        })
    };

    contentChange = (e) => {
        if(this.state.answer === null) {
            this.setState({
                content: e.target.value
            })
        }
    }

    setPhotoArea = () => {
        if(this.state.answer === null) {
            if(this.state.contentFile === null) {
                return(
                    <div className="myhelp-detail-file-box">
                        <input className="myhelp-detail-file" type="file" id="contact-file" onChange={this.setNewFile}/>
                    </div>
                )
            } else {
                return (
                    <div className="myhelp-detail-file-box">
                        <img src={this.state.contentFile} alt="" id="ingred-anal-image" />
                        <div className="myhelp-detail-file-box">
                            <input className="ing-detail-file" type="file" id="contact-file" onChange={this.setNewFile}/>
                        </div>
                    </div>
                )
            }
        } else {
            if(this.state.answerFile === null) {
                return(
                    <div className="myhelp-detail-file-box">
                        파일 없음
                    </div>
                )
            } else {
                return(
                    <div className="myhelp-detail-file-box">
                        <img src={this.state.answerFile} alt="" id="contact-image"/>
                    </div>
                )
            }
        }
    }

    setNewFile = (e) => {
        this.setState({
            modifyFile: e.target.files[0]
        });
    }
    modifyHelp = () => {
        let content = document.getElementById("contact-content").value;
        let file = document.getElementById("contact-file").value;

        console.log(content, file);
    }

    //TODO : 받은 object의 값에 따라서 답변의 유무, 수정의 가능 유무를 정해서 일부 컴포넌트 렌더링 여부 정하기 

    render=()=>{
        const isAnswered = this.state.answer === null ? false : true;
        console.log(this.state.answerFile);
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
                    <TextArea className="myhelp-detail-content" id="contact-content" value={this.state.content} onChange={this.contentChange} 
                    disabled={isAnswered} />
                            

                    <div className="myhelp-detail-title">
                        <h4>2. 첨부파일</h4>
                    </div>
                    {this.setPhotoArea}
                    {
                        this.state.answer === null ? 
                        <button type="button" className="myhelp-detail-button" onClick={this.modifyHelp}>수정하기</button> :
                        <React.Fragment>
                            <div className="myhelp-detail-title">
                                <h4>3. 답변</h4>
                            </div>
                            <TextArea className="myhelp-detail-answer" value={this.state.answer} readOnly/>
                        </React.Fragment>
                    }
                    
                
                </div>
        )
    }        
}