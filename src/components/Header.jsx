import { useState } from 'react';
import useTheme from '../context/themeContext';
import '../index.css';

function Header() {
  const { lightTheme, darkTheme } = useTheme();
  const [theme, setTheme] = useState(true);

  

    

    if (theme) {
      console.log('light', theme);
      lightTheme();
    } else {
      console.log('dark', theme);
      darkTheme();
    }
  
  // console.log(theme);
  return (
    <div className="header">
      <div className="container header-content">
        <div className="logo">
          <h1>Where in the World</h1>
        </div>
        <div className="dark-mode" onClick={()=>setTheme(!theme)}>
          <i className="fa-regular fa-moon"></i>
          <span className="dark-text">Dark Mode</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
