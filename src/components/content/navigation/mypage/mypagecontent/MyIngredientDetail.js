import React from 'react';
import './MyIngredientDetail.css';
import TokenUtils from '../../../../../util/TokenUtil';
import axios from 'axios';
import history from '../../../../../history/history';
import { TextArea } from 'semantic-ui-react';
import { isRegExp } from 'util';
export default class MyIngredientDetail extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            type: false,
            title: '',
            content: '',
            answer: '',
            contentFile: '',
            answerFile: '',
            modifyFile: null
        }
    }

    componentDidMount () {
        const index = this.props.location.pathname.split('/')[3];
        const token = TokenUtils.getLoginToken();
        const query = '?index=' + index;
        axios({
            method: 'get',
            url: process.env.API_URL + '/api/ask/ingredAnalPost' + query,
            headers: TokenUtils.getTokenRequestHeader(token)
        })
        .then((res) => {
            console.log(res);
            this.setState({
                type: res.data.isCosmetic,
                title: res.data.title,
                content: res.data.requestContent,
                contentFile: res.data.requestFileUrl,
                answer: res.data.responseContent,
                answerFile: res.data.responseFileUrl
            });
        })
        .catch((err) => {
            if(err.response.status === 424) {
                alert('존재하지 않는 성분 분석 요청입니다.');
            } else {
                alert('알 수 없는 오류가 발생했습니다. 관리자에게 문의해주시기 바랍니다.');
            }
        })
    }

    onNameChange = (e) => {
        if(this.state.answer===null){
            this.setState({
                title: e.target.value
            })
        }
    }

    onContentChange = (e) => {
        if(this.state.answer === null) {
            this.setState({
                content: e.target.value
            });
        }
    }

    handleSelectChange = (e) => {
        if(e.target.value === "생활화학제품") {
            this.setState({
                type: false
            })
        } else {
            this.setState({
                type: true
            })
        }
    }

    setNewFile = (e) => {
        this.setState({
            modifyFile: e.target.files[0]
        });
    }

    modifyRequest = () => {
        const token = TokenUtils.getLoginToken();
        const index = this.props.location.pathname.split('/')[3];
        const query = '?index=' + index;
        console.log(process.env.API_URL + '/api/ask/editIngredAnal' + query)

        const formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('isCosmetic', this.state.type);
        formData.append('requestContent', this.state.content);
        if(this.state.modifyFile === null) {
            console.log('debug no photo');
            axios({
                method: 'put',
                url: process.env.API_URL + '/api/ask/editIngredAnal' + query,
                headers: {
                    ...TokenUtils.getTokenRequestHeader(token),
                    'Content-Type': 'multipart/form-data'
                },
                data: formData
            })
            .then((res) => {
                history.push('/mypage/ingredient-analysis-request');
            })
            .catch((err) => {
                console.log(err);
                if(err.response.data.error === 'no such post') {
                    alert('없는 성분 분석 요청입니다.');
                } else if (err.response.data.error === 'already responsed') {
                    alert('이미 답변이 완료된 요청입니다.');
                } else if (err.response.data.error === 'invalid file(image only)') {
                    alert('이미지 파일이 아닙니다.');
                } else {
                    alert('알 수 없는 오류입니다. 관리자에게 문의해 주시기 바랍니다.');
                }
            })
        } else {
            formData.append('requestFile', this.state.modifyFile);
            axios({
                method: 'put',
                url: process.env.API_URL + '/api/ask/editIngredAnal' + query,
                headers: TokenUtils.getTokenRequestHeader(token),
                data: formData
            })
            .then(() => {
                history.push('/mypage/ingredient-analysis-request');
            })
            .catch((err) => {
                if(err.response.data.error === 'no such post') {
                    alert('없는 성분 분석 요청입니다.');
                } else if (err.response.data.error === 'already responsed') {
                    alert('이미 답변이 완료된 요청입니다.');
                } else if (err.response.data.error === 'invalid file(image only)') {
                    alert('이미지 파일이 아닙니다.');
                } else {
                    alert('알 수 없는 오류입니다. 관리자에게 문의해 주시기 바랍니다.');
                }
            })
        }
    }

    setPhotoArea = () => {
        if(this.state.answer === null) {
            if(this.state.contentFile === null) {
                return(
                    <div className="ing-detail-file-box">
                        <input className="ing-detail-file" type="file" id="product-file" onChange={this.setNewFile}/>
                    </div>
                )
            } else {
                return (
                    <div className="ing-detail-file-box">
                        <img src={this.state.contentFile} alt="" id="ingred-anal-image" />
                        <div className="ing-detail-file-box">
                            <input className="ing-detail-file" type="file" id="product-file" onChange={this.setNewFile}/>
                        </div>
                    </div>
                )
            }
        } else {
            if(this.state.answerFile === null) {
                return(
                    <div className="ing-detail-file-box">
                        파일 없음
                    </div>
                )
            } else {
                return(
                    <div className="ing-detail-file-box">
                        <img src={this.state.answerFile} alt="" id="ingred-anal-image"/>
                    </div>
                )
            }
        }
    }
    //TODO : 받은 object의 값에 따라서 답변의 유무, 수정의 가능 유무를 정해서 일부 컴포넌트 렌더링 여부 정하기 

    render=()=>{
        console.log(this.state);
        console.log(this.state.type);
        const isAnswered = this.state.answer === null ? false : true;
        return(
            <div className="ing-detail-container">
                <div className="ing-detail-description">
                    <h6>맘가이드에 검색해도 나오지 않는 제품은 1:1로 성분 분석을 가입 이메일로 알려드립니다.</h6>
                </div>
                <div className="ing-detail-subdescription">
                    <p>분석 결과는 2~일 안으로 받아보실 수 있습니다.</p>
                    <p>하루에 하나의 제품만 분석요청이 가능합니다.</p>
                    <p>해당 분석 결과를 상업적으로 이용할 경우 법적조치를 받을 수 있습니다.</p>
                    <p>성분 분석에 대한 결과는 제품 자체의 유해성이나 위험성을 뜻하진 않습니다.</p>
                    <p>맘가이드가 취급하는 생활화학제품에 해당하는 제품은 빠른 시일내에 업데이트 하겠습니다.</p>
                </div>
                <div className="ing-detail-title">
                    <h4>1. 분석 요청 정보</h4>
                </div>
                <div className="ing-detail-info">
                    <select className="ing-detail-type" id="product-type" 
                    defaultValue={this.state.type ? "가정용 화학제품" : "유아용화장품"}
                    disabled={isAnswered} onChange={this.handleSelectChange}>
                        <option value="가정용 화학제품">가정용 화학제품</option>
                        <option value="유아용화장품">유아용화장품</option>
                    </select>
                    <input className="ing-detail-name" defaultValue={this.state.title} onChange={this.onNameChange} 
                    id="product-name" disabled={isAnswered}/>


                </div>
                <div className="ing-detail-title">
                    <h4>2. 추가 문의 및 요청사항</h4>
                </div>
                
                <TextArea className="ing-detail-content" value={this.state.content} onChange={this.onContentChange}
                id="product-content" disabled={isAnswered}/>
            
                <div className="ing-detail-title">
                    <h4>3. 첨부파일</h4>
                </div>
                {
                    this.setPhotoArea()
                }
                {
                    this.state.answer === null ? 
                    <button type="button" className="ing-detail-button" onClick={this.modifyRequest} >수정하기</button> :
                    <React.Fragment>
                        <div className="ing-detail-title">
                            <h4>4. 답변</h4>
                        </div>
                        <TextArea className="ing-detail-answer" value={this.state.answer} readOnly/>
                    </React.Fragment>
                }
                
            </div>
        )
    }        
}
