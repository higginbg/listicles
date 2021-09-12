import { useState } from 'react';
import { Item } from '../../models/Item';

import InputBox from '../InputBox';
import ListItem from './ListItem';

import styles from './styles.module.scss';

const List = () => {
  const [list, setList] = useState([] as Item[]);

  const addItem = (newItem: string) => {
    setList((prevList) => [...prevList, { id: new Date(), text: newItem }]);
  };

  const updateItem = (id: Date, newText: string) => {
    setList((prevList) => {
      const itemIndex = prevList.findIndex((item) => item.id === id);
      const updatedList = [...prevList];
      updatedList[itemIndex] = { ...prevList[itemIndex], text: newText };
      return updatedList;
    });
  };

  return (
    <div>
      <InputBox addItem={addItem} />
      <div className={styles.Container}>
        {list.length === 0 ? (
          <h3 style={{ textAlign: 'center' }}>No items found. Add some!</h3>
        ) : (
          <ul className={styles.List}>
            {list.map((item) => (
              <ListItem
                key={item.id.toDateString()}
                item={item}
                updateItem={updateItem}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default List;
