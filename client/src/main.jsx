import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { GlobalContextProvider } from './context/GlobalContext.jsx'
import { ProcessContextProvider } from './context/ProcessContext.jsx'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme();

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <GlobalContextProvider>
      <AuthContextProvider>
        <ProcessContextProvider>
        <ThemeProvider theme={theme}>
      <CssBaseline />
          <App />
          </ThemeProvider>

        </ProcessContextProvider>
      </AuthContextProvider>
    </GlobalContextProvider>
  
)
