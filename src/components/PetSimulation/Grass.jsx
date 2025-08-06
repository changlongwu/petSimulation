import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import grassImage from '../../assets/images/grass.png';
import rabbitImage from '../../assets/images/rabbit.png';
import rabbitEatingImage from '../../assets/images/rabbit-eating.png';
import happyRabbitImage from '../../assets/images/happy.png';
import './Grass.css'
// 可拖拽的草组件
const DraggableGrass = ({ id }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };
  
    return (
      <div 
        className="grass" 
        ref={setNodeRef} 
        style={style} 
        {...attributes} 
        {...listeners}
      >
        <img src={grassImage} alt="grass" className="grass-image" />
      </div>
    );
  };

  export default DraggableGrass;