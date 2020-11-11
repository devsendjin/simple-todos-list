import React, { useState } from 'react';
import './App.scss';
import { generateUniqueId } from '../../utils';
import { Header } from '../Header';
import { ItemAddForm } from '../ItemAddForm';
import { TodoList } from '../TodoList';
import { SearchPanel } from '../SearchPanel';
import { ItemStatusFilter } from '../ItemStatusFilter';

const App = () => {
	const [todos, setTodos] = useState([
		{ id: 0, value: 'Make coffee', done: false },
		{ id: 1, value: 'Finish 123', done: false },
		{ id: 2, value: 'Review bugs on plant project', done: false },
	]);
	const [filter, setFilter] = useState('all');

	const undoneTodos = todos.filter(todo => !todo.done).length;
	const doneTodos = todos.filter(todo => todo.done).length;

	// const filteredTodos =

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

	const getFilteredTodos = (items, filter) => {
		console.log('getFilteredTodos');
		switch (filter) {
			case "all":
				return items;
			case "active":
				return items.filter(item => !item.done);
			case "done":
				return items.filter(item => item.done);
			default:
				return items;
		}
	}

	const onChangeFilter = filterValue => {
		setFilter(filterValue)
	};

	const onSearchChange = searchTerm => {
		console.log('onSearchChange searchTerm ', searchTerm);
	};

	return (
		<div className="app-container">
			<Header undoneTodos={ undoneTodos } doneTodos={ doneTodos } />
			<div className="top-panel">
				<SearchPanel onSearchChange={onSearchChange} />
				<ItemStatusFilter
					filter={filter}
					getFilteredTodos={getFilteredTodos}
					onChangeFilter={onChangeFilter}
				/>
			</div>
			<ItemAddForm addTodo={ addTodo } />
			<TodoList todos={ getFilteredTodos(todos, filter) } onDeleteTodo={ onDeleteTodo } onToggleDone={ onToggleDone } />
		</div>
	);
};

export { App };
