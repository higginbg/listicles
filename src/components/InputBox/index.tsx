import { ChangeEvent, FormEvent, useRef, useState } from 'react';

import styles from './styles.module.scss';

interface Props {
  addItem: (item: string) => void;
  deleteAll: () => void;
  hasItems: boolean;
}

const InputBox = ({ addItem, deleteAll, hasItems }: Props) => {
  const [value, setValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.length > 30) {
      return;
    }

    setValue(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValue('');
    addItem(value);
    inputRef.current?.focus();
  };

  return (
    <form className={styles.InputContainer} onSubmit={handleSubmit}>
      <div className={styles.Input}>
        <input
          type='text'
          placeholder='Add item'
          ref={inputRef}
          value={value}
          onChange={handleChange}
        />
        {value !== '' && (
          <button
            type='button'
            className={styles.Clear}
            onClick={() => setValue('')}
          >
            <i className='fa fa-times'></i>
          </button>
        )}
      </div>

      <button type='submit' className={styles.Add} disabled={value === ''}>
        <i className='fa fa-plus'></i>
      </button>

      <button
        type='button'
        className={styles.Delete}
        onClick={deleteAll}
        disabled={!hasItems}
      >
        <i className='fas fa-meteor'></i>
      </button>
    </form>
  );
};

export default InputBox;
