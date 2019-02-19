import React from 'react';
import './RequestComment.css';


export class RequestComment extends React.Component{
    state = {
        name: "product-name",
        type: "product-type",
        content: "ing-content",
        file: "ing-file"
    }

    submitRequest = (e) => {
        let name = document.getElementById(this.state.name).value;
        let type = document.getElementById(this.state.type).value;
        let content = document.getElementById(this.state.content).value;
        let file = document.getElementById(this.state.file).value;

        //TODO : 받은 데이터를 전송해서 저장하기 요청한 유저의 정보도 포함하기
        console.log(name, type, content, file);
    }


    render=()=>{
        return(
            <div className="ing-request-container">
                <div className="ing-request-page">
                    <div className="banner"></div>
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
                        <select className="ing-request-type" id="product-type">
                            <option value="" selected="selected" disabled>종류</option>
                            <option value="생활화학제품">생활화학제품</option>
                            <option value="유아용화장품">유아용화장품</option>
                        </select>
                        <textarea className="ing-request-name" placeholder="브랜드 혹은 제품이름을 입력하세요." id="product-name"/>
                    </div>
                    <div className="ing-request-title">
                        <h4>2. 추가 문의 및 요청사항</h4>
                    </div>
                    <textarea className="ing-request-content" placeholder="분석을 원하는 제품의 전성분표를 첨부해 주시거나 직접 입력해주세요.&#10;(제품 뒷면 상세설명)" id="ing-content"/>
                    <div className="ing-request-title">
                        <h4>3. 첨부파일</h4>
                    </div>
                    <div className="ing-request-file-box">
                        <input className="ing-request-file" type="file" id="ing-file"/>
                    </div>

                    <button type="button" className="ing-request-button" onClick={this.submitRequest} >요청하기</button>
                </div>
            
            </div>
        )
    }        
}