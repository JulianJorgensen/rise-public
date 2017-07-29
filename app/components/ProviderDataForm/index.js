import React, { PropTypes } from 'react'
import classes from './index.css'

export const ProviderData = ({ providerData }) => (
  <div className={classes.container}>
    {
      providerData.map((providerAccount, i) => (
        <div>
          providerid: {providerAccount.providerId}
          displayname: {providerAccount.displayName}
          email: {providerAccount.email}
        </div>
      ))
    }
  </div>
)

ProviderData.propTypes = {
  providerData: PropTypes.array.isRequired
}

export default ProviderData
