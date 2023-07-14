import React from "react";



  const error = {
    color: 'red',
    background: 'lightgrey',
    font_size: 20,
    border_style: 'solid',
    border_radius: 5,
    padding: 10,
    margin_bottom: 10
  }
  
  const success = {
    color: 'green',
    background: 'lightgrey',
    font_size: 20,
    border_style: 'solid',
    border_radius: 5,
    padding: 10,
    margin_bottom: 10
  }
  

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }
    if (message.includes("Error")) {
    return (
        <div style={error} >
            {message}
        </div>
    )
    } else {
        return (
            <div style={success}>
                {message}
            </div>
        )
    }
} 

export default Notification;