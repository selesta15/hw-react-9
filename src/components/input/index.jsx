import React from "react";
import styles from './styles.module.scss';
import clsx from 'clsx';


const Input = (props) => {
    const {
        value,
        onChange,
        label,
        disabled,
        className
    } = props

    const inputClassName = clsx(
        styles['input-wrap'],
        className,
        { 
            [styles['disabled']]: disabled 
        }
       
    )


    return(
        <div className={inputClassName}>
            {label && (
                <span className={styles['label']}>
                    {label}
                </span>
            )}
            <input
             type="type"
             value={value}
             onChange={(e) => onChange(e.target.value)}
             disabled={disabled}
             className={styles['input']}
              />
        </div>
    )
}

export default Input