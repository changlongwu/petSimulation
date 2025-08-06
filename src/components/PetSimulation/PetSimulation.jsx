import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import grassImage from '../../assets/images/grass.png';
import rabbitImage from '../../assets/images/rabbit.png';
import rabbitEatingImage from '../../assets/images/rabbit-eating.png';
import happyRabbitImage from '../../assets/images/happy.png';
import './PetSimulation.css';
import DraggableGrass from './Grass';




// 可接收拖拽的兔子组件
const Rabbit = ({ isEating, showHappy, feedingGrass }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'rabbit-image',
  });

  return (
    <div className="rabbit">
      <img 
        ref={setNodeRef}
        src={isEating ? rabbitEatingImage : rabbitImage} 
        alt="rabbit" 
        className={`rabbit-image ${isOver ? 'over' : ''}`}
      />
      
      {showHappy && <img src={happyRabbitImage} alt="happy-rabbit" className="happy-rabbit-image" />}
      
      {feedingGrass && (
        <div className="feeding-grass">
          <img src={grassImage} alt="grass" className="grass-image" />
        </div>
      )}
    </div>
  );
};

// 兔子区域
const RabbitArea = ({ children, isEating, showHappy, feedingGrass }) => {
  return (
    <div className="rabbit-area">
      <Rabbit isEating={isEating} showHappy={showHappy} feedingGrass={feedingGrass} />
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