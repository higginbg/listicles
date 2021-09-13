import { useState } from 'react';

import { Item } from '../../models/Item';
import InputBox from '../InputBox';
import ListItem from './ListItem';
import Filters from '../Filters';

import styles from './styles.module.scss';

const List = () => {
  const [list, setList] = useState([] as Item[]);
  const [filteredList, setFilteredList] = useState(null as Item[] | null);
  const [sortOrder, setSortOrder] = useState('asc' as 'asc' | 'desc');

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

    setFilteredList((prevList) => {
      const updatedList = prevList && prevList.filter((item) => item.id !== id);
      return updatedList;
    });
  };

  const search = (query: string) => {
    if (query === '') {
      setFilteredList(null);
      return;
    }

    const filteredList = list.filter((item) => {
      const hasTerm = item.text
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase());
      return hasTerm;
    });

    setFilteredList(filteredList);
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

  const sort = () => {
    const desc = (a: Item, b: Item) => (a.text < b.text ? 1 : -1);
    const asc = (a: Item, b: Item) => (a.text > b.text ? 1 : -1);

    const sortLists = (sort: (a: Item, b: Item) => number) => {
      setList((list) => list.sort(sort));
      setFilteredList((list) => list && list.sort(sort));
    };

    if (sortOrder === 'asc') {
      setSortOrder('desc');
      sortLists(desc);
    } else if (sortOrder === 'desc') {
      setSortOrder('asc');
      sortLists(asc);
    }
  };

  let displayedText = '';
  if (filteredList && filteredList.length === 0) {
    displayedText = 'No results found.';
  } else if (list.length === 0) {
    displayedText = 'No items added.';
  }

  return (
    <div className={styles.Container}>
      <InputBox
        addItem={addItem}
        deleteAll={() => setList([])}
        hasItems={list.length > 0}
      />
      <div className={styles.ListContainer}>
        {list.length > 0 && (
          <Filters list={list} onSearch={search} onSort={sort} />
        )}
        {displayedText && (
          <h3 style={{ textAlign: 'center', padding: '2rem 1rem 3rem 1rem' }}>
            {displayedText}
          </h3>
        )}
        {(filteredList || list).length > 0 && (
          <div style={{ padding: '1rem' }}>
            <h4>List items</h4>
            <ul className={styles.List}>
              {(filteredList || list).map((item) => (
                <ListItem
                  key={item.id}
                  item={item}
                  index={list.findIndex(({ id }) => item.id === id)}
                  items={list}
                  hasSearchTerm={!!filteredList}
                  updateItem={updateItem}
                  deleteItem={deleteItem}
                  moveUp={moveItemUp}
                  moveDown={moveItemDown}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
