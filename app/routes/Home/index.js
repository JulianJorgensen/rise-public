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

import heroImage from 'images/RISE-Hero-1.jpg';
import heroImageBottom from 'images/RISE-Hero-3.jpg';
import aboutBg from 'images/RISE-Hero-2.jpg';
import mentorImage1 from 'images/mentors/Elizabeth_Beisel.jpg';
import mentorImage2 from 'images/mentors/Heather_Petri.jpg';
import mentorImage3 from 'images/mentors/Ian_Crocker.jpg';
import mentorImage4 from 'images/mentors/Bridget_Sloan.jpg';
import mentorImage5 from 'images/mentors/Adam_Mania.jpg';
import mentorImage6 from 'images/mentors/Breeja_Larson.jpg';
import mentorImage7 from 'images/mentors/Caroline_Burckle.jpg';
import mentorImage8 from 'images/mentors/Jean_Basson.jpg';
import mentorImage9 from 'images/mentors/Kami_Craig.jpg';
import mentorImage10 from 'images/mentors/Kate_Ziegler.jpg';
import mentorImage11 from 'images/mentors/Kathleen_Hersey.jpg';
import mentorImage12 from 'images/mentors/Kim_Vandenberg.jpg';
import mentorImage13 from 'images/mentors/Kristy_Kowal.jpg';
import mentorImage14 from 'images/mentors/Rebecca_Soni.jpg';

@withRouter
@userIsNotAuthenticated
export default class Home extends React.Component {
  constructor() {
    super();
  }

  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      draggable: false,
      lazyLoad: true,
      centerPadding: '40px',
      responsive: [
        {
          breakpoint: 768,
          settings: {
            dots: true,
            arrows: false,
            centerMode: true,
            centerPadding: '0',
            draggable: true,
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
      ]
    };

    let testimonialsSettings = {
      dots: true,
      arrows: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: false,
      lazyLoad: false,
      autoplay: false,
      centerPadding: 0,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            centerMode: true,
            draggable: true,
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
      ]
    };


    return (
      <div className={styles.wrapper}>
        <div className={styles.landingMarquee}>
          <Parallax className={styles.ctaMarquee} bgImage={heroImage} strength={300}>
            <div className={styles.inner}>
              <h1 className={styles.header}>RISE Athletes</h1>
              <h2 className={styles.subheader}>Develop the Olympic mindset</h2>
              <div className={styles.ctas}>
                <Button className={styles.ctaButtonWrapper} href="#what-we-do" flat hollow white><div className={styles.ctaButton}>What we do</div></Button>
                <span>OR</span>
                <Button className={styles.ctaButtonWrapper} href="/login" flat hollow white><div className={styles.ctaButton}>Sign In</div></Button>
              </div>
            </div>
          </Parallax>
        </div>

        <div className={styles.container}>
          <h2 className={styles.mentorHeader}>Be Your Best with a RISE Mentor</h2>
          <Slider className={styles.slider} {...settings}>
            <div>
              <div className={styles.slide} style={{backgroundImage: `url(${mentorImage1})`}}>
                <div className={styles.overlay}>
                  <div className={styles.name}>Elizabeth Beisel</div>
                  <div className={styles.tags}>Swimming, 2008, 2012, 2016, USA</div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.slide} style={{backgroundImage: `url(${mentorImage2})`}}>
                <div className={styles.overlay}>
                  <div className={styles.name}>Heather Petri</div>
                  <div className={styles.tags}>Water Polo, 2000, 2004, 2008, 2012, USA</div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.slide} style={{backgroundImage: `url(${mentorImage3})`}}>
                <div className={styles.overlay}>
                  <div className={styles.name}>Ian Crocker</div>
                  <div className={styles.tags}>Swimming, 2000, 2004, 2008, USA</div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.slide} style={{backgroundImage: `url(${mentorImage4})`}}>
                <div className={styles.overlay}>
                  <div className={styles.name}>Bridget Sloan</div>
                  <div className={styles.tags}>Gymnastics, 2008, USA</div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.slide} style={{backgroundImage: `url(${mentorImage5})`}}>
                <div className={styles.overlay}>
                  <div className={styles.name}>Adam Mania</div>
                  <div className={styles.tags}>Swimming, 2004, Poland</div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.slide} style={{backgroundImage: `url(${mentorImage6})`}}>
                <div className={styles.overlay}>
                  <div className={styles.name}>Breeja Larson</div>
                  <div className={styles.tags}>Swimming, 2012, USA</div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.slide} style={{backgroundImage: `url(${mentorImage7})`}}>
                <div className={styles.overlay}>
                  <div className={styles.name}>Caroline Burckle</div>
                  <div className={styles.tags}>Swimming, 2008, USA</div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.slide} style={{backgroundImage: `url(${mentorImage8})`}}>
                <div className={styles.overlay}>
                  <div className={styles.name}>Jean Basson</div>
                  <div className={styles.tags}>Swimming, 2008, 2012, South Africa</div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.slide} style={{backgroundImage: `url(${mentorImage9})`}}>
                <div className={styles.overlay}>
                  <div className={styles.name}>Kami Craig</div>
                  <div className={styles.tags}>Water Polo, 2008, 2012, 2016, USA</div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.slide} style={{backgroundImage: `url(${mentorImage10})`}}>
                <div className={styles.overlay}>
                  <div className={styles.name}>Kate Ziegler</div>
                  <div className={styles.tags}>Swimming, 2008, 2012, USA</div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.slide} style={{backgroundImage: `url(${mentorImage11})`}}>
                <div className={styles.overlay}>
                  <div className={styles.name}>Kathleen Hersey</div>
                  <div className={styles.tags}>Swimming, 2008, 2012, USA</div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.slide} style={{backgroundImage: `url(${mentorImage12})`}}>
                <div className={styles.overlay}>
                  <div className={styles.name}>Kim Vandenberg</div>
                  <div className={styles.tags}>Swimming, 2008, USA</div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.slide} style={{backgroundImage: `url(${mentorImage13})`}}>
                <div className={styles.overlay}>
                  <div className={styles.name}>Kristy Kowal</div>
                  <div className={styles.tags}>Swimming, 2000, USA</div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.slide} style={{backgroundImage: `url(${mentorImage14})`}}>
                <div className={styles.overlay}>
                  <div className={styles.name}>Rebecca Soni</div>
                  <div className={styles.tags}>Swimming, 2008, 2012, USA</div>
                </div>
              </div>
            </div>
          </Slider>
        </div>

        <div className={styles.container}>
          <div className={styles.newsletter}>
            <h2 className={styles.header}>Good v. Great</h2>
            <h3 className={styles.subheader}>The difference between GOOD and GREAT begins in your MIND.</h3>
            <p>Join our mentoring program and work with an Olympian through weekly one-on-one video meetings. RISE mentors provide athletes with tangible tools and mental skills to excel in sport and life.</p>
            <NewsletterSignup />
            <small className={styles.disclaimer}>Sign up to receive awesome events, giveaways & tips from our mentors! Don't worry, we'll keep your info private!</small>
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.notificationBar}>
            <p>Parents, we have a perk for you! Get a sneak peek at what goes on behind-the-scenes of RISE mentoring.</p>
            <Button className={styles.cta} href="pdfs/Rise_eBook.pdf" target="_new" label="Grab The E-Book" flat hollow white />
          </div>
        </div>

        <div className={styles.container} id="what-we-do">
          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.icon}><MentoringIcon /></div>
              <h3 className={styles.title}>Mentoring</h3>
              <p>Weekly face-to-face video meetings with your very own Olympic Mentor. Each round of mentoring is 14 weeks, followed by a 2-week rest and recovery period to soak up all the goodness.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.icon}><SupportIcon /></div>
              <h3 className={styles.title}>Support</h3>
              <p>You get an accountability partner to reinforce positive habits, cultivate a positive mindset for performance, and overcome obstacles in sport and life. </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.icon}><AllInclusiveIcon /></div>
              <h3 className={styles.title}>All Inclusive Platform</h3>
              <p>Our program allows you to access your video meetings and materials, schedule and connect with your mentor, and arrange easy payments of $350 per month. Piece of cake.</p>
            </div>
          </div>
        </div>

        <div className={styles.about}>
          <div className={`${styles.container} ${styles.aboutContainer}`}>
            <h3 className={styles.header}>Your Founders</h3>
            <h3 className={styles.subheader}>Rebecca Soni &<br />Caroline Burckle</h3>
            <p className={styles.aboutContent}>Reb & Caro’s friendship goes back even further than sharing an apartment in the Olympic Village in Beijing 2008. Fast forward 7 years and they officially established their own business in 2015, RISE Athletes. Their goal: to create a community for cultivating, creating and discussing things that would uplift them, their peers, and the next generation of athletes. RISE has come a long way, and we are excited to share this adventure with you!</p>
            <div className={styles.aboutBg} style={{backgroundImage: `url(${aboutBg})`}}></div>
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.testimonials}>
            <Slider {...testimonialsSettings}>
              <div className={styles.testimonial}>
                <div className={styles.body}>I think that working with Caroline has helped her to see how much she has accomplished in her short life and what great things that she has yet to achieve in her future. She has gotten Avery to see the value of herself as a person, teammate, etc.</div>
                <author>Stacy</author>
                <div className={styles.title}>Parent</div>
              </div>
              <div className={styles.testimonial}>
                <div className={styles.body}>I realize now that I don’t need to train harder, I need to train smarter. Rebecca taught me to focus on what I do well and make that even better. I now face competition with excited energy rather just hoping I do well.</div>
                <author>Annie</author>
                <div className={styles.title}>Athlete</div>
              </div>
              <div className={styles.testimonial}>
                <div className={styles.body}>In life, in sport, there is only so much you can self-teach and when you have reached the end of your knowledge, that's when a mentor steps in. I love providing support, encouragement, and experience to help my athletes accomplish their goals and RISE up to meet their maximum potential!</div>
                <author>Kristy</author>
                <div className={styles.title}>Mentor</div>
              </div>
            </Slider>
          </div>
        </div>


        <Parallax className={styles.ctaMarquee} style={{position: 'relative', marginBottom: '-100px'}} bgImage={heroImageBottom} strength={400}>
          <div className={styles.inner}>     
            <h1 className={styles.header}>Be Mentored<br />By The Best</h1>
            <h2 className={styles.subheader}>Develop your Olympic Mindset,<br />with your Olympic Mentor.</h2>
            <div className={styles.ctas}>
              <Button className={styles.ctaButtonWrapper} href="#what-we-do" flat hollow white><div className={styles.ctaButton}>What we do</div></Button>
              <span>OR</span>
              <Button className={styles.ctaButtonWrapper} href="/login" flat hollow white><div className={styles.ctaButton}>Sign In</div></Button>
            </div>
          </div>
        </Parallax>

        <section className={styles.footer}>
          <InstagramFeed />
          <Button label="Follow us on Instagram" href="https://www.instagram.com/riseathletes/" target="_new" flat hollow white className={styles.followUsCta} />
          <Button label="Follow us on Facebook" href="https://www.facebook.com/RISEathletes/" target="_new" flat hollow white className={styles.followUsCta} />
          <div className={styles.email}><a href="mailto:info@riseathletes.com">info@riseathletes.com</a></div>
          <div className={styles.copyright}>COPYRIGHT {(new Date()).getFullYear()} RISE ELITE</div>
        </section>
      </div>
    )
  }


}
