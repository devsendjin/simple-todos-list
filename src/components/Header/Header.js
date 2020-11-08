import React from 'react';
import './Header.scss';

const Header = ({ todo = 0, done = 0 }) => (
	<div className="header">
		<h1 className="header__title">Todo List</h1>
		<p className="header__info">
			{ todo } more to do, { done } done
		</p>
	</div>
);

export { Header };
