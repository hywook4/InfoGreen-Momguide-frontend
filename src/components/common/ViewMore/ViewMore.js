import React from 'react';
import { Form, TextArea, Button  } from 'semantic-ui-react';
import config from '../../../config'

import axios from 'axios';

export class ViewMore extends React.Component {

    // Code borrowed from idsLogic
    constructor(props) {
        super(props);

        this.state = {
            item : {},
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const baseURL = config.CLIENT_SERVER+"/chemical/";
        const apiSection = this.props.section === "events" ? "event.php" : "tip.php";

        const apiURL = baseURL + apiSection;

        axios.post(apiURL)
            .then(items => {                
                const uniqueItem = items.data.filter(item => { return item.index_number === id; });

                this.setState({ item: uniqueItem[0] });
            });
    }

    render() {
        const baseURL = config.CLIENT_SERVER+"/chemical/";
        const imageSection = this.props.section === "events" ? "event_image/" : "tip_image/";
        const imageURL = baseURL + imageSection + this.state.item.image;
        
        return (

            <div className="container-tipsmore">
                {/* <div className="container-viewmore">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="sub-head">
                                <p>Some another text below the title</p>
                                <p>2018/00/00</p>
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="row" style={{marginTop: 83}}>
                        <div className="col-md-12"> */}
                <div className="tips-viewmore">
                    <div className="container">
                        <div className="container-viewmore">
                            <div className="tipsmore-heading">
                                <span className="dot"></span>
                                <h4>{this.state.item.title}</h4>
                            </div>    
                                <div className="sub-head">
                                    <p>{this.state.item.content}</p>
                                    <p className="tips-sub-para">{this.state.item.dateTime}</p>
                                </div>
                        </div>
                    </div> 
                        
                </div>   
                            
                {/* tips card img */}
                <div className="container">
                        <div className="tips-img">
                                {/* <Image src= 'http://www.skillings.com/wp-content/uploads/2017/02/placeholder-square.jpg' size='large' centered className="img-large" />   */}
                            <img className="img-fluid" src={imageURL} alt=""/>
                        </div> 
                        <div className="row">
                            <div className="col-md-10 tips-cmnt-inr-div">
                                <h6><b>댓글</b>&nbsp;&nbsp;&nbsp;&nbsp;<span>2018/12/31</span></h6>
                                
                                <Form>
                                    <TextArea className="tips-textarea" placeholder='댓글을 입력하세요' rows="3"/>
                                    <Button style={{float:'right', backgroundColor: 'rgb(96, 179, 162)', marginTop: 20, color: 'white'}}>제출하기</Button>
                                </Form>     
                            </div>
                        </div>
                </div> 
            </div>

        )
    }
}