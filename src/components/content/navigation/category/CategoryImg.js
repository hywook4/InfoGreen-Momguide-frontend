import React from 'react';
//import './Category.css';
import './CategoryImg.css'
import {ProductRate} from './ProductRate'
import { Link } from 'react-router-dom';

const appendText={
    ingredient:{icon:require('../../../../assets/images/ingredient_open.png'),text:'성분 공개'},
    eco:{icon:require('../../../../assets/images/nature-friendly.png'),text:'친환경 인증'},
    includeCare:{icon:require('../../../../assets/images/yellow_baby.png'),text:'주의 성분'},
    includeToxic:{icon:require('../../../../assets/images/common_icons/warning.png'),text:'유해 성분'}
}

export class CategoryImg extends React.Component{
    state={
        rateAverage: 0
    };
    componentDidMount = async ()=>{
        let rateAverage = 0;
        if(this.props.data.rateCount === 0){

        } else{
            rateAverage = parseFloat(this.props.data.rateSum / this.props.data.rateCount).toFixed(2);
        }
        this.setState({
            rateAverage: rateAverage
        })
    };

    componentWillUnmount=()=>{
        this._ismounted = false; // <-- probable ANTI pattern, should move to flux implementation asap after the demo
    };

    render=() =>{
        let props = this.props.data;
        return(
            <div className="ctgy-inrimg-div loadedItem">
                <Link to={`/product-details/${props.category}/${props.index}`}>

                    <div className="card-top">
                        <div className="card-extra-block">
                        </div>
                        <div className="card-image-block">
                            <img src={`${process.env.S3_URL}/product-images/${this.props.mainCategory}-product-images/${this.props.data.brand}/${this.props.data.name}.jpg`} alt=""/>
                        </div>
                        <div className="card-extra-block">
                            {Object.keys(appendText).map((key,i)=>{
                                let toReturn = '';
                                let iconFlag = false;
                                switch(key){
                                    case 'ingredient':
                                        if(props.ingredient === "O") iconFlag = true;
                                        break;

                                    case 'eco':
                                        if(props.eco !== "" && props.eco !== undefined) iconFlag = true;
                                        break;

                                    case 'includeCare':
                                        if(props.includeCare) iconFlag = true;
                                        break;

                                    case 'includeToxic':   
                                        if(props.includeToxic) iconFlag = true;
                                        break;

                                    default:
                                        break;
                                }
                                if(iconFlag){
                                    return (
                                        <div key={i} className="card-icon-box">
                                            <img src={appendText[key].icon} alt="" />
                                        </div> 
                                    )
                                }
                                else {
                                    return toReturn;
                                }

                            })}
                        </div>
                    </div>

                    <div className="card-bottom">
                        <div className="card-label">
                            <div className="card-label-cell card-category"><p>{props.category}</p></div>
                            <div className="card-label-cell card-brand"><h6>{props.brand}</h6></div>
                            <div className="card-label-cell card-name"><h4>{props.name}</h4></div>
                        </div>
                        <div className="card-star">
                            <ProductRate config={{
                                selected: this.state.rateAverage,
                                rate: this.state.rateAverage,
                                participate: props.rateCount // participated people number goes here
                            }}
                            />
                        </div>
                    </div>
                </Link>
            </div>
            
        )
        }
    }