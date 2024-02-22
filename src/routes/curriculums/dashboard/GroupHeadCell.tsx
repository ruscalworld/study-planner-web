import { TableCell, Typography } from '@mui/material'
import { DateTime, DateTimeFormatOptions } from 'luxon'

const dateTimeFormat: DateTimeFormatOptions = { day: 'numeric', month: 'long' }

function GroupHeadCell({ groupName, deadline }: { groupName: string, deadline: DateTime | null }) {
  return (
    <TableCell component='th' sx={{ width: '256px' }}>
      <Typography color='primary'>{ groupName }</Typography>
      <Typography variant='caption' color='textSecondary'>
        { !!deadline
          ? `до ${ deadline.toLocaleString(dateTimeFormat) }`
          : 'без срока'
        }
      </Typography>
    </TableCell>
  )
}

export default GroupHeadCell
