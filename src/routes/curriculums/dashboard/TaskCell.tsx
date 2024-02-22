import {
  Box,
  CircularProgress,
  Fade,
  PaletteColor,
  TableCell,
  Theme,
  Typography,
  useTheme,
} from '@mui/material'
import { Task, TaskStatus } from '../../../lib/api/tasks.ts'
import { bindTrigger, usePopupState } from 'material-ui-popup-state/hooks'
import TaskMenu from './TaskMenu.tsx'
import { ArrowDropDown, Check, PlayArrow, PriorityHigh } from '@mui/icons-material'
import { ReactNode, useState } from 'react'
import { TaskProgress, TaskStatus as ProgressStatus } from '../../../lib/api/user.ts'
import { useTaskProgress } from './TaskProgressProvider.tsx'

const width: string = '200px'

function TaskCell({ task }: { task: Task }) {
  const popupState = usePopupState({ variant: 'popover', popupId: `task-${ task.id }` })
  const [ isActive, setActive ] = useState(false)
  const [ isLoading, setLoading ] = useState(false)
  const { progress, mutate: mutateProgress, disciplineId } = useTaskProgress(task.id, task.groupId)

  const available = task.status === TaskStatus.Available
  const theme = useTheme()

  function mutateProgressWrapper() {
    setLoading(true)
    return mutateProgress().finally(() => setLoading(false))
  }

  return (
    <>
      <TableCell
        sx={{
          width: '200px',
          cursor: available ? 'pointer' : 'not-allowed',
          backgroundColor: getBackgroundColor(progress, theme),
          transition: `${ theme.transitions.duration.standard }ms ${ theme.transitions.easing.easeIn }`
        }}
        onMouseEnter={ () => setActive(true) }
        onMouseLeave={ () => setActive(false) }
        { ...bindTrigger(popupState) }
      >
        <Box
          sx={{
            opacity: available ? 1 : 0.25,
            position: 'relative',
          }}
        >
          <Typography fontWeight='500' sx={ { margin: 0 } }>{ task.name }</Typography>
          <Typography variant='caption' color='textSecondary'>
            { available
              ? task.externalName ?? ' '
              : 'Недоступно'
            }
          </Typography>

          <MenuInvitation
            visible={ (isActive || popupState.isOpen) && available && progress?.status === ProgressStatus.NotStarted }
          />
          { available && (
            <StatusContainer>
              <StatusChip progress={ progress } isLoading={ !progress || isLoading }/>
            </StatusContainer>
          )}
        </Box>
      </TableCell>
      { available && (
        <TaskMenu
          task={ task }
          popupState={ popupState }
          disciplineId={ disciplineId }
          mutateProgress={ mutateProgressWrapper }
        />
      )}
    </>
  )
}

function MenuInvitation({ visible }: { visible: boolean }) {
  return (
    <Fade in={ visible }>
      <ArrowDropDown
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
        }}
      />
    </Fade>
  )
}

function StatusContainer({ children }: { children: ReactNode | null }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        right: 0,
      }}
    >
      { children }
    </Box>
  )
}

function StatusChip({ progress, isLoading }: { progress: TaskProgress | null, isLoading: boolean }) {
  if (isLoading || !progress) return <CircularProgress size='1em'/>
  const theme = useTheme()

  function styles(color: PaletteColor) {
    return { height: '1em', width: '1em', padding: '3px', borderRadius: '100%', color: color.contrastText, backgroundColor: color.main }
  }

  switch (progress.status) {
    case ProgressStatus.Completed:
      return <Check sx={ styles(theme.palette.success) }/>
    case ProgressStatus.NeedsProtection:
      return <PriorityHigh sx={ styles(theme.palette.warning) }/>
    case ProgressStatus.InProgress:
      return <PlayArrow sx={ styles(theme.palette.info) }/>
  }

  return <></>
}

function getBackgroundColor(progress: TaskProgress | null, theme: Theme): string | undefined {
  if (!progress) return undefined

  switch (progress.status) {
    case ProgressStatus.Completed:
      return theme.palette.success.dark + '30'
    case ProgressStatus.NeedsProtection:
      return theme.palette.warning.dark + '30'
    case ProgressStatus.InProgress:
      return theme.palette.info.dark + '30'
  }

  return undefined
}

export function PlaceholderCell() {
  return <TableCell sx={{ width: width }}/>
}

export default TaskCell
