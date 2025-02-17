import { RouterProvider } from 'react-router-dom';
import styles from './App.module.scss';

import routes from './routes';

function App() {
  return (
    <div className={styles.App}>
      <RouterProvider router={routes}/>
    </div>
  );
}

export default App;