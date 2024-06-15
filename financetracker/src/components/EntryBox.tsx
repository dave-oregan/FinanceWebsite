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
            <input
                id={id}
                className='Input'
                type={type}
                step='.01'
                onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })} // Prevents scroll step                
            />
        </div>
    )
}

export default EntryBox