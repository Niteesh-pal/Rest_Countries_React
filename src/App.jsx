import Header from './components/Header';
import Country from './components/Country';
import './App.css';
import { ThemeProvider } from './context/themeContext';
import { useState } from 'react';
import CountryDetail from './components/CountryDetail';
import { Routes, Route } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';

function App() {
  const [themeMode, setThemeMode] = useState('light');

  const lightTheme = () => {
    setThemeMode('light');
    document.querySelector('body').classList.remove('light', 'dark');
    document.querySelector('body').classList.add(themeMode);
  };
  const darkTheme = () => {
    setThemeMode('dark');
    document.querySelector('body').classList.remove('light', 'dark');
    document.querySelector('body').classList.add(themeMode);
  };

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <Header />
      <Routes>
        <Route path="/" element={<Country />}></Route>
        <Route path="/country/:code" element={<CountryDetail />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
