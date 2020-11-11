import React from 'react';
import './Header.scss';

const Header = ({ undoneTodos = 0, doneTodos = 0 }) => (
	<div className="header">
		<h1 className="header__title">Todo List</h1>
		<p className="header__info">
			{ undoneTodos } more to do, { doneTodos } done
		</p>
	</div>
);

export { Header };
