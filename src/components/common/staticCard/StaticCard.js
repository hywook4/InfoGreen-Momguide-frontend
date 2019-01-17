import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react';
import './StaticCard.css';

export const StaticCard = (props) => (
  <Card>
    <Image src={props.thumbnail} />
    
    <Card.Content extra>
      <h6><b>{props.name}</b></h6>
      <p>{props.description}</p>
      <Button style={{float:'right', backgroundColor: '#5dade2', textDecoration: 'none'}}>
        <a href={`/${props.section}/${props.index}`}>
          자세히 보기 &nbsp;
          <i class="fa fa-angle-right"></i>
        </a>
      </Button>
    </Card.Content>
  </Card>
)