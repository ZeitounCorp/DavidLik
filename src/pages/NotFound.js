import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { isBrowser, isMobile } from "react-device-detect";

class NotFound extends Component {
  render() {
    return (
      <div>
        <Grid centered columns={1}>
          <Grid.Column>
            {isBrowser && (
              <Image src={'/images/svg/page_not_found.svg'} size={'big'} centered />
            )}
            {isMobile && (
              <Image src={'/images/page_not_found.png'} size={'big'} centered />
            )}
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
export default NotFound
