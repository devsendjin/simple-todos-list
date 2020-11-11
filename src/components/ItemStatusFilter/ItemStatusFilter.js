import React from 'react';
// import './ItemStatusFilter.scss';
import { cn } from '../../utils';

const ItemStatusFilter = ({ filter, onChangeFilter }) => {
  const buttonsData = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' }
  ];

  const buttons = buttonsData.map(button => {
    const isActive = filter === button.name;

    return (
      <button
        type="button"
        className={ cn(
          'btn',
          isActive && 'btn-primary',
          !isActive && 'btn-outline-secondary'
        ) }
        key={ button.name }
        onClick={ () => onChangeFilter(button.name) }
      >
        { button.label }
      </button>
    );
  });
  return buttons;
};

export { ItemStatusFilter };
