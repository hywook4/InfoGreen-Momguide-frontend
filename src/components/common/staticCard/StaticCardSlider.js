import React from 'react'
import { Card, Icon, Image, Button } from 'semantic-ui-react';

export const StaticCardSlider = () => (
  <Card>
    <Image src='http://www.skillings.com/wp-content/uploads/2017/02/placeholder-square.jpg' />
    
    <Card.Content extra>
      <h6><b>Main Heading</b></h6>
      <p>Some Related Content</p>
      <Button style={{float:'right', backgroundColor: '#5dade2'}}>View</Button>
    </Card.Content>
  </Card>
)

// export default StaticCardSlider;