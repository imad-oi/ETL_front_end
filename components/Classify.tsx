
'use client'
import React, { useState } from 'react';
import { Button } from './ui/button';
import { FaArrowDownLong, FaArrowUpLong } from 'react-icons/fa6';

const YourComponent: React.FC = () => {
    const [items, setItems] = useState<string[]>([
        'Element 1',
        'Element 2',
        'Element 3',
        // Ajoutez plus d'éléments ici
    ]);

    const moveItemUp = (index: number) => {
        if (index === 0) return; // Déjà en haut, ne rien faire
        const updatedItems = [...items];
        const itemToMove = updatedItems[index];
        updatedItems.splice(index, 1);
        updatedItems.splice(index - 1, 0, itemToMove);
        setItems(updatedItems);
    };

    const moveItemDown = (index: number) => {
        if (index === items.length - 1) return; // Déjà en bas, ne rien faire
        const updatedItems = [...items];
        const itemToMove = updatedItems[index];
        updatedItems.splice(index, 1);
        updatedItems.splice(index + 1, 0, itemToMove);
        setItems(updatedItems);
    };

    return (
        <div className=''>
            {items.map((item, index) => (
                <div className='flex gap-3 my-1 '  key={index}>
                    <span className='bg-slate-100 px-4 mx-6 py-2'>{item}</span>
                    <button onClick={() => moveItemUp(index)} disabled={index === 0}>
                        <FaArrowUpLong />
                    </button>
                    <button onClick={() => moveItemDown(index)} disabled={index === items.length - 1}>
                        <FaArrowDownLong />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default YourComponent;
