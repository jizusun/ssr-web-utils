import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

const AuthButton = (props) => {
  if (props.authenticated) {
    return (
      <RaisedButton
        label='Logout'
        onClick={props.auth.logout}
        fullWidth={true}
        secondary
      />
    )
  } else {
    return (
      <RaisedButton
        label={'Login / Signup'}
        onClick={props.auth.showLock}
        fullWidth={true}
        primary
      />
    )
  }
}

export default AuthButton
