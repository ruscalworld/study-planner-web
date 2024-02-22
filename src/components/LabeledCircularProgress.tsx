import { Box, CircularProgress, CircularProgressProps } from '@mui/material'

function LabeledCircularProgress(props: CircularProgressProps & { label: string }) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant='determinate' { ...props }/>
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
          { props.label }
      </Box>
    </Box>
  )
}

export default LabeledCircularProgress
