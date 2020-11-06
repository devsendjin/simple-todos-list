import React, { useState } from 'react';
import './App.scss';
import { Header } from '../Header';
import { AddItemForm } from '../AddItemForm';
import { TodoList } from '../TodoList/TodoList';
import { generateUniqueId } from '../../Utils';

const App = () => {
  const [todos, setTodos] = useState([
    { id: 0, value: 'Make cofee', done: false },
    { id: 1, value: 'Finish 123', done: false },
    { id: 2, value: 'Review bugs on plunt project', done: false },
  ]);

  const onDeleteTodo = id => {
    setTodos(prev => prev.filter(prev => prev.id !== id));
  };

  const onToggleDone = id => {
    const idx = todos.findIndex(todo => todo.id === id);
    const targetTodo = todos[idx];
    targetTodo.done = !targetTodo.done;
    setTodos(prev => [...prev.slice(0, idx), targetTodo, ...prev.slice(idx + 1)]);
  };

  const addTodo = value => {
    if (!value) return;
    setTodos([...todos, { id: generateUniqueId(), value, done: false }]);
    console.log(todos);
  };

  return (
    <div className="app-container">
      <Header />
      <AddItemForm addTodo={addTodo} />
      <TodoList todos={todos} onDeleteTodo={onDeleteTodo} onToggleDone={onToggleDone} />
    </div>
  );
};

export { App };
