import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import grassImage from '../../grass.png';
import './PetSimulation.css';

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

// 不可拖拽的兔子组件
const Rabbit = () => {
  return (
    <div className="rabbit">
      🐰
    </div>
  );
};

// 兔子区域（可接收拖拽的草）
const RabbitArea = ({ children }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'rabbit-area',
  });

  return (
    <div 
      ref={setNodeRef} 
      className={`rabbit-area ${isOver ? 'over' : ''}`}
    >
      <Rabbit />
      {children}
    </div>
  );
};

const PetSimulation = ({ grassItems, fedGrass = [] }) => {
  return (
    <div className="pet-simulation">
      <div className="grass-area">
        {grassItems.map((grass) => (
          <DraggableGrass key={grass.id} id={grass.id} />
        ))}
      </div>
      
      <RabbitArea>
        {fedGrass.map((grass) => (
          <div key={grass.id} className="fed-grass">
            <img src={grassImage} alt="grass" className="grass-image" />
          </div>
        ))}
      </RabbitArea>
    </div>
  );
};

export default PetSimulation; 