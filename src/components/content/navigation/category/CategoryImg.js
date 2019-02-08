import React from 'react';
//import './Category.css';
import config from '../../../../config';
import Axios from 'axios';
import './CategoryImg.css'
import {ProductRate} from './ProductRate'

const appendText={
    ingredient:{icon:require('../../../../assets/images/ingredient_open.png'),text:'성분 공개'},
    eco:{icon:require('../../../../assets/images/nature-friendly.png'),text:'친환경 인증'},
    includeCare:{icon:require('../../../../assets/images/yellow_baby.png'),text:'주의 성분'},
    includeToxic:{icon:require('../../../../assets/images/warning.png'),text:'유해 성분'}
}

export class CategoryImg extends React.Component{
    state={details:{}}
    componentDidMount= async ()=>{
        this._ismounted = true;

        const params = new URLSearchParams();
        params.append("name", this.props.name);
        let resp = await Axios.post(`${config.CLIENT_SERVER}/chemical/item_info.php`, params);
            this._ismounted && this.setState({details: resp.data}) 
            // Above USAGE OF _ismounted probable ANTI pattern, should move to flux implementation asap after the demo
                
            
    }

    componentWillUnmount=()=>{
        this._ismounted = false; // <-- probable ANTI pattern, should move to flux implementation asap after the demo
    }
    render=() =>{
        let props = this.props.data;
        console.log(props);
        return(
            <div className="ctgy-inrimg-div loadedItem">
                <a href={`/product-details/${props.name}`}>

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
                                selected: parseFloat(props.rateSum / props.rateCount).toFixed(2),
                                rate: parseFloat(props.rateSum / props.rateCount).toFixed(2),
                                participate: props.rateCount // participated people number goes here
                            }}
                            />
                        </div>
                    </div>
                </a>
            </div>
            
        )
        }
    }