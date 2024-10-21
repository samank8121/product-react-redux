import request from 'graphql-request';
import { CHANGE_PRODUCT_OF_CART } from '@/shared/graphql/cart';
import { useAuthentication } from '@/shared/hooks/useAuthentication';
import { useDispatch, useSelector } from 'react-redux';
import { changeCart, fetchCart  } from '@/shared/redux/slices/cartSlice';

export const useCart = () => {
  const { getHeader } = useAuthentication();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cartSlice);
  const changeProduct = async (productid, value) => {
    const headers = getHeader();
    await request(
      process.env.REACT_APP_API_ADDRESS,
      CHANGE_PRODUCT_OF_CART,
      { productId: productid, count: value },
      headers
    );
    dispatch(changeCart({ productId: productid, count: value }));
    dispatch(fetchCart(headers));
  };
  const getProductCount = (productid) => { 
    if (cart && cart.products) {
      const result = Object.entries(cart.products).filter(
        (key) => key[0].toString() === productid.toString()
      );
      return result && result.length > 0 ? result[0][1] : 0;
    } else return 0;
  };

  return { changeProduct, getProductCount, loading, error };
};
