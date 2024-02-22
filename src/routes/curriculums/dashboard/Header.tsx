import { Box, Typography } from '@mui/material'
import * as romans from 'romans'

function Header({ semester, curriculumName }: { semester: number, curriculumName: string }) {
  return (
    <Box
      sx={{
        height: '12rem',
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'column',
        marginBottom: '4rem'
      }}
    >
      <Typography variant='h2' color='primary' textTransform='uppercase'>
        { romans.romanize(semester) } семестр
      </Typography>
      <Typography color='textSecondary' variant='h5' textTransform='uppercase'>{ curriculumName }</Typography>
    </Box>
  )
}

export default Header
