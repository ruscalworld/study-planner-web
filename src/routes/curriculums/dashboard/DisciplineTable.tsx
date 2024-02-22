import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { Link } from '@mui/icons-material'
import GroupHeadCell from './GroupHeadCell.tsx'
import TaskCell, { PlaceholderCell } from './TaskCell.tsx'
import InlineButton from '../../../components/InlineButton.tsx'
import { Curriculum, Link as DisciplineLink, useDisciplineLinks } from '../../../lib/api/curriculum.ts'
import InlineCircularProgress from '../../../components/InlineCircularProgress.tsx'
import { Task, TaskGroup, useTaskGroups, useTasks } from '../../../lib/api/tasks.ts'
import LoadingBackdrop from '../../../components/LoadingBackdrop.tsx'
import { DateTime } from 'luxon'
import { useDisciplineStats } from '../../../lib/api/user.ts'
import TaskProgressProvider from './TaskProgressProvider.tsx'

const minTasks = 4

function DisciplineTable({ discipline }: { discipline: Curriculum }) {
  const { data: stats, mutate: mutateStats } = useDisciplineStats(discipline.id)
  const { data: links } = useDisciplineLinks(discipline.id)
  const { data: tasks } = useTasks(discipline.id)
  const { data: taskGroups } = useTaskGroups(discipline.id)

  if (!tasks || !taskGroups) return <LoadingBackdrop/>

  const tasksByGroup: { [key: number]: Task[] } = {}
  for (const taskGroup of taskGroups) {
    tasksByGroup[taskGroup.id] = []
  }

  for (const task of tasks) {
    if (!tasksByGroup.hasOwnProperty(task.groupId)) continue
    tasksByGroup[task.groupId].push(task)
  }

  const groupMinTasks = Math.max(minTasks, ...Object.values(tasksByGroup).map(tasks => tasks.length))

  return (
    <TableContainer sx={{ width: 'max-content', overflowX: 'none', margin: '32px 0' }}>
      <Table sx={{ width: 'max-content' }}>
        <TableHead>
          <TableRow>
            <TableHeader
              taskCount={ Math.max(tasks?.length, groupMinTasks) }
              disciplineName={ discipline.name }
              totalProgress={ (stats?.completedTasks || 0) / (stats?.totalTasks || 1) * 100 }
              links={ links || [] }
            />
          </TableRow>
        </TableHead>
        <TableBody>
          <TaskProgressProvider disciplineId={ discipline.id } onMutate={ async () => { await mutateStats() } }>
            { taskGroups.map(taskGroup => (
              <TaskGroupRow
                key={ taskGroup.id }
                taskGroup={ taskGroup }
                tasks={ tasksByGroup[taskGroup.id] }
                minTasks={ groupMinTasks }
              />
            )) }
          </TaskProgressProvider>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

interface TableHeaderProps {
  taskCount: number,
  disciplineName: string,
  totalProgress: number,
  links: DisciplineLink[],
}

function TableHeader({ taskCount, disciplineName, totalProgress, links }: TableHeaderProps) {
  return (
    <TableCell colSpan={ taskCount + 1 }>
      <Typography variant='h6' color='textPrimary'>{ disciplineName }</Typography>
      <Stack spacing={ 2 } direction='row' alignItems='center'>
        <InlineCircularProgress label={ `${ totalProgress.toFixed(0) }%` } value={ totalProgress }/>
        { links.map(link => (
          <Typography key={ link.id } color='textSecondary'>
            { /* @ts-ignore */ }
            <InlineButton startIcon={ <Link/> } label={ link.name } href={ link.url } target='_blank'/>
          </Typography>
        )) }
      </Stack>
    </TableCell>
  )
}

function TaskGroupRow({ taskGroup, tasks, minTasks }: { taskGroup: TaskGroup, tasks: Task[], minTasks: number }) {
  const deadlines = tasks
    .filter(task => !!task.deadline)
    .map(task => DateTime.fromISO(task.deadline!))
    .sort((a, b) => b.toUnixInteger() - a.toUnixInteger())

  return (
    <TableRow>
      <GroupHeadCell
        groupName={ taskGroup.name }
        deadline={ deadlines.length > 0 ? deadlines[0] : null }
      />
      { tasks.map(task => (
        <TaskCell
          key={ task.id }
          task={ task }
        />
      )) }
      { tasks.length < minTasks && <PlaceholderCells count={ minTasks - tasks.length }/> }
    </TableRow>
  )
}

function PlaceholderCells({ count }: { count: number }) {
  return [ ...Array(count) ].map(((_, index) => (
    <PlaceholderCell key={ index }/>
  )))
}

export default DisciplineTable
