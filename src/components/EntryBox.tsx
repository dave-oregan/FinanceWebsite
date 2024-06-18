import React from 'react'
import './Components.css'

interface EntryBoxProps {
    id: string
    parent_class: string
    label: string
}

// Additional handling for removing non-numbers from inputs
const numerise = (target: string) => {
    const parts = target.split('.')
    if (parts.length > 2) {
        return parts[0]+'.'+parts.slice(1).join('')
    }
    return parts[0]
}

const EntryBox: React.FC<EntryBoxProps> = ({id, parent_class, label}) => {
    return (
        <div className={parent_class}>
            <span>{label}</span>
            <input
                id={id}
                className='Input'
                // Makes it so that input boxes only allow numbers
                onChange={(e) => e.target.value = /^\d*\.?\d*$/.test(e.target.value) ? e.target.value : (numerise(e.target.value.replace(/[^0-9.]/g, ''))) }
            />
        </div>
    )
}

export default EntryBox