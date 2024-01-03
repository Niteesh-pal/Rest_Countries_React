import '../index.css';
import { useEffect, useState } from 'react';
import CountryData from './CountryData';
import BarLoader from 'react-spinners/BarLoader';
import DropdownOption from './DropdownOption';
import ErrorPage from './ErrorPage';
import useTheme from '../context/themeContext';

function Country() {
  let subregion = [];
  const [apiData, setApiData] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [filterRegion, setFilteredRegion] = useState('Filter By Region');
  const [sort, setSort] = useState('Sort by');
  const [isLoading, setIsLoading] = useState(false);
  const [iserror, setisError] = useState(null);
  const { themeMode } = useTheme();

  const sortValue = {
    'Area by Ascending': [undefined],
    'Area by Descending': [undefined],
    'Population by Ascending': [undefined],
    'Population by Descending': [undefined],
  };

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/all`)
      .then((data) => data.json())
      .then((data) => {
        if (data.message === undefined) {
          setApiData(data);
          setIsLoading(true);
        } else {
          setisError(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setisError('Page Not Found');
        console.log('jfkjkj');
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

  if (sort === 'Area by Ascending') {
    filteredApiData.sort((a, b) => a['area'] - b['area']);
  }
  if (sort === 'Area by Descending') {
    filteredApiData.sort((a, b) => (a['area'] > b['area'] ? -1 : 1));
  }
  if (sort === 'Population by Ascending') {
    filteredApiData.sort((a, b) => a['population'] - b['population']);
  }
  if (sort === 'Population by Descending') {
    filteredApiData.sort((a, b) =>
      a['population'] > b['population'] ? -1 : 1
    );
  }

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

  return iserror !== null ? (
    <ErrorPage error={iserror} />
  ) : (
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
        <div className="filter-sort-container">
          <div className="filter">
            <div className="filter-btn">
              <span>{filterRegion}</span>
              <i className="fa-solid fa-angle-down"></i>
            </div>
            <div className="option">
              <DropdownOption
                value={subregion}
                state={'Filter By Region'}
                setValue={setFilteredRegion}
              />
            </div>
          </div>
          <div className="sort">
            <div className="sort-btn">
              <span>{sort}</span>
              <i className="fa-solid fa-angle-down"></i>
            </div>
            <div className="option">
              <DropdownOption
                value={sortValue}
                state={'Sort By'}
                setValue={setSort}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={isLoading ? 'country-container container' : ''}>
        {isLoading === true ? (
          <CountryData filteredApiData={filteredApiData} />
        ) : (
          <div className="loader">
            <BarLoader color={themeMode === 'dark' ? 'white' : 'black'} />
          </div>
        )}
      </div>
    </>
  );
}

export default Country;
