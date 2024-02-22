import { Task } from '../../../lib/api/tasks.ts'
import { bindMenu } from 'material-ui-popup-state'
import { PopupState } from 'material-ui-popup-state/hooks'
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import { Check, Close, HourglassEmpty, QuestionMark } from '@mui/icons-material'
import { TaskStatus, updateTaskProgress } from '../../../lib/api/user.ts'

interface TaskMenuProps {
  task: Task,
  popupState: PopupState,
  disciplineId: number,
  mutateProgress: () => Promise<void>,
}

function TaskMenu({ task, popupState, disciplineId, mutateProgress }: TaskMenuProps) {
  function updateStatus(status: TaskStatus) {
    updateTaskProgress(disciplineId, task.id, { status, grade: null }).then(async () => {
      await mutateProgress()
      popupState.close()
    })
  }

  return (
    <Menu { ...bindMenu(popupState) }>
      <MenuItem onClick={ () => updateStatus(TaskStatus.NotStarted) }>
        <ListItemIcon><Close/></ListItemIcon>
        <ListItemText>Не начато</ListItemText>
      </MenuItem>
      <MenuItem onClick={ () => updateStatus(TaskStatus.InProgress) }>
        <ListItemIcon><HourglassEmpty/></ListItemIcon>
        <ListItemText>В процессе</ListItemText>
      </MenuItem>
      <MenuItem onClick={ () => updateStatus(TaskStatus.NeedsProtection) }>
        <ListItemIcon><QuestionMark/></ListItemIcon>
        <ListItemText>Не защищено</ListItemText>
      </MenuItem>
      <MenuItem onClick={ () => updateStatus(TaskStatus.Completed) }>
        <ListItemIcon><Check/></ListItemIcon>
        <ListItemText>Готово</ListItemText>
      </MenuItem>
    </Menu>
  )
}

export default TaskMenu
