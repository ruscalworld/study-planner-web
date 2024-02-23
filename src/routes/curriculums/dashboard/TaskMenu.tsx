import { Task, useTaskLinks } from '../../../lib/api/tasks.ts'
import { bindMenu } from 'material-ui-popup-state'
import { PopupState } from 'material-ui-popup-state/hooks'
import { Divider, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import { Check, Close, HourglassEmpty, Link, MoreHoriz, QuestionMark } from '@mui/icons-material'
import { TaskProgress, TaskStatus, updateTaskProgress } from '../../../lib/api/user.ts'
import TaskDetailsDialog from './TaskDetailsDialog.tsx'
import { useModalProvider } from '../../../lib/modals.ts'

interface TaskMenuProps {
  task: Task,
  progress: TaskProgress | null,
  popupState: PopupState,
  disciplineId: number,
  mutateProgress: () => Promise<void>,
}

function TaskMenu({ task, progress, popupState, disciplineId, mutateProgress }: TaskMenuProps) {
  const { data: links } = useTaskLinks(disciplineId, task.id)
  const modals = useModalProvider()

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
      <Divider/>
      <MenuItem onClick={ () => modals.openModal(TaskDetailsDialog, { task, progress, disciplineId }) }>
        <ListItemIcon><MoreHoriz/></ListItemIcon>
        <ListItemText>Подробнее</ListItemText>
      </MenuItem>
      { !!links && links.length > 0 && <Divider/> }
      { (links || []).map(link => (
        <MenuItem key={ link.id } onClick={ () => window.open(link.url, '_blank') }>
          <ListItemIcon><Link/></ListItemIcon>
          <ListItemText>{ link.name }</ListItemText>
        </MenuItem>
      ))}
    </Menu>
  )
}

export default TaskMenu
