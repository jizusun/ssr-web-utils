import React, {Component} from 'react'
import {Stage} from 'react-konva'
import {Board, Squares} from '../styled/TicTacToe'

class TicTacToe extends Component {

	state = {
		rows: 3
	}

	componentWillMount() {
		let height = window.innerHeight
		let width = window.innerWidth
		let size = (height < width) ? height * 0.8 : width * 0.8
		let rows = this.state.rows
		let unit = size / rows
		let coordinates = []
		for (let y = 0; y < rows; y++) {
			for (let x = 0; y < rows; x++) {
				coordinates.push([x*unit, y*unit])
			}
		}

		debugger;

		this.setState({
			size, 
			rows,
			unit,
			coordinates
		})
	}

	move = (marker, index) => {
		console.log('Move made', marker, index)
	}

	makeAiMove = () => {

	}

	turingTest = () => {

	}

	recordGame = () => {

	}

	render() {
		let {
			size, 
			unit,
			rows,
			coordinates,
			gameState,
			win,
			gameOver,
			yourTurn,
			onMark
		} = this.state
		return (
			<div>
				<Stage
					width={size}
					height={size}
				>
					<Board
		            unit={unit}
		            rows={rows}
		            size={size}
		          />
				</Stage>

				<Squares
					unit={unit}
					coordinates={coordinates}
					gameState={gameState}
					move={this.move}
				/>
			</div>
		)
	}
}


export default TicTacToe