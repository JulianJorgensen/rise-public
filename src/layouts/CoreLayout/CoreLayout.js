import React from 'react'
import LeftNavigation from 'containers/LeftNavigation/LeftNavigation'
import Navbar from 'containers/Navbar/Navbar'
import classes from './CoreLayout.css'
import styles from 'styles/app.css';
import Layout from 'react-toolbox/lib/layout/Layout';

export const CoreLayout = ({ children }) => (
  <div>
    <div className={classes.notification}>You have an upcoming appointment.</div>
    <div className={classes.container}>
      <LeftNavigation />
      <div className={classes.mainContent}>
        <Navbar withNotification={true} />
        <Layout className={classes.layout}>
          {children}
        </Layout>
      </div>
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
