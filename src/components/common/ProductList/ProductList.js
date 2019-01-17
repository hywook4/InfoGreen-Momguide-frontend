import React from 'react';
import { Card } from 'semantic-ui-react';
import ProductCard from '../../common/ProductCard/ProductCard';
import axios from 'axios';
import config from '../../../config';

import 'semantic-ui-css';
import styles from '../../common/CommonCSS/CommonCSS.css';

export class ProductList extends React.Component {
    state = {
        productByVote: [],
        productByStar: []
    }

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
    }
    
    /* Axios Call Over : Refactoring Required*/

    render () {
        return(
            <div className="productHeading">
                <div className="tip-heading">
                    <i style={{color: "red"}} className="fa fa-heart" aria-hidden="true"></i>
                    <h4>{this.props.category} 인기제품</h4>
                </div>
                <div className="rightDiv">
                    <div className="row">
                        <Card.Group itemsPerRow={5} stackable={true} doubling={true}>
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
                        </Card.Group>
                    </div>
                </div>
                <br />
                <br />
                <div className="tip-heading">
                    <i style={{color: "red"}} className="fa fa-heart" aria-hidden="true"></i>
                    <h4>{this.props.category} 성분 좋은 제품</h4>
                </div>
                <div className={styles.rightDiv}>
                    <div className="row">
                        <Card.Group itemsPerRow={5} stackable={true} doubling={true}>
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
                        </Card.Group>
                    </div>
                </div>
            </div>
        );
    }
}