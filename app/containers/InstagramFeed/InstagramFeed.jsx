import React from 'react';
import Instafeed from 'react-instafeed';
import { Card, CardMedia } from 'react-toolbox/lib/card';
import { Grid, Row, Col } from 'react-flexbox-grid';
import styles from './InstagramFeed.css';


class InstagramFeed extends React.Component {
  constructor() {
    super();
  }

  render() {
    const instafeedTarget = 'instafeed';

    return (
      // <div id={instafeedTarget}>
      //   <Instafeed
      //     limit='5'
      //     ref='instafeed'
      //     resolution='standard_resolution'
      //     sortBy='most-recent'
      //     target={instafeedTarget}
      //     template=''
      //     userId='userIdInstagramApiString'
      //     clientId='clientIdInstagramApiString'
      //     accessToken='accessTokenInstagramApiString'
      //   />
      // </div>
      <Grid fluid className={styles.feed}>
        <Row>
          <Col xs={6} md={3} className={styles.item}>
            <img src="/images/placeholders/Bitmap4.jpg" />
          </Col>
          <Col xs={6} md={3} className={styles.item}>
            <img src="/images/placeholders/Bitmap3.jpg" />
          </Col>
          <Col xs={6} md={3} className={styles.item}>
            <img src="/images/placeholders/Bitmap2.jpg" />
          </Col>
          <Col xs={6} md={3} className={styles.item}>
            <img src="/images/placeholders/Bitmap.jpg" />
          </Col>
        </Row>
      </Grid>
    )
  }
}


module.exports = InstagramFeed;
