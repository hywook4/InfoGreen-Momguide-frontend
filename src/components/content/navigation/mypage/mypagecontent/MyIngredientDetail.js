import React from 'react';
import './MyIngredientDetail.css';


export class MyIngredientDetail extends React.Component{

    state = {
        type: true,
        title: "요넥스",
        content: "야이거 분석해",
        answer: "asdf"
    }

    componentDidMount=()=>{

    };

    onNameChange = (e) => {
        if(this.state.answer===""){
            this.setState({
                title: e.target.value
            })
        }
    }

    modifyRequest = () => {
        let name = document.getElementById("product-type").value;
        let type = document.getElementById("product-name").value;
        let content = document.getElementById("product-content").value;
        let file = document.getElementById("product-file").value;

        console.log(name, type, content, file);
    }


    //TODO : 받은 object의 값에 따라서 답변의 유무, 수정의 가능 유무를 정해서 일부 컴포넌트 렌더링 여부 정하기 

    render=()=>{

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
                    defaultValue={this.state.type ? "유아용화장품" : "생활화학제품"}
                    disabled={this.state.answer==="" ? "" : "disabled"}>
                        <option value="생활화학제품">생활화학제품</option>
                        <option value="유아용화장품">유아용화장품</option>
                    </select>
                    <textarea className="ing-detail-name" defaultValue={this.state.title} onChange={this.onNameChange} 
                    id="product-name" disabled={this.state.answer==="" ? "" : "disabled"}/>


                </div>
                <div className="ing-detail-title">
                    <h4>2. 추가 문의 및 요청사항</h4>
                </div>
                
                <textarea className="ing-detail-content" defaultValue={this.state.content} onChange={this.onContentChange}
                id="product-content" disabled={this.state.answer==="" ? "" : "disabled"}/>
            
                <div className="ing-detail-title">
                    <h4>3. 첨부파일</h4>
                </div>
                <div className="ing-detail-file-box">
                    <input className="ing-detail-file" type="file" id="product-file"/>
                </div>

                {
                    this.state.answer === "" ? 
                    <button type="button" className="ing-detail-button" onClick={this.modifyRequest} >수정하기</button> :
                    <React.Fragment>
                        <div className="ing-detail-title">
                            <h4>4. 답변</h4>
                        </div>
                        <textarea className="ing-detail-answer" value={this.state.answer} readOnly/>
                    </React.Fragment>
                }
                
            </div>
        )
    }        
}