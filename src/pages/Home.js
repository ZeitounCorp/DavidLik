import React, { Component } from 'react';
import { Container, Grid, Image, Card, Loader } from 'semantic-ui-react';
import { isMobile } from "react-device-detect";
import BackEnd from '../api';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_MODE === 'DEV' ? process.env.REACT_APP_STRIPE_PUBLIC_KEY_DEMO : process.env.REACT_APP_STRIPE_PUBLIC_KEY_LIVE);

class Home extends Component {

  state = {
    products: null,
    loading: true
  }

  async componentDidMount() {
    this.setState({ loading: true });
    try {
      const get_products = await BackEnd.get('/stripe/list-of-available-subs');
      if (get_products) {
        const { data } = get_products;
        this.setState({ products: data.products }, () => {
          this.setState({ loading: false });
        });
      }
    } catch (e) {
      this.setState({ loading: false });
    }
  }

  async get_subscription(id) {
    this.setState({ loading: true });
    const stripe = await stripePromise;

    // Call backend to create the Checkout Session
    const response = await BackEnd.post('/stripe/create-checkout-session', { prod_id: id });

    if (response) {
      const { data } = response;
      const result = await stripe.redirectToCheckout({
        sessionId: data.id,
      });
      this.setState({ loading: false });
      if (result.error) {
       console.log(result.error.message);
      }
    }
  }

  render() {
    const { products, loading } = this.state;
    return (
      <Container style={{ marginTop: 52 }}>
        <Grid columns={2} stackable centered>
          <Grid.Row>
            <Grid.Column textAlign={'center'}>
              <Card centered={isMobile}>
                <Image src={'/images/LikDavFT.jpeg'} size={'medium'} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>David Sadoun</Card.Header>
                  <Card.Meta>
                    <span className='date'>Membre du Likoud</span>
                  </Card.Meta>
                  <Card.Description>
                    <p style={{ fontSize: 12 }}>David Sadoun est un israélien francophone engagé dans le parti du Likoud depuis le 02 Août 2020 pour le Grand Israël et la reconstruction du Troisième Temple.
                    David souhaite également se battre pour l’amélioration des conditions sociales du pays.
                    Si vous vous identifiez aux idées de David, participez activement à son engagement en le soutenant financièrement avec un don mensuel récurrent.
                    </p>
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column verticalAlign={'middle'}>
              <h1 style={{ textAlign: 'center', marginBottom: 52 }}> Faire un don mensuel récurrent</h1>

              {loading && (
                <Loader active inline='centered' size='massive' />
              )}

              {!loading && products && (
                <Card.Group itemsPerRow={4} centered>
                  {products !== [] && products.map((prod, index) =>
                    <Card key={index} color='blue' image={prod.images[0]} style={{ cursor: 'pointer' }} onClick={() => this.get_subscription(prod.metadata.price_id)}/>
                  )}
                </Card.Group>
              )}


            </Grid.Column>
          </Grid.Row>
        </Grid>
        <br />
        <Grid centered style={{ marginTop: 26 }}>
          <p style={{cursor: 'pointer'}}>Se <a onClick={() => this.props.history.push('/unsubscribe')}>désabonner</a></p>
        </Grid>
      </Container>
    )
  }
}
export default Home
