import React from "react"

export default function Die(props){


    console.log(props.value)

    return(
        <div className="dice">
            <div className="dice-value">{props.value}</div>
        </div>

    )

}