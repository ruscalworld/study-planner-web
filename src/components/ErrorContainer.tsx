import { Alert, AlertTitle } from '@mui/material'

function ErrorContainer({ title, message }: { title: string, message: string }) {
  return (
    <Alert severity='error' sx={{ margin: '16px 0' }}>
      <AlertTitle>{ title }</AlertTitle>
      { message }
    </Alert>
  )
}

export default ErrorContainer
