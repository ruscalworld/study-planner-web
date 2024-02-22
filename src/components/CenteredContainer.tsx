import { Box, Container } from '@mui/material'
import { ReactNode } from 'react'

function CenteredContainer({ children }: { children: ReactNode }) {
  return (
    <Container sx={{ minHeight: 'calc(100vh - 48px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box margin='auto' sx={{ minWidth: '512px' }}>
        { children }
      </Box>
    </Container>
  )
}

export default CenteredContainer
