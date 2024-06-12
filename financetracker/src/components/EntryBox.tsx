import React from 'react'
import './Components.css'

interface EntryBoxProps {
    id: string
    parent_class: string
    label: string
    type: string
}

const EntryBox: React.FC<EntryBoxProps> = ({id, parent_class, label, type}) => {
    return (
        <div className={parent_class}>
            <span>{label}</span>
            <input id={id} className='Input' type={type} step='.0001'></input>
        </div>
    )
}

export default EntryBox