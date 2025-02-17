import styles from './App.module.scss';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;