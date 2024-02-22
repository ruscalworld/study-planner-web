import { Button, ButtonProps } from '@mui/material'

function InlineButton(props: ButtonProps & { label: string }) {
  return (
    <Button
      size='small'
      color='inherit'
      sx={{ paddingLeft: '12px', paddingRight: '12px' }}
      { ...props }
    >
      { props.label }
    </Button>
  )
}

export default InlineButton
