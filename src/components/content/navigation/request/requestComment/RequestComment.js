import React from 'react';
import './RequestComment.css';


export class RequestComment extends React.Component{
    render=()=>{
        return(
            <React.Fragment>

                <div>
                    <div className="req-cmnt">
                        <div className="rc-container">
                            <div className="cmnt-desp-container">
                                <div className="cmnt-desp-inr">
                                    <h2>맘가이드에 검색해도 나오지 않는 제품은 1:1로 성분 분석을 가입 이메일로 알려드립니다.</h2>
                                    <p>분석 결과는 2~3일 안으로 받아보실 수 있습니다.</p>
                                    <p>하루에 하나의 제품만 분석요청이 가능합니다.</p>
                                    <p>해당 분석 결과를 상업적으로 이용할 경우 법적조치를 받을 수 있습니다.</p>
                                    <p>성분 분석에 대한 결과는 제품 자체의 유해성이나 위험성을 뜻하진 않습니다.</p>
                                    <p>맘가이드가 취급하는 생활화학제품에 해당하는 제품은 빠른 시일내에 업데이트 하겠습니다.</p>
                                </div>
                                <hr/>
                                <div className="cmnt-drpdwn-div">
                                    <form>
                                        <div className="form-containter">
                                            <div className="form-block">
                                                <h5>분석 요청 정보</h5>
                                                <div className="request-row">
                                                    <select id="inputState" className="select-form">
                                                        <option selected>종류</option>
                                                        <option>가정용 화학제품</option>
                                                        <option>유아용 화장품</option>
                                                        <option>기타</option>
                                                    </select>
                                                    <input type="text" className="text-form" placeholder="브랜드 혹은 제품이름을 입력하세요" />
                                                </div>
                                            </div>
                                            <div className="form-block">
                                                <h5>추가 문의 및 요청사항</h5>
                                                <textarea className="rc-text" placeholder="분석을 원하는 제품의 전성분표를 첨부해 주시거나 직접 입력해주세요.&#10;(제품 뒷면 상세설명)"></textarea>
                                            </div>
                                            <div className="form-block">
                                                <h5>첨부파일</h5>
                                                <input type="file" multiple="multiple"></input>
                                            </div>
                                            <hr className="line"/>
                                            <input type="submit" value="제출하기" />
                                        </div>


                                    </form>
                                
                                
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>    
            </React.Fragment>
        )
    }        
}