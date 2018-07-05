import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import NavDrawer from '../components/NavDrawer'

class Template extends Component {
	render() {
		return (
			<MuiThemeProvider>
				<div>
					<NavDrawer />
					<main>
						{this.props.children}
					</main>
				</div>
			</MuiThemeProvider>
		)
	}
}


export default Template