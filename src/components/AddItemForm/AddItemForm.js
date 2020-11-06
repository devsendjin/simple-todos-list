import React, { useState } from 'react';
import './AddItemForm.scss';
import { Input } from '../Input';
import { Button } from '../Button';

const AddItemForm = ({ addTodo }) => {
  const [value, setValue] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    addTodo(value);
    setValue('');
  };

  return (
    <form className="add-item-form" onSubmit={onSubmit}>
      <Input value={value} name='item' onChange={e => setValue(e.target.value)} />
      <Button type="submit" className="btn-outline-secondary">
        Add item
      </Button>
    </form>
  );
};

export { AddItemForm };
