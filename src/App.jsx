import React, { useState } from 'react';
import { DndContext, closestCorners } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import PetSimulation from './components/PetSimulation/PetSimulation';

const App = () => {
  const [grassItems, setGrassItems] = useState([
    { id: 'grass-1', type: 'grass' },
    { id: 'grass-2', type: 'grass' },
    { id: 'grass-3', type: 'grass' },
  ]);

  const [fedGrass, setFedGrass] = useState([]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over) return;

    // 如果拖拽到兔子区域
    if (over.id === 'rabbit-area') {
      const grassItem = grassItems.find(item => item.id === active.id);
      if (grassItem) {
        // 从草区域移除
        setGrassItems(prev => prev.filter(item => item.id !== active.id));
        // 添加到已喂食的草列表
        setFedGrass(prev => [...prev, grassItem]);
      }
    }
  };

  return (
    <div>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <SortableContext items={grassItems.map(item => item.id)} strategy={verticalListSortingStrategy}>
          <PetSimulation grassItems={grassItems} fedGrass={fedGrass} />
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default App ;

