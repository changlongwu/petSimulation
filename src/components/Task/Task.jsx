import React from 'react'
import {useSortable} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'
const Task = ({id, title}) => {
    const {attributes, listeners, setNodeRef, transition, transform} = useSortable({id: id})
    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }   
  return (
    <div className='task' ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <input type="checkbox" className='checkbox'/>
        {title}
    </div>
  )
}

export default Task