import React from "react";
import { nanoid } from "nanoid";
import Die from "./components/Die"


export default function App(){

	const [dices, setDices] = React.useState(allNewDices())
	const [hasWon,setHasWon] = React.useState(false)


	React.useEffect(() => {
		const firstValue = dices[0].value
		const isAllEqual = dices.every(die => die.value === firstValue)
		const isAllHeld = dices.every(die => die.isHeld)

		if( isAllEqual&&isAllHeld )
		{
			setHasWon(prevHasWon => !prevHasWon)
		}




	},[dices])
	

	function allEqual(array){
		return array.every(value => value === array[0])
	}

	function allNewDices(){
		const newDice = []
		for(let i=0;i<10;i++){
			newDice.push(generateNewDice())
		}
		return newDice
	}

	function generateNewDice(){
		const randomDieNumber = Math.ceil(Math.random()*6)

		return {
			id: nanoid(),
			value: randomDieNumber,
			isHeld: false
		}
	}




	function holdDice(clickedDiceId){
		
		setDices(prevDices => prevDices.map(die => {
			return die.id === clickedDiceId ? {...die, isHeld: !die.isHeld} : die
		}))
	}
	
	function rollDice(){
			setDices(prevDices => prevDices.map(die => {
				return die.isHeld ? die : generateNewDice()
			}))

		}


	function playAgain(){
		setDices(allNewDices())
		setHasWon(prevHasWon => !prevHasWon)
	}


	const diceElement = dices.map(die => {
		return(
			<Die
			key = {die.id}
			isHeld = {die.isHeld}
			value = {die.value}
			holdDice = {() => holdDice(die.id)}
			/>
		)
	})

	const gameButton = <button className="roll-btn" onClick={rollDice}>Roll</button>
	const winButton = <button className="roll-btn" onClick={playAgain}>Play Again</button>
	return(
		<main>
			<div className="app-container">	
				<h1>Tenzie</h1>
				<h3>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h3>
				{hasWon && <h2>Congratulations, you've won!</h2>}
				<div className="tenzies-container">
				{diceElement}
				</div>
				{hasWon ? winButton : gameButton}
			</div>
		</main>
	)
}
