import React from 'react'
import './Components.css'

interface CreditProps {
    content: string
    link: string
    name: string
    align: string
}

const Credit: React.FC<CreditProps>  = ({content, link, name, align}) => {
    return (
        <span className={`credit${align}`}>{content}<a className='link' href={link}>{name}</a></span>
    )
}

export default Credit