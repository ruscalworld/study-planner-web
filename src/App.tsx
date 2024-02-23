import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { Outlet } from 'react-router-dom'
import AuthProvider from './AuthProvider.tsx'
import AppLayout from './components/AppLayout.tsx'
import ModalProvider from './components/ModalProvider.tsx'

const theme = createTheme({
  palette: {
    mode: 'dark',
    text: {
      secondary: '#999999',
    },
    primary: {
      main: '#2fb387',
    },
    secondary: {
      main: '#6d61f3',
    },
    background: {
      default: '#121212',
      paper: '#151515',
    },
  },
  typography: {
    fontFamily: '"Rubik", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '5rem',
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 500,
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
})

function App() {
  return (
    <ThemeProvider theme={ theme }>
      <CssBaseline/>
      <ModalProvider>
        <AuthProvider>
          <AppLayout>
            <Outlet/>
          </AppLayout>
        </AuthProvider>
      </ModalProvider>
    </ThemeProvider>
  )
}

export default App
