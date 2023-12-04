import React from "react";
import Select from "react-select";
import styles from './styles.module.scss';
import clsx from 'clsx';
import CurrencyFlag from "../currensy-flag";




const CurrencySelect = (props) => {
    const {
        value,
        onChange,
        options,
        label,
        className,
        disabled
    } = props

    

  

    const selectClassname = clsx(
        styles['select-wrap'],
        className
    )

    const formatOptionLabel = (option) => {
        return (
            <div className={styles['custom-option']}>
                <CurrencyFlag whith={20} height={13} currency={option.value}/>
                <div className={styles['label']}>{option.label}</div>
            </div>
        )
    }

    return (
        <div className={selectClassname}>
            {label && (
                <span className={styles['label']}>
                    {label}
                </span>
            )}
            <Select
            classNamePrefix='custom-select'
            placeholder='USD'
            isDisabled={disabled}
            value={value}
            onChange={onChange}
            formatOptionLabel={formatOptionLabel}
            options={options}
              />
            

        </div>
    )
}

export default CurrencySelect


