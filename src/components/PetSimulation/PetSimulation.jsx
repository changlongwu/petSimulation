import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import grassImage from '../../assets/images/grass.png';
import rabbitImage from '../../assets/images/rabbit.png';
import rabbitEatingImage from '../../assets/images/rabbit-eating.png';
import happyRabbitImage from '../../assets/images/happy.png';
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
const Rabbit = ({ isEating, showHappy }) => {
  return (
    <div className="rabbit">
      <img 
        src={isEating ? rabbitEatingImage : rabbitImage} 
        alt="rabbit" 
        className="rabbit-image" 
      />
      
      {showHappy && <img src={happyRabbitImage} alt="happy-rabbit" className="happy-rabbit-image" />}
    </div>
  );
};

// 兔子区域（可接收拖拽的草）
const RabbitArea = ({ children, isEating, showHappy, feedingGrass }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'rabbit-area',
  });

  return (
    <div 
      ref={setNodeRef} 
      className={`rabbit-area ${isOver ? 'over' : ''}`}
    >
      <Rabbit isEating={isEating} showHappy={showHappy} />
      {feedingGrass && (
        <div className="feeding-grass">
          <img src={grassImage} alt="grass" className="grass-image" />
        </div>
      )}
      {children}
    </div>
  );
};

const PetSimulation = ({ grassItems, fedGrass = [], feedingGrass, isEating, showHappy }) => {
  return (
    <div className="pet-simulation">
      <div className="grass-area">
        {grassItems.map((grass) => (
          <DraggableGrass key={grass.id} id={grass.id} />
        ))}
      </div>
      
      <RabbitArea isEating={isEating} showHappy={showHappy} feedingGrass={feedingGrass}>
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