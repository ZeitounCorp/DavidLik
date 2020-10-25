import React, { Component, createRef } from 'react';
import { Menu, Sticky } from 'semantic-ui-react';

let scrollOptions = {
  left: 0,
  top: 0
};

let scrollOptionsAnimated = {
  left: 0,
  top: 0,
  behavior: 'smooth'
};

class DefaultLayout extends Component {

  stickyRef = createRef();

  navigate = (locator) => {
    this.setState({ visible: false });
    switch (locator) {
      case 'logo':
      case 'home':
        if (window.location.pathname === '/') {
          window.scrollTo(scrollOptionsAnimated);
        } else {
          this.props.history.push('/');
          window.scrollTo(scrollOptions);
        }
        break;
      default:
        break;
    }
  }


  render() {
    return (
      <div ref={this.stickyRef}>
        <Sticky context={this.stickyRef}>
          <Menu>
            <Menu.Item
              onClick={(e) => this.navigate('logo')}>
              <img src='/images/LikDavFT.jpeg' alt='David Likoud' />
            </Menu.Item>

            <Menu.Item>
              Faire un don à David Sadoun Likoud
            </Menu.Item>
          </Menu>
        </Sticky>
        {this.props.content}
      </div>
    )
  }
}
export default DefaultLayout
