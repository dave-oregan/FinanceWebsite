import React from 'react'
import './Components.css'

interface PopUpProps {
    id: string
    message: string
    type: string
}

const PopUp: React.FC<PopUpProps> = ({id, message, type}) => {
    return (
        <div id='popupholder'>
            <div id='popupbacker' />
            <div id='popup'>
                <span>{message}</span>
                <input id={id} className='Input' type={type} placeholder='Type here...'></input>
                <span id='add_expense' className='Button'> ADD EXPENSE </span>
                <span id='close_expense' className='Button'> CANCEL </span>
            </div>
        </div>
    )
}

export default PopUp