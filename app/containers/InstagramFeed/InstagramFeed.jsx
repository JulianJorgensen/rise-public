import React from 'react';
import Instafeed from 'react-instafeed';
import styles from './InstagramFeed.css';

export default class InstagramFeed extends React.Component {
  render() {
    return (
        <div className={styles.feed} id='instafeed'>
          <Instafeed
            limit='4'
            target='instafeed'
            resolution='standard_resolution'
            sortBy='most-recent'
            template={`<div class=${styles.item} style="background-image: url({{image}});"><a class=${styles.link} href={{link}} target="_new"></a></div>`}
            userId='2234856285'
            clientId='023dfe5661274e1bae8b1a0ec3dc7f1d'
            accessToken='2234856285.023dfe5.c8a202b23ddb409db9e1f4918156440a' // 2ca02d85b5aa48fdb97158e75cf5af78
          />
        </div>
    )
  }
}
