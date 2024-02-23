import { Task, useTaskLinks } from '../../../lib/api/tasks.ts'
import { TaskProgress } from '../../../lib/api/user.ts'
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List, ListItemAvatar, ListItemButton, ListItemText,
  Stack,
} from '@mui/material'
import LabeledText from '../../../components/LabeledText.tsx'
import { DateTime } from 'luxon'
import DateTimeDisplay from '../../../components/DateTimeDisplay.tsx'
import LoadingBackdrop from '../../../components/LoadingBackdrop.tsx'
import { Link } from '@mui/icons-material'

interface TaskModalProps {
  task: Task,
  progress: TaskProgress | null,
  disciplineId: number,
  open: boolean,
  onClose: () => void,
}

function TaskDetailsDialog({ task, progress, disciplineId, open, onClose }: TaskModalProps) {
  const { data: links, error } = useTaskLinks(disciplineId, task.id)
  if (!links && !error || !progress) return <LoadingBackdrop/>

  return (
    <Dialog open={ open } onClose={ onClose } maxWidth='sm'>
      <DialogTitle>{ task.name }</DialogTitle>

      <DialogContent>
        <Stack spacing={ 2 }>
          <Stack direction='row' spacing={ 4 }>
            <LabeledText label='Начато'>
              <DateTimeDisplay dateTime={ progress.startedAt ? DateTime.fromISO(progress.startedAt) : null }/>
            </LabeledText>
            <LabeledText label='Завершено'>
              <DateTimeDisplay dateTime={ progress.completedAt ? DateTime.fromISO(progress.completedAt) : null }/>
            </LabeledText>
            { !!task.deadline && (
              <LabeledText label='Срок выполнения'>
                <DateTimeDisplay dateTime={ DateTime.fromISO(task.deadline) }/>
              </LabeledText>
            ) }
          </Stack>

          { !!task.description && <LabeledText label='Описание задания'>{ task.description }</LabeledText> }
        </Stack>
      </DialogContent>

      { !!links && links.length > 0 && (
        <List>
          { (links || []).map(link => (
            <ListItemButton key={ link.id } onClick={ () => window.open(link.url, '_blank') }>
              <ListItemAvatar>
                <Avatar><Link/></Avatar>
              </ListItemAvatar>
              <ListItemText
                sx={{
                  '.MuiListItemText-secondary': {
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  },
                }}
                primary={ link.name }
                secondary={ link.url }
              />
            </ListItemButton>
          )) }
        </List>
      ) }

      <DialogActions>
        <Button onClick={ onClose }>Закрыть</Button>
      </DialogActions>
    </Dialog>
  )
}

export default TaskDetailsDialog
