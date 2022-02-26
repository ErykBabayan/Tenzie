import React from "react";
import Die from "./components/Die"


export default function App(){

	const [dices, setDices] = React.useState(allNewDices())

	function generateNewDice(){
		return {
			value: Math.floor(Math.random()*6)+1
		}
	}

	function allNewDices(){
		const newDice = []
		for(let i=0;i<10;i++){
			newDice.push(generateNewDice())
		}
		return newDice
	}
	const diceElement = dices.map(die => {
		return(
			<Die 
			value = {die.value}
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
			</div>
		</main>
	)
}