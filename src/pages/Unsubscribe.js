import React, { Component } from 'react';
import { Grid, Container, Button, Form, Card, Message } from 'semantic-ui-react';
import BackEnd from '../api';

class Unsubscribe extends Component {
  state = {
    loading: false,
    success: false,
    error: false,
    firstname: '',
    lastname: '',
    email: ''
  }

  // Merging each field's value of the form into state
  handleChangeContact = (e, { value }) => {
    let field = e.target.attributes.name.nodeValue;
    this.setState({ [`${field}`]: value });
  };
  handleDismissPos = () => {
    this.setState({ success: false })
  }

  handleDismissNeg = () => {
    this.setState({ error: false })
  }

  ask_unsubscribe = async () => {
    this.setState({ loading: true });
    const { email, firstname, lastname } = this.state;
    try {
      const send_unsubscribe = await BackEnd.post('/unsub_/doit', {
        email: email,
        firstname: firstname,
        lastname: lastname
      });
      if (send_unsubscribe) {
        this.setState({ loading: false });
        const { data } = send_unsubscribe;
        if (data.status === 200) {
          this.setState({ success: true, firstname: '', lastname: '' });
        } else {
          this.setState({ error: true, firstname: '', lastname: '' });
        }
      }
    } catch (e) {
      this.setState({ loading: false, error: true, firstname: '', lastname: '' });
    }
  }

  render() {
    const { loading, success, error, firstname, lastname, email } = this.state;
    return (
      <Container style={{ marginTop: 52 }}>
        <Grid centered>
          <Grid.Row>
            <Card>
              <Card.Content header='Nous sommes désolés de vous voir partir' />
              <Card.Content>
                <Form loading={loading}>
                  <Form.Group widths='equal'>
                    <Form.Field>
                      <label style={{ textAlign: 'left', color: '#696970' }}>Prénom</label>
                      <Form.Input fluid name="firstname" value={firstname} placeholder={'Prénom'} onChange={this.handleChangeContact} />
                    </Form.Field>
                    <Form.Field>
                      <label style={{ textAlign: 'left', color: '#696970' }}>Nom de Famille</label>
                      <Form.Input fluid name="lastname" value={lastname} placeholder={'Nom de Famille'} onChange={this.handleChangeContact} />
                    </Form.Field>
                  </Form.Group>
                  <Form.Field >
                    <label style={{ textAlign: 'left', color: '#696970' }}>Email avec lequel vous vous êtes abonnés</label>
                    <Form.Input fluid name="email" value={email} placeholder={'Email'} onChange={this.handleChangeContact} />
                  </Form.Field>
                  {success && (
                    <Message positive onDismiss={this.handleDismissPos} content={'Votre demande a été prise en compte, nous reviendrons vers vous dans les plus brefs délais avec la confirmation, vous pouvez fermer cette page à présent.'} />
                  )}
                  {error && (
                    <Message negative onDismiss={this.handleDismissNeg} content={'Une erreur est survenue, vérifiez que vous êtes bien connectés à internet et réessayez'} />
                  )}
                </Form>
              </Card.Content>
              <Card.Content extra>
                <Button disabled={!email || !firstname || !lastname} negative onClick={this.ask_unsubscribe}>Annuler le versement mensuel</Button>
              </Card.Content>
            </Card>
          </Grid.Row>
          <Grid.Row>
            <Button primary onClick={() => this.props.history.push('/')}>Retourner à l'accueil</Button>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}
export default Unsubscribe
