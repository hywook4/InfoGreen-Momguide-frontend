import React from 'react';
import ProductCard from '../../common/ProductCard/ProductCard';
import axios from 'axios';

import 'semantic-ui-css';

export class ProductList extends React.Component {
    state = {
        productByVote: [],
        productByIngredient: []
    };

    // This messy part should go through refactoring
    componentDidMount = async ()=> {
        // Search by number of votes
        console.log(this.props.mainCategory, this.props.subCategory);

        let products = await axios.get(`${process.env.API_URL}/api/product/popularRank?mainCategory=${this.props.mainCategory}&subCategory=${this.props.subCategory}`);
        const newState = ({ productByVote: products.data });

        // Search by number of stars
        products = await axios.get(`${process.env.API_URL}/api/product/goodIngredientItem?mainCategory=${this.props.mainCategory}&subCategory=${this.props.subCategory}`);
        this.setState({ ...newState, productByIngredient: products.data});
    };
    
    componentWillReceiveProps = async (nextProps) => {
        let products = await axios.get(`${process.env.API_URL}/api/product/popularRank?mainCategory=${nextProps.mainCategory}&subCategory=${nextProps.subCategory}`);
        const newState = ({ productByVote: products.data });

        // Search by number of stars
        products = await axios.get(`${process.env.API_URL}/api/product/goodIngredientItem?mainCategory=${nextProps.mainCategory}&subCategory=${nextProps.subCategory}`);
        this.setState({ ...newState, productByIngredient: products.data});
    }

    /* Axios Call Over : Refactoring Required*/

    render () {
        let s3Url = `${process.env.S3_URL}/product-images/`;

        if (this.props.mainCategory === 'living') {
            s3Url += "living-product-images/";
        } else {
            s3Url += "cosmetic-product-images/";
        }

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
                                rank={index+1}
                                src={encodeURI(`${s3Url}${product.brand}/${product.name}.jpg`.replace(/ /g, '+'))}
                                name={product.name}
                                description={product.brand}
                            />
                        )}
                    </div>
                </div>
                <br />
                <br />
                <div className="product-head">
                    {/*<i style={{color: "red"}} className="fa fa-heart" aria-hidden="true"></i>*/}
                    <h4>성분 좋은 제품</h4>
                    <p>&emsp;|&emsp;카테고리별 주의 성분이 없는 제품을 보여드립니다. </p>
                </div>
                <div className="rightDiv">
                    <div>
                        {
                            this.state.productByIngredient.map((product, index) =>
                            <ProductCard
                                payload={product}
                                key={index}
                                rank={index+1}
                                src={encodeURI(`${s3Url}${product.brand}/${product.name}.jpg`.replace(/ /g, '+'))}
                                name={product.name}
                                description={product.brand}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}