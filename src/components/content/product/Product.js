import React from 'react';
import './Product.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { ProductList } from '../../common/ProductList/ProductList';
import { ProductSearch } from './productSearch/ProductSearch';

export class Product extends React.Component {
    render() {
        const houseHold = [
            {
                path:'/',
                name:'세탁세제',
                category:'laundry'
            },
            {
                path:'/fabric',
                name:'섬유유연제',
                category:'fabric'
            },
            {
                path:'/dishwashing',
                name:'주방세제',
                category:'dishwashing'
            },
            {
                path:'/odor',
                name:'탈취제',
                category:'odor'
            },
            {
                path:'/other',
                name:'기타세정제',
                category:'other'
            }
        ];
        const cosmetics = [
            {
                path:'/soap',
                name:'워시',
                category:'soap'
            },
            {
                path:'/lotion',
                name:'로션',
                category:'lotion'
            },
            {
                path:'/cream',
                name:'크림',
                category:'cream'
            },
            {
                path:'/oil',
                name:'오일',
                category:'oil'
            },
            {
                path:'/powder',
                name:'파우더',
                category:'powder'
            },
            {
                path:'/hair',
                name:'헤어케어',
                category:'haircare'
            },
            {
                path:'/suncare',
                name:'선케어',
                category:'suncare'
            },
            {
                path:'/babywipes',
                name:'물티슈',
                category:'tissue'
            },
            {
                path:'/handsanitizer',
                name:'립케어',
                category:'lipcare'
            },
            {
                path:'/othercosmetics',
                name:'기타화장품',
                category:'other'
            },
        ];

        return(
            <div className="product">
                <div className="product_inner">
                    <Router>
                        <div className="product_div">
                            <ProductSearch />

                            <div className="product-content">
                                <div className="content-info">
                                    {houseHold.map((d,i)=><Route key={i} path={d.path} exact={true} component={()=><ProductList mainCategory={'living'} subCategory={d.category}/>} />)}
                                </div>
                                <div className="content-info-below">
                                    {cosmetics.map((d,i)=><Route key={i} path={d.path} exact={true} component={()=><ProductList mainCategory={'cosmetic'} subCategory={d.category}/>} />)}
                                </div>
                            </div>
                        </div>
                    </Router>

                </div>
            </div>
        )

    }
}