import React, { useState } from 'react';
import './ItemAddForm.scss';
import { Input } from '../Input';
import { Button } from '../Button';

const ItemAddForm = ({ addTodo }) => {
	const [value, setValue] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	const onSubmit = e => {
		e.preventDefault();
		if (!value) {
			return setErrorMsg('Field should not be empty')
		}
		addTodo(value);
		setValue('');
	};

	const onChange = e => {
		setValue(e.target.value)
		setErrorMsg('');
	};

	return (
		<form className="item-add-form" onSubmit={ onSubmit }>
			<Input value={ value } name="item" onChange={ onChange } />
			<Button type="submit" className="btn-outline-secondary">
				Add item
			</Button>
			{ errorMsg && <span className="item-add-form__error-msg">{ errorMsg }</span> }
		</form>
	);
};

export { ItemAddForm };
