import Auth0Lock from 'auth0-lock'
import Relay from 'react-relay'
import CreateUser from '../mutations/CreateUser'
import SigninUser from '../mutations/SigninUser'

const authDomain = 'jizu.auth0.com'
const clientId = 'Ws3ES2oiY60jr6QI9mtk80S2JgPfKnW7'

class AuthService {
  constructor () {
    this.lock = new Auth0Lock(clientId, authDomain, {
      auth: {
        params: {
          scope: 'openid email'
        }
      }
    })

    this.showLock = this.showLock.bind(this)

    this.lock.on('authenticated', this.authProcess.bind(this))
  }

  authProcess = (authResult) => {
    debugger;
    let {
      email,
      exp
    } = authResult.idTokenPayload
    const idToken = authResult.idToken

    this.signinUser({
      idToken,
      email,
      exp
    }).then(
      success => success,
      rejected => {
        this.createUser({
          idToken,
          email,
          exp
        }).then()
      }
    )
  }

  showLock () {
    this.lock.show()
  }

  setToken = (authFields) => {
    let {
      idToken,
      exp
    } = authFields

    window.localStorage.setItem('idToken', idToken)
    window.localStorage.setItem('exp', exp * 1000)
  }

  isCurrent = () => {
    let expString = window.localStorage.getItem('exp')
    if (!expString) {
      window.localStorage.removeItem('idToken')
      return false
    }
    let now = new Date()
    let exp = new Date(parseInt(expString, 10))
    if (exp < now) {
      this.logout()
      return false
    } else {
      return true
    }
  }

  getToken () {
    let idToken = window.localStorage.getItem('idToken')
    if (this.isCurrent() && idToken) {
      return idToken
    } else {
      window.localStorage.removeItem('idToken')
      window.localStorage.removeItem('exp')
      return false
    }
  }

  logout = () => {
    window.localStorage.removeItem('idToken')
    window.localStorage.removeItem('exp')
    window.location.reload()
  }

  createUser = (authFields) => {
    return new Promise((resolve, reject) => {
      Relay.Store.commitUpdate(
        new CreateUser({
          email: authFields.email,
          idToken: authFields.idToken
        }), {
          onSuccess: (response) => {
            this.signinUser(authFields)
            resolve(response)
          },
          onFailure: (response) => {
            console.log('CreateUser error', response)
            reject(response)
          }
        }
      )
    })
  }

  signinUser = (authFields) => {
    return new Promise((resolve, reject) => {
      Relay.Store.commitUpdate(
        new SigninUser({
          idToken: authFields.idToken
        }), {
          onSuccess: (response) => {
            this.setToken(authFields)
            resolve(response)
          },
          onFailure: (response) => {
            reject(response)
          }
        }
      )
    })
  }
}

const auth = new AuthService()
export default auth
