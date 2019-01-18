import React from 'react';
import './Product.css';
import {HashRouter as Router, Route, Link} from "react-router-dom";
import { ProductList } from '../../common/ProductList/ProductList';

export const Product=()=>{
    const houseHold = [
        {
            path:'/',
            name:'세탁세제',
            category:'세탁세제'
        },
        {
            path:'/fabric',
            name:'섬유유연제',
            category:'섬유유연제'
        },
        {
            path:'/dishwashing',
            name:'주방세제',
            category:'주방세제'
        },
        {
            path:'/odor',
            name:'탈취제',
            category:'탈취제'
        },
        {
            path:'/other',
            name:'기타세정제',
            category:'기타세정제'
        }
    ];
    const cosmetics = [
        {
            path:'/soap',
            name:'워시',
            category:'워시'
        },
        {
            path:'/lotion',
            name:'로션',
            category:'로션'
        },
        {
            path:'/cream',
            name:'크림',
            category:'크림'
        },
        {
            path:'/oil',
            name:'오일',
            category:'오일'
        },
        {
            path:'/powder',
            name:'파우더',
            category:'파우더'
        },
        {
            path:'/hair',
            name:'헤어케어',
            category:'헤어케어'
        },
        {
            path:'/suncare',
            name:'선케어',
            category:'선케어'
        },
        {
            path:'/babywipes',
            name:'물티슈',
            category:'물티슈'
        },
        {
            path:'/handsanitizer',
            name:'손세정제',
            category:'손세정제'
        },
        {
            path:'/othercosmetics',
            name:'기타화장품',
            category:'기타화장품'
        },
    ]

    return(
       <div className="product">
           <div className="product_inner">
            <Router>
                <div className="product_div">
                    <div className="product-top-div">
                        <div className="product-menu">
                            <nav className="menu-button">
                                <a className="circle-button"><img src={require(`../../../assets/images/living_0.png`)} href="/"  /> </a>
                                <a className="circle-button"><img src={require(`../../../assets/images/cosmetic_0.png`)} href="/" /> </a>
                            </nav>
                            <ul className="product_category">
                                {houseHold.map((d,i)=><li className="prod_ctgy_type" key={i}><Link to={d.path}>{d.name}</Link></li>)}
                            </ul>
                            <ul className="product_category">
                                {cosmetics.map((d,i)=><li className="prod_ctgy_type" key={i}><Link to={d.path}>{d.name}</Link></li>)}
                            </ul>
                        </div>
                    </div>
                    
                    <div className="product-content">
                        <div className="content-info">
                            {houseHold.map((d,i)=><Route key={i} path={d.path} exact={true} component={()=><ProductList category={d.category}/>} />)}
                        </div> 
                        <div className="content-info-below">
                            {cosmetics.map((d,i)=><Route key={i} path={d.path} exact={true} component={()=><ProductList category={d.category}/>} />)}
                        </div>  
                    </div>
                </div>
            </Router>    

            </div>
        </div>
    )
}