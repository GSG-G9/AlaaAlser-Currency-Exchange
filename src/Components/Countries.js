import React, { useEffect, useState } from 'react';
import Conversion from './Currency';

function Countries() {
  const [firstCountry, setFirstCountry] = useState();
  const [firstCurrency, setFirstCurrency] = useState();
  const [firstFlag, setFirstFlag] = useState();

  const [secondCountry, setSecondCountry] = useState();
  const [secondCurrency, setSecondCurrency] = useState();
  const [secondFlag, setSecondFlag] = useState();
  const [isEditing, setIsEditing] = useState(false);



  useEffect(() => {
    const abortController = new AbortController();
    if (firstCountry) {
      fetch(`https://restcountries.eu/rest/v2/name/${firstCountry}`)
        .then((res) => res.json())
        .then((res) => {
              setFirstCurrency(res[0].currencies[0].code);
              setFirstFlag(res[0].flag);
            }
        );
    }
    return () => abortController.abort();
  }, [firstCountry]);

  useEffect(() => {
    const abortController = new AbortController();
    if (secondCountry) {
      fetch(`https://restcountries.eu/rest/v2/name/${secondCountry}`)
        .then((res) => res.json())
        .then((res) => {

              setSecondCurrency(res[0].currencies[0].code);
              setSecondFlag(res[0].flag);
            }
        );
    }
    return () => abortController.abort();

  }, [secondCountry]);

  return (
    <>
      <div className="countries">
        <div className="country1">
            <input type="text" onChange={(e)=>setFirstCountry(e.target.value)}></input>
          {
            firstCountry && (
              <div>
                {firstFlag && (
                  <img class="flag" src={firstFlag} alt="country flag"></img>
                )}
                <p>{firstCurrency}</p>
              </div>
            )
          }
        </div>

        <div className="country2">
          <p> Name of the second country </p><br></br>
            <input type="text" onChange={(e)=>setSecondCountry(e.target.value)}></input>
          {
            secondCountry && (
              <div>
                {secondFlag && (
                  <img class="flag" src={secondFlag} alt="country flag"></img>
                )}
                <p>{secondCurrency}</p>
              </div>
            )
          }
        </div>
      </div>
      <Conversion
        firstCurrency={firstCurrency}
        secondCurrency={secondCurrency}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    </>
  );
}

export default Countries;
