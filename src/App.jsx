import React from "react";
import { nanoid } from "nanoid";
import Die from "./components/Die"


export default function App(){

	const [dices, setDices] = React.useState(allNewDices())

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


	return(
		<main>
			<div className="app-container">	
				<h1>Tenzie</h1>
				<h3>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h3>
				<div className="tenzies-container">
				{diceElement}
				</div>
				<button className="roll-btn" onClick={rollDice}>Roll</button>
			</div>
		</main>
	)
}
