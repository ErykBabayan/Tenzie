import React from "react";
import Die from "./components/Die"


export default function App(){

	return(
		<main>
			<div className="app-container">	
				<h1>Tenzie</h1>
				<h3>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h3>
				<div className="tenzies-container">
				</div>
			</div>
		</main>
	)
}