import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import '../CommonCSS/CommonCSS.css'
import './ProductCard.css';

const ProductCard = (props) => {
    return(
        <div className="product-card">
            <a className="product-image" href={`product-details/${props.name}`}>
                <img src={props.src} alt={props.name} />
            </a>
            <div className="product-content">
                <div className={`product-rank ${props.rank >= 4 ? 'product-low-rank' : ''}`}>{props.rank}</div>
                <div className="product-meta">{props.description}</div>
                <div className="product-header">{props.name}</div>
            </div>
        </div>
    )
};

export default ProductCard;