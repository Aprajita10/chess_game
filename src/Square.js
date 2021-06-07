import React from 'react'
export default function Square({children,black}){

    const bgclass=black?'square-black':'square-white'
    return <div className={`${bgclass} board-square `}>
        {children}
    </div>
} 