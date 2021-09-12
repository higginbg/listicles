import { ChangeEvent, FormEvent, useRef, useState } from 'react';

import styles from './styles.module.scss';

interface Props {
  addItem: (item: string) => void;
}

const InputBox = ({ addItem }: Props) => {
  const [value, setValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.length > 50) {
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
      <input type='text' ref={inputRef} value={value} onChange={handleChange} />
      <button type='submit' disabled={value === ''}>
        Create
      </button>
    </form>
  );
};

export default InputBox;
