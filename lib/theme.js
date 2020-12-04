import React, {createContext} from 'react'
import {ThemeProvider} from 'styled-components/native'

const ThemeContext = createContext()

export default ThemeContext


export function Provider({ themes, children }) {
  const [isDark, setTheme] = React.useState(true);
  const currTheme = themes[isDark ? 'dark' : 'light'];

  const ToogleTheme = () => setTheme(last=>!last)

  const Values = {
    ToogleTheme,
    theme: currTheme,
    themes
  }

  return (
    <ThemeContext.Provider value={Values}>
      <ThemeProvider theme={currTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
} 
