import clsx from 'clsx';
import React, { forwardRef, useId, useRef } from 'react';

import styles from './input.module.css';

const Input = forwardRef(
  (
    {
      label,
      value,
      onPressEnter,
      onChange,
      prefix,
      icon,
      hint,
      disabled,
      className,
      hasError,
      type = 'text',
      placeholder,
      innerPlaceholder,
      enterKeyHint,
      name,
      autoComplete,
      ...props
    },
    ref
  ) => {
    const localRef = useRef<HTMLInputElement | null>(null);

    const inputId = useId();
    
    if (innerPlaceholder) {
      placeholder = ' ';
    }

    return (
      <div
        className={clsx(styles.inputWrapper, {
          [styles.error]: hasError,
          [styles.hasInnerPlaceholder]: innerPlaceholder,
        })}
      >
        {label && (
          <label htmlFor={`input${inputId}`} className={styles.label}>
            {label}
          </label>
        )}
        <div
          className={clsx(
            styles.input,
            className,
            { [styles.filled]: !disabled },
            { [styles.disabled]: disabled }
          )}
          tabIndex={0}
          role="button"
          {...(innerPlaceholder && {
            onClick: () => {
              localRef?.current?.focus();
            },
          })}
        >
          {prefix && <span className={styles.prefix}>{prefix}</span>}
          {icon && <span className={styles.icon}>{icon}</span>}
          <input
            ref={ref}
            id={`input${inputId}`}
            aria-label="input"
            type={type}
            disabled={disabled}
            enterKeyHint={enterKeyHint}
            value={value}
            onChange={onChange}            
            placeholder={placeholder}            
            onKeyUp={(e) => {
              if (e.key === 'Enter' && onPressEnter) {
                onPressEnter();
              }
            }}
            name={name}
            autoComplete={autoComplete}
            {...props}
          />          
          {innerPlaceholder && (
            <span className={styles.innerPlaceholder}>{innerPlaceholder}</span>
          )}
        </div>
        {hint && <span className={styles.hint}>{hint}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
