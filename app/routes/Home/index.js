import React from 'react';
import { Link, withRouter } from 'react-router-dom';
let {connect} = require('react-redux');
import { userIsNotAuthenticated } from 'utils/router';

import Slider from 'react-slick';
import Layout from 'react-toolbox/lib/layout/Layout';
import Button from 'components/Button';
import { Grid, Row, Col } from 'react-flexbox-grid';
import styles from './index.css';
import InstagramFeed from 'containers/InstagramFeed/InstagramFeed'

@withRouter
@userIsNotAuthenticated
export default class Home extends React.Component {
  constructor() {
    super();
  }

  render() {

    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      draggable: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            draggable: true,
            slidesToShow: 1
          }
        }
      ]
    };

    return (
      <div className={styles.wrapper}>
        <div className={styles.ctaMarquee} style={{backgroundImage: 'url(/images/landing-placeholder.jpg)'}}>
          <h1 className={styles.header}>Rise Athletes</h1>
          <h2 className={styles.subheader}>Develop the Olympic mindset</h2>
          <div className={styles.ctas}>
            <Button className={styles.ctaButton} href="/signup" label="Schedule a free trial" flat hollow white />
            <span>OR</span>
            <Button className={styles.ctaButton} href="/login" label="Sign In" flat hollow white />
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.notificationBar}>
            <p>Sign up foor our next Live Webinar on May 5!</p>
            <Button className={styles.cta} label="RSVP HERE" flat hollow />
          </div>
        </div>

        <div className={styles.container}>
          <Grid fluid>
            <Row className={styles.newsletter}>
              <Col xs={12} md={7}>
                <h2 className={styles.header}>Lorem Ipsum</h2>
                <h3 className={styles.subheader}>Donec finibus nulla risus.</h3>
                <Button label="Subscribe to our Newsletter" flat hollow />
                <small className={styles.disclaimer}>Don’t worry we won’t ever share your information, and we give away lots of valuable free stuff!</small>
              </Col>
              <Col xs={12} md={5}>
                <p>Cras rhoncus, sem non feugiat consectetur, odio mauris placerat nisi, facilisis rhoncus arcu erat sit amet magna. Vivamus interdum odio id nulla facilisis laoreet. Praesent vitae elementum ligula. Aliquam sed massa a ante commodo efficitur non ac sem. Phasellus fringilla quam non eros suscipit maximus.</p>
              </Col>
            </Row>
          </Grid>
        </div>

        <div className={styles.container}>
          <Grid fluid>
            <Row className={styles.testimonials}>
              <Col xs={12} md={4} className={styles.testimonial}>
                <p>Cras rhoncus, sem non feugiat consectetur, odio mauris placerat nisi, facilisis rhoncus arcu erat sit amet magna. Vivamus interdum odio id nulla facilisis laoreet.</p>
                <author>John Frank</author>
                <div className={styles.title}>General Manager</div>
              </Col>
              <Col xs={12} md={4} className={styles.testimonial}>
                <p>Cras rhoncus, sem non feugiat consectetur, odio mauris placerat nisi, facilisis rhoncus arcu erat sit amet magna. Vivamus interdum odio id nulla facilisis laoreet.</p>
                <author>John Frank</author>
                <div className={styles.title}>General Manager</div>
              </Col>
              <Col xs={12} md={4} className={styles.testimonial}>
                <p>Cras rhoncus, sem non feugiat consectetur, odio mauris placerat nisi, facilisis rhoncus arcu erat sit amet magna. Vivamus interdum odio id nulla facilisis laoreet.</p>
                <author>John Frank</author>
                <div className={styles.title}>General Manager</div>
              </Col>
            </Row>
          </Grid>
        </div>

        <div className={styles.about}>
          <div className={styles.container}>
            <h2 className={styles.header}>Lorem ipsum</h2>
            <h3 className={styles.subheader}>Donec finibus nulla risus.</h3>
            <p className={styles.content}>Cras rhoncus, sem non feugiat consectetur, odio mauris placerat nisi, facilisis rhoncus arcu erat sit amet magna. Vivamus interdum odio id nulla facilisis laoreet. Praesent vitae elementum ligula. Aliquam sed massa a ante</p>
          </div>
        </div>

        <div className={styles.container}>
          <Slider className={styles.slider} {...settings}>
            <div>
              <div className={styles.slide} style={{backgroundImage: 'url(/images/placeholders/athlete.jpg)'}}>
                <div className={styles.overlay}>
                  <div className={styles.name}>Frank</div>
                  <div className={styles.tags}>Swimming, diving</div>
                  <date className={styles.dateJoined}>Joined Jan 2017</date>
                  <div className={styles.bio}>Cras rhoncus, sem non feugiat consectetur, odio mauris placerat nisi, facilisis rhoncus arcu erat sit amet magna. Vivamus interdum.</div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.slide} style={{backgroundImage: 'url(/images/placeholders/athlete2.jpg)'}}>
                <div className={styles.overlay}>
                  <div className={styles.name}>Frank</div>
                  <div className={styles.tags}>Swimming, diving</div>
                  <date className={styles.dateJoined}>Joined Jan 2017</date>
                  <div className={styles.bio}>Cras rhoncus, sem non feugiat consectetur, odio mauris placerat nisi, facilisis rhoncus arcu erat sit amet magna. Vivamus interdum.</div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.slide} style={{backgroundImage: 'url(/images/placeholders/athlete3.jpg)'}}>
                <div className={styles.overlay}>
                  <div className={styles.name}>Frank</div>
                  <div className={styles.tags}>Swimming, diving</div>
                  <date className={styles.dateJoined}>Joined Jan 2017</date>
                  <div className={styles.bio}>Cras rhoncus, sem non feugiat consectetur, odio mauris placerat nisi, facilisis rhoncus arcu erat sit amet magna. Vivamus interdum.</div>
                </div>
              </div>
            </div>
          </Slider>


          <Grid fluid>
            <Row className={styles.features}>
              <Col xs={12} md={4} className={styles.feature}>
                <i className="fa fa-trophy" />
                <h3 className={styles.title}>Title number one</h3>
                <p>Cras rhoncus, sem non feugiat consectetur, odio mauris placerat nisi, facilisis rhoncus arcu erat sit amet magna. Vivamus interdum.</p>
                <Button className={styles.cta} label="Learn more" flat hollow />
              </Col>
              <Col xs={12} md={4} className={styles.feature}>
                <i className="fa fa-trophy" />
                <h3 className={styles.title}>Title number one</h3>
                <p>Cras rhoncus, sem non feugiat consectetur, odio mauris placerat nisi, facilisis rhoncus arcu erat sit amet magna. Vivamus interdum.</p>
                <Button className={styles.cta} label="Learn more" flat hollow />
              </Col>
              <Col xs={12} md={4} className={styles.feature}>
                <i className="fa fa-trophy" />
                <h3 className={styles.title}>Title number one</h3>
                <p>Cras rhoncus, sem non feugiat consectetur, odio mauris placerat nisi, facilisis rhoncus arcu erat sit amet magna. Vivamus interdum.</p>
                <Button className={styles.cta} label="Learn more" flat hollow />
              </Col>
            </Row>
          </Grid>
        </div>

        <div
          className={styles.ctaMarquee}
          style={{backgroundImage: 'url(/images/landing-placeholder2.jpg)', position: 'relative', marginBottom: '-100px'}}
        >
          <h1 className={styles.header}>Want to join?</h1>
          <h2 className={styles.subheader}>Donec finibus nulla risus.</h2>
          <div className={styles.ctas}>
            <Button className={styles.ctaButton} href="/join" label="Schedule a free trial" flat hollow white />
            <span>OR</span>
            <Button className={styles.ctaButton} href="/login" label="Sign In" flat hollow white />
          </div>
        </div>

        <section className={styles.sectionSocial}>
          <InstagramFeed />
          <Button label="Follow us on Instagram" flat hollow white />
        </section>
      </div>
    )
  }
}
