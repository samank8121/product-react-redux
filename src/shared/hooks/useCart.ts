import request from 'graphql-request';
import { CHANGE_PRODUCT_OF_CART } from '@/shared/graphql/cart';
import { useAuthentication } from '@/shared/hooks/useAuthentication';

import { changeCart, fetchCart  } from '@/shared/redux/slices/cartSlice';
import { useAppDispatch, useAppSelector } from '@/shared/redux/hooks';

export const useCart = () => {
  const { getHeader } = useAuthentication();
  const dispatch = useAppDispatch();
  const { cart, loading, error } = useAppSelector((state) => state.cartSlice);
  const changeProduct = async (productid:number, value:number) => {
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
  const getProductCount = (productid:number):number => { 
    if (cart && cart.products) {
      const result = Object.entries(cart.products).filter(
        (key) => key[0].toString() === productid.toString()
      );
      return result && result.length > 0 ? result[0][1] as number : 0;
    } else return 0;
  };

  return { changeProduct, getProductCount, loading, error };
};
