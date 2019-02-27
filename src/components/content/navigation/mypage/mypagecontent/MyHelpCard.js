import React from 'react';
import {Link} from 'react-router-dom';
import './MyHelpRequest.css';
import TokenUtils from '../../../../../util/TokenUtil';
import axios from 'axios';

export class MyHelpCard extends React.Component{

    state = ({
        check: false,
        index: 0
    })


    componentDidMount=()=>{
        this.setState({
            check: this.props.check,
            index: this.props.index
        })
        console.log(this.props.index);
        console.log(this.props.check);
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.check !== prevState.check){
            return { check: nextProps.check };
        }
        return null;
    }

    deleteList = () => {
        const token = TokenUtils.getLoginToken();
        const query = `?index=${this.props.data.index}`;
        axios({
            method: 'delete',
            url: process.env.API_URL + '/api/ask/cancelOneToOne' + query,
            headers: TokenUtils.getTokenRequestHeader(token)
        })
        .then(() => {
            this.props.rerenderPage(this.props.currentPage);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    changeCheck = (e) => {
        this.props.changeCardCheck(this.state.index);
    }

    modifyRequest = (e) => {
        //TODO : 문의하기 내용 수정하기 처리
        console.log("선택된 문의내용 수정하기");
    }

    render(){
        const data = this.props.data;
        const date = data.created_at.slice(2, 10);
        const content = data.questionContent;
        return(
            <div className="myhelp-card">
                <div className="myhelp-card-checkbox">
                    <input type="checkbox" onChange={this.changeCheck} checked={this.state.check ? "checked" : ""}/>
                </div>
                <div className="myhelp-card-title">
                    <p>{date}</p>
                    <h6>{content}</h6>
                </div>
                <div className="myhelp-card-answer">
                    {
                        data.answered ? 
                        <Link to={`my-help/${this.props.index}`}>
                            <button type="button" className="myhelp-answer-on">답변&nbsp;보기</button>
                        </Link> : 
                        <button type="button" className="myhelp-answer-off">답변&nbsp;중</button>
                    }
                </div>
                <div className="myhelp-card-delete">
                    {
                        data.answered ? 
                        "" :
                        <Link to={`my-help/${this.props.index}`}>
                            <div className="modify-button" onClick={this.modifyRequest}>수정하기</div>
                        </Link>       
                    }
                    
                    <div className="cancel-button" data-toggle="modal" data-target={"#deleteModal" + this.state.index}>삭제하기</div>
                </div>

                <div className="modal fade" id={"deleteModal" + this.state.index} role="dialog">
                    <div className="modal-dialog modal-sm">
                        <div className="modal-content">
                            <div className="modal-body">
                                {/*<button type="button" class="close" data-dismiss="modal">&times;</button>*/}
                                <h6 className="myproduct-delete-confirm">삭제하시겠습니까?</h6>
                                <button type="button" className="cancel-btn btn-default" data-dismiss="modal">취소하기</button>
                                <button type="button" className="delete-btn btn-default" data-dismiss="modal"  onClick={this.deleteList}>삭제하기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
        
    }
}