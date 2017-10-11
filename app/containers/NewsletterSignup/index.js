import React from 'react';
import Button from 'components/Button';
import { Dialog } from 'react-toolbox/lib/dialog';
import Input from 'react-toolbox/lib/input';
import classes from './index.css';

export default class NewsletterSignup extends React.Component {

  state = {
    showModal: false
  }

  hideModal = () => {
    this.setState({
      showModal: false
    });
  };

  showModal = () => {
    this.setState({
      showModal: true
    });
  };

  submit = () => {

  };

  render() {
    let { showModal } = this.state;

    return (
      <div>
        <Button label="Subscribe to our Newsletter" flat primary hollow onClick={this.showModal} />

        <Dialog
          active={showModal ? true : false}
          onEscKeyDown={this.hideModal}
          onOverlayClick={this.hideModal}
          title={`Subscribe to our mailing list`}
        >
          <div id="mc_embed_signup">
            <form action="//riseeliteathletes.us11.list-manage.com/subscribe/post?u=352edd27558b6f52daa450712&amp;id=e4c091c699" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
              <div id="mc_embed_signup_scroll">
                <div className="mc-field-group">
                  <Input
                    type="text"
                    placeholder="Enter your email"
                    name="EMAIL"
                    id="mce-EMAIL"
                  />
                </div>
                <div id="mce-responses" className="clear">
                  <div className="response" id="mce-error-response"></div>
                  <div className="response" id="mce-success-response"></div>
                </div>
                <div className={classes.antiBot} aria-hidden="true"><input type="text" name="b_352edd27558b6f52daa450712_e4c091c699" tabIndex="-1" value="" /></div>
                <Button
                  type="submit"
                  label="subscribe"
                  onClick={() => this.setState({showModal: false})}
                />
              </div>
            </form>
          </div>
        </Dialog>
      </div>
    )
  }
}
