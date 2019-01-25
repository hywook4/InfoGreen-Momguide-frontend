import React from 'react';
import './Category.css';
import config from '../../../../config';
import {RatingRow as Ratings} from '../../product/prodSpec/Ratings';
import Axios from 'axios';

const appendText={
    opened:{icon:require('../../../../assets/images/eye.png'),text:'성분 공개',allowedVals:['1','2'],imgStyle:{width:'35px'}},
    auth_2:{icon:require('../../../../assets/images/nature-friendly.png'),text:'친환경 인증',allowedVals:[true],imgStyle:{width:'27px'}},
    caution:{icon:require('../../../../assets/images/yellow_baby.png'),text:'주의 성분',allowedVals:['1'],imgStyle:{width:'27px'}},
    harmful:{icon:require('../../../../assets/images/warning.png'),text:'유해 성분',allowedVals:['1'],imgStyle:{width:'20px'}}
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
            return(
                <div className="ctgy-inrimg-div loadedItem">
                    <div className="ctgy-img-desp-div">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <div className="sub-ctgy-img">
                                    <a href={`/product-details/${props.name}`}>
                                        <img style={{display:'block',margin:'auto',maxHeight:'248px'}} className="img-fluid" src={`${config.CLIENT_SERVER}/chemical/item_img/${props.image}`} alt=""/>
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-8 col-sm-12">
                                <div className="sub-ctgy-desp">
                                    <p>{props.category}</p>
                                    <h4>{props.brand}</h4>
                                    <h1>{props.name}</h1>
                                </div>
                                <div className="sub-ctgy-rating">
                                <div style={{display:'inline-block',textAlign:'center',lineHeight:'12px',marginBottom:'20px'}}>
                                    {Object.keys(appendText).map((key,i)=>{
                                        let toReturn = '';
                                        if((appendText[key].allowedVals.indexOf(this.state.details[key])!==-1)||(key==='auth_2' && this.state.details[key]!==null)){
                                        return (
                                            <div key={i} style={{display:'inline-block',marginRight:'5px'}}>
                                                <img style={appendText[key].imgStyle} src={appendText[key].icon} className="img-responsive" alt="" />
                                                <br/>
                                                <span style={{color:'grey',fontWeight:'bold',fontSize:10}}>{appendText[key].text}</span>
                                            </div> 
                                        )
                                        }
                                        return toReturn;
                                    })}
                                </div>
                                    <Ratings config={{
                                            selected:Math.round(props.star),
                                            trailingText:'', //2 (3명) <- text should come from the API call at somepoint
                                            hideSubHeading:true,
                                            text:'',
                                            removePadding:true,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }