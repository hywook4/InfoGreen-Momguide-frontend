import React from 'react';
import './Category.css'

export class Checkbox extends React.Component{
    render(){
        return(
            <div className="checkbox-div">
                <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input" id="defaultInline1" />
                                <label htmlFor="defaultInline1" className="custom-control-label">성분 공개 제품</label>
                            </div>
                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input" id="defaultInline2"/>
                                <label htmlFor="defaultInline2" className="custom-control-label">주의 성분 제외</label>
                            </div>
                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input" id="defaultInline3"/>
                                <label htmlFor="defaultInline3" className="custom-control-label">유해 성분 제외</label>
                            </div>
                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input" id="defaultInline4"/>
                                <label htmlFor="defaultInline4" className="custom-control-label">높은 위험도 성분 제외</label>
                            </div>
                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input" id="defaultInline5"/>
                                <label htmlFor="defaultInline5" className="custom-control-label">친환경 인증 제품</label>
                            </div>
            </div>
        )
    }
}