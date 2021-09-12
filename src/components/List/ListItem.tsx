import { ChangeEvent, useState } from 'react';

import { Item } from '../../models/Item';

interface Props {
  item: Item;
  updateItem: (id: Date, newText: string) => void;
}

const ListItem = ({ item, updateItem }: Props) => {
  const [value, setValue] = useState(item.text);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <li>
      <input type='text' value={value} onChange={handleChange} />
      <button title='Delete'>
        <i className='fas fa-bolt'></i>
      </button>
    </li>
  );
};

export default ListItem;
