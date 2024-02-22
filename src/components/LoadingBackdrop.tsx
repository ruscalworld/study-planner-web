import { Backdrop, CircularProgress } from '@mui/material'

function LoadingBackdrop() {
  return (
    <Backdrop open>
      <CircularProgress/>
    </Backdrop>
  )
}

export default LoadingBackdrop
