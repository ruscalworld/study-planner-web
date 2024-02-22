import { createContext, ReactNode, useContext } from 'react'
import { ScopedTaskProgress, TaskProgress, TaskStatus, useDisciplineProgress } from '../../../lib/api/user.ts'

interface ContextContents {
  disciplineProgress: ScopedTaskProgress[],
  disciplineId: number,
  isLoading: boolean,
  mutate: () => Promise<void>,
}

const TaskProgressContext = createContext<ContextContents>({
  disciplineProgress: [],
  disciplineId: 0,
  isLoading: true,
  mutate: async () => {},
})

interface TaskProgressResponse {
  mutate: () => Promise<void>,
  progress: TaskProgress | null,
  disciplineId: number,
}

export function useTaskProgress(taskId: number, taskGroupId: number): TaskProgressResponse {
  const { disciplineProgress, disciplineId, isLoading, mutate } = useContext(TaskProgressContext)
  if (isLoading) return { mutate, disciplineId, progress: null }

  const progress = disciplineProgress
    .find(progress => progress.taskId === taskId && progress.taskGroupId === taskGroupId)

  if (!progress) return {
    progress: {
      status: TaskStatus.NotStarted,
      grade: null,
      startedAt: null,
      completedAt: null,
    },
    disciplineId,
    mutate,
  }

  return { progress, disciplineId, mutate }
}

interface TaskProgressProviderProps {
  disciplineId: number,
  children: ReactNode | undefined,
  onMutate: () => Promise<void> | undefined,
}

function TaskProgressProvider({ disciplineId, children, onMutate }: TaskProgressProviderProps) {
  const { data: disciplineProgress, error, mutate } = useDisciplineProgress(disciplineId)

  return (
    <TaskProgressContext.Provider
      value={{
        disciplineProgress: disciplineProgress || [],
        disciplineId: disciplineId,
        isLoading: !disciplineProgress && !error,
        mutate: async () => {
          await mutate()
          onMutate && await onMutate()
        }
      }}
    >
      { children }
    </TaskProgressContext.Provider>
  )
}

export default TaskProgressProvider
