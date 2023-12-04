import React from "react";
import styles from './styles.module.scss'
import clsx from 'clsx';

const Button = (props) => {
    const {
        children,
        className,
        onClick,
        type = 'button',
        disabled,
        isLoading
    } = props

    const mainClasses = clsx(
        styles.button,
        className,
        { [styles.disabled]: disabled }
    )

    return (
        <button
            onClick={onClick} 
            type={type}
            className={mainClasses}
            disabled={disabled || isLoading}
        >
            {isLoading ? 'Loading...' : children}
            {isLoading && <div className={styles.loader}></div>}
           
        </button>
    )
}

export default Button;


