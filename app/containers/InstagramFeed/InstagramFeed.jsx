import React from 'react';
import Instafeed from 'react-instafeed';
import { Card, CardMedia } from 'react-toolbox/lib/card';
import styles from './InstagramFeed.css';

class InstagramFeed extends React.Component {
  constructor() {
    super();
  }

  render() {
    const instafeedTarget = 'instafeed';

    return (
        <div className={styles.feed} id={instafeedTarget}>
          <Instafeed
            limit='4'
            ref='instafeed'
            resolution='standard_resolution'
            sortBy='most-recent'
            target={instafeedTarget}
            template={`<div class=${styles.item} style="background-image: url({{image}});"><a class=${styles.link} href={{link}} target="_new"></a></div>`}
            userId='2234856285'
            clientId='023dfe5661274e1bae8b1a0ec3dc7f1d'
            accessToken='2234856285.023dfe5.12c5c36e79f14f1cab36233c8856324e' // 2ca02d85b5aa48fdb97158e75cf5af78
          />
        </div>
    )
  }
}


module.exports = InstagramFeed;
