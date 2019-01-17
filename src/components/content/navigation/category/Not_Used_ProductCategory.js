import React from 'react';
import './Category.css';
import HighestProduct from '../category/HighestProduct';

export class ProductCategory extends React.Component{
    render(){
        return(
            <div className="prod-ctgy-inr-div">
                <div class="tab-content prod-ctgy-tabs">
                    
                    <div id="other" class="tab-pane active">
                        <div className="sub-ctgy-div">
                        <h1>Sub category</h1>
                                <ul className="nav nav-tabs ">
                                    <li className="active">
                                        <a href="#tab_default_1" data-toggle="tab">
                                        별점순  </a>
                                    </li>
                                    <li>
                                        <a href="#tab_default_2" data-toggle="tab">
                                        조회순</a>
                                    </li>
                                    <li>
                                        <a href="#tab_default_3" data-toggle="tab">
                                        최신순 </a>
                                    </li>
                                </ul>
                        </div>
                    </div>
                </div>


                <div className="prod-highest-category">
                    <HighestProduct/>
                </div>
            </div>
        )
    }
}