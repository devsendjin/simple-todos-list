import React, { useState } from 'react';
import './AddItemForm.scss';
import { Input } from '../Input';
import { Button } from '../Button';

const AddItemForm = ({ addTodo }) => {
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
		<form className="add-item-form" onSubmit={ onSubmit }>
			<Input value={ value } name="item" onChange={ onChange } />
			<Button type="submit" className="btn-outline-secondary">
				Add item
			</Button>
			{ errorMsg && <span className="add-item-form__error-msg">{ errorMsg }</span> }
		</form>
	);
};

export { AddItemForm };
