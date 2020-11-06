import React from 'react';
import { cx } from '../../Utils';

const Button = ({ type = 'button', className, onClick, children }) => (
  <button type={type} className={cx('btn', className)} onClick={onClick}>
    {children}
  </button>
);

export { Button };
