import React from 'react';
import { buttonStyles } from './styles';

const Button = ({
  primary,
  primaryBig,
  primarySmall,
  secondary,
  secondarySmall,
  children,
  background,
  color,
  margin,
  textButton,
  onClick,
  disabled,
  hoverColor
}) => {
  const props = {
    background,
    color,
    margin,
    hoverColor
  };

  const styles = buttonStyles(props);

  return (
    <>
      {primary ? (
        <button
          disabled={disabled}
          onClick={onClick}
          className={styles.secondary}
        >
          {children}
        </button>
      ) : primaryBig ? (
        <button
          disabled={disabled}
          onClick={onClick}
          className={styles.primaryBig}
        >
          {children}
        </button>
      ) : primarySmall ? (
        <button
          disabled={disabled}
          onClick={onClick}
          className={styles.primarySmall}
        >
          {children}
        </button>
      ) : secondary ? (
        <button
          disabled={disabled}
          onClick={onClick}
          className={styles.secondary}
        >
          {children}
        </button>
      ) : secondarySmall ? (
        <button
          disabled={disabled}
          onClick={onClick}
          className={styles.secondarySmall}
        >
          {children}
        </button>
      ) : textButton ? (
        <button
          disabled={disabled}
          onClick={onClick}
          className={styles.textButton}
        >
          {children}
        </button>
      ) : null}
    </>
  );
};

export default Button;
