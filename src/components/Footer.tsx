import { Box, Stack, Typography, Link, Button } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { forgetCurriculumId } from '../lib/memory.ts'

function Footer() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        minHeight: '48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 16px',
        color: '#444444'
      }}
    >
      <Stack direction='row' spacing={ 2 }>
        { location.pathname !== '/' && (
          <Button
            variant='text'
            size='small'
            color='inherit'
            onClick={ () => {
              forgetCurriculumId()
              navigate('/')
            }}
          >
            Главная
          </Button>
        )}
      </Stack>
      <Typography variant='caption'>
        made with { '<3' } by <Link href='https://ruscal.world' color='inherit'>ruscalworld</Link>
      </Typography>
    </Box>
  )
}

export default Footer
