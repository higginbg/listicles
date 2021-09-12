import List from './components/List';

import styles from './app.module.scss';

const App = () => (
  <div className={styles.Container}>
    <h2 className={styles.Header}>Listicles</h2>
    <List />
  </div>
);

export default App;
