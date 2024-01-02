/* eslint-disable react/prop-types */
import errorImg from '../assets/404Error.svg';

const ErrorPage = ({ error }) => {
  console.log(error);
  return (
    <>
      <p className='error-txt'>{error}</p>
      <div className="Error">
        <img src={errorImg} alt="" />
      </div>
      
    </>
  );
};

export default ErrorPage;
