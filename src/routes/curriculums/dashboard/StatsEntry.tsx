import { Stack, Typography } from '@mui/material'
import LabeledCircularProgress from '../../../components/LabeledCircularProgress.tsx'

function StatsEntry({ value, title, description }: { value: number, title: string, description: string }) {
  return (
    <Stack direction='row' spacing={ 4 } alignItems='center'>
      <LabeledCircularProgress label={ `${ value.toFixed(0) }%` } value={ value } size='64px'/>
      <Stack>
        <Typography>{ title }</Typography>
        <Typography variant='caption' color='textSecondary'>{ description }</Typography>
      </Stack>
    </Stack>
  )
}

export default StatsEntry
