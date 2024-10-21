import clsx from 'clsx';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './button.module.scss';


const Button = React.forwardRef(
  (
    {
      variant = 'filled',
      size = 'm',
      type = 'button',
      icon,
      children,
      className,
      loading,
      loadingText,
      delay = 300,
      onClick,
      ...props
    },
    ref
  ) => {
    const [activeLoading, setActiveLoading] = useState(false);
    const [timer, setTimer] = useState(null);


    const handleClick = (e) => {
      if (loading) {
        e.preventDefault();
        return;
      }
      if (onClick) {
        onClick(e);
      }
    };


    if (loading && !timer) {
      const time = setTimeout(() => {
        setActiveLoading(true);
      }, delay);
      setTimer(time);
    }
    if (!loading && activeLoading) {
      setActiveLoading(false);
      setTimer(null);
    }
    if (!loading && timer) {
      clearTimeout(timer);
      setTimer(null);
    }

    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          styles.button,
          styles[`button-variant-${variant}`],
          styles[`button-size-${size}`],
          className,
          {
            [styles['only-icon']]: icon && typeof children === 'undefined',
            [styles.loading]: activeLoading,
          }
        )}
        onClick={handleClick}
        {...props}
      >
        {icon && !activeLoading && <span className={styles.icon}>{icon}</span>}
        {activeLoading && loadingText ? loadingText : children}        
      </button>
    );
  }
);

Button.displayName = 'Button';

Button.propTypes = {
  variant: PropTypes.oneOf(['filled', 'outlined', 'elevated']),
  size: PropTypes.oneOf(['sm', 'm', 'l', 'xl']),
  icon: PropTypes.node,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
  delay: PropTypes.number,
  onClick: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Button;
