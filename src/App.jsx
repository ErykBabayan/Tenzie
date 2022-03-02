import React from "react";
import { nanoid } from "nanoid";
import Die from "./components/Die"


export default function App(){

	const [dices, setDices] = React.useState(allNewDices())
	const [hasWon,setHasWon] = React.useState(false)

	const [isTimerActive,setIsTimerActive] = React.useState(false)
	const [seconds,setSeconds] = React.useState(0)
	const [rolls,setRolls] = React.useState(0)



	React.useEffect(() => {
		const firstValue = dices[0].value
		const isAllEqual = dices.every(die => die.value === firstValue)
		const isAllHeld = dices.every(die => die.isHeld)

		if( isAllEqual&&isAllHeld ){
			setHasWon(prevHasWon => !prevHasWon)
			setIsTimerActive(false)
			setHighScore()
		}
	},[dices])



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
		setIsTimerActive(true)
		setDices(prevDices => prevDices.map(die => {
			return die.id === clickedDiceId ? {...die, isHeld: !die.isHeld} : die
		}))
	}
	
	function rollDice(){
			setIsTimerActive(true)
			setRolls(prevRolls => prevRolls+1)
			
			setDices(prevDices => prevDices.map(die => {
				return die.isHeld ? die : generateNewDice()
			}))
		}

	function playAgain(){
		setHasWon(prevHasWon => !prevHasWon)
		setDices(allNewDices())
		setSeconds(0)
		setIsTimerActive(false)
		setRolls(0)
	}

	function setHighScore(){

		let bestTime = localStorage.getItem("bestTime")
		let bestScore = localStorage.getItem("bestScore")
		
		if(seconds < bestTime || bestTime == null){
			localStorage.setItem("bestTime",JSON.stringify(seconds))
		}
		if(rolls < bestScore || bestScore == null){
			localStorage.setItem("bestScore",JSON.stringify(rolls))
		}
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


	React.useEffect(() => {
			let timerInterval
			if(isTimerActive){
				timerInterval=setInterval(() => {
					setSeconds(prevSeconds => prevSeconds+1)
				}, 1000);
			}
			return () => clearInterval(timerInterval);
	},[isTimerActive])



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
				<div className="button-wrapper">
				{hasWon ? winButton : gameButton}
				</div>
				<div className="score-container">
					<div className="score">Rolls: {rolls}</div>
					<div className="best-score">Best Score: {localStorage.getItem("bestScore") || 0 }</div>
				</div>
				<div className="time-container">
					<div className="time">Time: {seconds}s</div>
					<div className="best-time">Best time: {localStorage.getItem("bestTime") || 0 }s</div>
				</div>
			</div>
		</main>
	)
}
