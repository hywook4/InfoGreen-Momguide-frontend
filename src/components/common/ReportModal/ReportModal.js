import React from 'react';
import './ReportModal.css';

const user = {
    index: 1,
    imageUrl: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
    name: '테스트',
    sex: '남자',
    age: '23',
    childAge: '1',
}
export class ReportModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: user,
            reportContent: props.reportContent,
            reportModalId: props.reportModalId,
            checkedValue: "제품 내용과 관련 없는 리뷰",
            content: ""
        }
    }

    changeCheck = (e) => {
        this.setState({
            checkedValue: e.target.value
        })
    }

    changeContent = (e) => {
        this.setState({
            content: e.target.value
        })
    }

    submitReport = () => {
        console.log(this.state.checkedValue, this.state.content, this.state.reportContent.content);
    }

    render() {

        const reportType = [
            "제품 내용과 관련 없는 리뷰",
            "광고성, 대가성 리뷰",
            "동일 브랜드에 대한 도배 및 중복 리뷰",
            "연락처, SNS계정 등 개인정보가 포함된 리뷰",
            "타인에게 불쾌감을 주는 리뷰",
            "기타"
        ]
       
        return (
            <div className="modal fade" id={this.state.reportModalId} role="dialog">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">신고하기</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <form className="modal-report-checkbox">
                                {
                                    reportType.map((data, index)=> {
                                        return(
                                            <div className="report-type" key={index}>
                                                <input type="radio" id={index} name="report-type" value={data} onClick={this.changeCheck}
                                                defaultChecked={this.state.checkedValue === data ? "checked" : null}/>
                                                <label htmlFor={index}>{data}</label>
                                            </div>
                                        )
                                    })
                                }
                            </form>
                            <textarea className="report-content" placeholder="신고 사유를 자세히 작성해 주시면 빠른 처리가 가능합니다." onChange={this.changeContent}/>
                            <div className="modal-button-center">
                                <button type="button" className="report-confirm-button btn-default" data-dismiss="modal" onClick={this.submitReport}>신고</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}