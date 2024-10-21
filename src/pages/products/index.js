import styles from './page.module.scss';
import ProductList from '@/components/private/product-list/product-list';

function Products() {
  return (
    <div className={styles.products}>
      <ProductList/>
    </div>
  );
}

export default Products;
