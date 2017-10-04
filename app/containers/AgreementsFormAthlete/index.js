import React from 'react';
import Button from 'components/Button';
import RadioGroup from 'components/RadioGroup';
import Checkbox from 'react-toolbox/lib/checkbox';
import { AGREEMENTS_FORM_NAME } from 'app/constants';
import classes from './index.css';

export default class AgreementsFormAthlete extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handleChange = (field, value) => {
    console.log('set state', field);
    this.setState({ ...this.state, [field]: value });
  };

  handleSubmit(ev) {
    ev.preventDefault();
    console.log('submitting', this.state);
    let { term1, term2, term3, term4, term5, term6, term7, term8 } = this.state;
    if (!term1 || !term2 || !term3 || !term4 || !term5 || !term6 || !term7 || !term8) {
      this.setState({ error: 'Looks like you missed a section, please make sure you’ve read and agreed with all the boxes.' });
    } else {
      this.props.onSubmit();
    }
  }

  render() {
    return (
      <form className={classes.container} onSubmit={this.handleSubmit.bind(this)}>
      <h1>Agreements</h1>
      <div className={classes.term}>
        <div className={classes.termBody}>
          <h5>Services</h5>
          <p>Mentor agrees to provide overall Mentoring and Mindset Development services and Athlete agrees to abide by all policies and procedures as outlined in this agreement as a condition of their participation in Mentorship.</p>
          <h5>Disclaimer</h5>
          <p>Athlete understands RISE Athletes (Mentor) is not an employee, agent, lawyer, doctor, manager, therapist, public relations or business manager, registered dietician, or financial analyst, psychotherapist or accountant. Athlete understands their participation in Mind Coaching will not treat or diagnose any disease, illness, or ailment and if they should experience any such issues they should see their registered physician or other practitioner as determined by their own judgment.</p>
        </div>
        <Checkbox
          checked={this.state.term1}
          label="I have read and understand above terms and agreements"
          onChange={this.handleChange.bind(this, 'term1')}
          required
          />
      </div>
  
      <div className={classes.term}>
        <div className={classes.termBody}>
          <h5>Fees</h5>
          <p><strong>4 months (14 weeks)= $350/month ($1400 total)</strong><br />Solo Session: $150</p>
          <h5>methods of payment</h5>
          <p>RISE Athletes uses Stripe to set up Automatic Monthly Payments Recurring All payment invoices and reminders are sent to the specified email address of Athlete or parent.</p>
          <h5>Refunds</h5>
          <p>Athlete is responsible for full payment of fees for the duration of RISE Athletes. To further clarify, no refunds will be issued for Meetings that have already happened, or for Missed Meetings that were not properly rescheduled, or for Seasons that are not completed after commitment. </p>
        </div>
        <Checkbox
        checked={this.state.term2}
        label="I have read and understand above terms and agreements"
        onChange={this.handleChange.bind(this, 'term2')}
        required
        />
    </div>
  
      <div className={classes.term}>
        <div className={classes.termBody}>
          <h5>Meetings</h5>
          <p>1. Mentor and Athlete join the Meeting at the scheduled time.</p>
          <p>2. The Mentor will be unconditionally constructive, loving and acknowledging of what is. Mentor will always try their absolute best to listen to the Athlete’s concerns and to do what is necessary to resolve the problem. Mentor believes in being totally truthful and expects the Athlete to tell the Mentor if the Mentor oversteps.</p>
          <h5>Re-scheduling</h5>
          <p>It is the Mentor’s responsibility to provide the Athlete with their availability and it is the Athlete’s responsibility to schedule appointments with Mentor. If Athlete needs to reschedule an appointment with Mentor, Athlete must give at least 24 hours advanced notice to Mentor.</p>
        </div>
        <p>By clicking below, the Athlete agrees that there is one allowed missed session, and any further missed sessions without 24 hour notice of cancellation will incur the normal fee of the session scheduled.</p>
        <Checkbox
        checked={this.state.term3}
        label="I have read and understand above terms and agreements"
        onChange={this.handleChange.bind(this, 'term3')}
        required
        />
    </div>
  
      <div className={classes.term}>
        <div className={classes.termBody}>
          <h5>Expectations</h5>
          <p>1. Please join Meeting at the Scheduled time. Integrity is super important!</p>
          <p>2. Find a quiet place, preferably at home. If you’re in the car, or anywhere with people around, we’ll have to ask you to call us back when you’re ready, or consider it a miss.</p>
          <p>**It is very important for the athlete to be able to give his/her session their full attention, and to be able to speak openly, without having to filter thoughts!</p>
  
          <h5>Office hours</h5>
          <p>Office hours are Monday through Friday from 9 am to 5 pm PST.  If Athlete sends Mentor something via email on Friday, the Mentor will most likely respond Monday.</p>
  
          <h5>Mentoring weeks + off-weeks</h5>
          <p>There may be times Mentor has conferences, retreats and other engagements where she’ll need to change the schedule, or may not have regular email access. Mentor will be sure to let you know of those activities ahead of time.</p>
        </div>
        <Checkbox
        checked={this.state.term4}
        label="I have read and understand above terms and agreements"
        onChange={this.handleChange.bind(this, 'term4')}
        required
        />
        </div>
  
      <div className={classes.term}>
        <div className={classes.termBody}>
          <h5>Confidentiality</h5>
          <p>The Mentor respects Athlete’s privacy and insists that Athlete respects the Mentor’s. Thus, consider this a mutual non-disclosure agreement. Both the Mentor and the Athlete agree not to disclose, reveal or make use of any Confidential Information or any transactions, during discussions, during Mentoring sessions, exchanged emails or otherwise. Confidential Information includes, but is not limited to, information disclosed in connection with this Agreement, and shall not include information rightfully obtained from a third party. By signing below, Athlete agrees not to violate the Mentor’s publicity or privacy rights. Furthermore Athlete will NOT reveal any information to a third party obtained in connection with this Agreement or Mentor’s direct or indirect dealings with Athlete including but not limited to; names, email addresses, third-party company titles or positions, phone numbers or addresses. Additionally, Mentor will not, at any time, either directly or indirectly, disclose confidential information to any third party.</p>
          <p>Both the Mentor and the Athlete will keep Confidential Information in strictest confidence and shall use the best efforts to safeguard the Confidential Information and to protect it against disclosure, misuse, espionage, loss and theft.</p>
        </div>
        <Checkbox
        checked={this.state.term5}
        label="I have read and understand above terms and agreements"
        onChange={this.handleChange.bind(this, 'term5')}
        required
        />
        </div>
  
      <div className={classes.term}>
        <div className={classes.termBody}>
          <h5>Independent Contractor Status</h5>
          <p>Nothing in this Agreement is to be construed as creating a partnership, venture alliance, or any other similar relationship. The Mentor and the Athlete shall be independent contractors in its performance hereunder and shall retain control over its personnel and the manner in which such personnel perform hereunder. In no event shall such persons be deemed employees of the other party by virtue of participation or performance hereunder.</p>
        </div>
        <Checkbox
        checked={this.state.term6}
        label="I have read and understand above terms and agreements"
        onChange={this.handleChange.bind(this, 'term6')}
        required
        />
    </div>
  
      <div className={classes.term}>
        <div className={classes.termBody}>
          <h5>Non-disclosure of mentoring materials</h5>
          <p>RISE Athletes is designed and crafted from original materials that have been provided to Athlete are for Athlete's individual use only and a single-user license. Athlete is not authorized to use any of Mentor’s intellectual property for Athlete's business purposes.</p>
          <p>By signing below, Athlete agrees (1) not to infringe any copyright, patent, trademark, trade secret, or other intellectual property rights, (2) that any Confidential Information shared by the Mentor is confidential and proprietary, and belongs solely and exclusively to the Mentor, (3) Athlete agrees not to disclose such information to any other person or use it in any manner other than in discussion with the Mentor.</p>
          <p>Further, by signing below, Athlete agrees that if Athlete violates, or displays any likelihood of violating, any of Athlete’s agreements contained in this paragraph, the Mentor will be entitled to injunctive relief to prohibit any such violations and to protect against the harm of such violations.</p>
        </div>
        <Checkbox
        checked={this.state.term7}
        label="I have read and understand above terms and agreements"
        onChange={this.handleChange.bind(this, 'term7')}
        required
        />
    </div>
  
      <div className={classes.term}>
        <div className={classes.termBody}>
          <h5>Athlete Responsibility</h5>
          <p>Athlete accepts and agrees that Athlete is 100% responsible for their progress and results from RISE Athletes. Mentor will help and guide Athlete. However, participation is the one vital element to the success of Mentoring and relies solely on the Athlete. The Mentor makes no representations, warranties or guarantees verbally or in writing regarding Athlete’s performance. Athlete understands that because of the nature of the program and extent, the results experienced by each Athlete may significantly vary. By accepting below, Athlete acknowledges that as with any business endeavor, there is an inherent risk of loss of capital and there is no guarantee that Athlete will reach their goals as a result of participation in RISE Athletes.</p>
          <p>RISE Athletes adheres to a form of Mentoring that honors the athlete as the expert in his/her life and work and believes that every athlete is creative, resourceful, and whole!</p>
        </div>
        <Checkbox
        checked={this.state.term8}
        label="I have read and understand above terms and agreements"
        onChange={this.handleChange.bind(this, 'term8')}
        required
      />
    </div>

    <span className={classes.error}>{this.state.error}</span>
    
      <div className={classes.ctas}>
        <Button
          primary
          label='CLICK TO CONFIRM AND ACCEPT'
          type='submit'
        />
      </div>
    </form>
    )
  }
}
