import { useState } from 'react';
import { Item } from '../../models/Item';

import InputBox from '../InputBox';
import ListItem from './ListItem';

import styles from './styles.module.scss';

const List = () => {
  const [list, setList] = useState([] as Item[]);

  const addItem = (newItem: string) => {
    setList((prevList) => [
      ...prevList,
      { id: new Date().toISOString(), text: newItem },
    ]);
  };

  const updateItem = (id: string, newText: string) => {
    setList((prevList) => {
      const itemIndex = prevList.findIndex((item) => item.id === id);
      const updatedList = [...prevList];
      updatedList[itemIndex] = { ...prevList[itemIndex], text: newText };
      return updatedList;
    });
  };

  const deleteItem = (id: string) => {
    setList((prevList) => {
      const updatedList = prevList.filter((item) => item.id !== id);
      return updatedList;
    });
  };

  const changePosition = (index: number, newIndex: number) => {
    setList((prevList) => {
      const updatedList = [...prevList];
      updatedList.splice(newIndex, 0, updatedList.splice(index, 1)[0]);
      return updatedList;
    });
  };

  const moveItemUp = (id: string) => {
    const index = list.findIndex((item) => item.id === id);
    changePosition(index, index - 1);
  };

  const moveItemDown = (id: string) => {
    const index = list.findIndex((item) => item.id === id);
    changePosition(index, index + 1);
  };

  return (
    <div className={styles.Container}>
      <InputBox
        addItem={addItem}
        deleteAll={() => setList([])}
        hasItems={list.length > 0}
      />
      <div className={styles.ListContainer}>
        {list.length === 0 ? (
          <h3 style={{ textAlign: 'center' }}>No items found. Add some!</h3>
        ) : (
          <ul className={styles.List}>
            {list.map((item) => (
              <ListItem
                key={item.id}
                item={item}
                index={list.findIndex(({ id }) => item.id === id)}
                items={list}
                updateItem={updateItem}
                deleteItem={deleteItem}
                moveUp={moveItemUp}
                moveDown={moveItemDown}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default List;
