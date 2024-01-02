import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useTheme from '../context/themeContext';
import BarLoader from 'react-spinners/BarLoader';
import ErrorPage from './ErrorPage';

const CountryDetail = () => {
  const code = useParams();
  const [data, setData] = useState();
  const [isError, setIsError] = useState();
  const { themeMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${code.code}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data[0]);
      })
      .catch((error) => {
        setIsError('Something Went Wrong.... Try   Again');
        console.log(error);
      });
  }, [code]);

  if (isError) {
    return (
      <div>
        {console.log(isError)}
        <ErrorPage error={isError} />
      </div>
    );
  }

  if (data) {
    return (
      <>
        <div className="container">
          <div className="back-btn" onClick={() => navigate('/')}>
            <i className="fa-solid fa-arrow-left"></i>
            <span>Back</span>
          </div>
        </div>
        <div className="container">
          <div className="card-details">
            <div className="image">
              <img src={data.flags.png} alt="" />
            </div>
            <div className="card-content-detail">
              <h2 className="country-name">{data.name.common}</h2>
              <div className="country-detail">
                <ul>
                  <li>
                    <span>Native Name: </span>
                    {
                      data.name.nativeName[Object.keys(data.name.nativeName)[0]]
                        .common
                    }
                  </li>
                  <li>
                    <span>Population: </span>
                    {data.population.toLocaleString()}
                  </li>
                  <li>
                    <span>Region: </span>
                    {data.region}
                  </li>
                  <li>
                    <span>Sub Region: </span>
                    {data.subregion}
                  </li>
                  <li>
                    <span>Capital: </span>
                    {data.capital}
                  </li>
                </ul>
                <ul>
                  <li>
                    <span>Top Level Domain: </span>
                    {data.tld}
                  </li>
                  <li>
                    <span>Currencies:</span>
                    {data.currencies[Object.keys(data.currencies)[0]].name}
                  </li>
                  <li>
                    <span>Languages: </span>
                    {data.languages[Object.keys(data.languages)[0]]}
                  </li>
                </ul>
              </div>
              <div className="country-border">
                <span>Border Countries:</span>
                <ul>
                  {data.borders ? (
                    <>
                      {data.borders.map((border, index) => (
                        <li key={index}>
                          <Link to={`/country/${border.toLowerCase()}`}>
                          {border}
                          </Link>
                          </li>
                      ))}
                    </>
                  ) : (
                    <>No Border</>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="loader">
        <BarLoader color={themeMode === 'dark' ? 'white' : 'black'} />
      </div>
    );
  }
};

export default CountryDetail;
