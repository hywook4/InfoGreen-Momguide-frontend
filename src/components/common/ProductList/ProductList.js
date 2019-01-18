import React from 'react';
import ProductCard from '../../common/ProductCard/ProductCard';
import axios from 'axios';
import config from '../../../config';

import 'semantic-ui-css';

export class ProductList extends React.Component {
    state = {
        productByVote: [],
        productByStar: []
    };

    // This messy part should go through refactoring
    componentDidMount= async ()=> {
        // Search by number of votes
        const voteParams = new URLSearchParams();
        voteParams.append("category", this.props.category);
        voteParams.append("sort", "vote");
        var products = await axios.post(`${config.CLIENT_SERVER}/chemical/items_limit.php`, voteParams)
        this.setState({ productByVote: products.data[0].slice(0, 5) });

        // Search by number of stars
        const starParams = new URLSearchParams();
        starParams.append("category", this.props.category);
        starParams.append("sort", "star");
        products = await axios.post(`${config.CLIENT_SERVER}/chemical/items_limit.php`, starParams);
        this.setState({ productByStar: products.data[0].slice(0, 5) });
    };
    
    /* Axios Call Over : Refactoring Required*/

    render () {
        return(
            <div className="productHeading">
                <div className="product-head">
                    {/*<i style={{color: "red"}} className="fa fa-heart" aria-hidden="true"></i>*/} 
                    <h4>인기제품</h4>
                    <p>&emsp;|&emsp;카테고리별 가장 인기 있는 제품입니다. </p>
                </div>
                <div className="rightDiv">
                    <div>
                        {
                            this.state.productByVote.map((product, index) =>
                            <ProductCard
                                payload={product}
                                key={index}
                                src={`${config.CLIENT_SERVER}/chemical/item_img/${product.image}`}
                                category={product.category}
                                name={product.name}
                                description={product.brand}
                                rating={product.star}
                            />
                        )}
                    </div>
                </div>
                <br />
                <br />
                <div className="product-head">
                    {/*<i style={{color: "red"}} className="fa fa-heart" aria-hidden="true"></i>*/}
                    <h4>성분 좋은 제품</h4>
                    <p>&emsp;|&emsp;카테고리별 가장 성분이 좋은 제품입니다. </p>
                </div>
                <div className="rightDiv">
                    <div>
                        {
                            this.state.productByStar.map((product, index) =>
                            <ProductCard
                                payload={product}
                                key={index}
                                src={`${config.CLIENT_SERVER}/chemical/item_img/${product.image}`}
                                category={product.category}
                                name={product.name}
                                description={product.brand}
                                rating={product.star}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}