import { Curriculum } from '../../lib/api/curriculum.ts'
import { Avatar, ListItemAvatar, ListItemButton, ListItemText, useTheme } from '@mui/material'
import * as romans from 'romans'
import { ChevronRight } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

function CurriculumEntry({ curriculum }: { curriculum: Curriculum }) {
  const theme = useTheme()
  const navigate = useNavigate()

  return (
    <ListItemButton
      sx={{
        borderRadius: `${ theme.shape.borderRadius }px`,
        backgroundColor: theme.palette.background.paper,
      }}
      onClick={ () => navigate(`/curriculums/${ curriculum.id }`) }
    >
      <ListItemAvatar>
        <Avatar>{ romans.romanize(curriculum.semester) }</Avatar>
      </ListItemAvatar>
      <ListItemText primary={ curriculum.name } secondary={ `${ romans.romanize(curriculum.semester) } семестр` }/>
      <ChevronRight/>
    </ListItemButton>
  )
}

export default CurriculumEntry
