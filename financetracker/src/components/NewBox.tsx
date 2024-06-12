import React from 'react'
import './Components.css'

interface NewBoxProps {
}

const NewBox: React.FC<NewBoxProps> = () => {
    return (
        <span id='newButton'> ADD EXPENSE </span>
    )
}

export default NewBox