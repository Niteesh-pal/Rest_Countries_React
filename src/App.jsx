import Header from './components/Header'
import Country from './components/Country'
import './App.css'
import { ThemeProvider } from './context/themeContext'
import { useState } from 'react'

function App() {
  const[themeMode, setThemeMode] = useState("light")

  const lightTheme = ()=>{
    console.log("light")
    setThemeMode("light")
    document.querySelector("body").classList.remove("light", "dark");
    document.querySelector("body").classList.add(themeMode)
  }
  const darkTheme = ()=>{
    console.log("dark")
    setThemeMode("dark")
    document.querySelector("body").classList.remove("light", "dark");
    document.querySelector("body").classList.add(themeMode)
  }

  return (
    <ThemeProvider value={{themeMode, lightTheme, darkTheme}}>
      <Header></Header>
      <Country/>
    </ThemeProvider>
  )
}

export default App
