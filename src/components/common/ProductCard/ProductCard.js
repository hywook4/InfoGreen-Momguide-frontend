import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Card, Image } from 'semantic-ui-react';
import '../CommonCSS/CommonCSS.css'

const ProductCard = (props) => {
  return(
  <div className="ui card">
      <Image href={`product-details/${props.name}`} src={props.src} alt={props.name}/>
      <Card.Content>
        <Card.Meta>{props.description}</Card.Meta>
        <div className="ui header">{props.name}</div>
      </Card.Content>
  </div>
)};

export default ProductCard;