import React from 'react';
import './OpenRequest.css';


const appendText={
    ingredient:{icon:require('../../../../../assets/images/ingredient_open.png'),text:'성분 공개'},
    eco:{icon:require('../../../../../assets/images/nature-friendly.png'),text:'친환경 인증'},
    includeCare:{icon:require('../../../../../assets/images/yellow_baby.png'),text:'주의 성분'},
    includeToxic:{icon:require('../../../../../assets/images/common_icons/warning.png'),text:'유해 성분'}
}

export class OpenRequestCard extends React.Component{

    state = ({

    })


    componentDidMount=()=>{

    };


    render(){
        const data = this.props.data;

        return(
            <div className="openrequest-card">
                <div className="openrequest-card-img">
                    <div className="openrequest-img">
                        {<img src={`${process.env.S3_URL}/product-images/living-product-images/${data.brand}/${data.name}.jpg`} alt=""/>}
                    </div>
                </div>
                <div className="openrequest-card-name">
                    <p>{data.brand}</p>
                    <h5>{data.name}</h5>
                </div>
                <div className="openrequest-card-info">
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

            </div>
        )
        
    }
}