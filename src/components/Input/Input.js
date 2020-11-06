import React from 'react';
import './Input.scss';

const Input = ({ name, value, onChange }) => (
  <input
    className="input form-control"
    value={value}
    onChange={onChange}
    name={name}
  />
);

export { Input };
