import { Box, Container, useTheme } from '@mui/material'
import { ReactNode } from 'react'

function CenteredContainer({ children }: { children: ReactNode }) {
  const theme = useTheme()

  return (
    <Container sx={{ minHeight: 'calc(100vh - 48px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box margin='auto' sx={{ [theme.breakpoints.up('sm')]: { minWidth: '512px' }, minWidth: '100%' }}>
        { children }
      </Box>
    </Container>
  )
}

export default CenteredContainer
