import React, { useEffect, useState } from 'react';

function Currency({ firstCurrency, secondCurrency }) {
  const [value, setValue] = useState();
  const [amount, setAmount] = useState();
  const [conversionResult, setConversionResult] = useState();

  useEffect(() => {
    let isCancelled = false;
    if (amount && firstCurrency && secondCurrency) {
      fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${firstCurrency}&to=${secondCurrency}`
      )
        .then((res) => res.json())
        .then((res) => {
          if (!isCancelled) {
            setConversionResult(res.rates[secondCurrency]);
          }
        })
        .catch((err) => {
          setConversionResult();

        });
    }
    return () => {
      isCancelled = true;
    };
  }, [amount, firstCurrency, secondCurrency]);

  let basicConversion = `${amount}  ${firstCurrency} Equal ${conversionResult} ${secondCurrency}`;
  let basicRate = `1 ${firstCurrency} = ${(conversionResult / amount).toFixed(
    3
  )} ${secondCurrency}`;
  let inverseRate = `1 ${secondCurrency} = ${(
    amount / conversionResult
  ).toFixed(3)} ${firstCurrency}`;
  return (
    <div className="conversion-container">
      <label> Amount of money?</label>
      <br></br>
      <div>
        <input
          className="value-country"
          type="text"
          onChange={(e) => {
            setValue(e.target.value);
          }}
        ></input>
        <button
          className="exchange-button"
          onClick={() => {
            setAmount(value);
          }}
        >
          Exchange
        </button>
      </div>
      <div className="conversion-result">
        {
          <div>
            <p className="basic-conversion">{basicConversion}</p>
            <p className="rate">{basicRate}</p>
            <p className="rate">{inverseRate}</p>
          </div>
        }
      </div>
    </div>
  );
}

export default Currency;
