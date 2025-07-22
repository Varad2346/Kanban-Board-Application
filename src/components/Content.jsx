import React from 'react'
import "./Content.css"
import BoardHeader from './BoardHeader'
import KanbanBoard from './KanbanBoard'

const Content = () => {
  return (
    <div className='content-container'>
        <BoardHeader/>

        <KanbanBoard/>
    
    </div>
  )
}

export default Content