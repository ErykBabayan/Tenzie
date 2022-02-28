import React from "react"

export default function Die(props){

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return(
        <div className="dice-face" >
            <div className="dice" style={styles} onClick={props.holdDice}>
                <div className="dice-value">{props.value}</div>
            </div>
        </div>

    )

}