import { useState } from 'react';
import useTheme from '../context/themeContext';
import '../index.css';

function Header() {

    const {lightTheme, darkTheme} = useTheme();
    const [theme, setTheme] = useState(false)
   
    const handleThemeMode = ()=>{
        setTheme((theme)=>!theme)
        if(theme){
            console.log("dark",theme)
            darkTheme();
        }
        else{
            console.log("light", theme)
            lightTheme();
        }
    }
    // console.log(theme);
  return (
    <div className="header">
      <div className="container header-content">
        <div className="logo">
          <h1>Where in the World</h1>
        </div>
        <div className="dark-mode" onClick={handleThemeMode}>
          <i className="fa-regular fa-moon"></i>
          <span className="dark-text">Dark</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
