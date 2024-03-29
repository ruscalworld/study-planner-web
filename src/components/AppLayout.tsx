import { Box } from '@mui/material'
import { ReactNode } from 'react'
import Footer from './Footer.tsx'

function AppLayout({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Box sx={{ minHeight: 'calc(100vh - 48px)' }}>
        { children }
      </Box>
      <Footer/>
    </Box>
  )
}

export default AppLayout
