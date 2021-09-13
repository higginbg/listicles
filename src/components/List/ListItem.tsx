import { ChangeEvent, useState } from 'react';

import { Item } from '../../models/Item';

import styles from './styles.module.scss';

interface Props {
  item: Item;
  index: number;
  items: Item[];
  updateItem: (id: string, newText: string) => void;
  deleteItem: (id: string) => void;
  moveUp: (id: string) => void;
  moveDown: (id: string) => void;
}

const ListItem = ({
  item,
  index,
  items,
  updateItem,
  deleteItem,
  moveUp,
  moveDown,
}: Props) => {
  const { id, text } = item;

  const [value, setValue] = useState(text);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.length > 30) {
      return;
    }

    setValue(value);
    updateItem(id, value);
  };

  return (
    <li>
      <span className={styles.Number}>{index + 1}.</span>
      <input type='text' value={value} onChange={handleChange} />
      <button onClick={() => moveUp(id)} disabled={index === 0}>
        <i className='fa fa-caret-up'></i>
      </button>
      <button
        onClick={() => moveDown(id)}
        disabled={index === items.length - 1}
      >
        <i className='fa fa-caret-down'></i>
      </button>
      <button
        className={styles.Delete}
        title='Delete'
        onClick={() => deleteItem(id)}
      >
        <i className='fas fa-bolt'></i>
      </button>
    </li>
  );
};

export default ListItem;
