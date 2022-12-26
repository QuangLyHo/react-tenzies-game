import React from "react";

export default function Timer(props) {
    
    
    return (
        <div className="timer-container">
            <span className="timer">{("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}</span>
            :
            <span className="timer">{("0" + ((props.time / 10) % 100)).slice(-2)}</span>
        </div>
    )
}