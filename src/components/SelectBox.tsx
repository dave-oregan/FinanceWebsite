import React from 'react'
import './Components.css'

interface SelectBoxProps {
    id: string
    label: string
    options: Array<string>
}

const SelectBox: React.FC<SelectBoxProps> = ({id, label, options}) => {
    return (
        <div>
            <span>{label}</span>
            <select id={id} className='Selector'>
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export default SelectBox