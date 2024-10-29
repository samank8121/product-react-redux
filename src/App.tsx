import styles from './App.module.scss';
import { Routes, Route } from 'react-router-dom';
import Products from '@/pages/products';
import Login from '@/pages/login';

function App() {
  return (
    <div className={styles.App}>
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
