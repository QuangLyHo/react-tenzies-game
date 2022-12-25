import React from "react";

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? '#59E391' : '#ffffff'
    }
    
    return (
        <div className="die" onClick={props.toggle} style={styles}>
            <h2 className="die-number">{props.number}</h2>
        </div>
    )
}