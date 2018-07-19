import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import NavDrawer from '../components/NavDrawer'
import {Header, Main} from '../styled/Template'
import Relay from 'react-relay'

class Template extends Component {
  render () {
    return (
      <MuiThemeProvider>
        <div>
          <NavDrawer
            auth={this.props.route.auth}
            authenticated={this.props.viewer.user}
          />
          <Header>
            TicTacTuring
          </Header>

          <Main>
            {this.props.children}
          </Main>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Relay.createContainer(
  Template, {
    fragments: {
      viewer: () => Relay.QL`
        fragment on Viewer {
          user {
            id
          }
        }
      `
    }
  }
)
