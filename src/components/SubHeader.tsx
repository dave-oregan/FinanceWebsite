import React from 'react'
import './Components.css'

interface SubHeaderProps {
    text: string
}

const SubHeader: React.FC<SubHeaderProps> = ({text}) => {
    return (
        <span className='subtitle'>{text}</span>
    )
}

export default SubHeader