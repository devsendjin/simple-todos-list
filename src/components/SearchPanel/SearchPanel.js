import React, { useState } from 'react';
import { Input } from '../Input';

const SearchPanel = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const onChange = e => {
    setSearchTerm(e.target.value);
    console.log('SearchPanel searchTerm ', searchTerm);
  };

  return <Input value={ searchTerm } name="item" onChange={ onChange } />;
};

export { SearchPanel };
