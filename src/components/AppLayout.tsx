import { Box } from '@mui/material'
import { ReactNode } from 'react'
import Footer from './Footer.tsx'

function AppLayout({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      { children }
      <Footer/>
    </Box>
  )
}

export default AppLayout
