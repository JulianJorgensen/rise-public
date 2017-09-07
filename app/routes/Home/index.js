import React from 'react';
import { Link, withRouter } from 'react-router-dom';
let {connect} = require('react-redux');
import { userIsNotAuthenticated } from 'utils/router';

import Slider from 'react-slick';
import Layout from 'react-toolbox/lib/layout/Layout';
import Button from 'components/Button';
import { Grid, Row, Col } from 'react-flexbox-grid';
import styles from './index.css';
import InstagramFeed from 'containers/InstagramFeed/InstagramFeed';
import NewsletterSignup from 'containers/NewsletterSignup';

import { Parallax } from 'react-parallax';

import MentoringIcon from '-!svg-react-loader?name=Icon!assets/icons/regular/laptop.svg';
import SupportIcon from '-!svg-react-loader?name=Icon!assets/icons/regular/heart.svg';
import AllInclusiveIcon from '-!svg-react-loader?name=Icon!assets/icons/regular/globe.svg';

@withRouter
@userIsNotAuthenticated
export default class Home extends React.Component {
  constructor() {
    super();
  }

  render() {
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
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
        <Parallax className={styles.ctaMarquee} bgImage="/images/RISE-Hero-1.jpg" strength={400}>
          <h1 className={styles.header}>RISE Athletes</h1>
          <h2 className={styles.subheader}>Develop the Olympic mindset</h2>
          <div className={styles.ctas}>
            <Button className={styles.ctaButtonWrapper} href="/signup" flat hollow white><div className={styles.ctaButton}>Schedule a free trial</div></Button>
            <span>OR</span>
            <Button className={styles.ctaButtonWrapper} href="/login" flat hollow white><div className={styles.ctaButton}>Sign In</div></Button>
          </div>
        </Parallax>

        <div className={styles.container}>
          <h2 className={styles.mentorHeader}>Be Your Best with a RISE Mentor</h2>
          <Slider className={styles.slider} {...settings}>
            <div>
              <div className={styles.slide} style={{backgroundImage: 'url(/images/mentors/Elizabeth_Beisel.jpg)'}}>
                <div className={styles.overlay}>
                  <div className={styles.name}>Elizabeth Beisel</div>
                  <div className={styles.tags}>Swimming, 2008, 2012, 2016, USA</div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.slide} style={{backgroundImage: 'url(/images/mentors/Ian_Crocker.jpeg)'}}>
                <div className={styles.overlay}>
                  <div className={styles.name}>Ian Crocker</div>
                  <div className={styles.tags}>Swimming, 2000, 2004, 2008, USA</div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.slide} style={{backgroundImage: 'url(/images/mentors/Bridget_Sloan.jpeg)'}}>
                <div className={styles.overlay}>
                  <div className={styles.name}>Bridget Sloan</div>
                  <div className={styles.tags}>Gymnastics, 2008, USA</div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.slide} style={{backgroundImage: 'url(/images/mentors/Adam_Mania.jpeg)'}}>
                <div className={styles.overlay}>
                  <div className={styles.name}>Adam Mania</div>
                  <div className={styles.tags}>Swimming, 2004, Poland</div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.slide} style={{backgroundImage: 'url(/images/mentors/Breeja_Larson.jpg)'}}>
                <div className={styles.overlay}>
                  <div className={styles.name}>Breeja Larson</div>
                  <div className={styles.tags}>Swimming, 2012, USA</div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.slide} style={{backgroundImage: 'url(/images/mentors/Caroline_Burckle.jpeg)'}}>
                <div className={styles.overlay}>
                  <div className={styles.name}>Caroline Burckle</div>
                  <div className={styles.tags}>Swimming, 2008, USA</div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.slide} style={{backgroundImage: 'url(/images/mentors/Heather_Petri.jpg)'}}>
                <div className={styles.overlay}>
                  <div className={styles.name}>Heather Petri</div>
                  <div className={styles.tags}>Water Polo, 2000, 2004, 2008, 2012, USA</div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.slide} style={{backgroundImage: 'url(/images/mentors/Jean_Basson.jpeg)'}}>
                <div className={styles.overlay}>
                  <div className={styles.name}>Jean Basson</div>
                  <div className={styles.tags}>Swimming, 2008, 2012, South Africa</div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.slide} style={{backgroundImage: 'url(/images/mentors/Kami_Craig.jpeg)'}}>
                <div className={styles.overlay}>
                  <div className={styles.name}>Kami Craig</div>
                  <div className={styles.tags}>Water Polo, 2008, 2012, 2016, USA</div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.slide} style={{backgroundImage: 'url(/images/mentors/Kate_Ziegler.jpeg)'}}>
                <div className={styles.overlay}>
                  <div className={styles.name}>Kate Ziegler</div>
                  <div className={styles.tags}>Swimming, 2008, 2012, USA</div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.slide} style={{backgroundImage: 'url(/images/mentors/Kathleen_Hersey.jpg)'}}>
                <div className={styles.overlay}>
                  <div className={styles.name}>Kathleen Hersey</div>
                  <div className={styles.tags}>Swimming, 2008, 2012, USA</div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.slide} style={{backgroundImage: 'url(/images/mentors/Kim_Vandenberg.jpg)'}}>
                <div className={styles.overlay}>
                  <div className={styles.name}>Kim Vandenberg</div>
                  <div className={styles.tags}>Swimming, 2008, USA</div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.slide} style={{backgroundImage: 'url(/images/mentors/Kristy_Kowal.jpeg)'}}>
                <div className={styles.overlay}>
                  <div className={styles.name}>Kristy Kowal</div>
                  <div className={styles.tags}>Swimming, 2000, USA</div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.slide} style={{backgroundImage: 'url(/images/mentors/Rebecca_Soni.jpeg)'}}>
                <div className={styles.overlay}>
                  <div className={styles.name}>Rebecca Soni</div>
                  <div className={styles.tags}>Swimming, 2008, 2012, USA</div>
                </div>
              </div>
            </div>
          </Slider>
        </div>

        <div className={styles.container}>
          <Grid fluid className={styles.grid}>
            <Row className={styles.newsletter}>
              <Col xs={12} md={8}>
                <h2 className={styles.header}>Good v. Great</h2>
                <h3 className={styles.subheader}>The difference between GOOD and GREAT begins in your MIND.</h3>
                <p>Join our mentoring program and work with an Olympian through weekly one-on-one video meetings. RISE mentors provide athletes with tangible tools and mental skills to excel in sport and life.</p>
                <NewsletterSignup />
                <small className={styles.disclaimer}>Sign up to receive awesome events, giveaways & tips from our mentors! Don't worry, we'll keep your info private!</small>
              </Col>
            </Row>
          </Grid>
        </div>

        <div className={styles.container}>
          <div className={styles.notificationBar}>
            <p>Parents & Athletes! Our Mentor Guide is waiting for you.</p>
            <Button className={styles.cta} href="pdfs/Rise_eBook.pdf" target="_new" label="Grab The E-Book" flat hollow white />
          </div>
        </div>

        <div className={styles.about}>
          <div className={styles.container}>
            <h3 className={styles.header}>Your Founders</h3>
            <h3 className={styles.subheader}>Rebecca Soni &<br />Caroline Burckle</h3>
            <p className={styles.content}>Reb & Caro’s friendship goes back even further than sharing an apartment in the Olympic Village in Beijing 2008. Fast forward 7 years and they officially established their own business in 2015, RISE Athletes. Their goal: to create a community for cultivating, creating and discussing things that would uplift them, their peers, and the next generation of athletes. RISE has come a long way, and we are excited to share this adventure with you!</p>
          </div>
        </div>

        <div className={styles.container}>
          <Grid fluid className={styles.grid}>
            <Row className={styles.features}>
              <Col xs={12} md={4} className={styles.feature}>
                <div className={styles.icon}><MentoringIcon /></div>
                <h3 className={styles.title}>Mentoring</h3>
                <p>Weekly face-to-face video meetings with your very own Olympic Mentor. Each round of mentoring is 14 weeks, followed by a 2-week rest and recovery period to soak up all the goodness.</p>
              </Col>
              <Col xs={12} md={4} className={styles.feature}>
                <div className={styles.icon}><SupportIcon /></div>
                <h3 className={styles.title}>Support</h3>
                <p>You get an accountability partner to reinforce positive habits, cultivate a positive mindset for performance, and overcome obstacles in sport and life. </p>
              </Col>
              <Col xs={12} md={4} className={styles.feature}>
                <div className={styles.icon}><AllInclusiveIcon /></div>
                <h3 className={styles.title}>All Inclusive Platform</h3>
                <p>Our program allows you to access your video meetings and materials, schedule and connect with your mentor, and arrange easy payments of $350 per month. Piece of cake.</p>
              </Col>
            </Row>
          </Grid>

          <Grid fluid className={styles.grid}>
            <Row className={styles.testimonials}>
              <Col xs={12} md={4} className={styles.testimonial}>
                <div className={styles.body}>I think that working with Caroline has helped her to see how much she has accomplished in her short life and what great things that she has yet to achieve in her future. She has gotten Avery to see the value of herself as a person, teammate, etc.</div>
                <author>Stacy</author>
                <div className={styles.title}>Parent</div>
              </Col>
              <Col xs={12} md={4} className={styles.testimonial}>
                <div className={styles.body}>I realize now that I don’t need to train harder, I need to train smarter. Rebecca taught me to focus on what I do well and make that even better. I now face competition with excited energy rather just hoping I do well.</div>
                <author>Annie</author>
                <div className={styles.title}>Athlete</div>
              </Col>
              <Col xs={12} md={4} className={styles.testimonial}>
                <div className={styles.body}>In life, in sport, there is only so much you can self-teach and when you have reached the end of your knowledge, that's when a mentor steps in. I love providing support, encouragement, and experience to help my athletes accomplish their goals and RISE up to meet their maximum potential!</div>
                <author>Kristy</author>
                <div className={styles.title}>Mentor</div>
              </Col>
            </Row>
          </Grid>
        </div>


        <Parallax className={styles.ctaMarquee} style={{position: 'relative', marginBottom: '-100px'}} bgImage="/images/RISE-Hero-3.jpg" strength={400}>
          <h1 className={styles.header}>Be Mentored<br />By The Best</h1>
          <h2 className={styles.subheader}>Develop your Olympic Mindset,<br />with your Olympic Mentor.</h2>
          <div className={styles.ctas}>
            <Button className={styles.ctaButtonWrapper} href="/join" flat hollow white><div className={styles.ctaButton}>Schedule a free trial</div></Button>
            <span>OR</span>
            <Button className={styles.ctaButtonWrapper} href="/login" flat hollow white><div className={styles.ctaButton}>Sign In</div></Button>
          </div>
        </Parallax>

        <section className={styles.footer}>
          <InstagramFeed />
          <Button label="Follow us on Instagram" flat hollow white />
          <div className={styles.email}><a href="mailto:info@riseathletes.com">info@riseathletes.com</a></div>
          <div className={styles.copyright}>COPYRIGHT {(new Date()).getFullYear()} RISE ELITE</div>
        </section>
      </div>
    )
  }
}
