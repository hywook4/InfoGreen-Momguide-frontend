import React from 'react';
import './RequestComment.css';
// import '../loggedIn/LoggedIn.css';
import '../../../product/prodSpec/ProdSpec.css';
import {Comments} from '../../../product/prodSpec/CommentsSection';


export class RequestComment extends React.Component{
    render=()=>{
        return(
            <React.Fragment>

                <div>
                    <div className="req-cmnt">
                        <div className="container">
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
                                        <div className="form-row">
                                            <div className="form-group col-md-2">
                                                <select id="inputState" className="rqst-form-inp form-control">
                                                    <option selected>종류</option>
                                                    <option>가정용 화학제품</option>
                                                    <option>유아용 화장품</option>
                                                    <option>기타</option>
                                                </select>
                                            </div>
                                            <div className="form-group col-md-10">
                                                <input type="text" className="rqst-form-inp form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="브랜드를 입력하세요" />
                                            </div>
                                        </div>
                                    </form>
                                
                                
                                </div>
                            </div>
                        </div>
                        <Comments/>
                        
                    </div>
                    
                </div>    
            </React.Fragment>
        )
    }        
}