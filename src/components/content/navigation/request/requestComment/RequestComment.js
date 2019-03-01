import React from 'react';
import './RequestComment.css';
import axios from 'axios';
import { TokenUtil } from '../../../../../util';
import history from '../../../../../history/history';

export class RequestComment extends React.Component{
    state = {
        name: '',
        type: '생활화학제품',
        content: '',
        imageFile: null
    };

    submitRequest = async () => {
        const { name, type, content, imageFile} = this.state;

        if(name === '') {
            alert('제목을 입력해주세요.');
            return;
        }
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
        formData.append('title', name);
        formData.append('isCosmetic', type !== '생활화학제품');
        formData.append('requestContent', content);

        if(imageFile !== null)
            formData.append('requestFile',  imageFile);

        try {
            await axios({
                method: 'post',
                url: `${process.env.API_URL}/api/ask/requestIngredAnal`,
                headers: headers,
                data: formData
            });
            alert('정상적으로 요청되었습니다.');
            history.push('/request/loggedin');
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        } catch(err) {
            if(!err.response.data) {
                alert("알 수 없는 에러가 발생하였습니다. 관리자에게 문의 부탁드립니다.");
                return;
            }

            const message = err.response.data.error;

            if(message === 'not today anymore') {
                alert("성분 분석 요청은 하루에 한번만 할 수 있습니다.");
            } else if(message === 'invalid file(image only)') {
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

    render = () => {
        return (
            <div className="ing-request-container">
                <div className="ing-request-page">
                    <div className="banner"/>
                    <div className="ing-request-description">
                        <h6>맘가이드에 검색해도 나오지 않는 제품은 1:1로 성분 분석을 가입 이메일로 알려드립니다.</h6>
                    </div>
                    <div className="ing-request-subdescription">
                        <p>분석 결과는 2~일 안으로 받아보실 수 있습니다.</p>
                        <p>하루에 하나의 제품만 분석요청이 가능합니다.</p>
                        <p>해당 분석 결과를 상업적으로 이용할 경우 법적조치를 받을 수 있습니다.</p>
                        <p>성분 분석에 대한 결과는 제품 자체의 유해성이나 위험성을 뜻하진 않습니다.</p>
                        <p>맘가이드가 취급하는 생활화학제품에 해당하는 제품은 빠른 시일내에 업데이트 하겠습니다.</p>
                    </div>
                    <div className="ing-request-title">
                        <h4>1. 분석 요청 정보</h4>
                    </div>
                    <div className="ing-request-info">
                        <select className="ing-request-type" id="product-type" value={this.state.type}
                                onChange={(e)=>this.onChange('type', e.target.value)}
                        >
                            <option value="생활화학제품">생활화학제품</option>
                            <option value="유아용화장품">유아용화장품</option>
                        </select>
                        <textarea className="ing-request-name" placeholder="브랜드 혹은 제품이름을 입력하세요." id="product-name"
                                  value={this.state.name} onChange={(e) => this.onChange('name', e.target.value)}
                        />
                    </div>
                    <div className="ing-request-title">
                        <h4>2. 추가 문의 및 요청사항</h4>
                    </div>
                    <textarea className="ing-request-content" placeholder="분석을 원하는 제품의 전성분표를 첨부해 주시거나 직접 입력해주세요.&#10;(제품 뒷면 상세설명)"
                              id="ing-content" value={this.state.content} onChange={(e) => {this.onChange('content', e.target.value)}}
                    />
                    <div className="ing-request-title">
                        <h4>3. 첨부파일</h4>
                    </div>
                    <div className="ing-request-file-box">
                        <input className="ing-request-file-invisible" type="file" name="ing-request-image"
                               onChange={(e) => e.target.files.length === 0 ? this.onChange('imageFile', null) : this.onChange('imageFile', e.target.files[0])}
                               id="ing-request-image-upload"
                        />
                        <label htmlFor="ing-request-image-upload" className="ing-request-upload-image-label">파일 선택</label>
                        <span>
                            {this.state.imageFile === null ? <span className="ing-request-upload-text">선택한 파일 없음</span> : null}
                            {this.state.imageFile ?(
                                <span className="ing-request-upload-text">
                                    {this.state.imageFile.name}
                                    <i className="fas fa-times ing-request-upload-red-x" onClick={() => this.onChange('imageFile', null)} />
                                </span>) : null
                            }
                        </span>
                    </div>

                    <button type="button" className="ing-request-button" onClick={() => this.submitRequest()} >요청하기</button>
                </div>
            
            </div>
        )
    }        
}