import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Item } from '../../models/Item';

import styles from './styles.module.scss';

interface Props {
  list: Item[];
  onSearch: (query: string) => void;
  onSort: () => void;
  order: 'asc' | 'desc';
}

const SearchBox = ({ list, onSearch, onSort, order }: Props) => {
  const [query, setQuery] = useState('');
  const [searchedValue, setSearchedValue] = useState('');

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const clearTimeoutRef = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  };

  const search = (value: string) => {
    clearTimeoutRef();
    onSearch(value);
    setSearchedValue(value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setQuery(value);

    clearTimeoutRef();

    if (value === '') {
      search(value);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      search(value);
    }, 1500);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    search(query);
  };

  const searchDisabled =
    (query === '' && searchedValue === '') || query === searchedValue;

  let sortIcon = 'sort';
  if (order === 'asc') {
    sortIcon = 'sort-up';
  } else if (order === 'desc') {
    sortIcon = 'sort-down';
  }

  return (
    <form className={styles.Search} onSubmit={handleSubmit}>
      <div className={styles.Input}>
        <input
          placeholder='Search...'
          type='text'
          value={query}
          onChange={handleChange}
        />
        {timeoutRef.current && (
          <div className={styles.Loader}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </div>

      <button type='submit' disabled={searchDisabled}>
        <i className='fa fa-search'></i>
      </button>

      <button type='button' onClick={onSort} disabled={list.length <= 1}>
        <i className={`fa fa-${sortIcon}`}></i>
      </button>
    </form>
  );
};

export default SearchBox;
