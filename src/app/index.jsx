import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss'
import Button from "../components/button"
import CurrencySelect from '../components/currency-select';
import Input from '../components/input';
import { REQUEST_HEADERS, API } from '../api/endpoints';


function App() {
  const [fromOption, setFromOption] = useState(null);
  const [toOption, setToOption] = useState(null);
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);
  const [isLoadingSymbols, setIsLoadingSymbols] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [symbolsOptions, setSymbolsOptions] = useState([]);
  const [loadingConvert, setLoadingConvert] = useState(false);
  const [error, setError] = useState(null);

  const handlesSwapCurrency = () => {
    setFromOption(toOption);
    setToOption(fromOption);
  };

  const getSymbols = async () => {
    try {
      const res = await fetch(API.CURRENCY.symbols, REQUEST_HEADERS);
      if (!res.ok) {
        throw new Error('Failed to fetch symbols');
      }
      const data = await res.json();
      return data.symbols;
    } catch (error) {
      throw new Error(error.message)
    }
  };

  const transformSymbolDataToOptions = (symbolsObj) => {
    return Object.keys(symbolsObj).map((item) => {
      return {
        value: item,
        label: item
      };
    });
  };

  const handleConvertCurrency = async () => {
    if (!amount || !toOption || !fromOption || loadingConvert) {
      return;
    }

    try {
      setLoadingConvert(true);

      const res = await fetch(
        API.CURRENCY.convert(toOption.value, fromOption.value, amount),
        REQUEST_HEADERS
      );
      if (!res.ok) {
        throw new Error('Failed to convert currency');
      }
      const data = await res.json();
      setResult({
        amount: data.query.amount,
        result: data.result,
        from: data.query.from,
        to: data.query.to
      });
    } catch (error) {
      console.error('Error converting currency:', error);
      setError('An error occurred while converting currency');
    } finally {
      setLoadingConvert(false);
    }
  };

  useEffect(() => {
    (async () => {
      setIsLoadingSymbols(true)
      try {
        const symbols = await getSymbols();
        setSymbolsOptions(transformSymbolDataToOptions(symbols));
      } catch(e) {
        setError(e || 'Error')
      } finally {
          setIsLoadingSymbols(false)
      }
      
    })();
  }, []);

  if (!symbolsOptions.length) {
    return null
  }

  return (
    <div className={styles['currency-converter-wrap']}>
      <h1 className={styles['title']}>Currency Converter</h1>
      <Input
        type='number'
        className={styles['input']}
        label="Enter Amount"
        value={amount}
        onChange={(val) => setAmount(val)}
        disabled={isDisabled}
      />

      <div className={styles['select-wrap']}>
        <CurrencySelect
          className={styles['select']}
          label='From'
          value={fromOption}
          onChange={(val) => setFromOption(val)}
          options={symbolsOptions}
          disabled={isDisabled}
        />
        <i className={styles['icon-swap']} onClick={handlesSwapCurrency}></i>
        <CurrencySelect
          label='To'
          value={toOption}
          onChange={(val) => setToOption(val)}
          options={symbolsOptions}
          disabled={isDisabled}
        />
      </div>


      <div className={styles['result-block']}>
        <h2>Result</h2>
        {result && (
          <p>
            {amount} {result.from} = {result.result} {result.to}
          </p>
        )}
      </div>

      <Button
        onClick={handleConvertCurrency}
        className={styles['convert-btn']}
        disabled={
          isDisabled ||
          (!amount || !toOption || !fromOption)
        }
        isLoading={loadingConvert}
      >
        Convert
      </Button>

      {error && <p className={styles['error-message']}>{error}</p>}

    </div>
  );
}





export default App;
