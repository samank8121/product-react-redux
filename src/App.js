import styles from './App.module.scss';
import ProductList from '@/components/private/product-list/product-list';

function App() {
  return (
    <div className={styles.App}>
      <ProductList/>
    </div>
  );
}

export default App;
