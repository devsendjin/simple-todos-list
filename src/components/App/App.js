import React, { useState } from 'react';
import './App.scss';
import { Header } from '../Header';
import { AddItemForm } from '../AddItemForm';
import { TodoList } from '../TodoList';
import { generateUniqueId } from '../../Utils';

const App = () => {
	const [todos, setTodos] = useState([
		{ id: 0, value: 'Make coffee', done: false },
		{ id: 1, value: 'Finish 123', done: false },
		{ id: 2, value: 'Review bugs on plant project', done: false },
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
		setTodos([...todos, { id: generateUniqueId(), value, done: false }]);
		console.log(todos);
	};

	const undoneTodos = todos.filter(todo => !todo.done).length;
	const doneTodos = todos.filter(todo => todo.done).length;

	return (
		<div className="app-container">
			<Header todo={ undoneTodos } done={ doneTodos } />
			<AddItemForm addTodo={ addTodo } />
			<TodoList todos={ todos } onDeleteTodo={ onDeleteTodo } onToggleDone={ onToggleDone } />
		</div>
	);
};

export { App };
