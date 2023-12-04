import React from "react";
import styles from './styles.module.scss'
import flags from "../../consts/flags";
import styled from "styled-components";



const StyledImgWrap = styled.div`
width: ${props => props.$width || 16}px;
height: ${props => props.height || 10}px
`


const CurrencyFlag = (props) => {
    const {
        currency,
        width, 
        height
    } = props


    return (
        <StyledImgWrap $height={height} $width={width} className={styles['currency-flag']}>
            <img src={flags[currency ? currency.toLowerCase() : '$$$']} alt="Currency Flag" />

        </StyledImgWrap>

    )
}


export default CurrencyFlag