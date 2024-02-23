import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import * as romans from 'romans'

function Header({ semester, curriculumName }: { semester: number, curriculumName: string }) {
  const theme = useTheme()
  const large = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <Box
      sx={{
        height: large ? '12rem' : 'min-content',
        padding: '16px 0',
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'column',
        marginBottom: '4rem'
      }}
    >
      <Typography variant={ large ? 'h2' : 'h3' } color='primary' textTransform='uppercase'>
        { romans.romanize(semester) } семестр
      </Typography>
      <Typography color='textSecondary' variant='h5' textTransform='uppercase'>{ curriculumName }</Typography>
    </Box>
  )
}

export default Header
