/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx';
import React, { FC } from 'react';
import styles from './product-card.module.scss';
import { FiStar } from 'react-icons/fi';
import { ProductType } from '@/types/product-type';
import IncreaseDecrease from '@/components/public/increase-decrease/increase-decrease';
import { euro } from '@/shared/constant';

interface ProductCardProps {
  product: ProductType;
  value?: number;
  showAdd?: boolean;
  enableDeleteAlert?: boolean;
  showFav?: boolean;
  className?: string;
  onChange?: (value: number) => void;
  onClick?: () => void;
}
const ProductCard: FC<ProductCardProps> = ({
  product: { caption, imageSrc, rate, price, discount, weight, slug },
  value,
  className,
  onChange,
}) => {
  const onChangeProduct = (count: number) => {
    if (onChange) {
      onChange(count);
    }
  };
  return (
    <>
      <div className={clsx(styles.card, className)}>
        <div className={styles.top}>
          {discount && (
            <div className={clsx(styles.top, styles.discount)}>
              {`-${discount}%`}
            </div>
          )}
        </div>

        <a className={styles.imageContainer} href={`/${slug}`}>
          <img
            src={imageSrc}
            alt={caption}
            loading='lazy'
            className={styles.img}
            draggable={false}
            onDragStart={(event) => {
              event.preventDefault();
            }}
          />
        </a>
        <div className={styles.content}>
          {price !== 0 ? (
            <IncreaseDecrease
              className={styles.add}
              value={value}
              addBtnText="Add"
              onChange={onChangeProduct}
            />
          ) : (
            <div className={styles.add} />
          )}
          <div
            className={clsx(styles.rateContainer, {
              [styles.hidden]: rate === 0,
            })}
          >
            <FiStar className={styles.star} />
            <span className={styles.rate}>{rate}</span>
          </div>
          <div className={styles.priceContainer}>
            <span className={styles.price}>
              {price === 0 ? 'Out of Stock' : price}
            </span>
            {price !== 0 && <span className={styles.price}>{euro}</span>}
          </div>

          <span className={styles.caption}>{caption}</span>
          {weight && <div className={styles.weight}>{weight}</div>}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
