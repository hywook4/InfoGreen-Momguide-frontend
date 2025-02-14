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


    render(){
        const data = this.props.data;
        const date = data.created_at.slice(2, 10);
        const content = data.questionContent;
        const answer = data.answerContent;
        const isAnswered = answer === null ? false : true;
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
                        isAnswered ? 
                        <Link to={`my-help/${data.index}`}>
                            <button type="button" className="myhelp-answer-on">답변&nbsp;보기</button>
                        </Link> : 
                        <button type="button" className="myhelp-answer-off">답변&nbsp;중</button>
                    }
                </div>
                <div className="myhelp-card-delete">
                    {
                        isAnswered ? 
                        "" :
                        <Link to={`my-help/${data.index}`}>
                            <div className="modify-button">수정하기</div>
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