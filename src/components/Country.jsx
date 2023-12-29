import '../index.css';
import { useEffect, useState } from 'react';
import CountryData from './CountryData';
import BarLoader from 'react-spinners/BarLoader';

function Country() {
  let region = [];
  let subregion = [];
  const [apiData, setApiData] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [value, setValue] = useState('Filter By Region');
  const [active, setActive] = useState(false);
  const [filterRegion, setFilteredRegion] = useState('Filter By Region');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/all`)
      .then((data) => data.json())
      .then((data) => {
        setApiData(data);
        setIsLoading(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  let filteredApiData = apiData.filter((country) => {
    const name = country.name.common.toLowerCase();
    return (
      name.includes(userInput) &&
      (filterRegion === country.region ||
        filterRegion === country.subregion ||
        filterRegion === 'Filter By Region')
    );
  });

  // console.log(filterRegion);

  subregion = apiData.reduce((acc, curr) => {
    if (!acc[curr.region]) {
      acc[curr.region] = [];
    } else {
      if (!acc[curr.region].includes(curr.subregion)) {
        acc[curr.region].push(curr.subregion);
      }
    }

    return acc;
  }, []);

  return (
    <>
      <div className="filter-container container">
        <div className="search">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search for a country..."
            onChange={(e) => setUserInput(e.target.value.trim().toLowerCase())}
          />
        </div>
        <div className="filter">
          <div className="filter-btn" onClick={() => setActive(!active)}>
            <span className="filter-btn-text">
              {filterRegion ? filterRegion : 'Filter By Region..'}
            </span>
            <i className="fa-solid fa-angle-down"></i>
          </div>
          <div className={active ? 'filter-option active' : 'filter-option'}>
            <ul
              className="filter-region"
              onClick={(e) => {
                setFilteredRegion(e.target.textContent);
              }}
            >
              <li>Filter By Region</li>
              {Object.keys(subregion).map((region, index) => {
                return (
                  <li key={index} className="region">
                    <a>{region}</a>
                    <ul onClick={(active) => setActive(!active)}>
                      {subregion[region].map((name) =>
                        name ? <li>{name}</li> : ''
                      )}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="country-container container">
        {isLoading === true ? (
          <CountryData filteredApiData={filteredApiData} />
        ) : (
          <div className="loader">
            <BarLoader />
          </div>
        )}
      </div>
    </>
  );
}

export default Country;
