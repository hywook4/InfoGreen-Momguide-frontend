import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Card, Image } from 'semantic-ui-react';

const ProductCard = (props) => {
  return(
  <Card>
      <Image href={`product-details/${props.name}`} src={props.src} alt={props.name}/>
      <Card.Content>
        <Card.Meta>{props.description}</Card.Meta>
        <Card.Header>{props.name}</Card.Header>
      </Card.Content>
  </Card>
)};

export default ProductCard;