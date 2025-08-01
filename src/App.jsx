import React, { useState } from 'react';
import { DndContext, closestCorners } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import PetSimulation from './components/PetSimulation/PetSimulation';

const App = () => {
  const [grassItems, setGrassItems] = useState([
    { id: 'grass-1', type: 'grass' },
    // { id: 'grass-2', type: 'grass' },
    // { id: 'grass-3', type: 'grass' },
  ]);

  const [fedGrass] = useState([]);
  const [feedingGrass, setFeedingGrass] = useState(null);
  const [isEating, setIsEating] = useState(false);
  const [showHappy, setShowHappy] = useState(false);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over) return;

    // 如果拖拽到兔子区域
    if (over.id === 'rabbit-area') {
      const grassItem = grassItems.find(item => item.id === active.id);
      if (grassItem) {
        // 开始喂食动画
        setFeedingGrass(grassItem);
        setIsEating(true);
        setShowHappy(true);
        
        // 0.5秒后恢复
        setTimeout(() => {
          setFeedingGrass(null);
          setIsEating(false);
          setShowHappy(false);
          // 草回到原位置
          setGrassItems(prev => [...prev, grassItem]);
        }, 500);
      }
    }
  };

  return (
    <div>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <SortableContext items={grassItems.map(item => item.id)} strategy={verticalListSortingStrategy}>
          <PetSimulation 
            grassItems={grassItems} 
            fedGrass={fedGrass}
            feedingGrass={feedingGrass}
            isEating={isEating}
            showHappy={showHappy}
          />
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default App ;

