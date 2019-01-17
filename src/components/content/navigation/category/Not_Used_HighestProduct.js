import React from 'react';
import './Category.css';
import {Checkbox} from '../category/Checkbox';
import {CategoryImg} from '../category/CategoryImg';

import { connect } from "react-redux";

class HighestProduct extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div className="high-prod-div">
                <div className="high-prod-inr-div">
                    <div className="high-prod-heading">
                        <div class="tab-content">
                            <div class="tab-pane active" id="tab_default_1">
                            
                                {this.props.items.map((item, index) => <div>{100}</div>)}
                                <Checkbox/>
                                <CategoryImg/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = states => {
    return {
        items: states.items.items,
    };
}

export default connect(mapStateToProps, null)(HighestProduct);