import Header from './components/Header';
import Country from './components/Country';
import './App.css';
import { ThemeProvider } from './context/themeContext';
import { useState } from 'react';
import CountryDetail from './components/CountryDetail';
import { Routes,Route } from 'react-router-dom';

function App() {
  const [themeMode, setThemeMode] = useState('light');

  const lightTheme = () => {
    
    setThemeMode('light');
    document.querySelector('body').classList.remove('light', 'dark');
    document.querySelector('body').classList.add(themeMode);
  };
  const darkTheme = () => {
    console.log('dark');
    setThemeMode('dark');
    document.querySelector('body').classList.remove('light', 'dark');
    document.querySelector('body').classList.add(themeMode);
  };

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <Header />
      <Routes>
        <Route path='/' element={<Country/>}></Route>
        <Route path='/country/:code' element={<CountryDetail/>}></Route>
      </Routes>
      
    </ThemeProvider>
  );
}

export default App;
