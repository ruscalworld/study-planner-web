import { ReactNode } from 'react'
import { Box, Typography } from '@mui/material'

function LabeledText({ label, children }: { label: string, children: ReactNode }) {
  return (
    <Box>
      <Typography variant='overline' color='textSecondary' component='p'>{ label }</Typography>
      { children }
    </Box>
  )
}

export default LabeledText
