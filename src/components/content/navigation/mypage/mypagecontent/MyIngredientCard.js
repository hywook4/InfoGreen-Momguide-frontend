import React from 'react';
import './MyIngredientRequest.css';


export class MyIngredientCard extends React.Component{

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
        console.log("delete help " + this.props.data.title);
        //TODO : 해당하는 문의 내용 삭제하기
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

        return(
            <div className="myingredient-card">
                <div className="myingredient-card-checkbox">
                    <input type="checkbox" onChange={this.changeCheck} checked={this.state.check ? "checked" : ""}/>
                </div>
                <div className="myingredient-card-image">
                    <div className="myingredient-img">
                        <img src={`${process.env.S3_URL}/product-images/living-product-images/강청/${'무첨가EM가루비누'}.jpg`} alt=""/>
                    </div>
                </div>
                <div className="myingredient-card-title">
                    <p>{data.date}</p>
                    <h6>종류</h6>
                    <h5>{data.title}</h5>
                </div>
                <div className="myingredient-card-answer">
                    {
                        data.answered ? 
                        <button type="button" className="myhelp-answer-on">답변&nbsp;보기</button> : // TODO : 누르면 상세 링크연결
                        <button type="button" className="myhelp-answer-off">답변&nbsp;중</button>
                    }
                </div>
                <div className="myingredient-card-delete">
                    {
                        data.answered ? 
                        "" :
                        <div className="modify-button" onClick={this.modifyRequest}>수정하기</div>
                    }
                    
                    <div className="cancel-button" data-toggle="modal" data-target="#deleteModal">삭제하기</div>
                </div>

                <div className="myingredient-card-content">
                    <h6>{data.content}</h6>
                </div>

                <div className="modal fade" id="deleteModal" role="dialog">
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