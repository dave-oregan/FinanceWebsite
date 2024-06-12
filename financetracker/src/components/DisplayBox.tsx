import React from 'react'
import './Components.css'

interface DisplayBoxProps {
    label: string
}

const DisplayBox: React.FC<DisplayBoxProps> = ({label}) => {
    return (
        <div>
            <span>{label}</span>
            {/* Display */}
        </div>
    )
}

export default DisplayBox