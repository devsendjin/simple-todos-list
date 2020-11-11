import React from 'react';
import { cn } from '../../utils';

const Button = ({ type = 'button', className, onClick, onChange, children }) => (
  <button
    type={ type }
    className={ cn('btn', className) }
    onClick={ onClick }
    onChange={ onChange }
  >
    { children }
  </button>
);

export { Button };
