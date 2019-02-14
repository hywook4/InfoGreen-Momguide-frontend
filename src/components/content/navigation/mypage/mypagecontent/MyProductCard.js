import React from 'react';
import './MyProducts.css';


const appendText={
    ingredient:{icon:require('../../../../../assets/images/ingredient_open.png'),text:'성분 공개'},
    eco:{icon:require('../../../../../assets/images/nature-friendly.png'),text:'친환경 인증'},
    includeCare:{icon:require('../../../../../assets/images/yellow_baby.png'),text:'주의 성분'},
    includeToxic:{icon:require('../../../../../assets/images/common_icons/warning.png'),text:'유해 성분'}
}

export class MyProductCard extends React.Component{

    state = ({
        mainCategory: "",
        check: false,
        index: 0
    })


    componentDidMount=()=>{
        this.setState({
            mainCategory: this.props.mainCategory,
            check: this.props.check,
            index: this.props.index
        })
        console.log(this.props.mainCategory);
        console.log(this.props.index);
        console.log(this.props.check);
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.check !== prevState.check){
            return { check: nextProps.check };
        }
        return null;
    }

    deleteProduct = () => {
        console.log("delete product " + this.props.data.name);
        //TODO : 해당하는 제품 삭제 요청 보내긴
    }

    changeCheck = (e) => {
        this.props.changeCardCheck(this.state.index);
    }

    render(){
        const data = this.props.data;

        return(
            <div className="myproduct-card">
                <div className="myproduct-card-checkbox">
                    <input type="checkbox" onChange={this.changeCheck} checked={this.state.check ? "checked" : ""}/>
                </div>
                <div className="myproduct-card-image">
                    <div className="myproduct-img">
                        <img src={`${process.env.S3_URL}/product-images/${this.props.mainCategory}-product-images/${data.brand}/${data.name}.jpg`} alt=""/>
                    </div>
                </div>
                <div className="myproduct-card-name">
                    <p>{data.brand}</p>
                    <h5>{data.name}</h5>
                </div>
                <div className="myproduct-card-info">
                    {Object.keys(appendText).map((key,i)=>{
                        let toReturn = '';
                        let iconFlag = false;
                        switch(key){
                            case 'ingredient':
                                if(data.ingredient === "O") iconFlag = true;
                                break;

                            case 'eco':
                                if(data.eco !== "" && data.eco !== undefined) iconFlag = true;
                                break;

                            case 'includeCare':
                                if(data.includeCare) iconFlag = true;
                                break;

                            case 'includeToxic':   
                                if(data.includeToxic) iconFlag = true;
                                break;
                            
                            default:
                                break;
                        }
                        if(iconFlag){
                            return (
                                <div key={i} className="myproduct-card-info-icon">
                                    <img src={appendText[key].icon} alt="" />
                                </div> 
                            )
                        }
                        else {
                            return toReturn;
                        }
                    })}
                </div>
                <div className="myproduct-card-delete">
                    <div className="cancel-button" data-toggle="modal" data-target="#deleteModal">삭제하기</div>
                </div>
                <div className="modal fade" id="deleteModal" role="dialog">
                    <div className="modal-dialog modal-sm">
                        <div className="modal-content">
                            <div className="modal-body">
                                {/*<button type="button" class="close" data-dismiss="modal">&times;</button>*/}
                                <h6 className="myproduct-delete-confirm">삭제하시겠습니까?</h6>
                                <button type="button" className="cancel-btn btn-default" data-dismiss="modal">취소하기</button>
                                <button type="button" className="delete-btn btn-default" data-dismiss="modal"  onClick={this.deleteProduct}>삭제하기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
        
    }
}