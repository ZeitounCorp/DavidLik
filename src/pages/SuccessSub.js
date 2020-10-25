import React, { Component } from 'react';
import { Grid, Icon, Container, Button } from 'semantic-ui-react';

class SuccessSub extends Component {
  render() {
    return (
      <Container style={{ marginTop: 52 }}>
        <Grid centered>
          <Icon size={'huge'} name={'check circle outline'} color={'green'} />
          <h1>Merci pour votre soutien, nous vous sommes très reconnaissant et sommes fiers de vous compter parmi nous</h1>
          <Button primary onClick={() => this.props.history.push('/')}>Retourner à l'accueil</Button>
        </Grid>
      </Container>
    )
  }
}
export default SuccessSub
