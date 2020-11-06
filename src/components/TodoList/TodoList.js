import React from 'react';
import './TodoList.scss';
import { TodoListItem } from '../TodoListItem/TodoListItem';

const TodoList = ({ todos, onDeleteTodo, onToggleDone }) => (
  <div className="todo-list">
    {todos.map(({ id, done, value }) => (
      <TodoListItem
        key={id}
        value={value}
        done={done}
        onDeleteTodo={() => onDeleteTodo(id)}
        onToggleDone={() => onToggleDone(id)}
      />
    ))}
  </div>
);

export { TodoList };
