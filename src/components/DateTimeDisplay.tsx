import PropTypes from 'prop-types'
import { DateTime, DateTimeFormatOptions } from 'luxon'
import { Tooltip, Typography } from '@mui/material'
import EmptyValueLabel from './EmptyValueLabel.tsx'

function DateTimeDisplay({ dateTime, format }: { dateTime: DateTime | null, format: DateTimeFormatOptions }) {
  if (!dateTime) return <EmptyValueLabel/>
  return (
    <Tooltip title={ dateTime.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY) }>
      <Typography fontSize='inherit' width='max-content'>{ dateTime.toLocaleString(format) }</Typography>
    </Tooltip>
  )
}

DateTimeDisplay.propTypes = {
  dateTime: PropTypes.object,
  format: PropTypes.object,
}

DateTimeDisplay.defaultProps = {
  format: DateTime.DATE_MED,
}

export default DateTimeDisplay
