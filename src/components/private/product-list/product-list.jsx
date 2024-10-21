import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/private/product-card/product-card';
import styles from './product-list.module.scss';
import { GET_PRODUCTS } from '@/shared/graphql/products';
import { useCart } from '@/shared/hooks/useCart';
import { useAuthentication } from '@/shared/hooks/useAuthentication';
import request from 'graphql-request';

const ProductList = () => {
  const { changeProduct, getProductCount } = useCart();
  const { isAuthenticated } = useAuthentication();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await request(
          process.env.REACT_APP_API_ADDRESS,
          GET_PRODUCTS
        );
        setProducts(result && result.products ? result.products : []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  const onChangeProduct = (productid, count) => {
    changeProduct(productid, count);
  };
  return (
    <div className={styles.productList}>
      {products &&
        products.length > 0 &&
        products.map((p, index) => (
          <ProductCard
            key={index}
            product={p}
            value={getProductCount(p.id)}
            onChange={(value) => {
              if (isAuthenticated()) {
                onChangeProduct(p.id, value);
              }
            }}
          />
        ))}
    </div>
  );
};

export default ProductList;
