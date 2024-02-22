import { CircularProgress, Stack, Typography } from '@mui/material'

function InlineCircularProgress({ value, label }: { value: number, label: string }) {
  return (
    <Stack direction='row' spacing={ 1.5 } alignItems='center'>
      <CircularProgress variant='determinate' size='1.75em' value={ value }/>
      <Typography color='primary'>{ label }</Typography>
    </Stack>
  )
}

export default InlineCircularProgress
